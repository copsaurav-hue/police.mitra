/**
 * store.js — Global application state
 */

const Store = {
  records: [],          // All normalized CDR records
  filteredRecords: [],  // Current filtered view
  headers: [],          // Original column headers
  mapping: {},          // Field → column mapping
  files: [],            // File metadata [{name, size, count, dupes}]
  analytics: null,      // Computed analytics object
  bookmarks: new Set(), // Bookmarked phone numbers
  suspectSet: new Set(),// Suspect numbers

  // Persist bookmarks to localStorage
  loadBookmarks() {
    try {
      const b = JSON.parse(localStorage.getItem('cdr_bookmarks') || '[]');
      this.bookmarks = new Set(b);
    } catch { this.bookmarks = new Set(); }
  },
  saveBookmarks() {
    localStorage.setItem('cdr_bookmarks', JSON.stringify([...this.bookmarks]));
  },
  toggleBookmark(num) {
    if (this.bookmarks.has(num)) this.bookmarks.delete(num);
    else this.bookmarks.add(num);
    this.saveBookmarks();
  },

  // Add records from a new file parse result
  addRecords(parseResult) {
    const { records, headers, mapping, filename, dupes, total } = parseResult;
    this.records.push(...records);
    this.headers = headers;
    this.mapping = mapping;
    this.files.push({ name: filename, count: total, dupes });
    this.filteredRecords = [...this.records];
    this.analytics = computeAnalytics(this.records);
  },

  // Recompute everything after data change
  recompute() {
    this.analytics = computeAnalytics(this.records);
    this.filteredRecords = [...this.records];
  },

  // Clear all data
  clear() {
    this.records = [];
    this.filteredRecords = [];
    this.headers = [];
    this.mapping = {};
    this.files = [];
    this.analytics = null;
    this.suspectSet = new Set();
  },
};

// Initialize bookmarks from storage
Store.loadBookmarks();
