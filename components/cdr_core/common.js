/**
 * common.js — Multi-file cross reference matching dashboard
 */

const CommonController = {
  datasets: [], // Array of {name, records}
  
  addDataset(filename, records) {
    this.datasets.push({ name: filename, records });
    this.renderTargets();
  },

  renderTargets() {
    const list = document.getElementById('commonTargetList');
    if (!list) return;

    if (this.datasets.length === 0) {
      list.innerHTML = `<div style="color:var(--text-muted);font-size:0.85rem;">No target CDR files loaded for cross-referencing yet.</div>`;
      return;
    }

    list.innerHTML = this.datasets.map((ds, idx) => `
      <div class="target-item">
        <span class="target-item-name">${esc(ds.name)}</span>
        <div class="target-item-value">
          <span class="target-item-count">${ds.records.length} logs</span>
          <button class="btn-remove remove-target-btn" data-index="${idx}">✕</button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.remove-target-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        this.datasets.splice(idx, 1);
        this.renderTargets();
      });
    });
  },

  findCommon() {
    if (this.datasets.length < 2) {
      toast('Upload at least 2 distinct target CDRs to perform cross matching.', 'warn');
      return;
    }

    const common = findCommonNumbers(this.datasets.map(d => d.records));
    const card = document.getElementById('commonResultsCard');
    const container = document.getElementById('commonResults');

    card.style.display = 'block';

    if (common.length === 0) {
      container.innerHTML = `<div style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:24px;">No common numbers identified between target groups.</div>`;
      return;
    }

    container.innerHTML = common.map(item => {
      const isBookmarked = Store.bookmarks.has(item.number);
      const totalHits = item.counts.reduce((a,b)=>a+b, 0);
      return `
        <div class="freq-item">
          <span class="freq-item-label">${esc(item.number)} ${isBookmarked ? '<span style="color:var(--accent-amber)">★</span>' : ''}</span>
          <div class="freq-item-value">
            ${item.counts.map((c, i) => `<span class="badge-cyan" style="font-size:0.65rem;" title="${esc(this.datasets[i].name)}">${c} hits</span>`).join('')}
            <span class="freq-count">Total: ${totalHits}</span>
          </div>
        </div>
      `;
    }).join('');

    toast(`Cross reference complete: Found ${common.length} overlapping contacts!`, 'success');
  }
};
