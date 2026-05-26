// Police Mitra - Compiled CDR Analysis Component (Strict Offline with Mobile App Shell Layout)
// Compiled from standalone CDR Analyzer Pro module.

// Use global window.logActivity to avoid circular module dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };

export function renderCdrAnalysis(state, container) {
  const isDark = state.theme === 'dark';

  // 1. Inject Stylesheets
  const styleId = 'cdr-analysis-custom-styles';
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.innerHTML = `
/* ============================================
   CDR ANALYZER PRO — MAIN STYLESHEET
   Dark Cyber / Glassmorphism Theme
   ============================================ */



:root {
  --bg-primary: #050a14;
  --bg-secondary: #0a1628;
  --bg-tertiary: #0f1f3d;
  --glass-bg: rgba(255, 255, 255, 0.04);
  --glass-border: rgba(0, 245, 255, 0.12);
  --glass-hover: rgba(255, 255, 255, 0.07);
  --accent-cyan: #00f5ff;
  --accent-purple: #7c3aed;
  --accent-pink: #ec4899;
  --accent-green: #22c55e;
  --accent-amber: #f59e0b;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #4a5568;
  --danger: #ef4444;
  --sidebar-width: 240px;
  --topbar-height: 64px;
  --radius: 14px;
  --radius-sm: 8px;
  --transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
  font-family: 'Inter', -apple-system, sans-serif;
}





.dark-bg {
  background:
    radial-gradient(ellipse 80% 50% at 20% 20%, rgba(124,58,237,0.15) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,245,255,0.08) 0%, transparent 60%),
    var(--bg-primary);
}

/* ====== SCROLLBAR ====== */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
::-webkit-scrollbar-thumb { background: rgba(0,245,255,0.3); border-radius: 3px; }

/* ====== LOADING SCREEN ====== */
.loading-screen {
  position: fixed; inset: 0; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg-primary);
}
.loading-inner { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
.loading-logo { animation: pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(0.95)} }
.loading-title { font-size: 1.8rem; font-weight: 800; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.loading-subtitle { color: var(--text-secondary); font-size: 0.85rem; }
.loading-bar { width: 260px; height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
.loading-progress { height: 100%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple)); border-radius: 2px; animation: loadBar 2.5s ease-in-out forwards; }
@keyframes loadBar { 0%{width:0%} 100%{width:100%} }

/* ====== LAYOUT ====== */
#app { display: flex; min-height: 100vh; }

/* ====== SIDEBAR ====== */
.sidebar {
  width: var(--sidebar-width);
  min-height: 100vh;
  background: rgba(10, 22, 40, 0.95);
  border-right: 1px solid var(--glass-border);
  display: flex; flex-direction: column;
  position: fixed; left: 0; top: 0; bottom: 0; z-index: 100;
  backdrop-filter: blur(20px);
  transition: var(--transition);
}
.sidebar.collapsed { width: 64px; }
.sidebar.collapsed .nav-label,
.sidebar.collapsed .sidebar-brand,
.sidebar.collapsed .status-text { display: none; }

.sidebar-logo {
  display: flex; align-items: center; gap: 10px;
  padding: 20px 16px 16px;
  border-bottom: 1px solid var(--glass-border);
}
.sidebar-brand { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); white-space: nowrap; }
.sidebar-toggle { margin-left: auto; background: none; border: none; color: var(--text-secondary); font-size: 1.2rem; cursor: pointer; padding: 4px; border-radius: 6px; transition: var(--transition); }
.sidebar-toggle:hover { color: var(--accent-cyan); background: var(--glass-bg); }

.sidebar-nav { flex: 1; padding: 12px 8px; overflow-y: auto; }
.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: var(--radius-sm);
  text-decoration: none; color: var(--text-secondary);
  transition: var(--transition); margin-bottom: 2px;
  font-size: 0.88rem; font-weight: 500; white-space: nowrap;
}
.nav-item:hover { background: var(--glass-bg); color: var(--text-primary); }
.nav-item.active { background: linear-gradient(135deg, rgba(0,245,255,0.12), rgba(124,58,237,0.12)); color: var(--accent-cyan); border: 1px solid rgba(0,245,255,0.2); }
.nav-icon { font-size: 1rem; width: 20px; text-align: center; flex-shrink: 0; }

.sidebar-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--glass-border);
  display: flex; align-items: center; gap: 8px;
}
.status-dot { width: 8px; height: 8px; background: var(--accent-green); border-radius: 50%; box-shadow: 0 0 8px var(--accent-green); animation: blink 2s infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
.status-text { font-size: 0.75rem; color: var(--text-muted); }

/* ====== MAIN CONTENT ====== */
.main-content {
  margin-left: var(--sidebar-width);
  flex: 1; min-height: 100vh;
  padding: var(--topbar-height) 0 0;
  transition: margin-left 0.25s;
}
.sidebar.collapsed ~ .main-content { margin-left: 64px; }

/* ====== TOPBAR ====== */
.topbar {
  position: fixed; top: 0; right: 0;
  left: var(--sidebar-width);
  height: var(--topbar-height);
  background: rgba(5,10,20,0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; z-index: 90;
  transition: left 0.25s;
}
.sidebar.collapsed ~ .main-content .topbar { left: 64px; }
.topbar-left { display: flex; align-items: center; gap: 12px; }
.topbar-right { display: flex; align-items: center; gap: 12px; }

.page-title { font-size: 1.2rem; font-weight: 700; color: var(--text-primary); }
.record-badge { background: rgba(0,245,255,0.1); border: 1px solid rgba(0,245,255,0.2); color: var(--accent-cyan); font-size: 0.75rem; padding: 3px 10px; border-radius: 20px; font-family: 'JetBrains Mono', monospace; }

.search-box { position: relative; }
.search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 0.85rem; }
.search-input {
  background: var(--glass-bg); border: 1px solid var(--glass-border);
  color: var(--text-primary); padding: 8px 12px 8px 32px;
  border-radius: var(--radius-sm); font-size: 0.85rem;
  width: 240px; outline: none; transition: var(--transition);
  font-family: 'Inter', sans-serif;
}
.search-input:focus { border-color: var(--accent-cyan); box-shadow: 0 0 0 2px rgba(0,245,255,0.1); }
.search-input::placeholder { color: var(--text-muted); }

.btn-icon { background: var(--glass-bg); border: 1px solid var(--glass-border); color: var(--text-secondary); padding: 8px 10px; border-radius: var(--radius-sm); cursor: pointer; transition: var(--transition); font-size: 1rem; }
.btn-icon:hover { color: var(--danger); border-color: rgba(239,68,68,0.3); }

/* ====== TAB SECTIONS ====== */
.tab-content { display: none; padding: 24px; animation: fadeIn 0.3s ease; }
.tab-content.active { display: block; }
@keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

/* ====== GLASS CARD ====== */
.glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  backdrop-filter: blur(12px);
}
.glass:hover { border-color: rgba(0,245,255,0.2); }

.card { padding: 20px; margin-bottom: 20px; }
.card-title { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
.card-sub { color: var(--text-secondary); font-size: 0.82rem; margin-bottom: 16px; }
.card-actions { display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap; }

/* ====== KPI GRID ====== */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px; margin-bottom: 24px;
}
.kpi-card {
  padding: 20px; border-radius: var(--radius);
  display: flex; align-items: center; gap: 16px;
  position: relative; overflow: hidden;
  transition: var(--transition);
  border: 1px solid rgba(var(--accent, 0, 245, 255), 0.15);
}
.kpi-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 60% at 0% 0%, rgba(0,245,255,0.06), transparent);
  pointer-events: none;
}
.kpi-card:hover { transform: translateY(-2px); border-color: var(--accent); box-shadow: 0 8px 30px rgba(0,0,0,0.3); }
.kpi-icon { font-size: 1.6rem; color: var(--accent); filter: drop-shadow(0 0 8px var(--accent)); }
.kpi-value { font-size: 1.8rem; font-weight: 800; font-family: 'JetBrains Mono', monospace; color: var(--text-primary); line-height: 1; }
.kpi-label { font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
.kpi-trend { position: absolute; right: 16px; top: 16px; font-size: 0.7rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; }

/* ====== CHARTS GRID ====== */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 20px;
}
.chart-card { padding: 20px; }
.chart-card.wide { grid-column: 1 / -1; }
.chart-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.chart-header h3 { font-size: 0.9rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; }
.chart-
.chart-body canvas { max-height: 240px; }

/* ====== HEATMAP ====== */
.heatmap-container { overflow-x: auto; height: auto !important; }
.heatmap-grid { display: grid; gap: 3px; }
.heatmap-cell {
  width: 20px; height: 20px; border-radius: 3px;
  background: rgba(0,245,255,0.05);
  transition: var(--transition); cursor: pointer;
  position: relative;
}
.heatmap-cell:hover { transform: scale(1.4); z-index: 10; }
.heatmap-cell[data-level="1"] { background: rgba(0,245,255,0.15); }
.heatmap-cell[data-level="2"] { background: rgba(0,245,255,0.30); }
.heatmap-cell[data-level="3"] { background: rgba(0,245,255,0.50); }
.heatmap-cell[data-level="4"] { background: rgba(0,245,255,0.70); }
.heatmap-cell[data-level="5"] { background: rgba(0,245,255,0.90); }
.heatmap-label { font-size: 0.65rem; color: var(--text-muted); text-align: center; }
.heatmap-axis { display: flex; gap: 3px; }

/* ====== UPLOAD ====== */
.upload-area {
  border: 2px dashed var(--glass-border); border-radius: var(--radius);
  padding: 60px 32px; text-align: center;
  margin-bottom: 20px; transition: var(--transition);
  cursor: pointer;
  background: var(--glass-bg);
}
.upload-area.drag-over { border-color: var(--accent-cyan); background: rgba(0,245,255,0.05); box-shadow: 0 0 30px rgba(0,245,255,0.15); }
.upload-icon { font-size: 3rem; margin-bottom: 16px; }
.upload-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; }
.upload-sub { color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 24px; }

.upload-progress-card { padding: 16px 20px; margin-bottom: 16px; }
.progress-header { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem; }
.progress-track { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple)); border-radius: 3px; transition: width 0.3s; }

.column-map-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
.column-map-item label { display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px; }

/* ====== BUTTONS ====== */
.btn-primary {
  display: inline-flex; align-items: center; gap: 6px;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
  color: #000; font-weight: 700; font-size: 0.85rem;
  padding: 10px 20px; border: none; border-radius: var(--radius-sm);
  cursor: pointer; transition: var(--transition);
  text-decoration: none; font-family: 'Inter', sans-serif;
}
.btn-primary:hover { opacity: 0.85; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,245,255,0.25); }
.btn-primary:active { transform: translateY(0); }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--glass-bg); color: var(--text-primary); font-weight: 600; font-size: 0.85rem;
  padding: 10px 20px; border: 1px solid var(--glass-border); border-radius: var(--radius-sm);
  cursor: pointer; transition: var(--transition);
  text-decoration: none; font-family: 'Inter', sans-serif;
}
.btn-ghost:hover { border-color: var(--accent-cyan); color: var(--accent-cyan); }

.btn-sm {
  background: var(--glass-bg); color: var(--text-secondary); font-size: 0.78rem;
  padding: 6px 12px; border: 1px solid var(--glass-border); border-radius: 6px;
  cursor: pointer; transition: var(--transition); font-family: 'Inter', sans-serif;
}
.btn-sm:hover { border-color: var(--accent-cyan); color: var(--text-primary); }
.btn-danger-sm {
  background: rgba(239,68,68,0.1); color: var(--danger); font-size: 0.78rem;
  padding: 6px 12px; border: 1px solid rgba(239,68,68,0.3); border-radius: 6px;
  cursor: pointer; transition: var(--transition); font-family: 'Inter', sans-serif;
}
.btn-danger-sm:hover { background: rgba(239,68,68,0.2); }

/* ====== INPUTS ====== */
.input-field {
  background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border);
  color: var(--text-primary); padding: 9px 12px;
  border-radius: var(--radius-sm); font-size: 0.85rem;
  width: 100%; outline: none; transition: var(--transition);
  font-family: 'Inter', sans-serif;
}
.input-field:focus { border-color: var(--accent-cyan); box-shadow: 0 0 0 2px rgba(0,245,255,0.08); }
.input-field::placeholder { color: var(--text-muted); }
select.input-field option { background: var(--bg-secondary); }
.textarea { resize: vertical; min-height: 100px; }

/* ====== FILTERS ====== */
.filter-card { margin-bottom: 16px; }
.filter-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 12px; }
.filter-group label { display: block; font-size: 0.72rem; color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
.filter-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.filter-result-count { font-size: 0.8rem; color: var(--accent-cyan); font-family: 'JetBrains Mono', monospace; }

/* ====== TABLE ====== */
.table-card { padding: 0; overflow: hidden; }
.table-toolbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--glass-border); }
.table-count { font-size: 0.82rem; color: var(--text-secondary); font-family: 'JetBrains Mono', monospace; }
.table-actions { display: flex; gap: 8px; }
.table-wrapper { overflow-x: auto; max-height: 500px; overflow-y: auto; }
.cdr-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.cdr-table thead th {
  background: rgba(0,245,255,0.05); color: var(--text-muted);
  font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em;
  padding: 10px 12px; text-align: left; border-bottom: 1px solid var(--glass-border);
  white-space: nowrap; cursor: pointer; user-select: none;
  position: sticky; top: 0;
}
.cdr-table thead th:hover { color: var(--accent-cyan); }
.cdr-table tbody tr { border-bottom: 1px solid rgba(255,255,255,0.04); transition: var(--transition); }
.cdr-table tbody tr:hover { background: rgba(0,245,255,0.04); }
.cdr-table tbody tr.suspect-match { background: rgba(239,68,68,0.08); border-left: 3px solid var(--danger); }
.cdr-table tbody tr.bookmarked { background: rgba(245,158,11,0.06); }
.cdr-table td { padding: 9px 12px; color: var(--text-primary); white-space: nowrap; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; }
.cdr-table td:first-child { color: var(--text-muted); }

.pagination {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 14px; border-top: 1px solid var(--glass-border);
  flex-wrap: wrap;
}
.page-btn {
  background: var(--glass-bg); border: 1px solid var(--glass-border);
  color: var(--text-secondary); padding: 5px 10px; border-radius: 6px;
  cursor: pointer; font-size: 0.78rem; transition: var(--transition);
}
.page-btn:hover, .page-btn.active { background: rgba(0,245,255,0.1); border-color: var(--accent-cyan); color: var(--accent-cyan); }

/* ====== FREQ LIST ====== */
.freq-list { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; max-height: 320px; overflow-y: auto; }
.freq-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; border-radius: 8px;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  transition: var(--transition);
}
.freq-item:hover { background: rgba(0,245,255,0.06); border-color: rgba(0,245,255,0.15); }
.freq-item-label { font-size: 0.82rem; color: var(--text-primary); font-family: 'JetBrains Mono', monospace; }
.freq-item-value { display: flex; align-items: center; gap: 8px; }
.freq-bar { height: 4px; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple)); border-radius: 2px; min-width: 20px; }
.freq-count { font-size: 0.78rem; color: var(--accent-cyan); font-family: 'JetBrains Mono', monospace; font-weight: 700; }
.freq-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }

/* ====== MAP ====== */
.map-controls { display: flex; flex-direction: column; gap: 12px; }
.map-auto-note { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-secondary); }
.badge-cyan { background: rgba(0,245,255,0.1); border: 1px solid rgba(0,245,255,0.3); color: var(--accent-cyan); font-size: 0.7rem; padding: 2px 8px; border-radius: 20px; }
.map-card { height: 500px; overflow: hidden; margin-top: 16px; position: relative; }
#mapContainer .leaflet-container { height: 100% !important; border-radius: var(--radius); background: #0a1628; }

/* ====== NOTES ====== */
.notes-layout { display: grid; grid-template-columns: 280px 1fr; gap: 20px; align-items: start; }
.notes-sidebar { }
.notes-main { }
.note-item { padding: 10px 12px; border-radius: 8px; cursor: pointer; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 6px; transition: var(--transition); }
.note-item:hover { background: rgba(0,245,255,0.06); border-color: rgba(0,245,255,0.15); }
.note-item.active { background: rgba(0,245,255,0.1); border-color: var(--accent-cyan); }
.note-item-title { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.note-item-date { font-size: 0.7rem; color: var(--text-muted); margin-top: 2px; }
.note-editor-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
.note-editor-actions { display: flex; gap: 8px; margin-left: auto; }
.note-title-input { font-size: 1rem; font-weight: 700; flex: 1; }
.note-
.note-meta { font-size: 0.72rem; color: var(--text-muted); margin-top: 8px; }
.note-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; color: var(--text-muted); text-align: center; gap: 12px; }
.placeholder-icon { font-size: 3rem; opacity: 0.3; }

/* ====== SUSPECTS ====== */
.badge-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; }
.badge { padding: 4px 12px; border-radius: 20px; font-size: 0.78rem; font-weight: 600; }
.badge-danger { background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: var(--danger); }
.badge-green { background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3); color: var(--accent-green); }

/* ====== COMMON ====== */
.common-upload-area { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.target-list { display: flex; flex-direction: column; gap: 6px; }
.target-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: 8px; }
.target-item-name { font-size: 0.85rem; color: var(--text-primary); }
.target-item-count { font-size: 0.78rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; }
.btn-remove { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.9rem; padding: 2px 6px; border-radius: 4px; transition: var(--transition); }
.btn-remove:hover { color: var(--danger); }

/* ====== EXPORT ====== */
.export-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.export-card { padding: 28px 20px; text-align: center; transition: var(--transition); cursor: pointer; }
.export-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
.export-icon { font-size: 2.5rem; margin-bottom: 12px; }
.export-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
.export-card p { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 16px; }
.export-scope-options { display: flex; gap: 20px; flex-wrap: wrap; }
.radio-option { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-secondary); cursor: pointer; }
.radio-option input { accent-color: var(--accent-cyan); }

/* ====== FILE LIST ====== */
.file-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--glass-border); margin-bottom: 8px; background: rgba(255,255,255,0.02); }
.file-item-info { display: flex; flex-direction: column; gap: 2px; }
.file-item-name { font-size: 0.88rem; font-weight: 600; color: var(--text-primary); }
.file-item-meta { font-size: 0.72rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; }
.file-item-remove { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1rem; padding: 4px 8px; border-radius: 4px; transition: var(--transition); }
.file-item-remove:hover { color: var(--danger); }

/* ====== TOAST ====== */
.toast-container { position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
.toast {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 18px; border-radius: var(--radius-sm);
  font-size: 0.85rem; font-weight: 500;
  backdrop-filter: blur(20px); max-width: 320px;
  animation: slideIn 0.3s ease;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}
@keyframes slideIn { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
.toast-success { background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3); color: var(--accent-green); }
.toast-error { background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: var(--danger); }
.toast-info { background: rgba(0,245,255,0.1); border: 1px solid rgba(0,245,255,0.2); color: var(--accent-cyan); }
.toast-warn { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25); color: var(--accent-amber); }
.toast-dismiss { background: none; border: none; color: inherit; cursor: pointer; opacity: 0.6; margin-left: auto; font-size: 1rem; }

/* ====== RESPONSIVE ====== */
@media (max-width: 900px) {
  .sidebar { width: 64px; }
  .sidebar .nav-label, .sidebar .sidebar-brand, .sidebar .status-text { display: none; }
  .main-content { margin-left: 64px; }
  .topbar { left: 64px; }
  .notes-layout { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .charts-grid { grid-template-columns: 1fr; }
  .chart-card.wide { grid-column: auto; }
  .filter-grid { grid-template-columns: 1fr 1fr; }
  .tab-content { padding: 12px; }
  .search-input { width: 140px; }
}

/* ====== UTILITY ====== */
.text-cyan { color: var(--accent-cyan); }
.text-muted { color: var(--text-muted); }
.mono { font-family: 'JetBrains Mono', monospace; }
.hidden { display: none !important; }
.flex { display: flex; }
.items-center { align-items: center; }
.gap-2 { gap: 8px; }
.mt-2 { margin-top: 8px; }
.w-full { width: 100%; }

/* ====== ANIMATED GLOW BORDER ====== */
.glow-border { position: relative; }
.glow-border::after {
  content: ''; position: absolute; inset: -1px; border-radius: inherit;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink));
  z-index: -1; opacity: 0; transition: opacity 0.3s;
}
.glow-border:hover::after { opacity: 0.5; }

/* Sort arrows */
.sort-arrow { margin-left: 4px; opacity: 0.5; }
.sort-arrow.asc { opacity: 1; color: var(--accent-cyan); }
.sort-arrow.desc { opacity: 1; color: var(--accent-cyan); }

/* Checkbox style */
input[type="checkbox"] { accent-color: var(--accent-cyan); width: 14px; height: 14px; cursor: pointer; }

/* Row number */
.row-num { color: var(--text-muted) !important; }

/* Call type badges */
.badge-call-in { background: rgba(34,197,94,0.15); color: var(--accent-green); padding: 2px 7px; border-radius: 4px; font-size: 0.7rem; }
.badge-call-out { background: rgba(245,158,11,0.15); color: var(--accent-amber); padding: 2px 7px; border-radius: 4px; font-size: 0.7rem; }
.badge-call-miss { background: rgba(239,68,68,0.15); color: var(--danger); padding: 2px 7px; border-radius: 4px; font-size: 0.7rem; }
.badge-call-sms { background: rgba(124,58,237,0.15); color: #a78bfa; padding: 2px 7px; border-radius: 4px; font-size: 0.7rem; }
.badge-call-def { background: rgba(255,255,255,0.08); color: var(--text-muted); padding: 2px 7px; border-radius: 4px; font-size: 0.7rem; }

/* Bookmark btn */
.bookmark-btn { background: none; border: none; cursor: pointer; font-size: 1rem; padding: 2px; transition: var(--transition); }
.bookmark-btn.active { color: var(--accent-amber); }
.bookmark-btn:not(.active) { color: var(--text-muted); }
.bookmark-btn:hover { transform: scale(1.2); }


      /* Custom Mobile Shell Adaptations */
      .cdr-workspace-wrapper {
         box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
      }
      .cdr-tab-contents-pane {
         scrollbar-width: thin;
      }
      #cdrTabRow .nav-item {
        color: #94a3b8;
        border: none;
        background: transparent;
      }
      #cdrTabRow .nav-item.active {
        color: #00f5ff;
        filter: drop-shadow(0 0 4px rgba(0, 240, 255, 0.4));
      }
      #cdrTabRowMore .nav-item {
        border-color: rgba(255, 255, 255, 0.05);
      }
      #cdrTabRowMore .nav-item.active {
        background: rgba(0, 240, 255, 0.08);
        border-color: rgba(0, 240, 255, 0.2);
        color: #00f5ff;
      }
      /* Ensure leaflet Map takes right dimensions inside viewport */
      #mapContainer {
         height: 380px !important;
      }
    `;
    document.head.appendChild(styleEl);
  }

  // 2. Inject HTML Layout (Centered SmartPhone Shell structure)
  container.innerHTML = `
    <div class="cdr-workspace-wrapper max-w-sm sm:max-w-md mx-auto rounded-[32px] border-4 border-slate-800/90 bg-[#050A14] shadow-2xl relative overflow-hidden flex flex-col h-[740px] animate-fade-in text-slate-100 font-sans">
      
      <!-- Phone Top Notch Decoration -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-slate-900 rounded-b-xl z-30 flex items-center justify-center gap-1.5">
        <div class="w-1.5 h-1.5 rounded-full bg-slate-700/80"></div>
        <div class="w-10 h-1 bg-slate-700/80 rounded"></div>
      </div>

      <!-- Top App Bar -->
      <div class="h-14 shrink-0 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/50 px-4 pt-3 flex items-center justify-between z-20">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center text-cyber-blue shrink-0 shadow-cyber-glow">
            <i data-lucide="activity" class="h-4.5 w-4.5"></i>
          </div>
          <div>
            <h2 class="text-[10px] font-bold font-mono tracking-wider text-white uppercase" id="cdrAppTitle">CDR ANALYZER PRO</h2>
            <p class="text-[7px] text-slate-500 font-mono tracking-widest uppercase">SECURE OFFLINE DESK</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span id="recordCount" class="record-badge text-[8px] font-mono py-0.5 px-2">0 logs</span>
          <button class="px-2 py-0.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-mono font-bold text-[8px] rounded border border-red-500/20 uppercase" id="clearDataBtn">RESET</button>
          <button onclick="window.navigate('dashboard')" title="Back to Home" class="flex items-center gap-1 px-2 py-0.5 bg-slate-800 hover:bg-cyber-blue hover:text-cyber-950 text-slate-300 transition-all font-mono font-bold text-[8px] rounded border border-slate-700 hover:border-cyber-blue uppercase">
            ← HOME
          </button>
        </div>
      </div>

      <!-- Central Scrollable Viewport Pane -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4 pb-20" id="cdrAppContentPane">
        <section id="tab-dashboard" class="tab-content active">
        <div class="kpi-grid" id="kpiGrid">
          <div class="kpi-card glass" style="--accent:#00f5ff">
            <div class="kpi-icon">&#128222;</div>
            <div class="kpi-body">
              <div class="kpi-value" id="kpi-total">0</div>
              <div class="kpi-label">Total Calls</div>
            </div>
            <div class="kpi-trend" id="kpi-total-sub">—</div>
          </div>
          <div class="kpi-card glass" style="--accent:#22c55e">
            <div class="kpi-icon">&#8593;</div>
            <div class="kpi-body">
              <div class="kpi-value" id="kpi-incoming">0</div>
              <div class="kpi-label">Incoming</div>
            </div>
          </div>
          <div class="kpi-card glass" style="--accent:#f59e0b">
            <div class="kpi-icon">&#8595;</div>
            <div class="kpi-body">
              <div class="kpi-value" id="kpi-outgoing">0</div>
              <div class="kpi-label">Outgoing</div>
            </div>
          </div>
          <div class="kpi-card glass" style="--accent:#7c3aed">
            <div class="kpi-icon">&#9203;</div>
            <div class="kpi-body">
              <div class="kpi-value" id="kpi-duration">0</div>
              <div class="kpi-label">Avg Duration (s)</div>
            </div>
          </div>
          <div class="kpi-card glass" style="--accent:#ec4899">
            <div class="kpi-icon">&#128100;</div>
            <div class="kpi-body">
              <div class="kpi-value" id="kpi-unique">0</div>
              <div class="kpi-label">Unique Numbers</div>
            </div>
          </div>
          <div class="kpi-card glass" style="--accent:#06b6d4">
            <div class="kpi-icon">&#128205;</div>
            <div class="kpi-body">
              <div class="kpi-value" id="kpi-cells">0</div>
              <div class="kpi-label">Cell IDs</div>
            </div>
          </div>
        </div>

        <div class="charts-grid">
          <div class="chart-card glass">
            <div class="chart-header"><h3>Call Type Distribution</h3></div>
            <div class="chart-body"><canvas id="pieChart"></canvas></div>
          </div>
          <div class="chart-card glass">
            <div class="chart-header"><h3>Hourly Activity</h3></div>
            <div class="chart-body"><canvas id="hourlyChart"></canvas></div>
          </div>
          <div class="chart-card glass wide">
            <div class="chart-header"><h3>Daily Call Timeline</h3></div>
            <div class="chart-body"><canvas id="timelineChart"></canvas></div>
          </div>
          <div class="chart-card glass">
            <div class="chart-header"><h3>Top 10 Numbers</h3></div>
            <div class="chart-body"><canvas id="topNumbersChart"></canvas></div>
          </div>
          <div class="chart-card glass">
            <div class="chart-header"><h3>Activity Heatmap</h3></div>
            <div class="chart-body heatmap-container" id="heatmapContainer"></div>
          </div>
        </div>
      </section>\n\n<section id="tab-upload" class="tab-content">
        <div class="upload-area" id="dropZone">
          <div class="upload-icon">&#128228;</div>
          <h2 class="upload-title">Drop CDR Files Here</h2>
          <p class="upload-sub">Supports CSV, TXT, XLS, XLSX • Multiple files supported</p>
          <label class="btn-primary" for="fileInput">
            <input type="file" id="fileInput" multiple accept=".csv,.txt,.xls,.xlsx" style="display:none" />
            Browse Files
          </label>
        </div>

        <div id="uploadProgress" style="display:none;" class="glass upload-progress-card">
          <div class="progress-header">
            <span id="progressFilename">Parsing...</span>
            <span id="progressPercent">0%</span>
          </div>
          <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
        </div>

        <!-- Column mapping -->
        <div id="columnMapper" class="glass card" style="display:none;">
          <h3 class="card-title">Column Mapping</h3>
          <p class="card-sub">Auto-detected columns. Adjust if needed.</p>
          <div id="columnMapGrid" class="column-map-grid"></div>
          <div class="card-actions">
            <button class="btn-primary" id="applyMapping">Apply &amp; Analyze</button>
            <button class="btn-ghost" id="resetMapping">Reset</button>
          </div>
        </div>

        <!-- Uploaded Files List -->
        <div id="fileList" class="glass card" style="display:none;">
          <h3 class="card-title">Loaded Files</h3>
          <div id="fileListItems"></div>
        </div>
      </section>\n\n<section id="tab-records" class="tab-content">
        <!-- Filters -->
        <div class="glass card filter-card">
          <div class="filter-grid">
            <div class="filter-group">
              <label>Phone Number</label>
              <input type="text" id="filterNumber" placeholder="Search number..." class="input-field" />
            </div>
            <div class="filter-group">
              <label>Date From</label>
              <input type="date" id="filterDateFrom" class="input-field" />
            </div>
            <div class="filter-group">
              <label>Date To</label>
              <input type="date" id="filterDateTo" class="input-field" />
            </div>
            <div class="filter-group">
              <label>Call Type</label>
              <select id="filterCallType" class="input-field">
                <option value="">All Types</option>
                <option value="incoming">Incoming</option>
                <option value="outgoing">Outgoing</option>
                <option value="missed">Missed</option>
                <option value="sms">SMS</option>
              </select>
            </div>
            <div class="filter-group">
              <label>Min Duration (s)</label>
              <input type="number" id="filterDurMin" placeholder="0" class="input-field" />
            </div>
            <div class="filter-group">
              <label>Max Duration (s)</label>
              <input type="number" id="filterDurMax" placeholder="∞" class="input-field" />
            </div>
            <div class="filter-group">
              <label>IMEI</label>
              <input type="text" id="filterIMEI" placeholder="Filter by IMEI..." class="input-field" />
            </div>
            <div class="filter-group">
              <label>Cell ID</label>
              <input type="text" id="filterCellID" placeholder="Filter by Cell ID..." class="input-field" />
            </div>
          </div>
          <div class="filter-actions">
            <button class="btn-primary" id="applyFilters">&#128269; Apply Filters</button>
            <button class="btn-ghost" id="clearFilters">Clear</button>
            <span class="filter-result-count" id="filterResultCount"></span>
          </div>
        </div>

        <!-- Table -->
        <div class="glass card table-card">
          <div class="table-toolbar">
            <span id="tableCount" class="table-count">0 records</span>
            <div class="table-actions">
              <button class="btn-sm" id="selectAllBtn">Select All</button>
              <button class="btn-sm btn-danger" id="deleteSelectedBtn">Delete Selected</button>
            </div>
          </div>
          <div class="table-wrapper" id="tableWrapper">
            <table id="cdrTable" class="cdr-table">
              <thead id="tableHead"></thead>
              <tbody id="tableBody"></tbody>
            </table>
          </div>
          <div class="pagination" id="pagination"></div>
        </div>
      </section>\n\n<section id="tab-analytics" class="tab-content">
        <div class="charts-grid">
          <div class="chart-card glass wide">
            <div class="chart-header"><h3>Call Duration Distribution</h3></div>
            <div class="chart-body"><canvas id="durationChart"></canvas></div>
          </div>
          <div class="chart-card glass">
            <div class="chart-header"><h3>Day of Week Activity</h3></div>
            <div class="chart-body"><canvas id="dowChart"></canvas></div>
          </div>
          <div class="chart-card glass">
            <div class="chart-header"><h3>Calls Per Month</h3></div>
            <div class="chart-body"><canvas id="monthlyChart"></canvas></div>
          </div>
        </div>
      </section>\n\n<section id="tab-frequency" class="tab-content">
        <div class="freq-grid">
          <div class="glass card">
            <h3 class="card-title">&#128222; Top Repeated Numbers</h3>
            <div id="freqNumbers" class="freq-list"></div>
          </div>
          <div class="glass card">
            <h3 class="card-title">&#128241; IMEI Frequency</h3>
            <div id="freqIMEI" class="freq-list"></div>
          </div>
          <div class="glass card">
            <h3 class="card-title">&#128205; Cell ID Frequency</h3>
            <div id="freqCellID" class="freq-list"></div>
          </div>
          <div class="glass card">
            <h3 class="card-title">&#128197; Day-wise Activity</h3>
            <div id="freqDays" class="freq-list"></div>
          </div>
          <div class="glass card">
            <h3 class="card-title">&#128336; Hour-wise Activity</h3>
            <div id="freqHours" class="freq-list"></div>
          </div>
        </div>
      </section>\n\n<section id="tab-common" class="tab-content">
        <div class="glass card">
          <h3 class="card-title">Common Number Detection</h3>
          <p class="card-sub">Upload multiple CDR files (targets) and find numbers that appear across all targets.</p>
          <div class="common-upload-area">
            <label class="btn-primary" for="commonFileInput">
              <input type="file" id="commonFileInput" multiple accept=".csv,.txt,.xls,.xlsx" style="display:none"/>
              Upload Target CDRs
            </label>
          </div>
          <div id="commonTargetList" class="target-list"></div>
          <button class="btn-primary" id="findCommonBtn" style="margin-top:16px;">Find Common Numbers</button>
        </div>
        <div id="commonResultsCard" class="glass card" style="display:none;">
          <h3 class="card-title">Common Numbers Found</h3>
          <div id="commonResults" class="freq-list"></div>
        </div>
      </section>\n\n<section id="tab-suspects" class="tab-content">
        <div class="glass card">
          <h3 class="card-title">&#9888; Suspect Number List</h3>
          <p class="card-sub">Upload a text file (one number per line) or paste numbers directly. The system will match against loaded CDR records.</p>
          <textarea id="suspectInput" class="input-field textarea" placeholder="Enter suspect numbers, one per line...&#10;+919876543210&#10;9876543211&#10;..."></textarea>
          <div class="card-actions">
            <label class="btn-ghost" for="suspectFile">
              <input type="file" id="suspectFile" accept=".txt,.csv" style="display:none"/>
              Upload List File
            </label>
            <button class="btn-primary" id="matchSuspectsBtn">Match Suspects</button>
          </div>
        </div>
        <div id="suspectResultsCard" class="glass card" style="display:none;">
          <h3 class="card-title">Matching CDR Records</h3>
          <div id="suspectResultsInfo" class="badge-row"></div>
          <div class="table-wrapper" id="suspectTableWrapper">
            <table id="suspectTable" class="cdr-table">
              <thead id="suspectTableHead"></thead>
              <tbody id="suspectTableBody"></tbody>
            </table>
          </div>
        </div>
      </section>\n\n<section id="tab-map" class="tab-content">
        <div class="glass card">
          <h3 class="card-title">&#128205; Cell ID Map</h3>
          <p class="card-sub">Manually enter Cell ID coordinates or paste a CSV (Cell_ID,Lat,Lon,Label) to plot on OpenStreetMap.</p>
          <div class="map-controls">
            <textarea id="cellCoordInput" class="input-field textarea" rows="5" placeholder="Paste CSV: Cell_ID,Lat,Lon,Label&#10;LOC001,28.6139,77.2090,New Delhi&#10;LOC002,19.0760,72.8777,Mumbai"></textarea>
            <button class="btn-primary" id="plotCellsBtn">Plot on Map</button>
            <button class="btn-ghost" id="clearMapBtn">Clear Map</button>
            <div class="map-auto-note">
              <span class="badge-cyan">Auto-detect</span>
              <span>If CDR has lat/lon columns, they'll be auto-plotted below.</span>
            </div>
          </div>
        </div>
        <div id="mapContainer" class="glass map-card"></div>
      </section>\n\n<section id="tab-notes" class="tab-content">
        <div class="notes-layout">
          <div class="glass card notes-sidebar">
            <h3 class="card-title">&#9999; Investigation Notes</h3>
            <button class="btn-primary" id="addNoteBtn" style="width:100%;margin-bottom:12px;">+ New Note</button>
            <div id="notesList"></div>

            <h3 class="card-title" style="margin-top:24px;">&#9873; Bookmarked Numbers</h3>
            <div id="bookmarksList" class="freq-list"></div>
          </div>
          <div class="glass card notes-main" id="noteEditor" style="display:none;">
            <div class="note-editor-header">
              <input type="text" id="noteTitle" placeholder="Note title..." class="input-field note-title-input"/>
              <div class="note-editor-actions">
                <button class="btn-primary" id="saveNoteBtn">Save</button>
                <button class="btn-ghost" id="cancelNoteBtn">Cancel</button>
                <button class="btn-danger-sm" id="deleteNoteBtn">Delete</button>
              </div>
            </div>
            <textarea id="noteContent" class="input-field textarea note-body" placeholder="Write your investigation notes here...&#10;&#10;Use this space to document findings, patterns, suspicious activity..."></textarea>
            <div class="note-meta">
              <span id="noteMeta"></span>
            </div>
          </div>
          <div class="glass card notes-main note-placeholder" id="notePlaceholder">
            <div class="placeholder-icon">&#9999;</div>
            <p>Select a note to view or create a new one.</p>
          </div>
        </div>
      </section>\n\n<section id="tab-export" class="tab-content">
        <div class="export-grid">
          <div class="glass card export-card">
            <div class="export-icon" style="color:#22c55e">&#9654;</div>
            <h3>Export to Excel</h3>
            <p>Download filtered CDR records as .xlsx file with full metadata.</p>
            <button class="btn-primary" id="exportExcelBtn">Download Excel</button>
          </div>
          <div class="glass card export-card">
            <div class="export-icon" style="color:#f59e0b">&#9654;</div>
            <h3>Export PDF Report</h3>
            <p>Generate a formatted PDF report with summary statistics and top data.</p>
            <button class="btn-primary" id="exportPdfBtn">Download PDF</button>
          </div>
          <div class="glass card export-card">
            <div class="export-icon" style="color:#00f5ff">&#9654;</div>
            <h3>Export JSON</h3>
            <p>Raw JSON export of all filtered records for custom processing.</p>
            <button class="btn-primary" id="exportJsonBtn">Download JSON</button>
          </div>
          <div class="glass card export-card">
            <div class="export-icon" style="color:#ec4899">&#9654;</div>
            <h3>Export Frequency Report</h3>
            <p>Top numbers, IMEI, Cell ID frequency tables as Excel.</p>
            <button class="btn-primary" id="exportFreqBtn">Download Freq Report</button>
          </div>
        </div>

        <div class="glass card" style="margin-top:20px;">
          <h3 class="card-title">Export Scope</h3>
          <div class="export-scope-options">
            <label class="radio-option">
              <input type="radio" name="exportScope" value="filtered" checked/> Current filtered records
            </label>
            <label class="radio-option">
              <input type="radio" name="exportScope" value="all"/> All loaded records
            </label>
          </div>
        </div>
      </section>
      </div>

      <!-- Slide-Up Bottom Sheet for 'More Options' -->
      <div class="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300" id="cdrBottomSheetOverlay"></div>
      <div class="absolute bottom-0 left-0 right-0 z-40 bg-slate-900/98 border-t border-slate-800/80 rounded-t-3xl p-5 translate-y-full transition-transform duration-300 shadow-2xl hidden" id="cdrBottomSheet">
        <div class="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-4 cursor-pointer" id="cdrSheetCloseBar"></div>
        <h3 class="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold mb-4 border-b border-slate-800 pb-2">MORE UTILITIES</h3>
        
        <div class="grid grid-cols-3 gap-3.5" id="cdrTabRowMore">
          <button class="nav-item flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-slate-800/50 bg-slate-950/40 hover:bg-slate-800/20 transition-all text-slate-400" data-tab="analytics">
            <i data-lucide="trending-up" class="h-4.5 w-4.5"></i>
            <span class="text-[8px] font-mono font-bold uppercase tracking-wider">Analytics</span>
          </button>
          <button class="nav-item flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-slate-800/50 bg-slate-950/40 hover:bg-slate-800/20 transition-all text-slate-400" data-tab="frequency">
            <i data-lucide="bar-chart-3" class="h-4.5 w-4.5"></i>
            <span class="text-[8px] font-mono font-bold uppercase tracking-wider">Frequency</span>
          </button>
          <button class="nav-item flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-slate-800/50 bg-slate-950/40 hover:bg-slate-800/20 transition-all text-slate-400" data-tab="common">
            <i data-lucide="git-merge" class="h-4.5 w-4.5"></i>
            <span class="text-[8px] font-mono font-bold uppercase tracking-wider">Common</span>
          </button>
          <button class="nav-item flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-slate-800/50 bg-slate-950/40 hover:bg-slate-800/20 transition-all text-slate-400" data-tab="suspects">
            <i data-lucide="shield-alert" class="h-4.5 w-4.5"></i>
            <span class="text-[8px] font-mono font-bold uppercase tracking-wider">Suspects</span>
          </button>
          <button class="nav-item flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-slate-800/50 bg-slate-950/40 hover:bg-slate-800/20 transition-all text-slate-400" data-tab="notes">
            <i data-lucide="file-text" class="h-4.5 w-4.5"></i>
            <span class="text-[8px] font-mono font-bold uppercase tracking-wider">Notes</span>
          </button>
          <button class="nav-item flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-slate-800/50 bg-slate-950/40 hover:bg-slate-800/20 transition-all text-slate-400" data-tab="export">
            <i data-lucide="download" class="h-4.5 w-4.5"></i>
            <span class="text-[8px] font-mono font-bold uppercase tracking-wider">Export</span>
          </button>
        </div>
      </div>

      <!-- Bottom Navigation Tab Bar (Premium Thumb Friendly Layout) -->
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-md border-t border-slate-800/50 flex items-center justify-around z-20 px-2" id="cdrTabRow">
        <button class="nav-item active flex flex-col items-center justify-center gap-1 text-slate-400 transition-all py-1 px-3" data-tab="dashboard">
          <i data-lucide="layout-dashboard" class="h-5 w-5"></i>
          <span class="text-[8px] font-mono font-bold uppercase tracking-wider">Home</span>
        </button>
        <button class="nav-item flex flex-col items-center justify-center gap-1 text-slate-400 transition-all py-1 px-3" data-tab="upload">
          <i data-lucide="upload" class="h-5 w-5"></i>
          <span class="text-[8px] font-mono font-bold uppercase tracking-wider">Upload</span>
        </button>
        <button class="nav-item flex flex-col items-center justify-center gap-1 text-slate-400 transition-all py-1 px-3" data-tab="records">
          <i data-lucide="database" class="h-5 w-5"></i>
          <span class="text-[8px] font-mono font-bold uppercase tracking-wider">Records</span>
        </button>
        <button class="nav-item flex flex-col items-center justify-center gap-1 text-slate-400 transition-all py-1 px-3" data-tab="map">
          <i data-lucide="map" class="h-5 w-5"></i>
          <span class="text-[8px] font-mono font-bold uppercase tracking-wider">Map</span>
        </button>
        <button class="flex flex-col items-center justify-center gap-1 text-slate-400 transition-all py-1 px-3" id="moreBtn">
          <i data-lucide="more-horizontal" class="h-5 w-5"></i>
          <span class="text-[8px] font-mono font-bold uppercase tracking-wider">More</span>
        </button>
      </div>

    </div>
  `;

  // 3. Register bottom sheet controls under window namespace locally bound to container elements
  const sheet = container.querySelector('#cdrBottomSheet');
  const overlay = container.querySelector('#cdrBottomSheetOverlay');
  const moreBtn = container.querySelector('#moreBtn');
  const sheetCloseBar = container.querySelector('#cdrSheetCloseBar');

  window.pmOpenBottomSheet = () => {
    if (sheet && overlay) {
      sheet.classList.remove('hidden');
      overlay.classList.remove('hidden');
      setTimeout(() => {
        sheet.style.transform = 'translateY(0)';
        overlay.style.opacity = '1';
      }, 50);
    }
  };

  window.pmCloseBottomSheet = () => {
    if (sheet && overlay) {
      sheet.style.transform = 'translateY(100%)';
      overlay.style.opacity = '0';
      setTimeout(() => {
        sheet.classList.add('hidden');
        overlay.classList.add('hidden');
      }, 300);
    }
  };

  if (moreBtn) moreBtn.onclick = (e) => { e.preventDefault(); window.pmOpenBottomSheet(); };
  if (overlay) overlay.onclick = () => window.pmCloseBottomSheet();
  if (sheetCloseBar) sheetCloseBar.onclick = () => window.pmCloseBottomSheet();

  // 4. Run Controller Logic
  function initCdrController() {
    const navItems = container.querySelectorAll('.nav-item');
    const tabContents = container.querySelectorAll('.tab-content');

    function switchTab(tabId) {
      navItems.forEach(item => {
        if (item.dataset.tab === tabId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      tabContents.forEach(tab => {
        if (tab.id === `tab-${tabId}`) {
          tab.classList.add('active');
          tab.style.display = 'block'; 
        } else {
          tab.classList.remove('active');
          tab.style.display = 'none'; 
        }
      });

      // Update Header Title inside the smartphone container
      const titleMap = {
        dashboard: 'Analytics Dashboard',
        upload: 'CDR File Upload',
        records: 'Call Records',
        analytics: 'Trend Analytics',
        frequency: 'Frequency Overview',
        common: 'Common Targets',
        suspects: 'Suspect Watchlist',
        map: 'Cellular Geo Maps',
        notes: 'Investigation Notes',
        export: 'Data Export Engine'
      };
      const titleEl = container.querySelector('#cdrAppTitle');
      if (titleEl) {
        titleEl.textContent = (titleMap[tabId] || 'CDR Analyzer Pro').toUpperCase();
      }

      // Specific Tab Init Hooks
      if (tabId === 'map') {
        setTimeout(() => MapController.plot(), 200);
      }
    }

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = item.dataset.tab;
        switchTab(tabId);
        window.pmCloseBottomSheet(); 
      });
    });

    // Dedicated local query bindings (deduplicated & scoped)
    const dropZone = container.querySelector('#dropZone');
    const fileInput = container.querySelector('#fileInput');

  // ── File Upload Events ─────────────────────────────────────────────────────
  ['dragenter', 'dragover'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    }, false);
  });

  ['dragleave', 'drop'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
    }, false);
  });

  dropZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length) handleUploadedFiles(files);
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) handleUploadedFiles(fileInput.files);
  });

  let pendingFileResults = null;

  async function handleUploadedFiles(files) {
    const progressCard = document.getElementById('uploadProgress');
    const pFileName = document.getElementById('progressFilename');
    const pFill = document.getElementById('progressFill');
    const pPercent = document.getElementById('progressPercent');

    progressCard.style.display = 'block';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      pFileName.textContent = `Parsing: ${file.name}...`;

      try {
        const result = await parseFile(file, (percent) => {
          pFill.style.width = `${percent}%`;
          pPercent.textContent = `${percent}%`;
        });

        // Add to Common datasets as well
        CommonController.addDataset(file.name, result.records);

        pendingFileResults = result;

        // Render column map options so users can review the parse parameters
        renderColumnMapper(result.headers, result.mapping);
        document.getElementById('columnMapper').style.display = 'block';
        
        toast(`Successfully read data from ${file.name}! Review mapping settings.`, 'success');
      } catch (err) {
        console.error(err);
        toast(`Critical error parsing file ${file.name}: ${err.message}`, 'error');
      }
    }

    progressCard.style.display = 'none';
  }

  // Column mapper apply action
  document.getElementById('applyMapping').addEventListener('click', () => {
    if (!pendingFileResults) return;

    const customMap = getCustomMapping();
    
    // Reparse with customized map
    const remappedRecords = pendingFileResults.records.map((r, i) => 
      normalizeRow(r._raw, customMap, i, pendingFileResults.filename)
    );

    pendingFileResults.records = dedupeRecords(remappedRecords);

    Store.addRecords(pendingFileResults);
    
    // Hide Mapper Panel
    document.getElementById('columnMapper').style.display = 'none';
    pendingFileResults = null;

    updateUI();
    toast('Data parameters merged and database indices built.', 'success');
    switchTab('dashboard');
  });

  document.getElementById('resetMapping').addEventListener('click', () => {
    document.getElementById('columnMapper').style.display = 'none';
    pendingFileResults = null;
  });

  // ── Global Actions ─────────────────────────────────────────────────────────
  container.querySelector('#clearDataBtn').addEventListener('click', () => {
    if (confirm('Erase current in-memory CDR workspace index? This cannot be undone.')) {
      Store.clear();
      CommonController.datasets = [];
      CommonController.renderTargets();
      document.getElementById('columnMapper').style.display = 'none';
      document.getElementById('fileList').style.display = 'none';
      document.getElementById('commonResultsCard').style.display = 'none';
      document.getElementById('suspectResultsCard').style.display = 'none';
      updateUI();
      toast('Workspace reset successful.', 'info');
      switchTab('upload');
    }
  });

  // Search filter options
  container.querySelector('#applyFilters').addEventListener('click', () => {
    const filters = {
      number: document.getElementById('filterNumber').value,
      dateFrom: document.getElementById('filterDateFrom').value,
      dateTo: document.getElementById('filterDateTo').value,
      callType: document.getElementById('filterCallType').value,
      durMin: document.getElementById('filterDurMin').value,
      durMax: document.getElementById('filterDurMax').value,
      imei: document.getElementById('filterIMEI').value,
      cellId: document.getElementById('filterCellID').value,
    };
    
    Store.filteredRecords = filterRecords(Store.records, filters);
    TableController.currentPage = 1;
    TableController.render();
    
    toast(`Filters updated. Showing ${Store.filteredRecords.length} records.`, 'info');
  });

  container.querySelector('#clearFilters').addEventListener('click', () => {
    document.getElementById('filterNumber').value = '';
    document.getElementById('filterDateFrom').value = '';
    document.getElementById('filterDateTo').value = '';
    document.getElementById('filterCallType').value = '';
    document.getElementById('filterDurMin').value = '';
    document.getElementById('filterDurMax').value = '';
    document.getElementById('filterIMEI').value = '';
    document.getElementById('filterCellID').value = '';

    Store.filteredRecords = [...Store.records];
    TableController.currentPage = 1;
    TableController.render();
  });

  // Global instantaneous text filter
  container.querySelector('#globalSearch').addEventListener('input', (e) => {
    const q = e.target.value.trim();
    Store.filteredRecords = filterRecords(Store.records, { search: q });
    TableController.currentPage = 1;
    TableController.render();
  });

  // Multi select rows delete option
  container.querySelector('#selectAllBtn').addEventListener('click', () => {
    const pag = Store.filteredRecords.slice((TableController.currentPage - 1) * TableController.pageSize, TableController.currentPage * TableController.pageSize);
    const cbAll = document.getElementById('thSelectAll');
    
    const allChecked = pag.every(r => TableController.selectedIds.has(r._id));
    if (allChecked) {
      pag.forEach(r => TableController.selectedIds.delete(r._id));
      if (cbAll) cbAll.checked = false;
    } else {
      pag.forEach(r => TableController.selectedIds.add(r._id));
      if (cbAll) cbAll.checked = true;
    }
    TableController.render();
  });

  container.querySelector('#deleteSelectedBtn').addEventListener('click', () => {
    if (TableController.selectedIds.size === 0) {
      toast('No rows selected.', 'warn');
      return;
    }
    if (confirm(`Remove ${TableController.selectedIds.size} checked records permanently?`)) {
      Store.records = Store.records.filter(r => !TableController.selectedIds.has(r._id));
      TableController.selectedIds.clear();
      Store.recompute();
      updateUI();
      toast('Selected logs removed.', 'success');
    }
  });

  // Suspects match trigger
  container.querySelector('#matchSuspectsBtn').addEventListener('click', () => {
    SuspectsController.match();
  });

  // Common target cross matching
  container.querySelector('#findCommonBtn').addEventListener('click', () => {
    CommonController.findCommon();
  });

  // Common target CDR direct file loading
  container.querySelector('#commonFileInput').addEventListener('change', async (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const result = await parseFile(file);
        CommonController.addDataset(file.name, result.records);
        toast(`Successfully loaded Target: ${file.name}`, 'success');
      } catch (err) {
        toast(`Failed loading target data: ${err.message}`, 'error');
      }
    }
  });

  // Map Controls
  container.querySelector('#plotCellsBtn').addEventListener('click', () => {
    MapController.plot();
    toast('Plotting data onto OSM matrix.', 'success');
  });

  container.querySelector('#clearMapBtn').addEventListener('click', () => {
    MapController.clear();
    toast('Map pins cleared.', 'info');
  });

  // Notes actions
  container.querySelector('#addNoteBtn').addEventListener('click', () => NotesController.addNote());
  container.querySelector('#saveNoteBtn').addEventListener('click', () => NotesController.saveActiveNote());
  container.querySelector('#deleteNoteBtn').addEventListener('click', () => NotesController.deleteActiveNote());
  container.querySelector('#cancelNoteBtn').addEventListener('click', () => {
    document.getElementById('noteEditor').style.display = 'none';
    document.getElementById('notePlaceholder').style.display = 'flex';
    NotesController.activeNoteId = null;
    NotesController.renderList();
  });

  // Export Events
  container.querySelector('#exportExcelBtn').addEventListener('click', () => ExportController.exportExcel());
  container.querySelector('#exportJsonBtn').addEventListener('click', () => ExportController.exportJSON());
  container.querySelector('#exportFreqBtn').addEventListener('click', () => ExportController.exportFreqReport());
  container.querySelector('#exportPdfBtn').addEventListener('click', () => ExportController.exportPDF());

  // ── UI Updates ─────────────────────────────────────────────────────────────
  function updateUI() {
    const activeData = Store.records.length > 0;
    
    // Top Bar Badge
    document.getElementById('recordCount').textContent = activeData 
      ? `${fmt(Store.records.length)} logs indexed` 
      : 'No data loaded';

    // File list card on Upload Tab
    const fCard = document.getElementById('fileList');
    const fItems = document.getElementById('fileListItems');
    if (activeData) {
      fCard.style.display = 'block';
      fItems.innerHTML = Store.files.map(f => `
        <div class="file-item">
          <div class="file-item-info">
            <span class="file-item-name">${esc(f.name)}</span>
            <span class="file-item-meta">${fmt(f.count)} unique records (removed ${fmt(f.dupes)} duplicates)</span>
          </div>
        </div>
      `).join('');
    } else {
      fCard.style.display = 'none';
    }

    if (Store.analytics) {
      updateKPIs(Store.analytics);
      renderAllCharts(Store.analytics);
      renderFrequencyLists(Store.analytics);
    } else {
      // Clear KPIs
      ['total', 'incoming', 'outgoing', 'duration', 'unique', 'cells'].forEach(id => {
        document.getElementById(`kpi-${id}`).textContent = '0';
      });
      const sub = document.getElementById('kpi-total-sub');
      if (sub) sub.textContent = '—';
    }

    TableController.render();
  }

  function renderFrequencyLists(stats) {
    // 1. Numbers
    const freqNum = document.getElementById('freqNumbers');
    const maxNum = stats.topNumbers[0] ? stats.topNumbers[0][1] : 1;
    freqNum.innerHTML = stats.topNumbers.map(([num, count]) => {
      const isBookmarked = Store.bookmarks.has(num);
      return `
        <div class="freq-item">
          <span class="freq-item-label">${esc(num)} ${isBookmarked ? '<span style="color:var(--accent-amber)">★</span>' : ''}</span>
          <div class="freq-item-value">
            <div class="freq-bar" style="width:${(count/maxNum)*100}px"></div>
            <span class="freq-count">${count}</span>
          </div>
        </div>
      `;
    }).join('');

    // 2. IMEI
    const freqIMEI = document.getElementById('freqIMEI');
    if (stats.topIMEI.length > 0) {
      const maxIMEI = stats.topIMEI[0] ? stats.topIMEI[0][1] : 1;
      freqIMEI.innerHTML = stats.topIMEI.map(([imei, count]) => `
        <div class="freq-item">
          <span class="freq-item-label">${esc(imei)}</span>
          <div class="freq-item-value">
            <div class="freq-bar" style="width:${(count/maxIMEI)*100}px"></div>
            <span class="freq-count">${count}</span>
          </div>
        </div>
      `).join('');
    } else {
      freqIMEI.innerHTML = `<div style="color:var(--text-muted);font-size:0.8rem;text-align:center;padding:16px;">No IMEI codes present in CDR.</div>`;
    }

    // 3. Cell ID
    const freqCells = document.getElementById('freqCellID');
    if (stats.topCells.length > 0) {
      const maxCell = stats.topCells[0] ? stats.topCells[0][1] : 1;
      freqCells.innerHTML = stats.topCells.map(([cell, count]) => `
        <div class="freq-item">
          <span class="freq-item-label">${esc(cell)}</span>
          <div class="freq-item-value">
            <div class="freq-bar" style="width:${(count/maxCell)*100}px"></div>
            <span class="freq-count">${count}</span>
          </div>
        </div>
      `).join('');
    } else {
      freqCells.innerHTML = `<div style="color:var(--text-muted);font-size:0.8rem;text-align:center;padding:16px;">No Cell ID columns identified.</div>`;
    }

    // 4. Days
    const freqDays = document.getElementById('freqDays');
    const dayMap = topN(groupBy(Store.records.filter(r => r.date), 'date_raw'), 15);
    if (dayMap.length > 0) {
      const maxDays = dayMap[0] ? dayMap[0][1] : 1;
      freqDays.innerHTML = dayMap.map(([d, count]) => `
        <div class="freq-item">
          <span class="freq-item-label">${esc(d.split(' ')[0])}</span>
          <div class="freq-item-value">
            <div class="freq-bar" style="width:${(count/maxDays)*100}px"></div>
            <span class="freq-count">${count}</span>
          </div>
        </div>
      `).join('');
    } else {
      freqDays.innerHTML = `<div style="color:var(--text-muted);font-size:0.8rem;text-align:center;padding:16px;">No timestamp information.</div>`;
    }

    // 5. Hours
    const freqHours = document.getElementById('freqHours');
    const hrMap = topN(stats.hourly.reduce((acc, c, idx) => { acc[`${String(idx).padStart(2,'0')}:00`] = c; return acc; }, {}), 15);
    const maxHr = hrMap[0] ? hrMap[0][1] : 1;
    freqHours.innerHTML = hrMap.map(([hr, count]) => `
      <div class="freq-item">
        <span class="freq-item-label">${esc(hr)}</span>
        <div class="freq-item-value">
          <div class="freq-bar" style="width:${(count/maxHr)*100}px"></div>
          <span class="freq-count">${count}</span>
        </div>
      </div>
    `).join('');
  }

  // ── Init Sub-systems ───────────────────────────────────────────────────────
  NotesController.init();
  SuspectsController.init();
  
  // Hide Loading Screen
  setTimeout(() => {
    const loader = document.getElementById('loadingScreen');
    if (loader) loader.style.transition = 'opacity 0.4s ease';
    if (loader) loader.style.opacity = '0';
    setTimeout(() => {
      if (loader) loader.style.display = 'none';
      document.getElementById('app').style.display = 'flex';
      updateUI();
    }, 400);
  }, 1200);


  }

  // Bind and run
  initCdrController();
  lucide.createIcons();
}
