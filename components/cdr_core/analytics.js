/**
 * analytics.js — All analysis logic for CDR data
 */

function computeAnalytics(records) {
  if (!records || records.length === 0) return null;

  const total = records.length;
  const incoming = records.filter(r => r.call_type === 'incoming').length;
  const outgoing = records.filter(r => r.call_type === 'outgoing').length;
  const missed   = records.filter(r => r.call_type === 'missed').length;
  const sms      = records.filter(r => r.call_type === 'sms').length;

  const durations = records.map(r => r.duration).filter(d => d > 0);
  const totalDur = durations.reduce((s,d) => s+d, 0);
  const avgDur   = durations.length ? Math.round(totalDur / durations.length) : 0;
  const maxDur   = durations.length ? Math.max(...durations) : 0;
  const minDur   = durations.length ? Math.min(...durations) : 0;

  // Unique numbers
  const uniqueNumbers = new Set(records.map(r => r.number).filter(Boolean));
  // Unique IMEI
  const uniqueIMEI = new Set(records.map(r => r.imei).filter(Boolean));
  // Unique Cell IDs
  const uniqueCells = new Set(records.map(r => r.cell_id).filter(Boolean));

  // Number frequency
  const numberFreq = groupBy(records, 'number');
  const topNumbers = topN(numberFreq, 15);

  // IMEI frequency
  const imeiFreq = groupBy(records.filter(r => r.imei), 'imei');
  const topIMEI  = topN(imeiFreq, 15);

  // Cell ID frequency
  const cellFreq = groupBy(records.filter(r => r.cell_id), 'cell_id');
  const topCells = topN(cellFreq, 15);

  // Hourly activity (0–23)
  const hourly = Array(24).fill(0);
  records.forEach(r => {
    if (r.date) hourly[r.date.getHours()]++;
  });

  // Day of week (0=Sun…6=Sat)
  const DOW_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const dow = Array(7).fill(0);
  records.forEach(r => {
    if (r.date) dow[r.date.getDay()]++;
  });

  // Daily activity (date → count)
  const dailyMap = {};
  records.forEach(r => {
    if (r.date) {
      const d = formatDate(r.date);
      dailyMap[d] = (dailyMap[d] || 0) + 1;
    }
  });
  const dailyLabels = Object.keys(dailyMap).sort();
  const dailyValues = dailyLabels.map(d => dailyMap[d]);

  // Monthly
  const monthlyMap = {};
  records.forEach(r => {
    if (r.date) {
      const m = r.date.toLocaleString('en-US', { year:'numeric', month:'short' });
      monthlyMap[m] = (monthlyMap[m] || 0) + 1;
    }
  });
  const monthlyLabels = Object.keys(monthlyMap);
  const monthlyValues = monthlyLabels.map(m => monthlyMap[m]);

  // Duration buckets for histogram
  const durBuckets = { '0s': 0, '1-30s': 0, '31-60s': 0, '1-5m': 0, '5-15m': 0, '15m+': 0 };
  records.forEach(r => {
    const d = r.duration;
    if (d === 0)         durBuckets['0s']++;
    else if (d <= 30)    durBuckets['1-30s']++;
    else if (d <= 60)    durBuckets['31-60s']++;
    else if (d <= 300)   durBuckets['1-5m']++;
    else if (d <= 900)   durBuckets['5-15m']++;
    else                 durBuckets['15m+']++;
  });

  // Heatmap: hour × day-of-week matrix
  const heatmap = Array(7).fill(null).map(() => Array(24).fill(0));
  records.forEach(r => {
    if (r.date) heatmap[r.date.getDay()][r.date.getHours()]++;
  });

  // Most active day overall
  const mostActiveDay = dailyLabels.length
    ? dailyLabels[dailyValues.indexOf(Math.max(...dailyValues))]
    : '—';

  // Most active hour
  const mostActiveHour = hourly.indexOf(Math.max(...hourly));

  // Date range
  const dates = records.map(r => r.date).filter(Boolean).sort((a,b) => a-b);
  const dateFrom = dates[0] ? formatDate(dates[0]) : '—';
  const dateTo   = dates[dates.length-1] ? formatDate(dates[dates.length-1]) : '—';

  return {
    total, incoming, outgoing, missed, sms,
    totalDur, avgDur, maxDur, minDur,
    uniqueNumbers: uniqueNumbers.size, uniqueIMEI: uniqueIMEI.size, uniqueCells: uniqueCells.size,
    numberFreq, topNumbers,
    imeiFreq, topIMEI,
    cellFreq, topCells,
    hourly, dow, DOW_LABELS,
    dailyLabels, dailyValues,
    monthlyLabels, monthlyValues,
    durBuckets,
    heatmap,
    mostActiveDay, mostActiveHour,
    dateFrom, dateTo,
  };
}

// ── Filter records ────────────────────────────────────────────────────────────
function filterRecords(records, filters) {
  return records.filter(r => {
    if (filters.number) {
      const term = filters.number.toLowerCase().trim();
      if (!r.number.toLowerCase().includes(term)) return false;
    }
    if (filters.dateFrom && r.date && r.date < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && r.date) {
      const dt = new Date(filters.dateTo);
      dt.setHours(23,59,59,999);
      if (r.date > dt) return false;
    }
    if (filters.callType && r.call_type !== filters.callType) return false;
    if (filters.durMin !== '' && !isNaN(filters.durMin) && r.duration < Number(filters.durMin)) return false;
    if (filters.durMax !== '' && !isNaN(filters.durMax) && r.duration > Number(filters.durMax)) return false;
    if (filters.imei && !String(r.imei).toLowerCase().includes(filters.imei.toLowerCase())) return false;
    if (filters.cellId && !String(r.cell_id).toLowerCase().includes(filters.cellId.toLowerCase())) return false;
    if (filters.search) {
      const s = filters.search.toLowerCase();
      const row = Object.values(r._raw || {}).join(' ').toLowerCase();
      if (!row.includes(s) && !r.number.toLowerCase().includes(s)) return false;
    }
    return true;
  });
}

// ── Find common numbers across multiple CDR datasets ─────────────────────────
function findCommonNumbers(datasets) {
  if (!datasets || datasets.length < 2) return [];
  const sets = datasets.map(ds => new Set(ds.map(r => r.number).filter(Boolean)));
  let common = [...sets[0]];
  for (let i = 1; i < sets.length; i++) {
    common = common.filter(n => sets[i].has(n));
  }
  // Count appearances in each dataset
  return common.map(num => ({
    number: num,
    counts: datasets.map(ds => ds.filter(r => r.number === num).length),
  })).sort((a,b) => b.counts.reduce((s,c)=>s+c,0) - a.counts.reduce((s,c)=>s+c,0));
}

// ── Match suspects ────────────────────────────────────────────────────────────
function matchSuspects(records, suspectNumbers) {
  const suspectSet = new Set(suspectNumbers.map(n => normalizePhone(n.trim())).filter(Boolean));
  return {
    matches: records.filter(r => suspectSet.has(r.number)),
    suspectSet,
  };
}
