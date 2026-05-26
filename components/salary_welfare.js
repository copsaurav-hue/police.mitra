
// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - Salary, Welfare & Legal Status Component

export function renderSalaryWelfare(state, container) {
  const isDark = state.theme === 'dark';

  const tLocal = {
    en: {
      header: "SALARY, GPF & WELFARE SERVICES",
      desc: "Access Pay Slip, GPF Statement, NPS Details, and High Court Case Status — all from one secure desk.",
      sectionFinance: "Finance & Accounts",
      sectionLegal: "Legal & Case Status",
      payTitle: "Pay Slip Details",
      payDesc: "View your monthly salary statement via Koshvani portal. Check deductions, allowances, and net pay.",
      payBtn: "VIEW PAY SLIP",
      gpfTitle: "GPF Statement",
      gpfDesc: "Access your General Provident Fund (GPF) account details, balance, and transaction history via AGUP.",
      gpfBtn: "VIEW GPF DETAILS",
      npsTitle: "NPS Account",
      npsDesc: "Check your National Pension System (NPS) contributions, fund value, and transaction statement via CRA-NSDL.",
      npsBtn: "VIEW NPS DETAILS",
      courtTitle: "High Court Case Status",
      courtDesc: "Track case status, hearing dates, and orders from the Allahabad High Court CCMS system.",
      courtBtn: "CHECK CASE STATUS"
    },
    hi: {
      header: "वेतन, जीपीएफ और कल्याण सेवाएं",
      desc: "पे स्लिप, जीपीएफ विवरण, एनपीएस और उच्च न्यायालय केस स्थिति — सब एक डेस्क से।",
      sectionFinance: "वित्त और लेखा",
      sectionLegal: "कानूनी और केस स्थिति",
      payTitle: "वेतन पर्ची विवरण",
      payDesc: "कोषवाणी पोर्टल के माध्यम से अपना मासिक वेतन विवरण देखें। कटौती, भत्ते और शुद्ध वेतन जांचें।",
      payBtn: "वेतन पर्ची देखें",
      gpfTitle: "जीपीएफ विवरण",
      gpfDesc: "AGUP के माध्यम से अपने सामान्य भविष्य निधि (GPF) खाते का विवरण, शेष राशि और लेनदेन इतिहास देखें।",
      gpfBtn: "जीपीएफ देखें",
      npsTitle: "एनपीएस खाता",
      npsDesc: "CRA-NSDL के माध्यम से अपने राष्ट्रीय पेंशन प्रणाली (NPS) योगदान, फंड मूल्य और विवरण देखें।",
      npsBtn: "एनपीएस देखें",
      courtTitle: "उच्च न्यायालय केस स्थिति",
      courtDesc: "इलाहाबाद उच्च न्यायालय CCMS प्रणाली से केस स्थिति, सुनवाई तिथियां और आदेश ट्रैक करें।",
      courtBtn: "केस स्थिति जांचें"
    }
  }[state.lang];

  const cardBase = isDark
    ? 'bg-cyber-900 border-slate-800 text-slate-200'
    : 'bg-white border-slate-200 text-slate-800 shadow-sm';

  container.innerHTML =
    '<div class="space-y-8">' +

      // Header
      '<div>' +
        '<h2 class="text-xl font-bold font-mono tracking-tight text-cyber-blue flex items-center gap-2">' +
          '<i data-lucide="wallet" class="h-6 w-6"></i>' +
          '<span>' + tLocal.header + '</span>' +
        '</h2>' +
        '<p class="text-xs text-slate-500 mt-0.5 font-mono">' + tLocal.desc + '</p>' +
      '</div>' +

      // Section: Finance
      '<div class="space-y-4">' +
        '<h3 class="text-xs font-bold font-mono tracking-widest uppercase text-cyber-blue flex items-center gap-2 border-b pb-2 ' + (isDark ? 'border-slate-800' : 'border-slate-200') + '">' +
          '<i data-lucide="indian-rupee" class="h-4 w-4"></i>' +
          tLocal.sectionFinance +
        '</h3>' +

        '<div class="grid grid-cols-1 md:grid-cols-3 gap-4">' +

          // Card 1: Pay Slip
          '<div class="p-6 rounded-xl border transition-all hover:scale-[1.01] hover:border-amber-500/40 flex flex-col justify-between ' + cardBase + '">' +
            '<div class="mb-4">' +
              '<div class="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3 border border-amber-500/20">' +
                '<i data-lucide="receipt" class="h-6 w-6 text-amber-500"></i>' +
              '</div>' +
              '<h4 class="font-bold text-sm font-mono ' + (isDark ? 'text-white' : 'text-slate-900') + '">' + tLocal.payTitle + '</h4>' +
              '<p class="text-[11px] text-slate-500 mt-1 leading-relaxed">' + tLocal.payDesc + '</p>' +
            '</div>' +
            '<button onclick="window.pmOpenExternal(\'https://koshvani.up.nic.in/KoshReports/EmpSalDetail.aspx\', \'Pay Slip\')" class="w-full py-3 rounded-lg font-mono font-bold tracking-wider text-xs transition-all duration-200 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-amber-950 border border-amber-500/30 flex items-center justify-center gap-2">' +
              '<i data-lucide="external-link" class="h-4 w-4"></i>' +
              '<span>' + tLocal.payBtn + '</span>' +
            '</button>' +
          '</div>' +

          // Card 2: GPF
          '<div class="p-6 rounded-xl border transition-all hover:scale-[1.01] hover:border-emerald-500/40 flex flex-col justify-between ' + cardBase + '">' +
            '<div class="mb-4">' +
              '<div class="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3 border border-emerald-500/20">' +
                '<i data-lucide="piggy-bank" class="h-6 w-6 text-emerald-500"></i>' +
              '</div>' +
              '<h4 class="font-bold text-sm font-mono ' + (isDark ? 'text-white' : 'text-slate-900') + '">' + tLocal.gpfTitle + '</h4>' +
              '<p class="text-[11px] text-slate-500 mt-1 leading-relaxed">' + tLocal.gpfDesc + '</p>' +
            '</div>' +
            '<button onclick="window.pmOpenExternal(\'https://agup.nic.in/dactslipo.asp\', \'GPF\')" class="w-full py-3 rounded-lg font-mono font-bold tracking-wider text-xs transition-all duration-200 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-emerald-950 border border-emerald-500/30 flex items-center justify-center gap-2">' +
              '<i data-lucide="external-link" class="h-4 w-4"></i>' +
              '<span>' + tLocal.gpfBtn + '</span>' +
            '</button>' +
          '</div>' +

          // Card 3: NPS
          '<div class="p-6 rounded-xl border transition-all hover:scale-[1.01] hover:border-violet-500/40 flex flex-col justify-between ' + cardBase + '">' +
            '<div class="mb-4">' +
              '<div class="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3 border border-violet-500/20">' +
                '<i data-lucide="landmark" class="h-6 w-6 text-violet-500"></i>' +
              '</div>' +
              '<h4 class="font-bold text-sm font-mono ' + (isDark ? 'text-white' : 'text-slate-900') + '">' + tLocal.npsTitle + '</h4>' +
              '<p class="text-[11px] text-slate-500 mt-1 leading-relaxed">' + tLocal.npsDesc + '</p>' +
            '</div>' +
            '<button onclick="window.pmOpenExternal(\'https://cra.nps-proteantech.in/CRA/\', \'NPS\')" class="w-full py-3 rounded-lg font-mono font-bold tracking-wider text-xs transition-all duration-200 bg-violet-500/10 text-violet-500 hover:bg-violet-500 hover:text-violet-950 border border-violet-500/30 flex items-center justify-center gap-2">' +
              '<i data-lucide="external-link" class="h-4 w-4"></i>' +
              '<span>' + tLocal.npsBtn + '</span>' +
            '</button>' +
          '</div>' +

        '</div>' +
      '</div>' +

      // Section: Legal & Case Status
      '<div class="space-y-4">' +
        '<h3 class="text-xs font-bold font-mono tracking-widest uppercase text-cyber-blue flex items-center gap-2 border-b pb-2 ' + (isDark ? 'border-slate-800' : 'border-slate-200') + '">' +
          '<i data-lucide="scale" class="h-4 w-4"></i>' +
          tLocal.sectionLegal +
        '</h3>' +

        '<div class="grid grid-cols-1 md:grid-cols-1 max-w-xl gap-4">' +

          // Card: High Court Case Status
          '<div class="p-6 rounded-xl border transition-all hover:scale-[1.01] hover:border-sky-500/40 flex flex-col justify-between ' + cardBase + '">' +
            '<div class="mb-4">' +
              '<div class="h-12 w-12 rounded-xl bg-sky-500/10 flex items-center justify-center mb-3 border border-sky-500/20">' +
                '<i data-lucide="gavel" class="h-6 w-6 text-sky-500"></i>' +
              '</div>' +
              '<h4 class="font-bold text-sm font-mono ' + (isDark ? 'text-white' : 'text-slate-900') + '">' + tLocal.courtTitle + '</h4>' +
              '<p class="text-[11px] text-slate-500 mt-1 leading-relaxed">' + tLocal.courtDesc + '</p>' +
            '</div>' +
            '<button onclick="window.pmOpenExternal(\'https://www.allahabadhighcourt.in/apps/status_ccms/\', \'High Court Case Status\')" class="w-full py-3 rounded-lg font-mono font-bold tracking-wider text-xs transition-all duration-200 bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-sky-950 border border-sky-500/30 flex items-center justify-center gap-2">' +
              '<i data-lucide="external-link" class="h-4 w-4"></i>' +
              '<span>' + tLocal.courtBtn + '</span>' +
            '</button>' +
          '</div>' +

        '</div>' +
      '</div>' +

    '</div>';

  // Global handler for opening external links
  window.pmOpenExternal = function(url, label) {
    logActivity('Opened external portal: ' + label, 'salary_welfare');
    window.open(url, '_blank');
  };

  lucide.createIcons();
}
