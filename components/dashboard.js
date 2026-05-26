
// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - Simplified Navigation Dashboard Component

export function renderDashboard(state, container) {
  const isDark = state.theme === 'dark';

  const tLocal = {
    en: {
      searchLabel: "TACTICAL RADAR",
      tagline: "Your clean and lightweight digital assistance suite. Fast, secure, offline-ready.",
      searchPH: "Search tools, IP, phone codes, laws, circulars...",
      launch: "Launch Tool"
    },
    hi: {
      searchLabel: "सामरिक रडार",
      tagline: "आपका स्वच्छ और हल्का डिजिटल सहायता सुइट। तेज, सुरक्षित, ऑफलाइन-तैयार।",
      searchPH: "खोजें आईपी, फोन, नए कानून, परिपत्र...",
      launch: "टूल खोलें"
    }
  }[state.lang];

  container.innerHTML = `
    <!-- HEADER BRANDING -->
    <div class="flex flex-col items-center text-center space-y-4 py-8">
      <!-- User Circular Logo -->
      <div class="relative group">
        <div class="absolute -inset-1.5 bg-gradient-to-r from-cyber-blue to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <img 
          src="https://yt3.ggpht.com/z5GtKCdDrLqaRlYHvSwWCADBDYWFt8lyJ54N5mfRk9SMA6QyZjeHJe8XNsQ9s6lWOwva8KM2=s176-c-k-c0x00ffffff-no-rj" 
          alt="Police Mitra Logo" 
          class="relative h-24 w-24 rounded-full border-2 border-cyber-blue object-cover shadow-cyber-glow select-none"
        />
      </div>

      <div class="space-y-1">
        <h1 class="text-3xl sm:text-4xl font-extrabold font-mono tracking-wider text-white">
          POLICE MITRA
        </h1>
        <p class="text-xs text-slate-400 font-medium font-mono">${tLocal.tagline}</p>
      </div>

      <!-- Quick Session / Global Search -->
      <div class="w-full relative max-w-xl mx-auto pt-3">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-[10px] uppercase font-bold select-none">${tLocal.searchLabel}:</span>
        <input 
          type="text" 
          id="home-radar-search" 
          onchange="performGlobalSearch(this.value)" 
          placeholder="${tLocal.searchPH}" 
          class="w-full pl-32 pr-12 py-3.5 text-xs font-mono rounded-xl border outline-none transition-all ${
            isDark 
              ? 'bg-slate-950/80 border-slate-800 text-white focus:border-cyber-blue/50 focus:shadow-cyber-glow' 
              : 'bg-slate-100 border-slate-300 text-slate-800 focus:bg-white focus:border-cyber-blue/50'
          }"
        />
        <button 
          onclick="performGlobalSearch(document.getElementById('home-radar-search').value)" 
          class="absolute right-3.5 top-1/2 -translate-y-1/2 text-cyber-blue hover:text-white transition-all animate-pulse"
        >
          <i data-lucide="arrow-right" class="h-4.5 w-4.5"></i>
        </button>
      </div>
    </div>

    <!-- DIRECT CARD LAUNCHER DECK -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
      
      <!-- Card 1: Investigation tools -->
      <div class="p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.015] hover:border-cyber-blue/40 flex flex-col justify-between space-y-4 ${
        isDark ? 'bg-police-900 border-slate-800/85' : 'bg-white border-slate-200 shadow-sm shadow-blue-50/50'
      }">
        <div class="flex justify-between items-start">
          <div class="h-10 w-10 rounded-xl bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/20 text-cyber-blue shrink-0">
            <i data-lucide="shield-alert" class="h-5.5 w-5.5"></i>
          </div>
          <span class="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-widest">CYBER MODULE</span>
        </div>
        <div>
          <h4 class="font-extrabold text-white text-sm font-mono tracking-wide uppercase">Investigation Tools</h4>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed font-sans">Track target IPs geolocator, validate 15-digit Device IMEIs mathematically, and parse cellular operator prefixes.</p>
        </div>
        <button onclick="navigate('cyber_tools')" class="w-full py-2.5 bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-950 transition-all font-mono font-bold text-[10px] rounded-xl border border-cyber-blue/20 tracking-wider uppercase">
          ${tLocal.launch}
        </button>
      </div>

      <!-- Card 2: Cyber Dashboard -->
      <div class="p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.015] hover:border-cyber-blue/40 flex flex-col justify-between space-y-4 ${
        isDark ? 'bg-police-900 border-slate-800/85' : 'bg-white border-slate-200 shadow-sm shadow-blue-50/50'
      }">
        <div class="flex justify-between items-start">
          <div class="h-10 w-10 rounded-xl bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/20 text-cyber-blue shrink-0">
            <i data-lucide="fingerprint" class="h-5.5 w-5.5"></i>
          </div>
          <span class="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-widest">CYBER FORENSICS</span>
        </div>
        <div>
          <h4 class="font-extrabold text-white text-sm font-mono tracking-wide uppercase">Cyber Dashboard</h4>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed font-sans">Tactical OSINT tools, Wayback machine search, Grabify redirects, Nodal Officer cabinet, and image forensics.</p>
        </div>
        <button onclick="navigate('cyber_dashboard')" class="w-full py-2.5 bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-950 transition-all font-mono font-bold text-[10px] rounded-xl border border-cyber-blue/20 tracking-wider uppercase">
          ${tLocal.launch}
        </button>
      </div>


      <!-- Card 3: BNS Comparative Law -->
      <div class="p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.015] hover:border-cyber-blue/40 flex flex-col justify-between space-y-4 ${
        isDark ? 'bg-police-900 border-slate-800/85' : 'bg-white border-slate-200 shadow-sm shadow-blue-50/50'
      }">
        <div class="flex justify-between items-start">
          <div class="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 shrink-0">
            <i data-lucide="scale" class="h-5.5 w-5.5"></i>
          </div>
          <span class="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-widest">LEGAL INDEX</span>
        </div>
        <div>
          <h4 class="font-extrabold text-white text-sm font-mono tracking-wide uppercase">Comparative Law</h4>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed font-sans">Translate traditional IPC sections directly to the new BNS equivalents, browse BNSS guidelines, and query IT Act codes.</p>
        </div>
        <button onclick="navigate('law')" class="w-full py-2.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-cyber-950 transition-all font-mono font-bold text-[10px] rounded-xl border border-emerald-500/20 tracking-wider uppercase">
          ${tLocal.launch}
        </button>
      </div>

      <!-- Card 4: Circulars Desk -->
      <div class="p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.015] hover:border-cyber-blue/40 flex flex-col justify-between space-y-4 ${
        isDark ? 'bg-police-900 border-slate-800/85' : 'bg-white border-slate-200 shadow-sm shadow-blue-50/50'
      }">
        <div class="flex justify-between items-start">
          <div class="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 text-violet-400 shrink-0">
            <i data-lucide="file-text" class="h-5.5 w-5.5"></i>
          </div>
          <span class="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-widest">DOCUMENTS</span>
        </div>
        <div>
          <h4 class="font-extrabold text-white text-sm font-mono tracking-wide uppercase">Circulars & Documents</h4>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed font-sans">Browse administrative leaves templates, nodal rules, and download circulars for daily field documentation.</p>
        </div>
        <button onclick="navigate('documents')" class="w-full py-2.5 bg-violet-500/10 text-violet-400 hover:bg-violet-500 hover:text-cyber-950 transition-all font-mono font-bold text-[10px] rounded-xl border border-violet-500/20 tracking-wider uppercase">
          ${tLocal.launch}
        </button>
      </div>

      <!-- Card 5: Salary, GPF & Welfare Services -->
      <div onclick="navigate('salary')" class="cursor-pointer p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.015] hover:border-cyber-blue/40 flex flex-col justify-between space-y-4 ${
        isDark ? 'bg-police-900 border-slate-800/85' : 'bg-white border-slate-200 shadow-sm shadow-blue-50/50'
      }">
        <div class="flex justify-between items-start">
          <div class="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-400 shrink-0">
            <i data-lucide="wallet" class="h-5.5 w-5.5"></i>
          </div>
          <span class="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-widest">WELFARE</span>
        </div>
        <div>
          <h4 class="font-extrabold text-white text-sm font-mono tracking-wide uppercase">${state.lang === 'en' ? 'SALARY, GPF & WELFARE' : 'वेतन, जीपीएफ और कल्याण'}</h4>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed font-sans">${state.lang === 'en' ? 'Access Pay Slip, GPF Statement, NPS Details, and Allahabad High Court Case Status — completely offline.' : 'पे स्लिप, जीपीएफ विवरण, एनपीएस और इलाहाबाद उच्च न्यायालय केस स्थिति — सब एक डेस्क से।'}</p>
        </div>
        <button class="w-full py-2.5 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-cyber-950 transition-all font-mono font-bold text-[10px] rounded-xl border border-amber-500/20 tracking-wider uppercase">
          ${tLocal.launch}
        </button>
      </div>

      <!-- Card 6: Tactical Utilities -->
      <div class="p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.015] hover:border-cyber-blue/40 flex flex-col justify-between space-y-4 ${
        isDark ? 'bg-police-900 border-slate-800/85' : 'bg-white border-slate-200 shadow-sm shadow-blue-50/50'
      }">
        <div class="flex justify-between items-start">
          <div class="h-10 w-10 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 text-pink-400 shrink-0">
            <i data-lucide="wrench" class="h-5.5 w-5.5"></i>
          </div>
          <span class="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-widest">OFFICER BOX</span>
        </div>
        <div>
          <h4 class="font-extrabold text-white text-sm font-mono tracking-wide uppercase">Officer Utilities</h4>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed font-sans">Access canvas annotators, compress heavy investigative images client-side, and save persistent stateful notes.</p>
        </div>
        <button onclick="navigate('utilities')" class="w-full py-2.5 bg-pink-500/10 text-pink-400 hover:bg-pink-500 hover:text-cyber-950 transition-all font-mono font-bold text-[10px] rounded-xl border border-pink-500/20 tracking-wider uppercase">
          ${tLocal.launch}
        </button>
      </div>

      <!-- Card 7: CDR Analysis -->
      <div onclick="navigate('cdr_analysis')" class="cursor-pointer p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.015] hover:border-cyber-blue/40 flex flex-col justify-between space-y-4 ${
        isDark ? 'bg-police-900 border-slate-800/85' : 'bg-white border-slate-200 shadow-sm shadow-blue-50/50'
      }">
        <div class="flex justify-between items-start">
          <div class="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 shrink-0">
            <i data-lucide="activity" class="h-5.5 w-5.5"></i>
          </div>
          <span class="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-widest">ANALYTICS</span>
        </div>
        <div>
          <h4 class="font-extrabold text-white text-sm font-mono tracking-wide uppercase">${state.lang === 'en' ? 'CDR Analysis' : 'सीडीआर विश्लेषण'}</h4>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed font-sans">${state.lang === 'en' ? 'Upload Call Detail Records to automatically map unique contacts, calculate night activities, and generate timelines.' : 'कॉल डिटेल रिकॉर्ड (CDR) अपलोड करें, संपर्कों को मैप करें और समयरेखा व विश्लेषण जनरेट करें।'}</p>
        </div>
        <button class="w-full py-2.5 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-cyber-950 transition-all font-mono font-bold text-[10px] rounded-xl border border-cyan-500/20 tracking-wider uppercase">
          ${tLocal.launch}
        </button>
      </div>

    </div>
  `;

  lucide.createIcons();
}
