
// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - Cyber Dashboard Component

export function renderCyberDashboard(state, container) {
  const isDark = state.theme === 'dark';

  if (!state.cyberActiveTab) state.cyberActiveTab = 'forensics';

  container.innerHTML = `
    <div class="space-y-6 text-left">
      <!-- Title -->
      <div>
        <h2 class="text-xl font-bold font-mono tracking-tight text-cyber-blue flex items-center gap-2">
          <i data-lucide="shield-alert" class="h-6 w-6 text-cyber-blue"></i>
          <span>CYBER FORENSIC & OSINT DASHBOARD</span>
        </h2>
        <p class="text-xs text-slate-500 mt-0.5 font-mono">Tactical OSINT directory, image forensics integrations, and secure external OSINT launchers.</p>
      </div>

      <!-- Navigation Hub -->
      <div class="flex flex-wrap border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} pb-1 gap-1">
        <button onclick="window.pmSetCyberTab('forensics')" class="px-5 py-2.5 text-xs font-bold font-mono tracking-wider uppercase border-b-2 transition-all ${
          state.cyberActiveTab === 'forensics' ? 'border-cyber-blue text-cyber-blue font-bold shadow-cyber-glow' : 'border-transparent text-slate-500 hover:text-slate-300'
        }">Image & Video Forensics</button>
        
        <button onclick="window.pmSetCyberTab('osint')" class="px-5 py-2.5 text-xs font-bold font-mono tracking-wider uppercase border-b-2 transition-all ${
          state.cyberActiveTab === 'osint' ? 'border-cyber-blue text-cyber-blue font-bold shadow-cyber-glow' : 'border-transparent text-slate-500 hover:text-slate-300'
        }">OSINT & Grabify</button>

      </div>

      <!-- Workspace container -->
      <div id="cyber-dashboard-workspace"></div>
    </div>
  `;

  window.pmSetCyberTab = (tab) => {
    state.cyberActiveTab = tab;
    renderCyberDashboard(state, container);
  };

  const workspace = document.getElementById('cyber-dashboard-workspace');
  if (state.cyberActiveTab === 'forensics') {
    renderForensicsToolkit(state, workspace);
  } else if (state.cyberActiveTab === 'osint') {
    renderOsintToolkit(state, workspace);
  }

  lucide.createIcons();
}

/* =========================================================================
   1. IMAGE & VIDEO FORENSICS TOOLKIT
   ========================================================================= */
function renderForensicsToolkit(state, container) {
  const isDark = state.theme === 'dark';
  
  const tools = [
    {
      title: "InVID-WeVerify Plugin",
      desc: "Verification tool helping officers verify images/videos. Extracts contextual metadata, reverse searches, magnifies frames, and runs Yandex/Google blocks.",
      url: "https://www.invid-project.eu/",
      icon: "file-search"
    },
    {
      title: "Google Lens Desktop",
      desc: "Performs highly accurate image segmentation and direct entity matching across web indices - superior to standard image searches.",
      url: "https://lens.google.com/",
      icon: "scan"
    },
    {
      title: "Duplichecker Reverse Image",
      desc: "Performs deep reverse searches by letting you upload local forensic pictures, paste image URLs, or input keywords to find matches.",
      url: "https://www.duplichecker.com/reverse-image-search.php",
      icon: "copy"
    },
    {
      title: "Face Search Engine",
      desc: "UPLOAD PHOTO AND FIND OUT WHERE IMAGES ARE PUBLISHED. Performs reverse face searches on the web to identify profiles.",
      url: "https://pimeyes.com/",
      icon: "user"
    },
    {
      title: "Search4faces Engine",
      desc: "Advanced face recognition search database. Maps facial geometry tags against 84+ million photos across public profile indices.",
      url: "https://search4faces.com/",
      icon: "user-square"
    },
    {
      title: "Reverse Image Search",
      desc: "Search for an image by uploading, pasting a URL, or typing keywords to explore matches across major reverse search indices.",
      url: "https://reverseimagesearch.com/",
      icon: "search"
    },
    {
      title: "RevEye Image Reverse",
      desc: "Allows inverse right-click image queries across cascade engines - Google, Bing, Yandex, and TinEye simultaneously.",
      url: "https://tineye.com/",
      icon: "eye"
    },
    {
      title: "Diff Checker Comparator",
      desc: "Perform difference audits between two file logs, texts, or screenshots to trace alterations, document changes, or stamp logs.",
      url: "https://www.diffchecker.com/",
      icon: "arrow-right-left"
    }
  ];

  container.innerHTML = `
    <div class="space-y-4">
      <div class="p-4 rounded-xl border border-cyber-blue/10 bg-cyber-blue/5">
        <h4 class="font-bold text-white text-xs font-mono uppercase flex items-center gap-1">
          <i data-lucide="help-circle" class="h-4 w-4 text-cyber-blue"></i>
          <span>Forensic Toolkit Walkthrough</span>
        </h4>
        <p class="text-[11px] text-slate-400 leading-relaxed font-sans mt-1">Click the launcher buttons to open secure search and facial indexing databases. All links load safely in sandboxed, independent external browser tabs to protect your station environment.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${tools.map(tool => `
          <div class="p-5 rounded-2xl border transition-all duration-300 hover:border-cyber-blue/40 flex flex-col justify-between space-y-4 ${
            isDark ? 'bg-police-900 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
          }">
            <div class="flex justify-between items-start">
              <div class="h-9 w-9 rounded-xl bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/20 text-cyber-blue shrink-0">
                <i data-lucide="${tool.icon}" class="h-5 w-5"></i>
              </div>
              <span class="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-widest">EXTERNAL LAUNCHER</span>
            </div>
            <div>
              <h5 class="font-extrabold text-white text-xs font-mono tracking-wide uppercase">${tool.title}</h5>
              <p class="text-[11px] text-slate-400 mt-1.5 leading-relaxed font-sans">${tool.desc}</p>
            </div>
            <button onclick="window.pmLaunchExternal('${tool.url}', '${tool.title}')" class="w-full py-2.5 bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-950 transition-all font-mono font-bold text-[10px] rounded-xl border border-cyber-blue/20 tracking-wider uppercase">
              Launch in New Tab
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  window.pmLaunchExternal = (url, name) => {
    logActivity(`Launched external OSINT forensics tool: "${name}"`, 'cyber_dashboard');
    window.open(url, "_blank");
  };

  lucide.createIcons();
}

/* =========================================================================
   2. OSINT & WAYBACK MACHINE / GRABIFY
   ========================================================================= */
function renderOsintToolkit(state, container) {
  const isDark = state.theme === 'dark';
  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Wayback Machine -->
      <div class="p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
        isDark ? 'bg-police-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }">
        <div class="flex justify-between items-start">
          <div class="h-9 w-9 rounded-xl bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/20 text-cyber-blue shrink-0">
            <i data-lucide="archive" class="h-5 w-5"></i>
          </div>
          <span class="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-widest">WAYBACK MACHINE</span>
        </div>
        <div>
          <h4 class="font-extrabold text-white text-xs font-mono tracking-wide uppercase">Internet Archive Machine</h4>
          <p class="text-[11px] text-slate-400 mt-1.5 leading-relaxed font-sans">Queries historical snapshots and deleted caches of target websites or online profiles. Perfect for forensic timelines.</p>
          
          <div class="mt-3 space-y-2">
            <input type="text" id="wayback-target-url" placeholder="https://example.com" class="w-full px-3 py-2 text-xs rounded border outline-none font-mono bg-slate-950 border-slate-800 text-white" />
            <button onclick="window.pmLaunchWayback()" class="w-full py-2 bg-cyber-blue text-cyber-950 font-bold font-mono text-[10px] rounded uppercase">CHECK ARCHIVE SNAPSHOTS</button>
          </div>
        </div>
        
        <button onclick="window.pmLaunchExternal('https://web.archive.org/', 'Wayback Machine')" class="w-full py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white font-mono font-bold text-[10px] rounded-xl uppercase">
          Open Wayback Home (New Tab)
        </button>
      </div>

      <!-- Grabify IP Logger -->
      <div class="p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
        isDark ? 'bg-police-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }">
        <div class="flex justify-between items-start">
          <div class="h-9 w-9 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400 shrink-0">
            <i data-lucide="link" class="h-5 w-5"></i>
          </div>
          <span class="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-widest">IP LOGGER</span>
        </div>
        <div>
          <h4 class="font-extrabold text-white text-xs font-mono tracking-wide uppercase">Grabify IP Logger</h4>
          <p class="text-[11px] text-slate-400 mt-1.5 leading-relaxed font-sans">Build link redirection logs to trace threat actors' active public IPs, device headers, battery levels, and VPN networks.</p>
          
          <ol class="list-decimal pl-4 space-y-1.5 text-[10px] text-slate-400 mt-3 font-sans">
            <li>Generate a target redirection link (e.g. pointing to a picture).</li>
            <li>Create the tracking node link on the Grabify console.</li>
            <li>Send the tracked link to suspect coordinates and audit active logs.</li>
          </ol>
        </div>
        
        <button onclick="window.pmLaunchExternal('https://grabify.link/', 'Grabify IP Logger')" class="w-full py-2.5 bg-cyber-blue text-cyber-950 font-bold font-mono text-[10px] rounded-xl shadow-cyber-glow uppercase">
          LAUNCH GRABIFY PORTAL (NEW TAB)
        </button>
      </div>

    </div>
  `;

  window.pmLaunchWayback = () => {
    const url = document.getElementById('wayback-target-url').value.trim();
    if (!url) {
      alert("Please specify a target website URL first!");
      return;
    }
    const finalUrl = `https://web.archive.org/web/*/${url}`;
    logActivity(`Wayback query target: "${url}"`, 'cyber_dashboard');
    window.open(finalUrl, "_blank");
  };

  lucide.createIcons();
}




