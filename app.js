// Police Mitra - App Controller (ES6 Native)
import { renderDashboard } from './components/dashboard.js?v=3';
import { renderCyberTools } from './components/cyber_tools.js?v=6';
import { renderCyberDashboard } from './components/cyber_dashboard.js?v=3';
import { renderLawAssistance } from './components/law_assistance.js?v=3';
import { renderDocuments } from './components/documents.js?v=3';
import { renderSalaryWelfare } from './components/salary_welfare.js?v=3';
import { renderContacts } from './components/contacts.js?v=3';
import { renderUtilities } from './components/utilities.js?v=3';
import { renderFooter } from './components/dashboard_footer.js?v=3';
import { renderFeedback } from './components/feedback.js?v=3';
import { renderNodalSearch } from './components/nodal_search.js?v=3';
import { renderCdrAnalysis } from './components/cdr_analysis.js?v=3';

// 1. App State Initialization (Simplified for POLICE MITRA)
window.appState = {
  theme: localStorage.getItem('pm-theme') || 'dark',
  lang: localStorage.getItem('pm-lang') || 'en',
  currentPage: 'dashboard',
  isAuthenticated: localStorage.getItem('pm_auth_token') === 'true',
    currentTab: 'ip_tracker',
  sidebarCollapsed: localStorage.getItem('pm-sidebar-collapsed') === 'true',
  user: { 
    id: "PM-1001", 
    name: "Police Personnel", 
    role: "Duty Officer Desk", 
    district: "Police Headquarters" 
  },
  sessionTimeLeft: 1800,
  sessionTimer: null,
  notifications: [
    { id: 1, text: 'Alert: Phishing attempts reported on district nodal mail nodes.', type: 'danger', time: '10 mins ago', read: false },
    { id: 2, text: 'Nodal Guidelines: Audio-video recording mandatory for standard BNS searches.', type: 'info', time: '1 hour ago', read: false }
  ],
  activities: [
    { id: 1, time: '13:40', text: 'Secure session initiated by officer.', category: 'system' }
  ],
  recentTools: ['ip_tracker', 'phone_lookup', 'imei_lookup'],
  visits: 0,
  mobileSidebarOpen: false,
  notificationDrawerOpen: false,
  videoModalOpen: false,
  currentVideoId: null,
  profileDropdownOpen: false
};

// 2. Translations Config (Reverted to POLICE MITRA)
const translations = {
  en: {
    portalTitle: "POLICE MITRA",
    portalSubtitle: "Personnel Welfare & Digital",
    govLabel: "POLICE MITRA • SECURE PERSONNEL WELFARE DESK",
    navDashboard: "Dashboard Home",
    navAdmin: "Admin Console",
    navCyberTools: "Investigation Tools",
    navCyberDashboard: "Cyber Dashboard",
    navCdrAnalysis: "CDR Analysis",
    navLaw: "Comparative BNS Law",
    navDocs: "Circulars Desk",
    navSalary: "SALARY, GPF & WELFARE SERVICES",
    navContacts: "Directory",
    navUtilities: "Tactical Utilities",
    navFeedback: "Feedback Corner",
    navNodalSearch: "Nodal Search",
    logout: "Reset Portal",
    welcome: "Welcome",
    searchPlaceholder: "Search IP, phone prefixes, BNS laws, circulars...",
    sessionTimerLabel: "Session Lease:",
    notificationsTitle: "Nodal Alert Center",
    markAllRead: "Acknowledge Alerts",
    noNotifications: "Alert feeds clear",
    activityLogTitle: "Audit Logs Feed",
    extendSession: "Renew Session",
    themeDark: "Dark Cyber Mode",
    themeLight: "Light Minimal Mode",
    footerText: "Designed for Police Personnel."
  },
  hi: {
    portalTitle: "पुलिस मित्र",
    portalSubtitle: "कर्मचारी कल्याण व डिजिटल",
    govLabel: "पुलिस मित्र • सुरक्षित कर्मचारी कल्याण डेस्क",
    navDashboard: "डैशबोर्ड होम",
    navAdmin: "एडमिन कंसोल",
    navCyberTools: "जांच उपकरण",
    navCyberDashboard: "साइबर डैशबोर्ड",
    navCdrAnalysis: "सीडीआर विश्लेषण",
    navLaw: "तुलनात्मक बीएनएस कानून",
    navDocs: "परिपत्र डेस्क",
    navSalary: "वेतन, जीपीएफ और कल्याण सेवाएं",
    navContacts: "निर्देशिका",
    navUtilities: "सामरिक उपयोगिताएँ",
    navFeedback: "प्रतिक्रिया व सुझाव",
    navNodalSearch: "नोडल खोज",
    logout: "पोर्टल रीसेट करें",
    welcome: "स्वागत है",
    searchPlaceholder: "आईपी, फोन, बीएनएस कानून खोजें...",
    sessionTimerLabel: "सत्र समय:",
    notificationsTitle: "नोडल चेतावनी केंद्र",
    markAllRead: "सभी म्यूट करें",
    noNotifications: "कोई चेतावनी नहीं",
    activityLogTitle: "ऑडिट गतिविधि लॉग",
    extendSession: "सत्र बढ़ाएं",
    themeDark: "डार्क साइबर मोड",
    themeLight: "लाइट मिनिमल मोड",
    footerText: "पुलिस कर्मियों के लिए डिज़ाइन किया गया।"
  }
};

window.t = function(key) {
  const lang = window.appState.lang;
  return translations[lang][key] || translations['en'][key] || key;
};

// 3. Central Initialization Hook
window.initApp = function() {
  document.documentElement.className = window.appState.theme;
  applyBodyBackground();
  renderApp();
  lucide.createIcons();
  
  // Start countdown
  startSessionTimer();
  
  // Check for new YouTube video
  setTimeout(checkNewVideoPopup, 2000);
  
  // Fetch live page visit counter
  fetchVisitsCount();
};

async function fetchVisitsCount() {
  try {
    const res = await fetch('https://api.counterapi.dev/v1/police-mitra/visits/up');
    const data = await res.json();
    if (data && data.count) {
      window.appState.visits = data.count;
      const el1 = document.getElementById('pm-page-counter');
      if (el1) el1.textContent = String(data.count).padStart(5, '0');
      const el2 = document.getElementById('pm-mobile-page-counter');
      if (el2) el2.textContent = String(data.count).padStart(5, '0');
    }
  } catch (e) {
    console.error("Failed to fetch page visit counter", e);
  }
}

function applyBodyBackground() {
  const body = document.body;
  if (window.appState.theme === 'dark') {
    body.style.backgroundColor = '#050B14';
    body.style.color = '#f1f5f9';
  } else {
    body.style.backgroundColor = '#f8fafc';
    body.style.color = '#1e293b';
  }
}

// Check for new video and popup
async function checkNewVideoPopup() {
  try {
    const rssUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCymaOmboCe9exS47yKPtlww";
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    const data = await res.json();
    
    if (data.status === 'ok' && data.items.length > 0) {
      const latestVideo = data.items[0];
      const videoIdMatch = latestVideo.link.match(/v=([^&]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        const vidId = videoIdMatch[1];
        const lastSeen = localStorage.getItem('pm_last_seen_video');
        if (lastSeen !== vidId) {
          // Unseen video! Trigger popup notification.
          window.appState.notifications.unshift({
            id: Date.now(),
            text: `NEW VIDEO UPLOADED: ${latestVideo.title}`,
            time: 'Just now',
            read: false
          });
          
          // Force modal open
          window.pmOpenVideoModal(vidId);
        }
      }
    }
  } catch(e) {
    console.error("Popup check failed", e);
  }
}

// 4. Session Countdown Security
function startSessionTimer() {
  if (window.appState.sessionTimer) clearInterval(window.appState.sessionTimer);
  window.appState.sessionTimer = setInterval(() => {
    window.appState.sessionTimeLeft--;
    updateSessionUI();
    
    if (window.appState.sessionTimeLeft <= 0) {
      clearInterval(window.appState.sessionTimer);
      resetDashboardSession();
    }
  }, 1000);
}

function updateSessionUI() {
  const mins = Math.floor(window.appState.sessionTimeLeft / 60);
  const secs = window.appState.sessionTimeLeft % 60;
  const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  const timerEl = document.getElementById('session-countdown');
  if (timerEl) {
    timerEl.textContent = timeStr;
    if (window.appState.sessionTimeLeft <= 60) {
      timerEl.className = 'font-bold text-cyber-danger animate-pulse';
    } else {
      timerEl.className = 'font-bold text-cyber-blue';
    }
  }
}

function resetDashboardSession() {
  clearInterval(window.appState.sessionTimer);
  window.appState.sessionTimeLeft = 1800;
  logActivity('Session renewed.', 'system');
  renderApp();
  lucide.createIcons();
}
window.extendSession = resetDashboardSession;

// 5. Activity Log System
export function logActivity(text, category = 'system') {
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  window.appState.activities.unshift({
    id: Date.now(),
    time: timeStr,
    text: text,
    category: category
  });
  if (window.appState.activities.length > 20) window.appState.activities.pop();
  
  const footerLogs = document.getElementById('activity-logs-container');
  if (footerLogs) {
    renderFooter(window.appState, document.getElementById('pm-footer'));
    lucide.createIcons();
  }
}
window.logActivity = logActivity;

// 6. Sidebar toggles
window.toggleSidebar = function() {
  window.appState.sidebarCollapsed = !window.appState.sidebarCollapsed;
  localStorage.setItem('pm-sidebar-collapsed', window.appState.sidebarCollapsed);
  logActivity(`Sidebar collapsed state set to ${window.appState.sidebarCollapsed}.`, 'system');
  renderApp();
  lucide.createIcons();
};

window.toggleMobileSidebar = function() {
  window.appState.mobileSidebarOpen = !window.appState.mobileSidebarOpen;
  logActivity(`Mobile sidebar collapsed state set to ${window.appState.mobileSidebarOpen}.`, 'system');
  renderApp();
  lucide.createIcons();
};

window.navigate = function(page, tab = '') {
  window.appState.currentPage = page;
  window.appState.currentTab = tab;
  window.appState.mobileSidebarOpen = false;
  
  logActivity(`Navigated to deck: ${t('nav' + page.charAt(0).toUpperCase() + page.slice(1)) || page}.`, 'navigation');
  
  renderApp();
  lucide.createIcons();
};

// 7. Toggle actions
window.toggleLanguage = function() {
  window.appState.lang = window.appState.lang === 'en' ? 'hi' : 'en';
  localStorage.setItem('pm-lang', window.appState.lang);
  logActivity(`Language set to ${window.appState.lang.toUpperCase()}.`, 'system');
  renderApp();
  lucide.createIcons();
};

window.toggleTheme = function() {
  window.appState.theme = window.appState.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('pm-theme', window.appState.theme);
  document.documentElement.className = window.appState.theme;
  applyBodyBackground();
  logActivity(`Theme set to ${window.appState.theme}.`, 'system');
  renderApp();
  lucide.createIcons();
};

window.toggleNotificationDrawer = () => {
  window.appState.notificationDrawerOpen = !window.appState.notificationDrawerOpen;
  renderApp();
};

window.pmOpenVideoModal = (videoId) => {
  window.appState.videoModalOpen = true;
  window.appState.currentVideoId = videoId;
  // Save as seen
  localStorage.setItem('pm_last_seen_video', videoId);
  renderApp();
};

window.pmCloseVideoModal = () => {
  window.appState.videoModalOpen = false;
  window.appState.currentVideoId = null;
  renderApp();
};

window.markAllNotificationsRead = function() {
  window.appState.notifications.forEach(n => n.read = true);
  logActivity('Alert warnings acknowledged.', 'system');
  renderApp();
  lucide.createIcons();
};

window.performGlobalSearch = function(query) {
  if (!query) return;
  logActivity(`Search query: "${query}".`, 'search');
  
  const q = query.toLowerCase().trim();
  if (q.includes('ip') || q.includes('track') || q.includes('ping')) {
    navigate('cyber_tools', 'ip_tracker');
  } else if (q.includes('phone') || q.includes('mobile') || q.includes('number')) {
    navigate('cyber_tools', 'phone_lookup');
  } else if (q.includes('imei') || q.includes('serial') || q.includes('device')) {
    navigate('cyber_tools', 'imei_lookup');
  } else if (q.includes('bns') || q.includes('ipc') || q.includes('law')) {
    navigate('law');
  } else if (q.includes('salary') || q.includes('kosh') || q.includes('slip')) {
    navigate('salary');
  } else if (q.includes('contact') || q.includes('phone')) {
    navigate('contacts');
  } else if (q.includes('speech') || q.includes('canvas') || q.includes('draw')) {
    navigate('utilities');
  } else {
    alert(`Tactical Search: Checked logs, BNS codes, and files for "${query}".`);
  }
};


// -----------------------------------------------------------------------------
// LOGIN PORTAL (HARDCODED GATEWAY)
// -----------------------------------------------------------------------------
function renderLoginScreen(container) {
  if (!container) return;

  const isDark = window.appState.theme === 'dark';
  const t = window.t;

  container.innerHTML = `
    <div class="h-full w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-blue/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div id="login-panel" class="w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl relative z-10 transition-transform">
        
        <div class="flex justify-between items-start mb-8">
          <div>
            <h1 class="text-3xl font-bold text-white tracking-tight uppercase">${t('govLabel')}</h1>
            <p class="text-cyber-blue font-mono text-sm tracking-wider mt-1 uppercase">Authentication Required</p>
          </div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/National_Emblem_of_India.svg" class="h-12 opacity-80 filter drop-shadow-md">
        </div>

        <div id="login-error" class="hidden mb-6 p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-xs font-mono flex items-center gap-2">
          <i data-lucide="shield-alert" class="h-4 w-4 shrink-0"></i>
          <span>ACCESS DENIED. Invalid Credentials.</span>
        </div>

        <form id="login-form" onsubmit="window.pmLogin(event)" class="space-y-5">
          <div class="space-y-1.5">
            <label class="text-[10px] text-slate-400 font-mono uppercase tracking-wider">User ID / PNO</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i data-lucide="user" class="h-4 w-4 text-slate-500"></i>
              </div>
              <input type="text" id="login-userId" required placeholder="8210133200" class="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-700 text-white rounded-xl outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-all font-mono text-sm" />
            </div>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Secure Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i data-lucide="lock" class="h-4 w-4 text-slate-500"></i>
              </div>
              <input type="password" id="login-password" required placeholder="••••••••••••" class="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-700 text-white rounded-xl outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-all font-mono text-sm" />
            </div>
          </div>

          <button type="submit" class="w-full py-3.5 mt-4 bg-cyber-blue text-cyber-950 font-bold uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:bg-white transition-all flex items-center justify-center gap-2">
            <i data-lucide="log-in" class="h-4 w-4"></i> SECURE LOGIN
          </button>
        </form>

        <div class="mt-8 text-center text-[10px] text-slate-500 font-mono uppercase">
          Authorized Personnel Only. Strictly Confidential.
        </div>
      </div>
    </div>
  `;
  lucide.createIcons();
}


function renderAdminDashboard(container) {
  const isDark = window.appState.theme === 'dark';
  
  const getFeedbacks = () => JSON.parse(localStorage.getItem('pm_feedbacks')) || [];
  const feedbacks = getFeedbacks();

  container.innerHTML = `
    <div class="space-y-6">
      <div class="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <i data-lucide="shield-check" class="h-6 w-6 text-cyber-blue"></i> ADMIN CONSOLE DECK
          </h2>
          <p class="text-xs text-slate-400 font-mono mt-1">Superuser Security Node active.</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-cyber-blue/30 transition-all cursor-pointer group">
          <i data-lucide="users" class="h-6 w-6 text-slate-500 mb-2 group-hover:text-cyber-blue transition-colors"></i>
          <h3 class="text-sm font-bold text-white font-mono uppercase">Manage Users</h3>
          <p class="text-[10px] text-slate-500 font-mono">Add or remove active duty officers.</p>
        </div>
        <div class="p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-cyber-blue/30 transition-all cursor-pointer group">
          <i data-lucide="database" class="h-6 w-6 text-slate-500 mb-2 group-hover:text-cyber-blue transition-colors"></i>
          <h3 class="text-sm font-bold text-white font-mono uppercase">Update Directory</h3>
          <p class="text-[10px] text-slate-500 font-mono">Modify internal CUG databases.</p>
        </div>
        <div class="p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-cyber-blue/30 transition-all cursor-pointer group">
          <i data-lucide="messages-square" class="h-6 w-6 text-slate-500 mb-2 group-hover:text-cyber-blue transition-colors"></i>
          <h3 class="text-sm font-bold text-white font-mono uppercase">Feedback Corner Inbox</h3>
          <p class="text-[10px] text-slate-500 font-mono">Review queries and reply to personnel.</p>
        </div>
      </div>

      <!-- FEEDBACK INBOX SECTION -->
      <div class="rounded-2xl border p-6 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} space-y-4">
        <h3 class="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'} pb-2 flex items-center gap-1.5">
          <i data-lucide="inbox" class="h-4 w-4 text-cyber-blue"></i> Personnel Feedback Inbox
        </h3>

        ${feedbacks.length === 0 ? `
          <p class="text-xs text-slate-500 font-mono text-center py-6">No feedbacks submitted yet.</p>
        ` : `
          <div class="space-y-4">
            ${feedbacks.map(fb => {
              const hasReplied = fb.replies && fb.replies.length > 0;
              return `
                <div class="p-4 rounded-xl border ${isDark ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'} space-y-3">
                  <div class="flex justify-between items-start gap-2 flex-wrap">
                    <div>
                      <span class="text-xs font-bold text-white font-mono block">${fb.name}</span>
                      <span class="text-[9px] text-slate-500 font-mono">
                        PNO: <strong class="text-slate-300">${fb.pno}</strong> &nbsp;·&nbsp;
                        Mobile: <strong class="text-cyan-400 font-bold">${fb.mobile}</strong> &nbsp;·&nbsp;
                        Category: <strong class="text-cyber-blue uppercase font-bold">${fb.category}</strong>
                      </span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        hasReplied ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }">${hasReplied ? 'REPLIED' : 'PENDING ACTION'}</span>
                      <span class="text-[9px] text-slate-600 font-mono">${fb.time}</span>
                    </div>
                  </div>

                  <p class="text-[10px] text-slate-300 font-mono leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/30 whitespace-pre-wrap">${fb.message}</p>

                  ${hasReplied ? `
                    <div class="pl-4 border-l-2 border-emerald-500 space-y-1">
                      <span class="text-[8px] font-bold font-mono text-emerald-400 uppercase tracking-widest block">ADMIN REPLY:</span>
                      ${fb.replies.map(rep => `
                        <div>
                          <p class="text-[10px] text-slate-400 font-mono italic">${rep.text}</p>
                          <span class="text-[8px] text-slate-600 font-mono block">${rep.time}</span>
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}

                  <!-- REPLY ACTIONS -->
                  <div class="mt-2 pt-2 border-t border-slate-800/40">
                    <button onclick="window.toggleAdminReplyInput(${fb.id})" class="px-3 py-1.5 bg-cyber-blue/10 text-cyber-blue font-bold font-mono rounded-lg border border-cyber-blue/30 text-[9px] hover:bg-cyber-blue/20 transition-all uppercase flex items-center gap-1">
                      <i data-lucide="reply" class="h-3 w-3"></i> ${hasReplied ? 'Send Additional Response' : 'Write Response'}
                    </button>

                    <div id="reply-container-${fb.id}" class="hidden mt-3 space-y-2">
                      <textarea id="reply-text-${fb.id}" rows="2" placeholder="Type your response to ${fb.name}..." class="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 text-white rounded-xl outline-none focus:border-cyber-blue text-xs font-mono resize-none"></textarea>
                      <div class="flex gap-2 justify-end">
                        <button onclick="window.toggleAdminReplyInput(${fb.id})" class="px-3 py-1.5 bg-slate-800 text-slate-400 font-bold font-mono rounded-lg text-[9px] hover:bg-slate-700 transition-all uppercase">Cancel</button>
                        <button onclick="window.submitAdminReply(${fb.id})" class="px-4 py-1.5 bg-emerald-500 text-cyber-950 font-bold font-mono rounded-lg text-[9px] hover:bg-emerald-400 transition-all uppercase">Post Response</button>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  // Toggle Reply Inputs
  window.toggleAdminReplyInput = (id) => {
    const el = document.getElementById(`reply-container-${id}`);
    if (el) el.classList.toggle('hidden');
  };

  // Submit replies
  window.submitAdminReply = (id) => {
    const txtEl = document.getElementById(`reply-text-${id}`);
    const text = txtEl ? txtEl.value.trim() : '';
    if (!text) return;

    const list = getFeedbacks();
    const fb = list.find(f => f.id === id);
    if (fb) {
      if (!fb.replies) fb.replies = [];
      fb.replies.push({
        from: 'admin',
        text,
        time: new Date().toLocaleString()
      });
      localStorage.setItem('pm_feedbacks', JSON.stringify(list));
      logActivity(`Admin replied to feedback ID: ${id}`, 'system');
      
      // Re-render Admin Dashboard
      renderAdminDashboard(container);
    }
  };

  lucide.createIcons();
}

window.pmLogin = function(e) {
  e.preventDefault();
  const uid = document.getElementById('login-userId').value;
  const pwd = document.getElementById('login-password').value;
  const errorBox = document.getElementById('login-error');
  const panel = document.getElementById('login-panel');
  
  if (uid === '8210133200' && pwd === 'Vinayak@123') {
    // Success
    localStorage.setItem('pm_auth_token', 'true');
    window.appState.isAuthenticated = true;
    renderApp();
  } else {
    // Fail
    errorBox.classList.remove('hidden');
    panel.classList.add('animate-shake');
    setTimeout(() => panel.classList.remove('animate-shake'), 400); // Remove class after animation
  }
};

window.pmLogout = function() {
  localStorage.removeItem('pm_auth_token');
  window.appState.isAuthenticated = false;
  
  // Clear any existing session timers when logging out
  if(window.appState.sessionTimer) {
     clearInterval(window.appState.sessionTimer);
     window.appState.sessionTimer = null;
  }
  
  renderApp(); // This will naturally fallback to renderLoginScreen
};

// -----------------------------------------------------------------------------
// 8. Core Layout
function renderApp() {
  const container = document.getElementById('app');
  if (!container) return;
  
  const t = window.t;
  
  if (!window.appState.sessionTimer) {
    startSessionTimer();
  }

  const isDark = window.appState.theme === 'dark';
  const collapsed = window.appState.sidebarCollapsed;

  const menuItems = [
    { id: 'dashboard', label: t('navDashboard'), icon: 'layout-dashboard' },
    { id: 'admin', label: t('navAdmin'), icon: window.appState.isAuthenticated ? 'unlock' : 'lock' },
    { id: 'nodal_search', label: t('navNodalSearch'), icon: 'git-branch' },
    { id: 'cyber_tools', label: t('navCyberTools'), icon: 'shield-alert' },
    { id: 'cyber_dashboard', label: t('navCyberDashboard'), icon: 'fingerprint' },
    { id: 'cdr_analysis', label: t('navCdrAnalysis'), icon: 'activity' },
    { id: 'law', label: t('navLaw'), icon: 'scale' },
    { id: 'documents', label: t('navDocs'), icon: 'file-text' },
    { id: 'salary', label: t('navSalary'), icon: 'wallet' },
    { id: 'contacts', label: t('navContacts'), icon: 'contact' },
    { id: 'feedback', label: t('navFeedback'), icon: 'message-square-plus' },
    { id: 'utilities', label: t('navUtilities'), icon: 'wrench' }
  ];

  container.innerHTML = `
    <div class="flex w-full overflow-hidden" style="height:100vh;${isDark ? 'background:#050B14;color:#f1f5f9;' : 'background:#f8fafc;color:#1e293b;'}">
      
      <!-- MOBILE SIDEBAR OVERLAY -->
      <div id="pm-mobile-sidebar" class="fixed inset-0 z-50 flex md:hidden ${window.appState.mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-out shadow-2xl">
        <div onclick="toggleMobileSidebar()" class="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10"></div>
        <div class="h-full w-72 flex flex-col ${isDark ? 'bg-cyber-900 border-r border-slate-800' : 'bg-white border-r border-slate-200'}">
          <div class="p-6 border-b flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-200'}">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-lg bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/30 shadow-cyber-glow">
                <i data-lucide="shield" class="h-5.5 w-5.5 text-cyber-blue"></i>
              </div>
              <div>
                <h1 class="text-sm font-extrabold tracking-wider text-cyber-blue font-mono">${t('portalTitle')}</h1>
                <p class="text-[9px] uppercase font-mono tracking-widest text-slate-500">${t('portalSubtitle')}</p>
              </div>
            </div>
            <button onclick="toggleMobileSidebar()" class="p-1.5 rounded-full hover:bg-slate-800 text-slate-400">
              <i data-lucide="x" class="h-5 w-5"></i>
            </button>
          </div>
          <nav class="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
            ${menuItems.map(item => {
              const active = window.appState.currentPage === item.id;
              return `
                <button onclick="navigate('${item.id}'); toggleMobileSidebar();" class="flex items-center gap-3.5 w-full py-3.5 px-4 rounded-xl text-xs font-semibold font-mono tracking-wider uppercase transition-all duration-200 ${
                  active 
                    ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 shadow-cyber-glow font-bold' 
                    : isDark 
                      ? 'text-slate-400 hover:bg-slate-800/40 hover:text-white border border-transparent' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                }">
                  <i data-lucide="${item.icon}" class="h-5 w-5 shrink-0 ${active ? 'text-cyber-blue' : 'text-slate-500'}"></i>
                  <span>${item.label}</span>
                </button>
              `;
            }).join('')}
          </nav>
          
          <div class="p-4 border-t ${isDark ? 'border-slate-800 bg-slate-950/20' : 'border-slate-200 bg-slate-50'}">
            <div class="flex items-center gap-3 w-full p-1 min-w-0">
              <div class="h-8 w-8 rounded-full bg-cyber-blue/10 flex items-center justify-center shrink-0 border border-cyber-blue/20">
                <i data-lucide="user" class="h-4 w-4 text-cyber-blue"></i>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-xs font-bold truncate text-white">UP Police Desk</p>
                <p class="text-[9px] truncate text-slate-500 uppercase font-mono">Duty Roster Active</p>
              </div>
            </div>
            <div class="w-full mt-3 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'} font-mono text-[9px] text-slate-500 flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1">
                  <span class="h-1.5 w-1.5 rounded-full bg-cyber-success animate-pulse shrink-0"></span>
                  <span>PORTAL TRAFFIC VISITS</span>
                </span>
                <span class="text-cyber-blue font-bold px-1.5 py-0.5 rounded bg-cyber-blue/15 border border-cyber-blue/20 tracking-wider font-mono text-[10px]" id="pm-mobile-page-counter">
                  ${String(window.appState.visits || 0).padStart(5, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- COLLAPSIBLE SIDEBAR -->
      <aside class="hidden md:flex flex-col border-r transition-all duration-300 shrink-0 ${
        collapsed ? 'w-20 hover:w-72' : 'w-72'
      } group ${isDark ? 'bg-cyber-900 border-slate-800' : 'bg-white border-slate-200'}" style="height:100%;" id="pm-sidebar-node">
        
        <div class="p-6 border-b flex items-center justify-between overflow-hidden ${isDark ? 'border-slate-800' : 'border-slate-200'}">
          <div class="flex items-center gap-3 min-w-0">
            <div class="h-10 w-10 rounded-lg bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/30 shadow-cyber-glow shrink-0 animate-neon-pulse">
              <i data-lucide="shield" class="h-5.5 w-5.5 text-cyber-blue"></i>
            </div>
            ${collapsed ? `
              <div class="truncate hidden group-hover:block transition-all duration-200">
                <h1 class="text-sm font-extrabold tracking-wider text-cyber-blue font-mono">${t('portalTitle')}</h1>
                <p class="text-[9px] uppercase font-mono tracking-widest text-slate-500">${t('portalSubtitle')}</p>
              </div>
            ` : `
              <div class="truncate">
                <h1 class="text-sm font-extrabold tracking-wider text-cyber-blue font-mono">${t('portalTitle')}</h1>
                <p class="text-[9px] uppercase font-mono tracking-widest text-slate-500">${t('portalSubtitle')}</p>
              </div>
            `}
          </div>
          ${!collapsed ? `
            <button onclick="toggleSidebar()" class="p-1 rounded hover:bg-slate-800/60 text-slate-400 hover:text-white shrink-0">
              <i data-lucide="chevron-left" class="h-4.5 w-4.5"></i>
            </button>
          ` : ''}
        </div>

        <nav class="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          ${menuItems.map(item => {
            const active = window.appState.currentPage === item.id;
            return `
              <button onclick="navigate('${item.id}')" class="flex items-center gap-3.5 w-full py-3.5 rounded-xl text-xs font-semibold font-mono tracking-wider uppercase transition-all duration-200 ${
                collapsed ? 'px-4 lg:px-3 justify-start' : 'px-4'
              } ${
                active 
                  ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 shadow-cyber-glow font-bold' 
                  : isDark 
                    ? 'text-slate-400 hover:bg-slate-800/40 hover:text-white border border-transparent' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
              }" title="${item.label}">
                <i data-lucide="${item.icon}" class="h-5 w-5 shrink-0 ${active ? 'text-cyber-blue' : 'text-slate-500'}"></i>
                ${collapsed ? `<span class="hidden group-hover:inline transition-all duration-200 whitespace-nowrap">${item.label}</span>` : `<span class="whitespace-nowrap">${item.label}</span>`}
              </button>
            `;
          }).join('')}
        </nav>

        <div class="p-4 border-t flex flex-col justify-center items-center ${isDark ? 'border-slate-800 bg-slate-950/20' : 'border-slate-200 bg-slate-50'}">
          <div class="flex items-center gap-3 w-full p-1 min-w-0">
            <div class="h-8 w-8 rounded-full bg-cyber-blue/10 flex items-center justify-center shrink-0 border border-cyber-blue/20">
              <i data-lucide="user" class="h-4 w-4 text-cyber-blue"></i>
            </div>
            <div class="min-w-0 flex-1 ${collapsed ? 'hidden group-hover:block' : ''} transition-all duration-200">
              <p class="text-xs font-bold truncate text-white">UP Police Desk</p>
              <p class="text-[9px] truncate text-slate-500 uppercase font-mono">Duty Roster Active</p>
            </div>
          </div>
          <div class="w-full ${collapsed ? 'hidden group-hover:block' : ''} mt-3 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'} font-mono text-[9px] text-slate-500 flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span class="flex items-center gap-1">
                <span class="h-1.5 w-1.5 rounded-full bg-cyber-success animate-pulse shrink-0"></span>
                <span>PORTAL TRAFFIC VISITS</span>
              </span>
              <span class="text-cyber-blue font-bold px-1.5 py-0.5 rounded bg-cyber-blue/15 border border-cyber-blue/20 tracking-wider font-mono text-[10px]" id="pm-page-counter">
                ${String(window.appState.visits || 0).padStart(5, '0')}
              </span>
            </div>
          </div>
        </div>
      </aside>

      <!-- WORKSPACE -->
      <div class="flex-1 flex flex-col overflow-hidden" style="height:100%;">
        
        <header class="h-16 border-b flex items-center justify-between px-6 shrink-0 z-30 shadow-md ${isDark ? 'bg-cyber-900 border-slate-800' : 'bg-white border-slate-200'}">
          <div class="flex items-center gap-4">
            <!-- Mobile Menu Toggle -->
            <button onclick="toggleMobileSidebar()" class="md:hidden flex items-center gap-2 py-2 px-3.5 rounded-xl border text-cyber-blue hover:text-white transition-all bg-cyber-blue/10 border-cyber-blue/30 shrink-0 shadow-[0_0_12px_rgba(0,240,255,0.25)] animate-pulse">
              <i data-lucide="menu" class="h-4.5 w-4.5 shrink-0"></i>
              <span class="text-[9px] font-extrabold font-mono tracking-wider uppercase">ALL TOOLS / मेन्यू</span>
            </button>
            <div class="hidden sm:flex flex-col">
              <span class="text-[10px] font-bold tracking-widest text-cyber-blue uppercase font-mono">${t('govLabel')}</span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'}">
              <i data-lucide="clock" class="h-3.5 w-3.5 text-cyber-blue"></i>
              <span class="text-slate-500 font-bold">${t('sessionTimerLabel')}</span>
              <span id="session-countdown" class="font-bold text-cyber-blue">30:00</span>
            </div>

            <button onclick="toggleLanguage()" class="p-2 rounded-lg border text-[10px] font-bold font-mono transition-all hover:scale-105 duration-150 ${isDark ? 'bg-slate-800 border-slate-700 text-cyber-blue' : 'bg-white border-slate-300 text-cyber-blue'}">
              ${window.appState.lang === 'en' ? 'हिन्दी' : 'ENG'}
            </button>
            <button onclick="toggleTheme()" class="p-2 rounded-lg border transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-cyber-blue' : 'bg-white border-slate-300 text-cyber-blue'}">
              <i data-lucide="${isDark ? 'sun' : 'moon'}" class="h-4.5 w-4.5"></i>
            </button>
            ${window.appState.isAuthenticated ? `
            <button onclick="window.pmLogout()" class="p-2 ml-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)] font-mono text-[10px] font-bold flex items-center gap-1 uppercase" title="${t('logout')}">
              <i data-lucide="log-out" class="h-4.5 w-4.5"></i>
            </button>` : ''}


            <button onclick="toggleNotificationDrawer()" class="p-2 rounded-lg border relative transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-600'}">
              <i data-lucide="bell" class="h-4.5 w-4.5"></i>
              ${window.appState.notifications.filter(n => !n.read).length > 0 ? `<span class="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-cyber-blue"></span>` : ''}
            </button>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto p-6 space-y-6">
          <div id="page-content" class="max-w-7xl mx-auto space-y-6"></div>
          <footer id="pm-footer" class="border-t mt-12 py-8 ${isDark ? 'border-slate-800 bg-cyber-950 text-slate-500' : 'border-slate-200 bg-slate-100 text-slate-600'}"></footer>
        </main>
      </div>

      <!-- ALERTS BELL DRAWER -->
      <div id="notification-drawer" class="fixed inset-y-0 right-0 z-40 w-80 max-w-full flex ${window.appState.notificationDrawerOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-out shadow-2xl">
        <div onclick="toggleNotificationDrawer()" class="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10"></div>
        <div class="h-full w-full flex flex-col ${isDark ? 'bg-cyber-900 border-l border-slate-800' : 'bg-white border-l border-slate-200'}">
          <div class="p-6 border-b flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-200'}">
            <div class="flex items-center gap-2">
              <i data-lucide="shield-alert" class="h-5 w-5 text-cyber-blue"></i>
              <h2 class="font-bold text-sm tracking-wider font-mono uppercase">${t('notificationsTitle')}</h2>
            </div>
            <button onclick="toggleNotificationDrawer()" class="p-1 rounded-full ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}">
              <i data-lucide="x" class="h-5 w-5"></i>
            </button>
          </div>
          
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            ${window.appState.notifications.length === 0 ? `
              <p class="text-xs text-center text-slate-500 py-8">${t('noNotifications')}</p>
            ` : window.appState.notifications.map(n => `
              <div class="p-3.5 rounded-xl border relative transition-all hover:scale-[1.01] ${
                !n.read 
                  ? isDark 
                    ? 'bg-slate-800/80 border-cyber-blue/40 text-white' 
                    : 'bg-blue-50/50 border-cyber-blue/40 text-slate-900' 
                  : isDark 
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400' 
                    : 'bg-slate-50 border-slate-200 text-slate-600'
              }">
                <div class="flex justify-between items-start gap-2 mb-1">
                  <span class="text-[9px] font-mono font-bold text-cyber-blue">ALERTS</span>
                  <span class="text-[9px] text-slate-500">${n.time}</span>
                </div>
                <p class="text-xs leading-relaxed font-semibold font-mono">${n.text}</p>
              </div>
            `).join('')}
          </div>
          
          <div class="p-4 border-t ${isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50'}">
            <button onclick="markAllNotificationsRead()" class="w-full text-center py-2.5 px-4 text-xs font-semibold rounded-lg bg-cyber-blue text-cyber-950 hover:bg-white transition-all shadow-cyber-glow">
              ${t('markAllRead')}
            </button>
          </div>
        </div>
      </div>

      <!-- GLOBAL VIDEO MODAL -->
      ${window.appState.videoModalOpen ? `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div onclick="window.pmCloseVideoModal()" class="absolute inset-0 bg-slate-950/80 backdrop-blur-md"></div>
          <div class="relative w-full max-w-5xl rounded-2xl border border-cyber-blue/30 bg-cyber-900 shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 opacity-100 animate-in fade-in zoom-in-95 duration-300">
            
            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/50">
              <div class="flex items-center gap-3">
                <div class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                <h3 class="text-sm font-bold font-mono tracking-wider text-white uppercase">CYBER UPDATE VIDEO PLAYER</h3>
              </div>
              <button onclick="window.pmCloseVideoModal()" class="p-2 rounded hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors">
                <i data-lucide="x" class="h-5 w-5"></i>
              </button>
            </div>

            <!-- Player Container -->
            <div class="relative w-full bg-black" style="padding-top: 56.25%;">
              <iframe 
                class="absolute inset-0 w-full h-full border-0"
                src="https://www.youtube.com/embed/${window.appState.currentVideoId}?autoplay=1&rel=0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>

            <!-- Footer Action -->
            <div class="p-4 bg-slate-950/80 border-t border-slate-800 flex justify-between items-center sm:flex-row flex-col gap-4">
              <p class="text-xs text-slate-400 font-mono">Channel: @Smart_Cyber_Cops</p>
              <div class="flex gap-2">
                <button onclick="navigator.clipboard.writeText('https://youtu.be/${window.appState.currentVideoId}'); alert('Link copied!');" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-mono text-xs transition-all flex items-center gap-2">
                  <i data-lucide="link" class="h-3.5 w-3.5"></i> Copy Link
                </button>
                <a href="https://www.youtube.com/@Smart_Cyber_Cops?sub_confirmation=1" target="_blank" class="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold font-mono text-xs uppercase transition-all shadow-lg flex items-center gap-2">
                  <i data-lucide="youtube" class="h-4 w-4"></i> Subscribe
                </a>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

    </div>
  `;

  const pageContainer = document.getElementById('page-content');
  if (pageContainer) {
    if (window.appState.currentPage === 'dashboard') {
      renderDashboard(window.appState, pageContainer);
    } else if (window.appState.currentPage === 'cyber_tools') {
      renderCyberTools(window.appState, pageContainer);
    } else if (window.appState.currentPage === 'admin') {
      if (!window.appState.isAuthenticated) {
        renderLoginScreen(pageContainer);
      } else {
        renderAdminDashboard(pageContainer);
      }
    } else if (window.appState.currentPage === 'nodal_search') {
      renderNodalSearch(window.appState, pageContainer);
    } else if (window.appState.currentPage === 'cyber_dashboard') {
      renderCyberDashboard(window.appState, pageContainer);
    } else if (window.appState.currentPage === 'cdr_analysis') {
      renderCdrAnalysis(window.appState, pageContainer);
    } else if (window.appState.currentPage === 'law') {
      renderLawAssistance(window.appState, pageContainer);
    } else if (window.appState.currentPage === 'documents') {
      renderDocuments(window.appState, pageContainer);
    } else if (window.appState.currentPage === 'salary') {
      renderSalaryWelfare(window.appState, pageContainer);
    } else if (window.appState.currentPage === 'contacts') {
      renderContacts(window.appState, pageContainer);
    } else if (window.appState.currentPage === 'feedback') {
      renderFeedback(window.appState, pageContainer);
    } else if (window.appState.currentPage === 'utilities') {
      renderUtilities(window.appState, pageContainer);
    }
  }

  const footerContainer = document.getElementById('pm-footer');
  if (footerContainer) {
    renderFooter(window.appState, footerContainer);
  }
}

if (document.readyState !== 'loading') {
  window.initApp();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    window.initApp();
  });
}
export default window.initApp;
