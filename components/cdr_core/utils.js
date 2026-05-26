/**
 * utils.js — Shared utility functions for CDR Analyzer Pro
 */

// ── Toast notifications ──────────────────────────────────────────────────────
function toast(msg, type = 'info', duration = 3500) {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  const icons = { success:'✓', error:'✕', info:'ℹ', warn:'⚠' };
  t.innerHTML = `<span>${icons[type]||'ℹ'}</span><span>${msg}</span><button class="toast-dismiss" onclick="this.parentElement.remove()">×</button>`;
  c.appendChild(t);
  setTimeout(() => t.style.opacity='0', duration - 300);
  setTimeout(() => t.remove(), duration);
}

// ── Format numbers ────────────────────────────────────────────────────────────
function fmt(n) { return n?.toLocaleString() ?? '0'; }
function fmtDur(sec) {
  if (!sec && sec !== 0) return '—';
  const s = Number(sec);
  if (isNaN(s)) return String(sec);
  const m = Math.floor(s / 60), ss = s % 60;
  return m > 0 ? `${m}m ${ss}s` : `${ss}s`;
}
function fmtBytes(b) {
  if (b < 1024) return `${b} B`;
  if (b < 1024*1024) return `${(b/1024).toFixed(1)} KB`;
  return `${(b/1024/1024).toFixed(1)} MB`;
}

// ── Date utilities ─────────────────────────────────────────────────────────────
function parseDate(val) {
  if (!val) return null;
  if (val instanceof Date) return val;
  // Try common formats
  const s = String(val).trim();
  // ISO
  let d = new Date(s);
  if (!isNaN(d)) return d;
  // DD/MM/YYYY HH:mm:ss
  const m1 = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})(?:[T\s](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
  if (m1) {
    const [,dd,mm,yyyy,hh='0',mi='0',ss='0'] = m1;
    const yr = yyyy.length===2 ? '20'+yyyy : yyyy;
    d = new Date(+yr, +mm-1, +dd, +hh, +mi, +ss);
    if (!isNaN(d)) return d;
  }
  // YYYY/MM/DD
  const m2 = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
  if (m2) {
    d = new Date(+m2[1], +m2[2]-1, +m2[3]);
    if (!isNaN(d)) return d;
  }
  // Excel serial
  if (/^\d+(\.\d+)?$/.test(s)) {
    const n = parseFloat(s);
    if (n > 40000 && n < 70000) {
      const epoch = new Date(Date.UTC(1899,11,30));
      d = new Date(epoch.getTime() + n * 86400000);
      if (!isNaN(d)) return d;
    }
  }
  return null;
}

function formatDate(d) {
  if (!d) return '';
  return d.toISOString().split('T')[0];
}

function formatDateTime(d) {
  if (!d) return '';
  return d.toLocaleString('en-IN', { hour12: false });
}

// ── Normalize phone numbers ───────────────────────────────────────────────────
function normalizePhone(num) {
  if (!num) return '';
  let s = String(num).replace(/[\s\-\(\)\.]/g, '');
  // Remove country code +91 / 0091 / 91 for 10-digit
  if (s.startsWith('+91') && s.length === 13) s = s.slice(3);
  if (s.startsWith('0091') && s.length === 14) s = s.slice(4);
  if (s.startsWith('91') && s.length === 12) s = s.slice(2);
  if (s.startsWith('0') && s.length === 11) s = s.slice(1);
  return s;
}

// ── Detect call type ──────────────────────────────────────────────────────────
function normalizeCallType(val) {
  if (!val) return 'unknown';
  const v = String(val).toLowerCase().trim();
  if (v.includes('in') || v === 'mo_mt' || v === 'mt' || v === 'received') return 'incoming';
  if (v.includes('out') || v === 'mo_mo' || v === 'mo' || v === 'dialed') return 'outgoing';
  if (v.includes('miss') || v === 'no_answer') return 'missed';
  if (v.includes('sms') || v.includes('text') || v.includes('message')) return 'sms';
  return v;
}

// ── Download helper ──────────────────────────────────────────────────────────
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadText(text, filename, mime = 'text/plain') {
  downloadBlob(new Blob([text], { type: mime }), filename);
}

// ── Array utilities ───────────────────────────────────────────────────────────
function groupBy(arr, key) {
  return arr.reduce((acc, row) => {
    const k = row[key] ?? 'Unknown';
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
}

function topN(obj, n = 10) {
  return Object.entries(obj)
    .sort((a,b) => b[1] - a[1])
    .slice(0, n);
}

function dedupeRecords(records) {
  const seen = new Set();
  return records.filter(r => {
    const key = [r.number, r.date_raw, r.duration, r.call_type].join('|');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ── Color palette ─────────────────────────────────────────────────────────────
const CHART_COLORS = [
  '#00f5ff','#7c3aed','#ec4899','#22c55e','#f59e0b',
  '#06b6d4','#a78bfa','#f43f5e','#84cc16','#fb923c',
  '#38bdf8','#c084fc','#4ade80','#fbbf24','#e879f9',
];

function callTypeBadge(type) {
  const map = {
    incoming: 'badge-call-in',
    outgoing: 'badge-call-out',
    missed:   'badge-call-miss',
    sms:      'badge-call-sms',
  };
  const cls = map[type] || 'badge-call-def';
  return `<span class="${cls}">${type || 'unknown'}</span>`;
}

// ── Escape HTML ───────────────────────────────────────────────────────────────
function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Update KPI counter with animation ────────────────────────────────────────
function animateCounter(el, target) {
  if (!el) return;
  const start = 0, dur = 800;
  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / dur, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── Generate unique ID ────────────────────────────────────────────────────────
function uid() { return Math.random().toString(36).slice(2); }
