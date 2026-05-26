
// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - Authentication Component

export function renderAuth(state, container) {
  const isDark = state.theme === 'dark';
  
  // Translation sets for login
  const text = {
    en: {
      secHeader: "NATIONAL POLICE INTERNAL PORTAL",
      secSub: "SECURE ACCESS SYSTEM",
      badgeLabel: "Officer Badge ID",
      passLabel: "Access Password",
      roleLabel: "Assigned Authority Role",
      loginBtn: "SECURE LOG IN",
      quickTest: "Developer Quick Credentials",
      badgePH: "Enter Badge ID (e.g., 1001)",
      passPH: "Enter Passphrase (e.g., police123)",
      errFields: "Error: Please fill in all fields.",
      errCreds: "Access Denied: Invalid Badge ID or Passphrase.",
      warnNote: "WARNING: Unauthorised access attempts are monitored and prosecuted under Information Technology Act, Section 66."
    },
    hi: {
      secHeader: "राष्ट्रीय पुलिस आंतरिक पोर्टल",
      secSub: "सुरक्षित एक्सेस सिस्टम",
      badgeLabel: "अधिकारी बैज आईडी",
      passLabel: "एक्सेस पासवर्ड",
      roleLabel: "अधिकार क्षेत्र की भूमिका",
      loginBtn: "सुरक्षित लॉग इन",
      quickTest: "डेवलपर त्वरित क्रेडेंशियल",
      badgePH: "बैज आईडी दर्ज करें (जैसे, 1001)",
      passPH: "पासवर्ड दर्ज करें (जैसे, police123)",
      errFields: "त्रुटि: कृपया सभी फ़ील्ड भरें।",
      errCreds: "पहुंच अस्वीकृत: अमान्य बैज आईडी या पासवर्ड।",
      warnNote: "चेतावनी: अनधिकृत पहुंच के प्रयासों की निगरानी की जाती है और सूचना प्रौद्योगिकी अधिनियम, धारा 66 के तहत मुकदमा चलाया जाता है।"
    }
  };

  const tLocal = text[state.lang];

  container.innerHTML = `
    <div class="w-full max-w-md p-8 rounded-2xl border transition-all animate-gold-pulse ${
      isDark ? 'bg-police-900/80 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
    }">
      <!-- Header Badge -->
      <div class="text-center mb-6">
        <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-police-gold-500/10 border border-police-gold-500/30 shadow-gold-glow mb-4">
          <i data-lucide="shield-check" class="h-10 w-10 text-police-gold-500"></i>
        </div>
        <h2 class="text-xl font-bold tracking-tight font-mono text-police-gold-500">${tLocal.secHeader}</h2>
        <p class="text-xs font-mono uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-1">${tLocal.secSub}</p>
      </div>

      <!-- Error alert placeholder -->
      <div id="login-error-msg" class="mb-4 hidden p-3 rounded-lg border border-police-danger/30 bg-police-danger/10 text-police-danger text-xs text-center font-medium"></div>

      <!-- Login Form -->
      <form id="pm-login-form" class="space-y-4">
        <div>
          <label class="block text-xs font-bold font-mono tracking-wider uppercase mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}">${tLocal.badgeLabel}</label>
          <div class="relative flex items-center">
            <i data-lucide="user-check" class="absolute left-3.5 h-4.5 w-4.5 text-slate-500"></i>
            <input type="text" id="pm-badge-id" placeholder="${tLocal.badgePH}" class="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border outline-none font-mono ${
              isDark ? 'bg-police-950 border-slate-800 text-white placeholder-slate-600 focus:border-police-gold-500' : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-police-gold-500'
            }">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold font-mono tracking-wider uppercase mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}">${tLocal.passLabel}</label>
          <div class="relative flex items-center">
            <i data-lucide="lock" class="absolute left-3.5 h-4.5 w-4.5 text-slate-500"></i>
            <input type="password" id="pm-passphrase" placeholder="${tLocal.passPH}" class="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border outline-none font-mono ${
              isDark ? 'bg-police-950 border-slate-800 text-white placeholder-slate-600 focus:border-police-gold-500' : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-police-gold-500'
            }">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold font-mono tracking-wider uppercase mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}">${tLocal.roleLabel}</label>
          <div class="relative flex items-center">
            <i data-lucide="crown" class="absolute left-3.5 h-4.5 w-4.5 text-slate-500"></i>
            <select id="pm-role" class="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border outline-none cursor-pointer appearance-none ${
              isDark ? 'bg-police-950 border-slate-800 text-white focus:border-police-gold-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-police-gold-500'
            }">
              <option value="Officer">Field Officer / Inspector</option>
              <option value="Cyber Expert">Cyber Crime Specialist / Expert</option>
              <option value="Administrator">HQ Administrator</option>
            </select>
            <i data-lucide="chevron-down" class="absolute right-3 h-4 w-4 text-slate-500 pointer-events-none"></i>
          </div>
        </div>

        <button type="submit" class="w-full py-3 mt-2 rounded-lg font-mono font-bold tracking-wider text-sm transition-all duration-200 bg-police-gold-500 text-police-950 hover:bg-police-gold-600 hover:scale-[1.01] shadow-gold-glow flex items-center justify-center gap-2">
          <i data-lucide="shield-alert" class="h-4 w-4"></i>
          <span>${tLocal.loginBtn}</span>
        </button>
      </form>

      <!-- Fast Access helper box -->
      <div class="mt-6 p-4 rounded-lg border border-slate-800/40 bg-slate-950/40 text-[11px] text-slate-500">
        <div class="flex justify-between items-center mb-1.5 font-bold font-mono text-police-gold-500">
          <span>${tLocal.quickTest}</span>
          <button onclick="document.getElementById('pm-badge-id').value='1001'; document.getElementById('pm-passphrase').value='police123';" class="text-blue-400 hover:underline">Autofill</button>
        </div>
        <p>Badge ID: <strong class="font-mono text-slate-400">1001</strong> | Password: <strong class="font-mono text-slate-400">police123</strong></p>
      </div>

      <div class="mt-6 text-[10px] text-center font-mono leading-relaxed text-police-danger bg-police-danger/5 p-3 rounded-lg border border-police-danger/10">
        ${tLocal.warnNote}
      </div>
    </div>
  `;

  // Submit Listener
  const form = document.getElementById('pm-login-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const badge = document.getElementById('pm-badge-id').value.trim();
    const pass = document.getElementById('pm-passphrase').value;
    const role = document.getElementById('pm-role').value;
    const errBox = document.getElementById('login-error-msg');

    if (!badge || !pass) {
      errBox.textContent = tLocal.errFields;
      errBox.classList.remove('hidden');
      return;
    }

    // Verify Dummy Credentials
    if (badge === '1001' && pass === 'police123') {
      errBox.classList.add('hidden');
      
      // Setup logged-in user in application state
      state.user = {
        id: badge,
        name: role === 'Administrator' ? 'Superintendent R. S. Pathak' : role === 'Cyber Expert' ? 'Inspector Ajay Kumar' : 'Inspector Vinay Singh',
        role: role,
        district: 'HQ Cyber Cell, Lucknow'
      };
      
      state.currentPage = 'dashboard';
      
      logActivity(`Officer ${state.user.name} logged in successfully with role ${role}.`, 'auth');
      
      // Re-trigger layout rendering in app.js
      window.navigate('dashboard');
    } else {
      errBox.textContent = tLocal.errCreds;
      errBox.classList.remove('hidden');
      logActivity(`Failed login attempt on badge ID: "${badge}".`, 'security');
    }
  });
}
