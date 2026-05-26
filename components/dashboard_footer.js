// Police Mitra - Dashboard Footer Component
export function renderFooter(state, container) {
  const isDark = state.theme === 'dark';
  
  // Translation
  const text = {
    en: {
      secNote: "INTERNAL GOVERNMENT NODE • SECURITY VPN ACTIVE",
      privacy: "Department Terms & Access Guidelines",
      contactUs: "HQ Cyber Cell Support Hotline: 1930",
      alertNote: "WARNING: All telemetry, inputs, and search queries performed on this node are forensically logged for institutional audits."
    },
    hi: {
      secNote: "आंतरिक सरकारी नोड • सुरक्षा वीपीएन सक्रिय",
      privacy: "विभाग नियम और पहुंच दिशानिर्देश",
      contactUs: "मुख्यालय साइबर सेल सपोर्ट हॉटलाइन: 1930",
      alertNote: "चेतावनी: संस्थागत ऑडिट के लिए इस नोड पर किए गए सभी टेलीमेट्री, इनपुट और खोज प्रश्नों को फॉरेंसिक रूप से लॉग किया जाता है।"
    }
  }[state.lang];

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 space-y-6">
      
      <!-- Upper: Brand & Security -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${
        isDark ? 'border-slate-800/80' : 'border-slate-300'
      }">
        <div class="flex items-center gap-3">
          <div class="h-9 w-9 rounded-lg bg-police-gold-500/10 flex items-center justify-center border border-police-gold-500/20 text-police-gold-500">
            <i data-lucide="shield" class="h-5 w-5"></i>
          </div>
          <div>
            <h5 class="text-xs font-bold font-mono tracking-wider text-white">POLICE MITRA SYSTEMS</h5>
            <p class="text-[9px] uppercase font-mono tracking-widest text-slate-500">${text.secNote}</p>
          </div>
        </div>

        <div class="flex items-center gap-4 text-[10px] font-mono font-medium text-slate-400">
          <button onclick="alert('Guideline documentation loaded!')" class="hover:text-police-gold-500 hover:underline">${text.privacy}</button>
          <span>•</span>
          <a href="tel:1930" class="hover:text-police-gold-500 hover:underline">${text.contactUs}</a>
        </div>
      </div>

      <!-- Center: Reactive Activity Log Drawer inside Footer -->
      <div class="p-4 rounded-xl border border-slate-800 bg-slate-950/40 font-mono text-[9px] text-slate-500">
        <div class="flex justify-between items-center mb-2.5 border-b border-slate-800/60 pb-1.5 font-bold uppercase tracking-wider text-police-gold-500">
          <span>ACTIVE SESSION SECURITY FORENSIC LOGS</span>
          <span class="text-[8px] text-police-success">ONLINE</span>
        </div>
        <div class="space-y-1 max-h-24 overflow-y-auto pr-1" id="activity-logs-container">
          ${state.activities.slice(0, 3).map(act => `
            <div class="flex items-center justify-between py-0.5 border-b border-slate-900/60">
              <span>[${act.time}] AUDIT: ${act.text}</span>
              <span class="uppercase text-[8px] font-bold text-slate-400">[NODE-${act.category.toUpperCase()}]</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Lower: Legal Disclaimer -->
      <p class="text-[9px] leading-relaxed font-mono text-center text-slate-600 max-w-3xl mx-auto">
        ${text.alertNote}
      </p>

    </div>
  `;
}
