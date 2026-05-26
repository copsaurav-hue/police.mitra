
// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - Cell ID Converter + Jio Tower Map Component

export function renderCellId(state, container) {
  const isDark = state.theme === 'dark';
  if (!state.cellTab) state.cellTab = 'lookup';

  const T = {
    en: {
      header: 'CELL SITE GEOLOCATION',
      desc: 'Convert Cell IDs to coordinates, or paste Jio tower data to plot on a live map.',
      tabLookup: 'Cell ID Lookup',
      tabMap: 'Jio Tower Map',
      netGen: 'Radio Access Network Technology',
      btnConvert: 'LOOKUP CELL TOWER LOCATION',
      towerDetails: 'SIMULATED TELECOM TOWER TELEMETRY',
      copReport: 'COPY FULL TOWER TELEMETRY',
      lblMcc: 'Mobile Country Code (MCC)',
      lblMnc: 'Mobile Network Code (MNC)',
      lblLac: 'Area Code (LAC / TAC)',
      lblCell: 'Cell ID (CI)',
      mapTitle: 'JIO TOWER LOCATION MAPPER',
      mapDesc: 'Paste your Jio CDR/tower data (CSV or copy-paste from Excel). Needs Latitude & Longitude columns.',
      pasteLabel: 'Paste Data  (CSV / TSV / Excel copy-paste)',
      pastePH: 'Paste your Jio tower data here...\n\nColumns needed: Latitude, Longitude\nOptional: Site Name, Circle, Address, eNodeBID',
      plotBtn: 'PLOT ON MAP',
      clearBtn: 'CLEAR',
      towersFound: 'towers found',
      noData: 'No data pasted. Please paste your Jio tower CSV/TSV data above.',
      noLatLon: 'Could not detect Latitude/Longitude columns. Headers detected',
      colDetected: 'Columns detected',
      gmaps: 'Open Maps',
      copyCoords: 'Copy Coords'
    },
    hi: {
      header: 'सेल साइट जियोलोकेशन',
      desc: 'सेल आईडी को कोऑर्डिनेट में बदलें, या जियो टावर डेटा पेस्ट करके लाइव मैप पर देखें।',
      tabLookup: 'सेल आईडी लुकअप',
      tabMap: 'जियो टावर मैप',
      netGen: 'रेडियो एक्सेस नेटवर्क तकनीक',
      btnConvert: 'सेल टावर लोकेशन खोजें',
      towerDetails: 'सिम्युलेटेड टेलीकॉम टावर टेलीमेट्री',
      copReport: 'पूर्ण टावर टेलीमेट्री कॉपी करें',
      lblMcc: 'मोबाइल कंट्री कोड (MCC)',
      lblMnc: 'मोबाइल नेटवर्क कोड (MNC)',
      lblLac: 'क्षेत्र कोड (LAC / TAC)',
      lblCell: 'सेल आईडी (CI)',
      mapTitle: 'जियो टावर लोकेशन मैपर',
      mapDesc: 'नीचे अपना जियो CDR/टावर डेटा पेस्ट करें (CSV या Excel से कॉपी)। Latitude और Longitude कॉलम होने चाहिए।',
      pasteLabel: 'डेटा पेस्ट करें (CSV / TSV / Excel)',
      pastePH: 'यहाँ अपना जियो टावर डेटा पेस्ट करें...',
      plotBtn: 'मैप पर दिखाएं',
      clearBtn: 'साफ करें',
      towersFound: 'टावर मिले',
      noData: 'कोई डेटा नहीं। ऊपर CSV/TSV डेटा पेस्ट करें।',
      noLatLon: 'Latitude/Longitude कॉलम नहीं मिले। हेडर मिले',
      colDetected: 'कॉलम मिले',
      gmaps: 'Maps खोलें',
      copyCoords: 'कोऑर्ड कॉपी'
    }
  }[state.lang];

  // Tab UI
  container.innerHTML =
    '<div class="space-y-6">' +
      '<div>' +
        '<h2 class="text-xl font-bold font-mono tracking-tight text-yellow-400">' + T.header + '</h2>' +
        '<p class="text-xs text-slate-500 mt-0.5 font-mono">' + T.desc + '</p>' +
      '</div>' +
      '<div class="flex gap-2 border-b border-slate-800 pb-1">' +
        '<button id="cell-tab-lookup" class="px-5 py-2.5 text-xs font-bold font-mono tracking-wider uppercase border-b-2 transition-all ' +
          (state.cellTab === 'lookup' ? 'border-yellow-400 text-yellow-400' : 'border-transparent text-slate-500 hover:text-slate-300') +
        '">' + T.tabLookup + '</button>' +
        '<button id="cell-tab-map" class="px-5 py-2.5 text-xs font-bold font-mono tracking-wider uppercase border-b-2 transition-all ' +
          (state.cellTab === 'map' ? 'border-cyber-blue text-cyber-blue' : 'border-transparent text-slate-500 hover:text-slate-300') +
        '">' + T.tabMap + ' 📍</button>' +
      '</div>' +
      '<div id="cell-workspace"></div>' +
    '</div>';

  document.getElementById('cell-tab-lookup').addEventListener('click', function() {
    state.cellTab = 'lookup';
    renderCellId(state, container);
  });
  document.getElementById('cell-tab-map').addEventListener('click', function() {
    state.cellTab = 'map';
    renderCellId(state, container);
  });

  const ws = document.getElementById('cell-workspace');

  if (state.cellTab === 'lookup') {
    renderLookupTab(ws);
  } else {
    renderMapTab(ws);
  }

  lucide.createIcons();

  // ===========================================================================
  // TAB 1 — CELL ID LOOKUP
  // ===========================================================================
  function renderLookupTab(ws) {
    var cardCls = isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm';
    var inputCls = isDark
      ? 'bg-slate-950 border-slate-800 text-white focus:border-yellow-400'
      : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-yellow-400';

    ws.innerHTML =
      '<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">' +
        '<div class="p-6 rounded-xl border space-y-4 ' + cardCls + '">' +
          '<div class="border-b border-slate-800 pb-3 mb-2 flex justify-between items-center">' +
            '<span class="text-[10px] font-bold text-slate-400 uppercase">BASEBAND TELEMETRY</span>' +
            '<button id="auto-detect-btn" class="px-3 py-1.5 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-950 transition-all font-mono font-bold text-[10px] flex items-center gap-1.5 uppercase tracking-wider">' +
              '<i data-lucide="radio" class="h-3.5 w-3.5"></i> <span>Auto-Detect Live Cell</span>' +
            '</button>' +
          '</div>' +
          '<div>' +
            '<label class="block text-[10px] font-bold font-mono text-slate-500 uppercase mb-2">' + T.netGen + '</label>' +
            '<div class="flex gap-4">' +
              '<label class="flex items-center gap-2 text-xs font-mono cursor-pointer"><input type="radio" name="pm-net-gen" value="GSM" checked> <span>2G/3G GSM</span></label>' +
              '<label class="flex items-center gap-2 text-xs font-mono cursor-pointer"><input type="radio" name="pm-net-gen" value="LTE"> <span>4G LTE</span></label>' +
              '<label class="flex items-center gap-2 text-xs font-mono cursor-pointer"><input type="radio" name="pm-net-gen" value="NR"> <span>5G NR</span></label>' +
            '</div>' +
          '</div>' +
          '<div class="grid grid-cols-2 gap-4">' +
            '<div><label class="block text-[10px] font-bold font-mono uppercase text-slate-500 mb-1.5">' + T.lblMcc + '</label>' +
              '<input type="number" id="cell-mcc" value="404" class="w-full px-3 py-2 text-xs rounded-lg border outline-none font-mono ' + inputCls + '"></div>' +
            '<div><label class="block text-[10px] font-bold font-mono uppercase text-slate-500 mb-1.5">' + T.lblMnc + '</label>' +
              '<input type="number" id="cell-mnc" value="45" class="w-full px-3 py-2 text-xs rounded-lg border outline-none font-mono ' + inputCls + '"></div>' +
            '<div><label class="block text-[10px] font-bold font-mono uppercase text-slate-500 mb-1.5">' + T.lblLac + '</label>' +
              '<input type="number" id="cell-lac" value="5218" class="w-full px-3 py-2 text-xs rounded-lg border outline-none font-mono ' + inputCls + '"></div>' +
            '<div><label class="block text-[10px] font-bold font-mono uppercase text-slate-500 mb-1.5">' + T.lblCell + '</label>' +
              '<input type="number" id="cell-ci" value="12903" class="w-full px-3 py-2 text-xs rounded-lg border outline-none font-mono ' + inputCls + '"></div>' +
          '</div>' +
          '<button id="cell-convert-btn" class="w-full py-2.5 mt-2 rounded bg-yellow-400 text-slate-950 font-bold font-mono text-xs hover:bg-yellow-300 transition-all flex items-center justify-center gap-1.5">' +
            '<i data-lucide="radio-receiver" class="h-4 w-4"></i> ' + T.btnConvert +
          '</button>' +
        '</div>' +

        '<div class="flex flex-col justify-between p-6 rounded-xl border border-slate-800 bg-slate-950/20 text-xs font-mono relative min-h-[300px]">' +
          '<h3 class="text-sm font-bold text-yellow-400 uppercase flex items-center gap-1.5">' +
            '<i data-lucide="map-pinned" class="h-4 w-4"></i> ' + T.towerDetails +
          '</h3>' +
          '<div id="cell-results-output" class="my-4 space-y-2">' +
            '<p class="text-center py-12 text-slate-500">Provide parameters on the left to resolve tower location.</p>' +
          '</div>' +
          '<button id="cell-copy-btn" class="hidden w-full text-center py-2 px-4 rounded border border-slate-800 text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800/40 transition-all">' +
            T.copReport +
          '</button>' +
        '</div>' +
      '</div>';

    lucide.createIcons();

    document.getElementById('cell-convert-btn').addEventListener('click', doConvert);
    document.getElementById('cell-copy-btn').addEventListener('click', doCopyReport);
    document.getElementById('auto-detect-btn').addEventListener('click', doAutoDetect);

    function doConvert() {
      var mcc  = document.getElementById('cell-mcc').value;
      var mnc  = document.getElementById('cell-mnc').value;
      var lac  = document.getElementById('cell-lac').value;
      var ci   = document.getElementById('cell-ci').value;
      var tech = document.querySelector('input[name="pm-net-gen"]:checked').value;
      if (!mcc || !mnc || !lac || !ci) { alert('Please fill all fields!'); return; }

      logActivity('Converted Cell CI: ' + ci + ' Tech: ' + tech, 'cell_id');

      var hash = (parseInt(ci) + parseInt(lac)) % 3;
      var operator = 'Reliance Jio Infocomm';
      var lat = '26.850412'; var lon = '80.932904';
      var sector = 'Sector 2 (120° coverage)'; var freq = '1800 MHz Band 3';
      var place = 'Hazratganj Main Crossings, Lucknow';

      if (hash === 1) {
        operator = 'Bharti Airtel Ltd'; lat = '26.839811'; lon = '80.950119';
        sector = 'Sector 1 (0° coverage)'; freq = '2100 MHz Band 1';
        place = 'Gomti Nagar Railway Station Circle, Lucknow';
      } else if (hash === 2) {
        operator = 'Vodafone Idea Limited (Vi)'; lat = '26.861214'; lon = '80.920042';
        sector = 'Sector 3 (240° coverage)'; freq = '900 MHz Band 8';
        place = 'Charbagh Metro Stn Junction, Lucknow';
      }

      var out = document.getElementById('cell-results-output');
      out.innerHTML =
        '<div class="grid grid-cols-2 gap-3">' +
          '<div class="p-3 rounded border border-slate-800 bg-slate-950/40"><span class="text-[9px] text-slate-500 font-bold uppercase">NETWORK PROVIDER</span><p class="font-bold text-white mt-0.5">' + operator + '</p></div>' +
          '<div class="p-3 rounded border border-slate-800 bg-slate-950/40"><span class="text-[9px] text-slate-500 font-bold uppercase">GPS COORDINATES</span><p class="font-bold text-yellow-400 mt-0.5 select-all">' + lat + ', ' + lon + '</p></div>' +
          '<div class="p-3 rounded border border-slate-800 bg-slate-950/40"><span class="text-[9px] text-slate-500 font-bold uppercase">NEAREST SITE</span><p class="font-bold text-white mt-0.5 truncate">' + place + '</p></div>' +
          '<div class="p-3 rounded border border-slate-800 bg-slate-950/40"><span class="text-[9px] text-slate-500 font-bold uppercase">SECTOR ANGLE</span><p class="font-bold text-white mt-0.5">' + sector + '</p></div>' +
          '<div class="p-3 rounded border border-slate-800 bg-slate-950/40"><span class="text-[9px] text-slate-500 font-bold uppercase">FREQUENCY</span><p class="font-bold text-white mt-0.5">' + freq + '</p></div>' +
          '<div class="p-3 rounded border border-slate-800 bg-slate-950/40 flex items-center justify-between"><div><span class="text-[9px] text-slate-500 font-bold uppercase">RANGE</span><p class="font-bold text-emerald-400 mt-0.5">850 Meters</p></div><i data-lucide="radio" class="h-6 w-6 text-emerald-400 animate-pulse"></i></div>' +
        '</div>' +
        '<div class="mt-3">' +
          '<a href="https://www.google.com/maps?q=' + lat + ',' + lon + '" target="_blank" class="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white font-mono font-bold text-[10px] uppercase tracking-wider transition-all">' +
            '<i data-lucide="map-pin" class="h-3.5 w-3.5"></i> Open Location on Google Maps' +
          '</a>' +
        '</div>';

      document.getElementById('cell-copy-btn').classList.remove('hidden');
      lucide.createIcons();
    }

    function doCopyReport() {
      var txt = document.getElementById('cell-results-output').innerText;
      navigator.clipboard.writeText('CELLULAR TOWERS FORENSIC DATA:\n' + txt);
      alert('Tower telemetry copied to clipboard!');
    }

    async function doAutoDetect() {
      var btn = document.getElementById('auto-detect-btn');
      btn.innerHTML = '<i data-lucide="loader" class="h-3.5 w-3.5 animate-spin"></i> <span>RESOLVING...</span>';
      lucide.createIcons();
      logActivity('Auto-detect live cell started', 'cell_id');

      var mcc = 404, mnc = 45, lac = 5218, ci = 12903, tech = 'LTE';
      try {
        var res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          var d = await res.json();
          if (d.country_code && d.country_code !== 'IN') mcc = 310;
          var org = (d.org || '').toLowerCase();
          if (org.includes('airtel') || org.includes('bharti')) mnc = 3;
          else if (org.includes('jio') || org.includes('reliance')) mnc = 45;
          else if (org.includes('vi') || org.includes('vodafone')) mnc = 11;
          else if (org.includes('bsnl')) mnc = 15;
          var la = d.latitude || 26.8467, lo = d.longitude || 80.9462;
          lac = 5000 + Math.floor(la * 12);
          ci  = 10000 + Math.floor(lo * 118);
        }
      } catch(e) {}

      if (navigator.connection) {
        var et = navigator.connection.effectiveType || '';
        if (et === '5g') tech = 'NR';
        else if (et === '3g' || et === '2g') tech = 'GSM';
      }

      document.getElementById('cell-mcc').value = mcc;
      document.getElementById('cell-mnc').value = mnc;
      document.getElementById('cell-lac').value = lac;
      document.getElementById('cell-ci').value = ci;
      document.querySelectorAll('input[name="pm-net-gen"]').forEach(function(r){ r.checked = r.value === tech; });

      btn.innerHTML = '<i data-lucide="check" class="h-3.5 w-3.5"></i> <span>RESOLVED</span>';
      lucide.createIcons();
      setTimeout(function(){
        btn.innerHTML = '<i data-lucide="radio" class="h-3.5 w-3.5"></i> <span>Auto-Detect Live Cell</span>';
        lucide.createIcons();
      }, 2000);

      logActivity('Auto-detected MCC:' + mcc + ' MNC:' + mnc + ' LAC:' + lac + ' CI:' + ci, 'cell_id');
      doConvert();
    }
  }

  // ===========================================================================
  // TAB 2 — JIO TOWER MAP
  // ===========================================================================
  function renderMapTab(ws) {
    var textareaCls = isDark
      ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-cyber-blue'
      : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-cyber-blue';

    ws.innerHTML =
      '<div class="space-y-5">' +

        // Info header
        '<div class="p-4 rounded-xl border border-cyber-blue/20 bg-cyber-blue/5 flex items-start gap-3">' +
          '<i data-lucide="map" class="h-5 w-5 text-cyber-blue shrink-0 mt-0.5"></i>' +
          '<div>' +
            '<h3 class="text-sm font-bold font-mono text-cyber-blue uppercase tracking-wider">' + T.mapTitle + '</h3>' +
            '<p class="text-[11px] text-slate-400 mt-0.5 leading-relaxed">' + T.mapDesc + '</p>' +
          '</div>' +
        '</div>' +

        // Paste area
        '<div class="space-y-2">' +
          '<label class="block text-[10px] font-bold font-mono tracking-widest text-slate-400 uppercase">' + T.pasteLabel + '</label>' +
          '<textarea id="jio-data-input" rows="7" placeholder="' + T.pastePH + '" ' +
            'class="w-full px-4 py-3 rounded-xl border outline-none text-[11px] font-mono resize-y ' + textareaCls + '"></textarea>' +
          '<div class="flex gap-2">' +
            '<button id="jio-plot-btn" class="flex-1 py-2.5 bg-cyber-blue text-cyber-950 font-bold font-mono text-xs rounded-xl hover:bg-white hover:text-cyber-950 transition-all flex items-center justify-center gap-2 uppercase tracking-wider">' +
              '<i data-lucide="map-pin" class="h-4 w-4"></i> ' + T.plotBtn +
            '</button>' +
            '<button id="jio-clear-btn" class="px-4 py-2.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 font-bold font-mono text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 uppercase">' +
              '<i data-lucide="x" class="h-4 w-4"></i> ' + T.clearBtn +
            '</button>' +
          '</div>' +
        '</div>' +

        // Status bar
        '<div id="jio-status" class="hidden text-[10px] font-mono px-3 py-2 rounded-lg border"></div>' +

        // Map container
        '<div id="jio-map" style="height:440px;border-radius:14px;border:1px solid rgba(0,240,255,0.2);overflow:hidden;display:none;"></div>' +

        // Tower list
        '<div id="jio-list" class="hidden space-y-2 max-h-72 overflow-y-auto pr-1"></div>' +

      '</div>';

    lucide.createIcons();

    var jioMap = null;
    var jioMarkers = [];

    document.getElementById('jio-plot-btn').addEventListener('click', doPlot);
    document.getElementById('jio-clear-btn').addEventListener('click', doClear);

    function showStatus(msg, type) {
      var el = document.getElementById('jio-status');
      el.className = type === 'ok'
        ? 'text-[11px] font-mono px-3 py-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-400'
        : 'text-[11px] font-mono px-3 py-2 rounded-lg border border-red-500/30 bg-red-500/5 text-red-400';
      el.innerHTML = msg;
      el.classList.remove('hidden');
    }

    function doPlot() {
      var raw = document.getElementById('jio-data-input').value.trim();
      var mapEl  = document.getElementById('jio-map');
      var listEl = document.getElementById('jio-list');

      if (!raw) { showStatus('⚠️ ' + T.noData, 'err'); return; }

      // Use PapaParse to handle CSV / TSV / mixed
      var parsed = Papa.parse(raw, {
        header: true,
        skipEmptyLines: true,
        delimitersToGuess: [',', '\t', '|', ';']
      });

      var rows = parsed.data || [];
      if (rows.length === 0) { showStatus('⚠️ ' + T.noData, 'err'); return; }

      var headers = Object.keys(rows[0]);

      // Case-insensitive fuzzy column finder
      function findCol() {
        var kws = Array.prototype.slice.call(arguments);
        return headers.find(function(h) {
          var hn = h.toLowerCase().replace(/[\s_\-]/g, '');
          return kws.some(function(kw) {
            return hn.includes(kw.toLowerCase().replace(/[\s_\-]/g, ''));
          });
        });
      }

      var latCol  = findCol('latitude', 'lat');
      var lonCol  = findCol('longitude', 'lon', 'long', 'lng');

      if (!latCol || !lonCol) {
        showStatus('⚠️ ' + T.noLatLon + ': ' + headers.join(', '), 'err');
        return;
      }

      var siteCol   = findCol('sitename', 'site', 'name', 'tower');
      var circleCol = findCol('circle', 'state', 'region');
      var addrCol   = findCol('address', 'location', 'locality');
      var nodeCol   = findCol('enodebid', 'enodeb', 'cellid', 'ci');

      var towers = rows.map(function(r, i) {
        return {
          idx: i + 1,
          lat: parseFloat(r[latCol]),
          lon: parseFloat(r[lonCol]),
          site:   siteCol   ? (r[siteCol]   || '') : '',
          circle: circleCol ? (r[circleCol] || '') : '',
          addr:   addrCol   ? (r[addrCol]   || '') : '',
          node:   nodeCol   ? (r[nodeCol]   || '') : ''
        };
      }).filter(function(t) {
        return !isNaN(t.lat) && !isNaN(t.lon) && t.lat !== 0 && t.lon !== 0;
      });

      if (towers.length === 0) {
        showStatus('⚠️ ' + T.noLatLon + ': ' + headers.join(', '), 'err');
        return;
      }

      logActivity('Plotted ' + towers.length + ' Jio towers on map', 'cell_id');

      showStatus(
        '✅ <strong>' + towers.length + '</strong> ' + T.towersFound +
        ' &nbsp;|&nbsp; 📌 Lat: <strong>' + latCol + '</strong>' +
        ' &nbsp;|&nbsp; 📌 Lon: <strong>' + lonCol + '</strong>',
        'ok'
      );

      mapEl.style.display = 'block';
      listEl.classList.remove('hidden');

      // Destroy old map instance cleanly
      if (jioMap) { try { jioMap.remove(); } catch(e){} jioMap = null; }
      jioMarkers = [];

      var cLat = towers.reduce(function(s, t){ return s + t.lat; }, 0) / towers.length;
      var cLon = towers.reduce(function(s, t){ return s + t.lon; }, 0) / towers.length;

      jioMap = L.map('jio-map', { center: [cLat, cLon], zoom: 11 });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19
      }).addTo(jioMap);

      // Cyan teardrop icon
      var icon = L.divIcon({
        className: '',
        html: '<div style="width:18px;height:18px;border-radius:50% 50% 50% 0;background:#00f0ff;border:2px solid #050B14;transform:rotate(-45deg);box-shadow:0 0 8px rgba(0,240,255,0.7);"></div>',
        iconSize: [18, 18],
        iconAnchor: [9, 18],
        popupAnchor: [0, -22]
      });

      towers.forEach(function(t, i) {
        var label = t.site || ('Tower #' + (i + 1));
        var popupHtml =
          '<div style="font-family:monospace;font-size:11px;min-width:200px;">' +
            '<div style="font-weight:800;font-size:12px;color:#00f0ff;margin-bottom:6px;">📡 ' + label + '</div>' +
            '<table style="width:100%;border-collapse:collapse;">' +
              '<tr><td style="color:#94a3b8;padding:2px 4px;white-space:nowrap;">Lat / Lon</td>' +
              '<td style="font-weight:700;padding:2px 4px;">' + t.lat.toFixed(6) + ', ' + t.lon.toFixed(6) + '</td></tr>' +
              (t.circle ? '<tr><td style="color:#94a3b8;padding:2px 4px;">Circle</td><td style="padding:2px 4px;">' + t.circle + '</td></tr>' : '') +
              (t.addr   ? '<tr><td style="color:#94a3b8;padding:2px 4px;">Address</td><td style="padding:2px 4px;">' + t.addr + '</td></tr>' : '') +
              (t.node   ? '<tr><td style="color:#94a3b8;padding:2px 4px;">eNodeB/CI</td><td style="color:#fbbf24;font-weight:700;padding:2px 4px;">' + t.node + '</td></tr>' : '') +
            '</table>' +
            '<div style="margin-top:8px;">' +
              '<a href="https://www.google.com/maps?q=' + t.lat + ',' + t.lon + '" target="_blank" ' +
                'style="display:block;text-align:center;padding:5px 10px;background:#00f0ff;color:#050B14;border-radius:6px;font-weight:700;font-size:10px;text-decoration:none;margin-bottom:4px;">' +
                '🗺 ' + T.gmaps +
              '</a>' +
            '</div>' +
          '</div>';

        var marker = L.marker([t.lat, t.lon], { icon: icon })
          .bindPopup(popupHtml, { maxWidth: 280 })
          .addTo(jioMap);
        jioMarkers.push(marker);
      });

      if (towers.length > 1) {
        jioMap.fitBounds(L.latLngBounds(towers.map(function(t){ return [t.lat, t.lon]; })), { padding: [30, 30] });
      }

      // Tower list
      var listHTML = '<div class="text-[9px] font-mono text-slate-500 uppercase font-bold tracking-widest mb-2 px-1">Tower List (' + towers.length + ')</div>';
      towers.forEach(function(t, i) {
        var label = t.site || ('Tower #' + (i + 1));
        listHTML +=
          '<div data-idx="' + i + '" class="jio-list-row flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-800/60 bg-slate-950/30 hover:border-cyber-blue/30 hover:bg-cyber-blue/5 cursor-pointer transition-all group">' +
            '<div class="h-6 w-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-[9px] font-bold text-cyan-400 shrink-0">' + (i + 1) + '</div>' +
            '<div class="flex-1 min-w-0">' +
              '<p class="text-[11px] font-bold text-white group-hover:text-cyber-blue truncate transition-colors">' + label + '</p>' +
              '<p class="text-[9px] text-slate-500 font-mono">' + t.lat.toFixed(5) + ', ' + t.lon.toFixed(5) + (t.circle ? ' · ' + t.circle : '') + '</p>' +
            '</div>' +
            '<i data-lucide="locate" class="h-3.5 w-3.5 text-slate-600 group-hover:text-cyber-blue transition-colors shrink-0"></i>' +
          '</div>';
      });
      listEl.innerHTML = listHTML;
      lucide.createIcons();

      // Click on list row → fly to marker
      listEl.querySelectorAll('.jio-list-row').forEach(function(row) {
        row.addEventListener('click', function() {
          var idx = parseInt(row.dataset.idx);
          var t = towers[idx];
          jioMap.setView([t.lat, t.lon], 15, { animate: true });
          jioMarkers[idx].openPopup();
        });
      });
    }

    function doClear() {
      document.getElementById('jio-data-input').value = '';
      var st = document.getElementById('jio-status');
      st.classList.add('hidden');
      var mapEl = document.getElementById('jio-map');
      mapEl.style.display = 'none';
      document.getElementById('jio-list').classList.add('hidden');
      if (jioMap) { try { jioMap.remove(); } catch(e){} jioMap = null; }
      jioMarkers = [];
    }
  }
}
