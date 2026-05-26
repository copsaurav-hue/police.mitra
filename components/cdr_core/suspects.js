/**
 * suspects.js — External Target suspect registry matching & filtering
 */

const SuspectsController = {
  list: [],

  init() {
    // Load from local storage
    try {
      this.list = JSON.parse(localStorage.getItem('cdr_suspect_list') || '[]');
      document.getElementById('suspectInput').value = this.list.join('\n');
    } catch {
      this.list = [];
    }
  },

  match() {
    const input = document.getElementById('suspectInput').value.trim();
    this.list = input.split('\n').map(n => n.trim()).filter(Boolean);
    
    // Save state
    localStorage.setItem('cdr_suspect_list', JSON.stringify(this.list));

    if (this.list.length === 0) {
      toast('Suspect list is empty. Enter some numbers to run matching.', 'warn');
      return;
    }

    const { matches, suspectSet } = matchSuspects(Store.records, this.list);
    Store.suspectSet = suspectSet;

    // Trigger UI updates
    const resultsCard = document.getElementById('suspectResultsCard');
    resultsCard.style.display = 'block';

    const info = document.getElementById('suspectResultsInfo');
    info.innerHTML = `
      <span class="badge badge-danger">Identified Matches: ${matches.length} call records</span>
      <span class="badge badge-green">Target Suspect Pool: ${suspectSet.size} numbers</span>
    `;

    this.renderSuspectTable(matches);
    
    // Highlight items in the main records table too
    if (typeof TableController !== 'undefined') TableController.render();
    
    toast(`Matching complete: Found ${matches.length} suspect call hits!`, 'info');
  },

  renderSuspectTable(records) {
    const head = document.getElementById('suspectTableHead');
    const body = document.getElementById('suspectTableBody');

    if (records.length === 0) {
      body.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-muted);">No CDR logs match your current suspect list pool.</td></tr>`;
      return;
    }

    head.innerHTML = `
      <tr>
        <th>#</th>
        <th>Suspect Number</th>
        <th>Date & Time</th>
        <th>Call Type</th>
        <th>Duration</th>
        <th>IMEI</th>
        <th>Cell ID</th>
      </tr>
    `;

    body.innerHTML = records.map((r, idx) => `
      <tr>
        <td class="row-num">${idx + 1}</td>
        <td style="color:#ef4444">${esc(r.number)}</td>
        <td>${esc(r.date_str)}</td>
        <td>${callTypeBadge(r.call_type)}</td>
        <td>${fmtDur(r.duration)}</td>
        <td>${esc(r.imei || '—')}</td>
        <td>${esc(r.cell_id || '—')}</td>
      </tr>
    `).join('');
  }
};
