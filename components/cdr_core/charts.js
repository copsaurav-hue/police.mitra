/**
 * charts.js — All Chart.js charts and heatmap rendering
 */

let charts = {};

const CHART_DEFAULTS = {
  color: 'rgba(226,232,240,0.8)',
  font: { family: "'Inter', sans-serif", size: 12 },
  grid: { color: 'rgba(255,255,255,0.05)' },
  tick: { color: 'rgba(148,163,184,0.8)' },
};

function destroyChart(id) {
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
}

function chartDefaults(extra = {}) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: CHART_DEFAULTS.color, font: CHART_DEFAULTS.font, padding: 16 },
        ...extra.legend,
      },
      tooltip: {
        backgroundColor: 'rgba(5,10,20,0.95)',
        borderColor: 'rgba(0,245,255,0.2)',
        borderWidth: 1,
        titleColor: '#00f5ff',
        bodyColor: '#e2e8f0',
        padding: 10,
      },
      ...extra.plugins,
    },
    scales: extra.scales,
    ...extra.chartOptions,
  };
}

// ── Pie chart: call type distribution ────────────────────────────────────────
function renderPieChart(analytics) {
  destroyChart('pie');
  const ctx = document.getElementById('pieChart');
  if (!ctx || !analytics) return;
  const { incoming, outgoing, missed, sms, total } = analytics;
  const other = total - incoming - outgoing - missed - sms;
  const data = [incoming, outgoing, missed, sms, other].filter((_,i) => [incoming,outgoing,missed,sms,other][i] > 0);
  const labels = ['Incoming','Outgoing','Missed','SMS','Other'].filter((_,i) => [incoming,outgoing,missed,sms,other][i] > 0);
  charts.pie = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: ['rgba(34,197,94,0.8)','rgba(245,158,11,0.8)','rgba(239,68,68,0.8)','rgba(124,58,237,0.8)','rgba(100,116,139,0.8)'],
        borderColor: ['#22c55e','#f59e0b','#ef4444','#7c3aed','#64748b'],
        borderWidth: 2,
        hoverOffset: 8,
      }],
    },
    options: chartDefaults({
      chartOptions: { cutout: '65%' },
      plugins: {},
    }),
  });
}

// ── Bar chart: hourly activity ───────────────────────────────────────────────
function renderHourlyChart(analytics) {
  destroyChart('hourly');
  const ctx = document.getElementById('hourlyChart');
  if (!ctx || !analytics) return;
  const labels = Array.from({length:24}, (_,i) => `${String(i).padStart(2,'0')}:00`);
  charts.hourly = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Calls',
        data: analytics.hourly,
        backgroundColor: analytics.hourly.map((v,i) => {
          const max = Math.max(...analytics.hourly);
          const ratio = max ? v/max : 0;
          return `rgba(0,245,255,${0.15 + ratio * 0.75})`;
        }),
        borderColor: 'rgba(0,245,255,0.5)',
        borderWidth: 1,
        borderRadius: 4,
      }],
    },
    options: chartDefaults({
      scales: {
        x: { ticks: { color: CHART_DEFAULTS.tick.color, font: { size: 9 } }, grid: CHART_DEFAULTS.grid },
        y: { ticks: { color: CHART_DEFAULTS.tick.color }, grid: CHART_DEFAULTS.grid, beginAtZero: true },
      },
      plugins: { legend: { display: false } },
    }),
  });
}

// ── Line chart: daily timeline ────────────────────────────────────────────────
function renderTimelineChart(analytics) {
  destroyChart('timeline');
  const ctx = document.getElementById('timelineChart');
  if (!ctx || !analytics) return;
  charts.timeline = new Chart(ctx, {
    type: 'line',
    data: {
      labels: analytics.dailyLabels,
      datasets: [{
        label: 'Calls per Day',
        data: analytics.dailyValues,
        borderColor: '#00f5ff',
        backgroundColor: 'rgba(0,245,255,0.06)',
        borderWidth: 2.5,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#00f5ff',
        pointRadius: analytics.dailyLabels.length > 60 ? 0 : 3,
        pointHoverRadius: 6,
      }],
    },
    options: chartDefaults({
      scales: {
        x: { ticks: { color: CHART_DEFAULTS.tick.color, maxRotation: 45 }, grid: CHART_DEFAULTS.grid },
        y: { ticks: { color: CHART_DEFAULTS.tick.color }, grid: CHART_DEFAULTS.grid, beginAtZero: true },
      },
      plugins: { legend: { display: false } },
    }),
  });
}

// ── Horizontal bar: top numbers ───────────────────────────────────────────────
function renderTopNumbersChart(analytics) {
  destroyChart('topNumbers');
  const ctx = document.getElementById('topNumbersChart');
  if (!ctx || !analytics) return;
  const top10 = analytics.topNumbers.slice(0, 10);
  charts.topNumbers = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: top10.map(([n]) => n.length > 15 ? '...'+n.slice(-10) : n),
      datasets: [{
        label: 'Calls',
        data: top10.map(([,c]) => c),
        backgroundColor: CHART_COLORS.slice(0,10).map(c => c+'cc'),
        borderColor: CHART_COLORS.slice(0,10),
        borderWidth: 1.5,
        borderRadius: 4,
      }],
    },
    options: chartDefaults({
      indexAxis: 'y',
      scales: {
        x: { ticks: { color: CHART_DEFAULTS.tick.color }, grid: CHART_DEFAULTS.grid, beginAtZero: true },
        y: { ticks: { color: CHART_DEFAULTS.tick.color, font: { family: "'JetBrains Mono', monospace", size: 11 } }, grid: { display: false } },
      },
      plugins: { legend: { display: false } },
    }),
  });
}

// ── Duration histogram ────────────────────────────────────────────────────────
function renderDurationChart(analytics) {
  destroyChart('duration');
  const ctx = document.getElementById('durationChart');
  if (!ctx || !analytics) return;
  const labels = Object.keys(analytics.durBuckets);
  const data   = Object.values(analytics.durBuckets);
  charts.duration = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Calls',
        data,
        backgroundColor: CHART_COLORS.slice(0, labels.length).map(c => c+'cc'),
        borderColor: CHART_COLORS.slice(0, labels.length),
        borderWidth: 1.5,
        borderRadius: 6,
      }],
    },
    options: chartDefaults({
      scales: {
        x: { ticks: { color: CHART_DEFAULTS.tick.color }, grid: CHART_DEFAULTS.grid },
        y: { ticks: { color: CHART_DEFAULTS.tick.color }, grid: CHART_DEFAULTS.grid, beginAtZero: true },
      },
      plugins: { legend: { display: false } },
    }),
  });
}

// ── Day of week bar chart ─────────────────────────────────────────────────────
function renderDowChart(analytics) {
  destroyChart('dow');
  const ctx = document.getElementById('dowChart');
  if (!ctx || !analytics) return;
  charts.dow = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: analytics.DOW_LABELS,
      datasets: [{
        label: 'Calls',
        data: analytics.dow,
        backgroundColor: analytics.dow.map((_,i) => CHART_COLORS[i]+'bb'),
        borderColor: CHART_COLORS.slice(0,7),
        borderWidth: 1.5,
        borderRadius: 6,
      }],
    },
    options: chartDefaults({
      scales: {
        x: { ticks: { color: CHART_DEFAULTS.tick.color }, grid: CHART_DEFAULTS.grid },
        y: { ticks: { color: CHART_DEFAULTS.tick.color }, grid: CHART_DEFAULTS.grid, beginAtZero: true },
      },
      plugins: { legend: { display: false } },
    }),
  });
}

// ── Monthly bar chart ─────────────────────────────────────────────────────────
function renderMonthlyChart(analytics) {
  destroyChart('monthly');
  const ctx = document.getElementById('monthlyChart');
  if (!ctx || !analytics) return;
  charts.monthly = new Chart(ctx, {
    type: 'line',
    data: {
      labels: analytics.monthlyLabels,
      datasets: [{
        label: 'Calls',
        data: analytics.monthlyValues,
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124,58,237,0.1)',
        borderWidth: 2.5,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#7c3aed',
        pointRadius: 4,
      }],
    },
    options: chartDefaults({
      scales: {
        x: { ticks: { color: CHART_DEFAULTS.tick.color }, grid: CHART_DEFAULTS.grid },
        y: { ticks: { color: CHART_DEFAULTS.tick.color }, grid: CHART_DEFAULTS.grid, beginAtZero: true },
      },
      plugins: { legend: { display: false } },
    }),
  });
}

// ── Activity Heatmap (custom DOM, not Chart.js) ───────────────────────────────
function renderHeatmap(analytics) {
  const container = document.getElementById('heatmapContainer');
  if (!container || !analytics) return;

  const { heatmap, DOW_LABELS } = analytics;
  const maxVal = Math.max(...heatmap.flat());

  let html = `<div style="display:flex;gap:4px;align-items:flex-start;overflow-x:auto;padding-bottom:6px;">`;
  // Day labels on Y axis
  html += `<div style="display:flex;flex-direction:column;gap:3px;padding-top:22px;">`;
  DOW_LABELS.forEach(d => {
    html += `<div class="heatmap-label" style="height:20px;line-height:20px;width:28px;">${d}</div>`;
  });
  html += `</div>`;

  // Columns for each hour
  for (let h = 0; h < 24; h++) {
    html += `<div style="display:flex;flex-direction:column;gap:3px;">`;
    html += `<div class="heatmap-label" style="text-align:center;margin-bottom:2px;">${h}h</div>`;
    for (let d = 0; d < 7; d++) {
      const val = heatmap[d][h];
      const level = maxVal ? Math.ceil((val / maxVal) * 5) : 0;
      html += `<div class="heatmap-cell" data-level="${level}" title="${DOW_LABELS[d]} ${h}:00 — ${val} calls"></div>`;
    }
    html += `</div>`;
  }
  html += `</div>`;

  // Legend
  html += `<div style="display:flex;align-items:center;gap:6px;margin-top:8px;flex-wrap:wrap;">
    <span class="heatmap-label">Low</span>
    ${[0,1,2,3,4,5].map(l=>`<div class="heatmap-cell" data-level="${l}" style="width:16px;height:16px;cursor:default;"></div>`).join('')}
    <span class="heatmap-label">High</span>
  </div>`;

  container.innerHTML = html;
}

// ── Render all dashboard charts ───────────────────────────────────────────────
function renderAllCharts(analytics) {
  renderPieChart(analytics);
  renderHourlyChart(analytics);
  renderTimelineChart(analytics);
  renderTopNumbersChart(analytics);
  renderHeatmap(analytics);
  // Analytics tab
  renderDurationChart(analytics);
  renderDowChart(analytics);
  renderMonthlyChart(analytics);
}

// ── Update KPI cards ──────────────────────────────────────────────────────────
function updateKPIs(analytics) {
  if (!analytics) return;
  animateCounter(document.getElementById('kpi-total'), analytics.total);
  animateCounter(document.getElementById('kpi-incoming'), analytics.incoming);
  animateCounter(document.getElementById('kpi-outgoing'), analytics.outgoing);
  animateCounter(document.getElementById('kpi-duration'), analytics.avgDur);
  animateCounter(document.getElementById('kpi-unique'), analytics.uniqueNumbers);
  animateCounter(document.getElementById('kpi-cells'), analytics.uniqueCells);

  const sub = document.getElementById('kpi-total-sub');
  if (sub && analytics.dateFrom !== '—') sub.textContent = `${analytics.dateFrom} → ${analytics.dateTo}`;
}
