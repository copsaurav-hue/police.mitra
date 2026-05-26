/**
 * parser.js — CDR File Parser with auto column detection
 * Supports: CSV, TXT (delimiter auto-detect), XLS/XLSX
 */

// ── Known CDR column aliases (auto-mapping) ─────────────────────────────────
const COLUMN_ALIASES = {
  number:    ['number','phone','msisdn','a_number','b_number','called','calling','party_a','party_b','mobile','callee','caller','subscriber','a_party','b_party','num','contact'],
  date:      ['date','datetime','call_date','start_date','call_time','timestamp','time','date_time','call_start','start'],
  duration:  ['duration','call_duration','duration_sec','seconds','dur','talk_time','length','talktime'],
  call_type: ['type','call_type','direction','call_direction','calltype','category','service','service_type','event_type'],
  imei:      ['imei','device_id','handset','equipment_id','imsi'],
  cell_id:   ['cell_id','cell','cellid','bts','site_id','tower','location','lac','lac_ci','cell_location','site','bts_id'],
  lat:       ['lat','latitude'],
  lon:       ['lon','lng','longitude'],
};

// ── Auto-detect which CSV column → which CDR field ──────────────────────────
function detectColumns(headers) {
  const mapping = {};
  const usedCols = new Set();
  for (const [field, aliases] of Object.entries(COLUMN_ALIASES)) {
    for (const h of headers) {
      const normalized = h.toLowerCase().trim().replace(/[\s\-\.\/]/g,'_');
      if (aliases.some(a => normalized === a || normalized.includes(a))) {
        if (!usedCols.has(h)) {
          mapping[field] = h;
          usedCols.add(h);
          break;
        }
      }
    }
  }
  return mapping;
}

// ── Parse CSV/TXT using PapaParse ────────────────────────────────────────────
function parseCSV(fileText, filename) {
  const result = Papa.parse(fileText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
    delimitersToGuess: [',', '\t', '|', ';', ':'],
    trimHeaders: true,
  });
  if (result.errors.length && result.data.length === 0) {
    throw new Error(`Parse error: ${result.errors[0].message}`);
  }
  return { data: result.data, headers: result.meta.fields || [] };
}

// ── Parse XLS/XLSX using SheetJS ────────────────────────────────────────────
function parseExcel(arrayBuffer) {
  const wb = XLSX.read(arrayBuffer, { type: 'array', cellDates: false });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(ws, { defval: '', raw: false });
  const headers = data.length ? Object.keys(data[0]) : [];
  return { data, headers };
}

// ── Normalize a raw row to standard CDR row ──────────────────────────────────
function normalizeRow(raw, mapping, idx, filename) {
  const get = (field) => {
    const col = mapping[field];
    return col ? (raw[col] ?? '') : '';
  };

  const dateRaw = get('date');
  const parsedDate = parseDate(dateRaw);
  const num = normalizePhone(get('number'));
  const dur = get('duration');
  const durNum = parseFloat(dur) || 0;
  const callType = normalizeCallType(get('call_type'));

  return {
    _id: idx,
    _source: filename,
    number: num || get('number') || '—',
    date_raw: dateRaw,
    date: parsedDate,
    date_str: parsedDate ? formatDateTime(parsedDate) : dateRaw,
    duration: durNum,
    duration_raw: dur,
    call_type: callType,
    imei: get('imei') || '',
    cell_id: get('cell_id') || '',
    lat: get('lat') || '',
    lon: get('lon') || '',
    _raw: raw,  // Keep original for table display
  };
}

// ── Main parser entry point ──────────────────────────────────────────────────
async function parseFile(file, onProgress) {
  const ext = file.name.split('.').pop().toLowerCase();
  let rawData, headers;

  onProgress?.(10);

  if (ext === 'xlsx' || ext === 'xls') {
    const buf = await file.arrayBuffer();
    onProgress?.(40);
    ({ data: rawData, headers } = parseExcel(buf));
  } else {
    // CSV / TXT
    const text = await file.text();
    onProgress?.(40);
    ({ data: rawData, headers } = parseCSV(text, file.name));
  }

  onProgress?.(60);

  const mapping = detectColumns(headers);

  onProgress?.(75);

  // Normalize all rows
  let records = rawData
    .filter(r => Object.values(r).some(v => v !== ''))
    .map((r, i) => normalizeRow(r, mapping, i, file.name));

  onProgress?.(85);

  // Deduplicate
  const before = records.length;
  records = dedupeRecords(records);
  const dupes = before - records.length;

  onProgress?.(100);

  return { records, headers, mapping, filename: file.name, dupes, total: records.length };
}

// ── Column mapper UI ──────────────────────────────────────────────────────────
function renderColumnMapper(headers, mapping) {
  const grid = document.getElementById('columnMapGrid');
  const fields = ['number','date','duration','call_type','imei','cell_id','lat','lon'];
  const labels = {
    number: 'Phone Number', date: 'Date/Time', duration: 'Duration (sec)',
    call_type: 'Call Type', imei: 'IMEI', cell_id: 'Cell ID',
    lat: 'Latitude', lon: 'Longitude'
  };

  grid.innerHTML = fields.map(f => `
    <div class="column-map-item">
      <label>${labels[f]}</label>
      <select class="input-field col-map-select" data-field="${f}">
        <option value="">(not mapped)</option>
        ${headers.map(h => `<option value="${h}" ${mapping[f]===h?'selected':''}>${h}</option>`).join('')}
      </select>
    </div>
  `).join('');
}

function getCustomMapping() {
  const mapping = {};
  document.querySelectorAll('.col-map-select').forEach(sel => {
    if (sel.value) mapping[sel.dataset.field] = sel.value;
  });
  return mapping;
}
