/**
 * table.js — Paginated & sortable CDR table controller
 */

const TableController = {
  currentPage: 1,
  pageSize: 15,
  sortField: 'date',
  sortAsc: false,
  selectedIds: new Set(),

  fields: [
    { name: '_row_num', label: '#' },
    { name: 'bookmark', label: '★' },
    { name: 'number', label: 'Phone Number' },
    { name: 'date_str', label: 'Date & Time' },
    { name: 'call_type', label: 'Type' },
    { name: 'duration', label: 'Duration' },
    { name: 'imei', label: 'IMEI' },
    { name: 'cell_id', label: 'Cell ID' },
    { name: 'route', label: 'Route' }
  ],

  render() {
    const list = Store.filteredRecords;
    
    // Sort
    const sorted = [...list].sort((a, b) => {
      let valA = a[this.sortField];
      let valB = b[this.sortField];

      if (this.sortField === 'date') {
        valA = a.date ? a.date.getTime() : 0;
        valB = b.date ? b.date.getTime() : 0;
      }

      if (valA === valB) return 0;
      const compare = valA > valB ? 1 : -1;
      return this.sortAsc ? compare : -compare;
    });

    // Paginate
    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / this.pageSize));
    this.currentPage = Math.min(this.currentPage, totalPages);
    
    const start = (this.currentPage - 1) * this.pageSize;
    const end = Math.min(start + this.pageSize, total);
    const paginated = sorted.slice(start, end);

    document.getElementById('tableCount').textContent = `${total} records filtered (showing ${start + 1}-${end})`;

    this.renderHead();
    this.renderBody(paginated, start);
    this.renderPagination(totalPages);
  },

  renderHead() {
    const thead = document.getElementById('tableHead');
    if (!thead) return;

    thead.innerHTML = `
      <tr>
        <th style="width:40px"><input type="checkbox" id="thSelectAll" /></th>
        ${this.fields.map(f => {
          let arrow = '';
          if (f.name !== '_row_num' && f.name !== 'bookmark' && f.name !== 'route') {
            const isSorted = this.sortField === f.name;
            arrow = `<span class="sort-arrow ${isSorted ? (this.sortAsc ? 'asc' : 'desc') : ''}">${isSorted ? (this.sortAsc ? '▲' : '▼') : '↕'}</span>`;
          }
          return `<th data-field="${f.name}" class="${f.name !== '_row_num' && f.name !== 'bookmark' && f.name !== 'route' ? 'sortable' : ''}">${f.label} ${arrow}</th>`;
        }).join('')}
      </tr>
    `;

    thead.querySelector('#thSelectAll').addEventListener('change', (e) => {
      const checked = e.target.checked;
      const paginatedIds = Store.filteredRecords
        .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        .map(r => r._id);
        
      if (checked) {
        paginatedIds.forEach(id => this.selectedIds.add(id));
      } else {
        paginatedIds.forEach(id => this.selectedIds.delete(id));
      }
      this.render();
    });

    thead.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const field = th.dataset.field;
        if (this.sortField === field) {
          this.sortAsc = !this.sortAsc;
        } else {
          this.sortField = field;
          this.sortAsc = true;
        }
        this.render();
      });
    });
  },

  renderBody(records, startIndex) {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;

    if (records.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${this.fields.length + 1}" style="text-align:center;padding:40px;color:var(--text-secondary);">No CDR records loaded matching current filter guidelines.</td></tr>`;
      return;
    }

    tbody.innerHTML = records.map((r, i) => {
      const isSuspect = Store.suspectSet.has(r.number);
      const isBookmarked = Store.bookmarks.has(r.number);
      const isSelected = this.selectedIds.has(r._id);
      
      const trClass = [
        isSuspect ? 'suspect-match' : '',
        isBookmarked ? 'bookmarked' : ''
      ].filter(Boolean).join(' ');

      // Build Route buttons if coordinate context exists
      let routeHtml = '—';
      if (r.lat && r.lon) {
        const url = `https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lon}`;
        routeHtml = `<a href="${url}" target="_blank" class="btn-sm" style="color:var(--accent-cyan);text-decoration:none;padding:3px 6px;">🗺️ Route</a>`;
      } else if (r.cell_id && MapController.coordinateRegistry[r.cell_id]) {
        const coords = MapController.coordinateRegistry[r.cell_id];
        const url = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lon}`;
        routeHtml = `<a href="${url}" target="_blank" class="btn-sm" style="color:#7c3aed;text-decoration:none;padding:3px 6px;" title="Mapped Tower LOC">🗼 Route</a>`;
      }

      return `
        <tr class="${trClass}" data-id="${r._id}">
          <td><input type="checkbox" class="row-select" data-id="${r._id}" ${isSelected ? 'checked' : ''} /></td>
          <td class="row-num">${startIndex + i + 1}</td>
          <td>
            <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-number="${r.number}">
              ${isBookmarked ? '★' : '☆'}
            </button>
          </td>
          <td>${esc(r.number)}</td>
          <td>${esc(r.date_str)}</td>
          <td>${callTypeBadge(r.call_type)}</td>
          <td>${fmtDur(r.duration)}</td>
          <td>${esc(r.imei || '—')}</td>
          <td>${esc(r.cell_id || '—')}</td>
          <td>${routeHtml}</td>
        </tr>
      `;
    }).join('');

    // Attach cell level listeners
    tbody.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const num = btn.dataset.number;
        Store.toggleBookmark(num);
        toast(Store.bookmarks.has(num) ? `Suspicious number bookmarked: ${num}` : `Removed bookmark for: ${num}`, 'info');
        this.render();
        // Update bookmarks list in UI if visible
        if (typeof NotesController !== 'undefined') NotesController.renderBookmarks();
      });
    });

    tbody.querySelectorAll('.row-select').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = parseInt(cb.dataset.id);
        if (cb.checked) this.selectedIds.add(id);
        else this.selectedIds.delete(id);
      });
    });
  },

  renderPagination(totalPages) {
    const pag = document.getElementById('pagination');
    if (!pag) return;

    if (totalPages <= 1) {
      pag.innerHTML = '';
      return;
    }

    let html = '';
    html += `<button class="page-btn" ${this.currentPage === 1 ? 'disabled style="opacity:0.3;cursor:default;"' : ''} data-page="${this.currentPage - 1}">◀ Prev</button>`;
    
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(totalPages, this.currentPage + 2);

    if (startPage > 1) {
      html += `<button class="page-btn" data-page="1">1</button>`;
      if (startPage > 2) html += `<span style="color:var(--text-muted);padding:4px;">...</span>`;
    }

    for (let p = startPage; p <= endPage; p++) {
      html += `<button class="page-btn ${this.currentPage === p ? 'active' : ''}" data-page="${p}">${p}</button>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += `<span style="color:var(--text-muted);padding:4px;">...</span>`;
      html += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
    }

    html += `<button class="page-btn" ${this.currentPage === totalPages ? 'disabled style="opacity:0.3;cursor:default;"' : ''} data-page="${this.currentPage + 1}">Next ▶</button>`;

    pag.innerHTML = html;

    pag.querySelectorAll('.page-btn').forEach(btn => {
      if (!btn.hasAttribute('disabled')) {
        btn.addEventListener('click', () => {
          this.currentPage = parseInt(btn.dataset.page);
          this.render();
        });
      }
    });
  }
};
