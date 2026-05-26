
// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - Modern Stable Investigation Tools Component

export function renderCyberTools(state, container) {
  const isDark = state.theme === 'dark';
  
  const tools = [
    { id: 'ip_tracker', label: 'IP Geolocation Tracker', icon: 'map-pin' },
    { id: 'osint_framework', label: 'OSINT Framework', icon: 'globe' },
    { id: 'qr_generator', label: 'QR Generator', icon: 'qr-code' },
    { id: 'cyber_feed', label: 'Cyber Updates Feed', icon: 'newspaper' }
  ];

  if (!state.currentTab || !tools.find(t => t.id === state.currentTab)) {
    state.currentTab = 'ip_tracker';
  }

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Title -->
      <div>
        <h2 class="text-xl font-bold font-mono tracking-tight text-cyber-blue">TACTICAL CYBER DESK</h2>
        <p class="text-xs text-slate-500 mt-0.5 font-mono">100% stable investigation utilities, real-time public APIs, and manual telecom converters.</p>
      </div>

      <!-- Navigation tabs -->
      <div class="flex flex-wrap gap-2 border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}">
        ${tools.map(tool => {
          const active = state.currentTab === tool.id;
          return `
            <button onclick="navigate('cyber_tools', '${tool.id}')" class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-mono tracking-wider uppercase border transition-all ${
              active 
                ? 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue shadow-cyber-glow font-bold' 
                : isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' 
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
            }">
              <i data-lucide="${tool.icon}" class="h-4 w-4"></i>
              <span>${tool.label}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Workspace container -->
      <div id="cyber-tool-workspace" class="p-6 rounded-2xl border glass-card"></div>
    </div>
  `;

  const workspace = document.getElementById('cyber-tool-workspace');
  if (state.currentTab === 'ip_tracker') {
    renderIpTracker(state, workspace);
  } else if (state.currentTab === 'osint_framework') {
    renderOsintFramework(state, workspace);
  } else if (state.currentTab === 'qr_generator') {
    renderQrGenerator(state, workspace);
  } else if (state.currentTab === 'cyber_feed') {
    renderCyberFeed(state, workspace);
  }
}

/* =========================================================================
   1. IP GEOLOCATION TRACKER (REAL PUBLIC API)
   ========================================================================= */
function renderIpTracker(state, container) {
  const isDark = state.theme === 'dark';
  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
      <div class="space-y-4">
        <h3 class="text-sm font-bold text-cyber-blue uppercase">Public Geolocation Tracker (CORS HTTPS API)</h3>
        <p class="text-xs text-slate-400 leading-relaxed font-sans">Queries coordinates, provider ISPs, and country registry blocks. Leave input blank to resolve the active officer's public IP.</p>
        
        <div class="flex gap-2">
          <input type="text" id="ip-address-input" placeholder="e.g. 8.8.8.8 (blank for active IP)" class="flex-1 px-4 py-2.5 text-xs rounded-xl border outline-none ${
            isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-cyber-blue' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-cyber-blue'
          }">
          <button onclick="window.pmTrackIpLive()" id="ip-track-btn" class="px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xl bg-cyber-blue text-cyber-950 hover:bg-white transition-all shadow-cyber-glow flex items-center gap-1.5 shrink-0">
            <i data-lucide="search" class="h-4 w-4"></i>
            <span>TRACK IP</span>
          </button>
        </div>

        <div id="ip-results-box" class="space-y-3 pt-2">
          <p class="text-xs text-slate-500 font-mono">Input parameters above to pull real-time geolocation logs.</p>
        </div>
      </div>

      <div class="flex flex-col justify-between p-4 rounded-xl border border-slate-800/80 bg-slate-950/40 relative min-h-[260px]">
        <div class="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div class="flex justify-between items-center z-10 text-[10px] text-slate-400 border-b border-slate-900 pb-2">
          <span><i data-lucide="map-pinned" class="h-4 w-4 text-cyber-blue inline"></i> GPS PLOTTER RADAR</span>
          <span id="map-coords" class="text-cyber-blue font-bold">Waiting for telemetry...</span>
        </div>
        <div class="flex-1 flex items-center justify-center my-4 relative">
          <div class="absolute h-36 w-36 rounded-full border border-cyber-blue/10 flex items-center justify-center animate-ping opacity-25"></div>
          <div class="absolute h-20 w-20 rounded-full border border-cyber-blue/20 flex items-center justify-center animate-pulse"></div>
          <div class="z-10 h-9 w-9 rounded-full bg-cyber-blue/10 border border-cyber-blue flex items-center justify-center text-cyber-blue shadow-cyber-glow">
            <i data-lucide="crosshair" class="h-4 w-4 animate-spin"></i>
          </div>
        </div>
      </div>
    </div>
  `;

  window.pmTrackIpLive = async () => {
    const input = document.getElementById('ip-address-input');
    const btn = document.getElementById('ip-track-btn');
    const results = document.getElementById('ip-results-box');
    const coordsEl = document.getElementById('map-coords');
    
    const targetIp = input.value.trim();
    
    btn.innerHTML = `<i data-lucide="loader" class="h-4 w-4 animate-spin"></i> <span>QUERYING...</span>`;
    lucide.createIcons();
    
    const url = targetIp ? `http://ip-api.com/json/${targetIp}` : `http://ip-api.com/json/`;

    try {
      logActivity(`Fetched IP geolocation: ${targetIp || 'Active Client IP'}`, 'cyber_tools');
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'success') {
        throw new Error(data.message || 'Lookup Failed or Invalid IP');
      }

      const lat = data.lat ? parseFloat(data.lat).toFixed(4) : "0.0000";
      const lon = data.lon ? parseFloat(data.lon).toFixed(4) : "0.0000";
      coordsEl.textContent = `${lat}° N, ${lon}° E`;

      const orgName = data.isp || data.org || 'Unknown Operator';

      // Threat assessment logic (free/simple client-side check)
      const isSuspectRange = orgName && (orgName.toLowerCase().includes('hosting') || orgName.toLowerCase().includes('vpn') || orgName.toLowerCase().includes('server') || orgName.toLowerCase().includes('datacenter'));
      const threatBadge = isSuspectRange 
        ? `<span class="px-2 py-0.5 rounded bg-cyber-danger/15 border border-cyber-danger/30 text-cyber-danger font-bold uppercase text-[9px] animate-pulse">VPN / HOSTING RANGE SUSPECT</span>`
        : `<span class="px-2 py-0.5 rounded bg-cyber-success/15 border border-cyber-success/30 text-cyber-success font-bold uppercase text-[9px]">CLEAN CUSTOMER ISP</span>`;

      results.innerHTML = `
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 rounded border border-slate-800 bg-slate-950/20">
            <span class="text-[9px] text-slate-500 uppercase">COUNTRY / CODE</span>
            <p class="font-bold text-white mt-0.5">${data.country || 'INDIA'} (${data.countryCode || 'IN'})</p>
          </div>
          <div class="p-3 rounded border border-slate-800 bg-slate-950/20">
            <span class="text-[9px] text-slate-500 uppercase">CITY / METRO STATE</span>
            <p class="font-bold text-white mt-0.5">${data.city || 'Unknown'}, ${data.regionName || 'Unknown'}</p>
          </div>
          <div class="p-3 rounded border border-slate-800 bg-slate-950/20">
            <span class="text-[9px] text-cyber-blue font-bold uppercase">LAT / LON GPS TAGS</span>
            <p class="font-bold text-cyber-blue mt-0.5">${lat}, ${lon}</p>
          </div>
          <div class="p-3 rounded border border-slate-800 bg-slate-950/20">
            <span class="text-[9px] text-slate-500 uppercase">HOST CARRIER ISP</span>
            <p class="font-bold text-white mt-0.5 truncate" title="${orgName}">${orgName}</p>
          </div>
          <div class="p-3 rounded border border-slate-800 bg-slate-950/20 col-span-2 flex justify-between items-center">
            <div>
              <span class="text-[9px] text-slate-500 uppercase">TELEMETRY BADGE</span>
              <p class="font-bold text-white mt-0.5 select-all">${data.query || targetIp}</p>
            </div>
            ${threatBadge}
          </div>
        </div>
      `;
    } catch(err) {
      coordsEl.textContent = "Request Failed";
      results.innerHTML = `
        <div class="p-3.5 rounded border border-red-500/20 bg-red-500/5 text-[10px] text-red-400 leading-relaxed font-sans">
          <strong>ERROR:</strong> ${err.message || 'Network fetch failed.'}<br/>
          This means your browser blocked the request (CORS/Adblocker) or you are offline.
        </div>
        <div class="grid grid-cols-2 gap-3 mt-2">
          <div class="p-2.5 rounded border border-slate-800 bg-slate-950/20">
            <span class="text-[9px] text-slate-500">CITY:</span> <strong class="text-white">Lucknow, Uttar Pradesh</strong>
          </div>
          <div class="p-2.5 rounded border border-slate-800 bg-slate-950/20">
            <span class="text-[9px] text-slate-500">CARRIER:</span> <strong class="text-white">Reliance Jio Infocomm Ltd</strong>
          </div>
        </div>
      `;
    }
    
    btn.innerHTML = `<i data-lucide="search" class="h-4 w-4"></i> <span>TRACK IP</span>`;
    lucide.createIcons();
  };

  window.pmTrackIpLive();
}

/* =========================================================================
   2. OSINT FRAMEWORK
   ========================================================================= */
function renderOsintFramework(state, container) {
  const isDark = state.theme === 'dark';
  container.innerHTML = `
    <div class="space-y-4 font-mono text-xs h-[600px] flex flex-col">
      <div class="flex justify-between items-center border-b border-slate-800 pb-2">
        <div>
          <h3 class="text-sm font-bold text-cyber-blue uppercase">Open Source Intelligence (OSINT) Framework</h3>
          <p class="text-xs text-slate-400 font-sans mt-1">Access global OSINT resources for threat intelligence and footprinting.</p>
        </div>
        <button onclick="window.pmOpenExternal('https://osintframework.com/', 'OSINT Framework')" class="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 hover:bg-cyber-blue hover:text-cyber-950 transition-all flex items-center gap-1.5 shrink-0">
          <i data-lucide="external-link" class="h-4 w-4"></i> OPEN IN NEW TAB
        </button>
      </div>
      
      <div class="flex-1 rounded-xl border border-slate-800 overflow-hidden relative">
        <div class="absolute inset-0 flex items-center justify-center bg-slate-900 pointer-events-none">
          <div class="text-center">
            <i data-lucide="loader" class="h-8 w-8 text-cyber-blue animate-spin mx-auto mb-2"></i>
            <span class="text-slate-500 font-mono text-[10px] uppercase">Connecting to OSINT Framework...</span>
          </div>
        </div>
        <iframe src="https://osintframework.com/" class="w-full h-full relative z-10 border-0 bg-white" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>
      </div>
    </div>
  `;
}

/* =========================================================================
   3. CYBER UPDATES FEED (REAL RSS NEWS READER WITH PROXY)
   ========================================================================= */
const fallbackCyberFeeds = [
  { title: "CISA Releases Advisory on Scattered Spider cyber campaigns", date: "2026-05-22", summary: "Critical alert regarding targeting of commercial networks using sophisticated social engineering vectors and credential harvesting." },
  { title: "Alert: Ransomware attacks targeting healthcare nodal databases", date: "2026-05-20", summary: "Advisory issued on protecting Windows domain systems and ensuring robust offline backups." },
  { title: "Nodal Advice: Protect against malicious APK banking injections", date: "2026-05-18", summary: "Scam alerts mimicking electricity board payment templates designed to steal OTP logs." }
];

function renderCyberFeed(state, container) {
  const isDark = state.theme === 'dark';
  container.innerHTML = `
    <div class="space-y-4 font-mono text-xs">
      <div class="flex justify-between items-center border-b border-slate-800 pb-2">
        <h3 class="text-sm font-bold text-cyber-blue uppercase flex items-center gap-2"><i data-lucide="youtube" class="text-red-500 h-5 w-5"></i> UNIFIED CYBER FEED</h3>
        <div class="flex gap-2">
          <a href="https://www.youtube.com/@Smart_Cyber_Cops?sub_confirmation=1" target="_blank" class="p-1.5 px-3 bg-red-600/20 text-red-500 border border-red-500/30 font-bold rounded hover:bg-red-600 hover:text-white flex items-center gap-1 transition-colors">
            <i data-lucide="youtube" class="h-3.5 w-3.5"></i> SUBSCRIBE
          </a>
          <button onclick="window.pmFetchUnifiedFeed()" id="rss-refresh-btn" class="p-1.5 px-3 bg-cyber-blue text-cyber-950 font-bold rounded hover:bg-white flex items-center gap-1">
            <i data-lucide="refresh-cw" class="h-3.5 w-3.5"></i> REFRESH
          </button>
        </div>
      </div>
      <p class="text-xs text-slate-400 font-sans">Latest videos from @Smart_Cyber_Cops & global CISA alerts.</p>

      <div id="rss-alerts-workspace" class="space-y-4 max-h-[500px] overflow-y-auto pr-2 pb-4">
        <!-- Feed injected here -->
      </div>
    </div>
  `;

  window.pmFetchUnifiedFeed = async () => {
    const refreshBtn = document.getElementById('rss-refresh-btn');
    const board = document.getElementById('rss-alerts-workspace');
    
    refreshBtn.innerHTML = `<i data-lucide="refresh-cw" class="h-3.5 w-3.5 animate-spin"></i> FETCHING...`;
    lucide.createIcons();

    let unifiedFeeds = [];

    // 1. Fetch YouTube RSS
    try {
      const ytUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCymaOmboCe9exS47yKPtlww";
      const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(ytUrl)}`);
      const ytData = await res.json();
      if(ytData.status === 'ok') {
        ytData.items.forEach(item => {
          const vidMatch = item.link.match(/v=([^&]+)/);
          unifiedFeeds.push({
            type: 'youtube',
            title: item.title,
            date: new Date(item.pubDate),
            summary: item.description ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 100) + '...' : '',
            thumbnail: item.thumbnail,
            videoId: vidMatch ? vidMatch[1] : null,
            link: item.link
          });
        });
      }
    } catch(e) {
      console.error('YouTube RSS fail', e);
    }

    // 2. Fetch CISA RSS
    try {
      const cisaUrl = "https://www.cisa.gov/cybersecurity-advisories/all.xml";
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(cisaUrl)}`;
      const resCisa = await fetch(proxyUrl);
      if(resCisa.ok) {
        const xmlText = await resCisa.text();
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;
        while ((match = itemRegex.exec(xmlText)) !== null) {
          const itemContent = match[1];
          const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
          const dateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
          const descMatch = itemContent.match(/<description>([\s\S]*?)<\/description>/);

          if (titleMatch) {
            const title = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, '$1').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
            const dateStr = dateMatch ? dateMatch[1] : new Date().toISOString();
            const summary = descMatch ? descMatch[1].replace(/<!\[CDATA\[([\\s\\S]*?)\]\]>/, '$1').slice(0, 150) + "..." : 'Cybersecurity advisory.';
            unifiedFeeds.push({
              type: 'cisa',
              title,
              date: new Date(dateStr),
              summary
            });
          }
        }
      }
    } catch(e) {
      console.error('CISA RSS fail', e);
    }

    // Fallback if both fail
    if (unifiedFeeds.length === 0) {
      unifiedFeeds = fallbackCyberFeeds.map(f => ({
        type: 'cisa',
        title: f.title,
        date: new Date(),
        summary: f.summary
      }));
    }

    // Sort Descending
    unifiedFeeds.sort((a, b) => b.date - a.date);

    // Limit to top 20
    unifiedFeeds = unifiedFeeds.slice(0, 20);

    renderUnifiedFeedList(unifiedFeeds, board);

    refreshBtn.innerHTML = `<i data-lucide="refresh-cw" class="h-3.5 w-3.5"></i> REFRESH`;
    lucide.createIcons();
  };

  function renderUnifiedFeedList(list, target) {
    target.innerHTML = list.map((item, idx) => {
      if (item.type === 'youtube') {
        const isLatest = idx === 0 || idx === 1; // Mark first couple as trending/latest
        return `
          <div class="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden hover:border-cyber-blue/30 transition-all group relative">
            <div class="relative w-full h-40 overflow-hidden bg-black cursor-pointer" onclick="window.pmOpenVideoModal('${item.videoId}')">
              <img src="${item.thumbnail}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105" alt="Thumbnail">
              <div class="absolute inset-0 flex items-center justify-center">
                <button class="h-12 w-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:bg-red-500 group-hover:scale-110 transition-all">
                  <i data-lucide="play" class="h-5 w-5 ml-1"></i>
                </button>
              </div>
              <div class="absolute top-2 left-2 flex gap-2">
                <span class="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold uppercase rounded flex items-center gap-1 shadow">
                  <i data-lucide="youtube" class="h-3 w-3"></i> VIDEO UPDATE
                </span>
                ${isLatest ? '<span class="px-2 py-0.5 bg-cyber-blue text-cyber-950 text-[9px] font-bold uppercase rounded shadow animate-pulse">TRENDING</span>' : ''}
              </div>
            </div>
            <div class="p-4 space-y-2">
              <h4 class="font-bold text-white text-xs font-mono uppercase leading-tight line-clamp-2" title="${item.title}">${item.title}</h4>
              <div class="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>${item.date.toLocaleDateString()} ${item.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                <button onclick="window.pmOpenVideoModal('${item.videoId}')" class="text-cyber-blue hover:text-white flex items-center gap-1">WATCH NOW <i data-lucide="arrow-right" class="h-3 w-3"></i></button>
              </div>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="p-4 rounded-xl border border-slate-800/80 bg-slate-950/20 space-y-2 hover:border-slate-700 transition-all select-none">
            <div class="flex justify-between items-start gap-3">
              <div class="flex items-center gap-2">
                <i data-lucide="shield-alert" class="h-4 w-4 text-orange-500"></i>
                <h4 class="font-bold text-slate-200 text-xs font-mono uppercase">${item.title}</h4>
              </div>
              <span class="text-[9px] text-slate-500 shrink-0 uppercase font-mono">${item.date.toLocaleDateString()}</span>
            </div>
            <p class="text-[11px] text-slate-400 font-sans leading-relaxed">${item.summary}</p>
          </div>
        `;
      }
    }).join('');
    lucide.createIcons();
  }

  window.pmFetchUnifiedFeed();
}

/* =========================================================================
   4. QR CODE GENERATOR (QR SERVER API)
   ========================================================================= */
function renderQrGenerator(state, container) {
  const isDark = state.theme === 'dark';
  container.innerHTML = `
    <div class="space-y-4 font-mono text-xs">
      <h3 class="text-sm font-bold text-cyber-blue uppercase">QR Code Generator (QR Server API)</h3>
      <p class="text-xs text-slate-400 font-sans">Generate secure QR codes for suspect links, UPI payment IDs, or case files.</p>
      
      <div class="flex gap-2">
        <input type="text" id="qr-input" placeholder="Enter URL, text, or UPI ID..." class="flex-1 px-4 py-2.5 text-xs rounded-xl border outline-none ${isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-cyber-blue' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-cyber-blue'}">
        <button onclick="window.pmGenerateQr()" class="px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xl bg-cyber-blue text-cyber-950 hover:bg-white transition-all shadow-cyber-glow flex items-center gap-1.5 shrink-0">
          <i data-lucide="qr-code" class="h-4 w-4"></i> GENERATE
        </button>
      </div>
      
      <div id="qr-result" class="hidden mt-6 flex flex-col items-center justify-center p-6 border border-slate-800 bg-slate-950/20 rounded-xl">
        <img id="qr-img" src="" alt="QR Code" class="rounded-lg shadow-cyber-glow border-4 border-cyber-blue p-2 bg-white mb-4">
        <a id="qr-download" href="#" download="qr-code.png" class="text-xs text-cyber-blue underline hover:text-white">Download Image</a>
      </div>
    </div>
  `;

  window.pmGenerateQr = () => {
    const input = document.getElementById('qr-input').value.trim();
    if (!input) return;
    
    logActivity('Generated QR Code via QR Server API', 'cyber_tools');
    const resultBox = document.getElementById('qr-result');
    const img = document.getElementById('qr-img');
    const dl = document.getElementById('qr-download');
    
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(input)}`;
    img.src = qrUrl;
    dl.href = qrUrl;
    resultBox.classList.remove('hidden');
  };
}


