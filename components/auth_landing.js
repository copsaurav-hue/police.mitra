
// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - Administrative Welcome Landing Component

export function renderAuthLanding(state, container) {
  const isDark = state.theme === 'dark';
  container.innerHTML = `
    <div class="space-y-6 text-center max-w-xl mx-auto py-12">
      <div class="inline-block h-16 w-16 bg-cyber-blue/10 border border-cyber-blue/40 rounded-full flex items-center justify-center shadow-cyber-glow mb-4">
        <i data-lucide="shield-check" class="h-8 w-8 text-cyber-blue"></i>
      </div>
      <h2 class="text-2xl font-bold text-white uppercase tracking-wider font-mono">Administrative Center</h2>
      <p class="text-xs text-slate-400 font-mono">Jai Hind! Access granted to internal database nodes.</p>
      
      <div class="grid grid-cols-2 gap-4 mt-8">
        <button onclick="navigate('admin')" class="p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-cyber-blue/30 text-xs font-mono font-bold text-white uppercase transition-all">
          <i data-lucide="inbox" class="h-5 w-5 mx-auto mb-2 text-cyber-blue"></i> Feedback Corner Inbox
        </button>
        <button onclick="navigate('dashboard')" class="p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-cyber-blue/30 text-xs font-mono font-bold text-white uppercase transition-all">
          <i data-lucide="layout-dashboard" class="h-5 w-5 mx-auto mb-2 text-cyber-blue"></i> Back to Dashboard
        </button>
      </div>
    </div>
  `;
  lucide.createIcons();
}
export default renderAuthLanding;
