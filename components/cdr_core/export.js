/**
 * export.js — Local file generation: Excel reports (SheetJS) and formatted PDF summaries (jsPDF)
 */

const ExportController = {
  getScopeRecords() {
    const scope = document.querySelector('input[name="exportScope"]:checked').value;
    return scope === 'all' ? Store.records : Store.filteredRecords;
  },

  exportExcel() {
    const data = this.getScopeRecords();
    if (data.length === 0) {
      toast('No data available to export.', 'error');
      return;
    }

    // Map to clean export structure
    const cleanRows = data.map((r, idx) => ({
      'S.No': idx + 1,
      'Phone Number': r.number,
      'Date & Time': r.date_str,
      'Type': r.call_type,
      'Duration (sec)': r.duration,
      'IMEI': r.imei,
      'Cell ID': r.cell_id,
      'Latitude': r.lat,
      'Longitude': r.lon,
      'Source File': r._source
    }));

    const ws = XLSX.utils.json_to_sheet(cleanRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'CDR Records');
    
    // Auto column widths
    const maxLens = {};
    cleanRows.forEach(row => {
      Object.entries(row).forEach(([k, v]) => {
        const valStr = String(v || '');
        maxLens[k] = Math.max(maxLens[k] || k.length, valStr.length);
      });
    });
    ws['!cols'] = Object.keys(maxLens).map(k => ({ wch: maxLens[k] + 2 }));

    XLSX.writeFile(wb, `CDR_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast('Excel sheet exported successfully', 'success');
  },

  exportJSON() {
    const data = this.getScopeRecords();
    if (data.length === 0) {
      toast('No data available to export.', 'error');
      return;
    }
    const txt = JSON.stringify(data, null, 2);
    downloadText(txt, `CDR_Export_${new Date().toISOString().split('T')[0]}.json`, 'application/json');
    toast('JSON data downloaded', 'success');
  },

  exportFreqReport() {
    if (!Store.analytics) {
      toast('No analysis data loaded.', 'error');
      return;
    }

    const wb = XLSX.utils.book_new();

    // Sheet 1: Numbers
    const numRows = Store.analytics.topNumbers.map(([num, count]) => ({
      'Phone Number': num,
      'Call Count': count
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(numRows), 'Top Numbers');

    // Sheet 2: IMEI
    const imeiRows = Store.analytics.topIMEI.map(([imei, count]) => ({
      'IMEI Code': imei,
      'Usage Count': count
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(imeiRows), 'Top IMEI');

    // Sheet 3: Cells
    const cellRows = Store.analytics.topCells.map(([cell, count]) => ({
      'Cell Tower ID': cell,
      'Hit Count': count
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(cellRows), 'Top Cell IDs');

    XLSX.writeFile(wb, `CDR_Frequency_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast('Frequency worksheets exported', 'success');
  },

  async exportPDF() {
    const data = this.getScopeRecords();
    if (data.length === 0) {
      toast('No data loaded to export in PDF report.', 'error');
      return;
    }

    let jsPDFClass = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;
    if (!jsPDFClass) {
      toast('jsPDF library failed to load. Please verify internet connection.', 'error');
      return;
    }
    const doc = new jsPDFClass();
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    const stats = Store.analytics;

    // --- PAGE 1: TITLE & EXECUTIVE SUMMARY ---
    // Top banner
    doc.setFillColor(5, 10, 20);
    doc.rect(0, 0, width, 45, 'F');
    
    doc.setTextColor(0, 245, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('CDR ANALYZER PRO', 14, 20);
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    doc.text('Comprehensive Call Detail Record Investigation Report', 14, 28);
    
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text(`Report Generated: ${new Date().toLocaleString()}`, 14, 38);
    doc.text(`Total Logs Evaluated: ${data.length}`, width - 70, 38);

    let y = 60;
    doc.setFontSize(16);
    doc.setTextColor(5, 10, 20);
    doc.setFont('Helvetica', 'bold');
    doc.text('1. Executive Investigation Summary', 14, y);
    y += 8;

    // Summary details table/blocks
    const summaryData = [
      ['Metric', 'Value', 'Metric', 'Value'],
      ['Total Calls Indexed', stats ? fmt(stats.total) : data.length, 'Incoming Call Count', stats ? fmt(stats.incoming) : 'N/A'],
      ['Outgoing Call Count', stats ? fmt(stats.outgoing) : 'N/A', 'Average Call Duration', stats ? fmtDur(stats.avgDur) : 'N/A'],
      ['Total Cumulative Duration', stats ? fmtDur(stats.totalDur) : 'N/A', 'Unique Contacts Dialed', stats ? fmt(stats.uniqueNumbers) : 'N/A'],
      ['Most Active Day of Log', stats ? stats.mostActiveDay : 'N/A', 'Unique IMEI Handsets Used', stats ? fmt(stats.uniqueIMEI) : 'N/A'],
      ['Unique Cell ID Tower Hits', stats ? fmt(stats.uniqueCells) : 'N/A', 'Flagged Suspect Matches', fmt(Store.bookmarks.size), 'N/A']
    ];

    doc.autoTable({
      startY: y,
      body: summaryData,
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [5, 10, 20], textColor: [255, 255, 255] },
      columnStyles: {
        0: { fontStyle: 'bold', fillColor: [240, 243, 246], width: 50 },
        1: { width: 45 },
        2: { fontStyle: 'bold', fillColor: [240, 243, 246], width: 50 },
        3: { width: 45 }
      }
    });

    y = doc.lastAutoTable.finalY + 15;

    // --- TOP CONTACTS SECTION ---
    doc.setFontSize(14);
    doc.setTextColor(5, 10, 20);
    doc.text('2. Top Intercepted Contacts (Frequency)', 14, y);
    y += 6;

    const topNumbersRows = (stats?.topNumbers || []).slice(0, 10).map((item, idx) => [
      idx + 1,
      item[0],
      item[1],
      Store.bookmarks.has(item[0]) ? 'FLAGGED SUSPECT' : 'Verified'
    ]);

    doc.autoTable({
      startY: y,
      head: [['Rank', 'Phone Number / Target', 'Call Volume', 'Security Classification']],
      body: topNumbersRows.length ? topNumbersRows : [['-', 'No Records Mapped', '-', '-']],
      theme: 'striped',
      headStyles: { fillColor: [0, 245, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
      styles: { fontSize: 9 }
    });

    // --- PAGE 2: DETAILED ANALYSIS & BOOKMARKS ---
    doc.addPage();
    y = 20;

    doc.setFontSize(16);
    doc.setTextColor(5, 10, 20);
    doc.setFont('Helvetica', 'bold');
    doc.text('3. Cellular & Handset Diagnostics', 14, y);
    y += 10;

    // Top IMEIs and Cell IDs Side-by-Side (stacked tables)
    doc.setFontSize(12);
    doc.text('Top Active Handsets (IMEI)', 14, y);
    y += 4;
    const imeiRows = (stats?.topIMEI || []).slice(0, 5).map((item, idx) => [idx + 1, item[0], item[1]]);
    doc.autoTable({
      startY: y,
      head: [['#', 'IMEI Identifier', 'Instances Used']],
      body: imeiRows.length ? imeiRows : [['-', 'No IMEI data identified', '-']],
      theme: 'condensed',
      headStyles: { fillColor: [124, 58, 237], textColor: [255, 255, 255] },
      styles: { fontSize: 8 }
    });

    y = doc.lastAutoTable.finalY + 10;
    doc.text('Top Cellular Transceiver Towers (Cell ID)', 14, y);
    y += 4;
    const cellRows = (stats?.topCells || []).slice(0, 5).map((item, idx) => [idx + 1, item[0], item[1]]);
    doc.autoTable({
      startY: y,
      head: [['#', 'Cell Tower ID', 'Link Frequency']],
      body: cellRows.length ? cellRows : [['-', 'No Cell ID data identified', '-']],
      theme: 'condensed',
      headStyles: { fillColor: [236, 72, 153], textColor: [255, 255, 255] },
      styles: { fontSize: 8 }
    });

    y = doc.lastAutoTable.finalY + 12;
    doc.setFontSize(14);
    doc.text('4. Suspicious Target Bookmarks', 14, y);
    y += 6;

    const bList = [...Store.bookmarks];
    const bookmarkRows = bList.map((num, idx) => [
      idx + 1,
      num,
      stats?.numberFreq[num] || 0,
      'Investigation Requested'
    ]);

    doc.autoTable({
      startY: y,
      head: [['#', 'Bookmarked Number', 'Call Volume In Log', 'Investigation Status']],
      body: bookmarkRows.length ? bookmarkRows : [['-', 'No suspect targets bookmarked.', '-', '-']],
      theme: 'striped',
      headStyles: { fillColor: [245, 158, 11], textColor: [0, 0, 0] },
      styles: { fontSize: 9 }
    });

    // --- PAGE 3: FULL DETAIL LOGS ---
    doc.addPage();
    y = 20;

    doc.setFontSize(16);
    doc.setFont('Helvetica', 'bold');
    doc.text('5. Full Case Log Dump (Filtered)', 14, y);
    y += 6;

    // Export a detailed records list
    const logRows = data.slice(0, 100).map((r, idx) => [
      idx + 1,
      r.number,
      r.date_str,
      r.call_type,
      fmtDur(r.duration),
      r.imei || '—',
      r.cell_id || '—'
    ]);

    doc.autoTable({
      startY: y,
      head: [['#', 'Number', 'Date/Time', 'Type', 'Duration', 'IMEI', 'Cell ID']],
      body: logRows,
      theme: 'striped',
      headStyles: { fillColor: [5, 10, 20], textColor: [255, 255, 255] },
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { width: 8 },
        1: { width: 28 },
        2: { width: 34 },
        3: { width: 18 },
        4: { width: 22 },
        5: { width: 38 },
        6: { width: 38 }
      }
    });

    if (data.length > 100) {
      y = doc.lastAutoTable.finalY + 8;
      doc.setFont('Helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`* Note: List truncated to top 100 items. Full output has ${data.length} records. Please export to Excel for raw spreadsheet review.`, 14, y);
    }

    doc.save(`CDR_Maximum_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    toast('Comprehensive PDF Investigation Report saved.', 'success');
  }
};
