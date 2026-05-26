/**
 * notes.js — Investigation notebooks & suspicious bookmark persistence
 */

const NotesController = {
  notes: {}, // id -> {title, content, updated}
  activeNoteId: null,

  init() {
    try {
      this.notes = JSON.parse(localStorage.getItem('cdr_investigation_notes') || '{}');
    } catch {
      this.notes = {};
    }
    this.renderList();
    this.renderBookmarks();
  },

  saveAll() {
    localStorage.setItem('cdr_investigation_notes', JSON.stringify(this.notes));
  },

  renderList() {
    const list = document.getElementById('notesList');
    if (!list) return;

    const entries = Object.entries(this.notes).sort((a,b) => b[1].updated - a[1].updated);

    if (entries.length === 0) {
      list.innerHTML = `<div style="color:var(--text-muted);font-size:0.8rem;text-align:center;padding:12px;">No active notes. Click "+ New Note" to begin.</div>`;
      return;
    }

    list.innerHTML = entries.map(([id, note]) => `
      <div class="note-item ${this.activeNoteId === id ? 'active' : ''}" data-id="${id}">
        <div class="note-item-title">${esc(note.title || 'Untitled note')}</div>
        <div class="note-item-date">${new Date(note.updated).toLocaleString('en-IN', {hour12:false})}</div>
      </div>
    `).join('');

    list.querySelectorAll('.note-item').forEach(item => {
      item.addEventListener('click', () => {
        this.selectNote(item.dataset.id);
      });
    });
  },

  renderBookmarks() {
    const list = document.getElementById('bookmarksList');
    if (!list) return;

    if (Store.bookmarks.size === 0) {
      list.innerHTML = `<div style="color:var(--text-muted);font-size:0.8rem;text-align:center;padding:8px;">No flagged suspect bookmarks.</div>`;
      return;
    }

    list.innerHTML = [...Store.bookmarks].map(num => `
      <div class="freq-item">
        <span class="freq-item-label">${esc(num)}</span>
        <button class="btn-remove remove-bookmark-btn" data-number="${num}">✕</button>
      </div>
    `).join('');

    list.querySelectorAll('.remove-bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const num = btn.dataset.number;
        Store.toggleBookmark(num);
        this.renderBookmarks();
        if (typeof TableController !== 'undefined') TableController.render();
      });
    });
  },

  addNote() {
    const id = uid();
    this.notes[id] = {
      title: 'New Investigation Note',
      content: '',
      updated: Date.now()
    };
    this.saveAll();
    this.renderList();
    this.selectNote(id);
  },

  selectNote(id) {
    this.activeNoteId = id;
    const note = this.notes[id];
    
    document.getElementById('notePlaceholder').style.display = 'none';
    const editor = document.getElementById('noteEditor');
    editor.style.display = 'block';

    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content;
    document.getElementById('noteMeta').textContent = `Last modified: ${new Date(note.updated).toLocaleString()}`;
    
    this.renderList();
  },

  saveActiveNote() {
    if (!this.activeNoteId) return;
    const note = this.notes[this.activeNoteId];
    note.title = document.getElementById('noteTitle').value.trim() || 'Untitled Note';
    note.content = document.getElementById('noteContent').value;
    note.updated = Date.now();

    this.saveAll();
    this.renderList();
    toast('Investigation note saved', 'success');
  },

  deleteActiveNote() {
    if (!this.activeNoteId) return;
    if (confirm('Delete this investigation note permanently?')) {
      delete this.notes[this.activeNoteId];
      this.activeNoteId = null;
      this.saveAll();
      this.renderList();

      document.getElementById('noteEditor').style.display = 'none';
      document.getElementById('notePlaceholder').style.display = 'flex';
      toast('Note deleted', 'info');
    }
  }
};
