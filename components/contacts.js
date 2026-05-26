
// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - Contacts Directory Component (Rewritten - Lazy Load)

// Global cache for police stations data
let _stationsCache = null;

async function loadStationsData() {
  if (_stationsCache) return _stationsCache;
  try {
    const resp = await fetch('./components/contacts_data.js');
    const text = await resp.text();
    // Extract the JSON array from the JS module
    const jsonStr = text.replace('export const policeStationsData = ', '').replace(/;\s*$/, '');
    _stationsCache = JSON.parse(jsonStr);
    return _stationsCache;
  } catch (e) {
    console.error('Failed to load police stations data:', e);
    return [];
  }
}

export function renderContacts(state, container) {
  const isDark = state.theme === 'dark';

  const tLocal = {
    en: {
      header: "POLICE DEPT CONTACTS DIRECTORY",
      desc: "Emergency response coordinates, Officers, and District Police Stations.",
      filterEmerg: "Emergency",
      filterOfficers: "Officers (Training)",
      filterStations: "All Police Stations",
      phSearch: "Search name, station, district, phone...",
      showing: "Showing",
      of: "of",
      results: "results",
      prev: "Prev",
      next: "Next",
      loading: "Loading police stations data..."
    },
    hi: {
      header: "पुलिस विभाग संपर्क निर्देशिका",
      desc: "आपातकालीन नंबर, अधिकारी, और जिला पुलिस स्टेशन।",
      filterEmerg: "आपातकालीन",
      filterOfficers: "अधिकारी (प्रशिक्षण)",
      filterStations: "सभी पुलिस स्टेशन",
      phSearch: "नाम, स्टेशन, जिला, फोन खोजें...",
      showing: "दिखा रहा है",
      of: "में से",
      results: "परिणाम",
      prev: "पिछला",
      next: "अगला",
      loading: "पुलिस स्टेशन डेटा लोड हो रहा है..."
    }
  }[state.lang];

  // Core contacts
  const coreContacts = [
    { name: "National Cyber Crime Helpline", role: "Immediate Incident reporting", phone: "1930", email: "incident@cybercrime.gov.in", category: "emergency" },
    { name: "State Emergency Desk", role: "Integrated Emergency Helpline", phone: "112", email: "desk112@police.gov.in", category: "emergency" },
    { name: "Women Helpline Cell", role: "Nodal Crime Against Women Desk", phone: "1090", email: "womenhelp@police.gov.in", category: "emergency" },
    
    // Officers
    { name: "RAJEEV SABHARWAL, DG", role: "DG/TRAINING HQRS/ DR.BRAP ACADEMY", phone: "9454400108", email: "dgtraining@nic.in", category: "officers" },
    { name: "NAVNIET SAKERA, ADG", role: "ADG/PTS", phone: "9454400169", email: "ptcun-up@nic.in", category: "officers" },
    { name: "VIJAY SINGH MEENA, ADG", role: "ADG/PTC", phone: "9454400188", email: "ptcstp@nic.in", category: "officers" },
    { name: "AMIT CHANDRA, ADG", role: "ADG/PTC", phone: "9454400126", email: "ptcmdd@nic.in", category: "officers" },
    { name: "BADUGU DEVA PAULSON, ADG", role: "ADG/TRAINING HQRS", phone: "9454400134", email: "adgtraining.up@nic.in", category: "officers" },
    { name: "DHARMENDRA SINGH, IG", role: "IG/RTC CHUNAR", phone: "9454400237", email: "spcnr.apts.mi-up@gov.in", category: "officers" },
    { name: "VINOD KUMAR SINGH, IG", role: "IG/DR.BRAP ACADEMY", phone: "9454400153", email: "polacademy@nic.in", category: "officers" },
    { name: "GEETA SINGH, IG", role: "IG/TRAINING HQRS", phone: "-", email: "-", category: "officers" },
    { name: "POONAM, DIG", role: "DIG/PRINCIPAL/PTS", phone: "9454400234", email: "ptsme-up@nic.in", category: "officers" },
    { name: "DEV RANJAN VERMA, DIG", role: "DIG/TRAINING HQRS", phone: "9454400242", email: "digtrg.up@nic.in", category: "officers" },
    { name: "YAMUNA PRASAD, DIG", role: "DIG/PTS", phone: "9454400233", email: "adgptsmo-up@nic.in", category: "officers" },
    { name: "SANTOSH KUMAR MISHRA, DIG", role: "DIG/PTS", phone: "9454400196", email: "ptsmangrol.jl@up.gov.in", category: "officers" },
    { name: "SHOGUN GAUTAM, SP", role: "SP/APTC", phone: "9454400198", email: "aptc.stp.si-up@gov.in", category: "officers" },
    { name: "RAM SEWAK GAUTAM, SP", role: "SP/PTS", phone: "-", email: "adgptsmo-up@nic.in", category: "officers" },
    { name: "OM PRAKASH YADAV, SP", role: "SP/PTC", phone: "9454400449", email: "ptcstp@nic.in", category: "officers" },
    { name: "BRAJESH KUMAR MISHRA, SP", role: "SP/PTS", phone: "9454400565", email: "ptsstr.su-up@up.gov.in", category: "officers" },
    { name: "HARI GOVIND, SP", role: "SP/TRAINING HQRS.", phone: "9454400455", email: "training@nic.in", category: "officers" },
    { name: "SUSHIL KUMAR, SP", role: "SP/DR.BRAP ACADEMY", phone: "9454401846", email: "polacademy@nic.in", category: "officers" },
    { name: "ASHUTOSH DWIVEDI, SP", role: "SP/APTC", phone: "9454400316", email: "aptc.stp.si-up@gov.in", category: "officers" },
    { name: "SHEO RAM YADAV, SP", role: "SP/PTS", phone: "9454400728", email: "ptsme-up@nic.in", category: "officers" },
    { name: "MAYA RAM VERMA, SP", role: "SP/PTS", phone: "9454400622", email: "ptsstr.su-up@up.gov.in", category: "officers" },
    { name: "ANIL KUMAR, SP", role: "SP/PTS", phone: "9454400435", email: "ptsgr-up@nic.in", category: "officers" },
    { name: "RIJUL, ADDL. SP", role: "ADDL.SP/TRAINING HQRS", phone: "9454400642", email: "training@nic.in", category: "officers" },
    { name: "SATYA PAL SINGH, ADDL. SP", role: "ADDL.SP/PTC Moradabad", phone: "-", email: "-", category: "officers" },
    { name: "DEEPIKA AGNIHOTRI, ADDL. SP", role: "ADDL.SP/PTS", phone: "7839862832", email: "ptsme-up@nic.in", category: "officers" },
    { name: "RAJESH KUMAR BHARTIYA, ADDL. SP", role: "ADDL.SP/PTC SITAPUR", phone: "9454401216", email: "ptcstp@nic.in", category: "officers" },
    { name: "RAM ARJ, ADDL. SP", role: "ADDL.SP PTS JALAUN", phone: "8840107822", email: "ptsmangrol.jl@up.gov.in", category: "officers" },
    { name: "NEETA CHANDRA, ADDL. SP", role: "ADDL.SP/TRAINING DIRECTORATE", phone: "9454401929", email: "training@nic.in", category: "officers" },
    { name: "DR. ARUN KUMAR SINGH, ADDL. SP", role: "ADDL.SP/PTC", phone: "9454401839", email: "ptcmdd@nic.in", category: "officers" },
    { name: "SMT. VIBHA SINGH, ADDL. SP", role: "ADDL.SP/PTS", phone: "7839862833", email: "ptsme-up@nic.in", category: "officers" },
    { name: "SMT. RACHNA MISHRA, ADDL. SP", role: "ADDL. SP/PTS GORAKHPUR", phone: "9454401849", email: "ptsgr-up@nic.in", category: "officers" },
    { name: "SHANKER PRASAD, ADDL. SP", role: "ADDL.SP/Police Academy", phone: "9454401218", email: "polacademy@nic.in", category: "officers" },
    { name: "PRAMOD KUMAR SINGH YADAV, ADDL. SP", role: "ADDL.SP/ATC", phone: "9412842085", email: "aptc.stp.si-up@gov.in", category: "officers" },
    { name: "MANOJ KUMAR GUPTA, ADDL. SP", role: "ADDL.SP/PTC SITAPUR", phone: "9454401851", email: "ptcstp@nic.in", category: "officers" },
    { name: "IRFAN NASIR KHAN, ADDL. SP", role: "ADDL. SP/PTS", phone: "-", email: "-", category: "officers" },
    { name: "DEV ANAND, DSP", role: "DSP/PTS", phone: "9839225288", email: "ptsmangrol.jl@up.gov.in", category: "officers" },
    { name: "DINESH KUMAR SINGH YADAV, DSP", role: "DSP/PTS", phone: "9454402542", email: "ptcun-up@nic.in", category: "officers" },
    { name: "JAGDISH KALIRAMAN, DSP", role: "DSP/PTS", phone: "6397522609", email: "ptsme-up@nic.in", category: "officers" },
    { name: "LALLAN YADAV, DSP", role: "DSP/PTS", phone: "8299816790", email: "ptsstr.su-up@up.gov.in", category: "officers" },
    { name: "VIDYA KISHOR, DSP", role: "DSP/PTS", phone: "9548391929", email: "ptsmangrol.jl@up.gov.in", category: "officers" },
    { name: "SIYA RAM, DSP", role: "DSP/RTC CHUNAR", phone: "7905196629", email: "spcnr.apts.mi-up@gov.in", category: "officers" },
    { name: "SMT. REKHA BAJPAI, DSP", role: "DSP/TRAINING HQ", phone: "9454405644", email: "training@nic.in", category: "officers" },
    { name: "GANESH KUMAR, DSP", role: "DSP/RTC CHUNAR", phone: "9454482010", email: "spcnr.apts.mi-up@gov.in", category: "officers" },
    { name: "HARENDRA SINGH YADAV, DSP", role: "DSP/TRG. / ACAD.", phone: "9415434483", email: "polacademy@nic.in", category: "officers" },
    { name: "AMIT KUMAR PANDEY, DSP", role: "DSP/PTS", phone: "9811734771", email: "ptsmangrol.jl@up.gov.in", category: "officers" },
    { name: "ANKIT TIWARI, DSP", role: "DSP/PTC", phone: "8588009288", email: "ptcstp@nic.in", category: "officers" },
    { name: "PRABHAT KUMAR TIWARI, DSP", role: "DSP/TRG./PTS", phone: "7310298332", email: "ptcun-up@nic.in", category: "officers" },
    { name: "DHARMESH KUMAR, DSP", role: "DSP/PTS", phone: "8630454510", email: "adgptsmo-up@nic.in", category: "officers" },
    { name: "AJEET RAURIYA, DSP", role: "DSP/DR. BRAP ACADMEY", phone: "9456295482", email: "polacademy@nic.in", category: "officers" },
    { name: "AMIT KUMAR, DSP", role: "DSP/PTS", phone: "7017575598", email: "ptsme-up@nic.in", category: "officers" },
    { name: "VIPIN KUMAR, DSP", role: "DSP/PTS MEERUT", phone: "7017482410", email: "ptsme-up@nic.in", category: "officers" },
    { name: "BABLOO PRASAD GUPTA, DSP", role: "DSP /PTS MORADABAD", phone: "9899326603", email: "adgptsmo-up@nic.in", category: "officers" },
    { name: "SUDHAKAR UPADHYAY, DSP", role: "DSP/Training Directorate", phone: "9415196551", email: "training@nic.in", category: "officers" }
  ];

  if (!state.contactCategory) state.contactCategory = 'stations';
  if (!state.contactSearchQuery) state.contactSearchQuery = '';
  if (!state.contactPage) state.contactPage = 1;

  const ITEMS_PER_PAGE = 20;

  function doRender(stationsData) {
    let sourceData;
    if (state.contactCategory === 'stations') {
      sourceData = stationsData || [];
    } else {
      sourceData = coreContacts.filter(c => c.category === state.contactCategory);
    }

    const q = state.contactSearchQuery.toLowerCase();
    const filtered = q ? sourceData.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.email && c.email.toLowerCase().includes(q))
    ) : sourceData;

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    if (state.contactPage > totalPages) state.contactPage = 1;
    const startIdx = (state.contactPage - 1) * ITEMS_PER_PAGE;
    const pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, filtered.length);

    const stationCount = stationsData ? stationsData.length : '...';

    const categories = [
      { id: 'stations', label: tLocal.filterStations + ' (' + stationCount + ')' },
      { id: 'officers', label: tLocal.filterOfficers },
      { id: 'emergency', label: tLocal.filterEmerg }
    ];

    const filterBtns = categories.map(cat => {
      const isActive = state.contactCategory === cat.id;
      const cls = isActive
        ? 'bg-cyber-blue text-cyber-950 border-cyber-blue font-bold shadow-cyber-glow'
        : isDark
          ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
          : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm';
      return '<button onclick="window.pmSetContactCat(\'' + cat.id + '\')" class="px-4 py-2 rounded-lg text-xs font-semibold font-mono border transition-all ' + cls + '">' + cat.label + '</button>';
    }).join('');

    const cards = pageItems.length === 0 ? '<div class="col-span-2 p-12 rounded-xl border border-dashed text-center text-slate-500 ' + (isDark ? 'border-slate-800' : 'border-slate-300') + '"><i data-lucide="contact" class="mx-auto h-10 w-10 mb-2"></i><span>No matching contacts found.</span></div>'
      : pageItems.map(con => {
        const safeName = con.name.replace(/'/g, "\\'");
        return '<div class="p-5 rounded-xl border flex justify-between items-start transition-all hover:scale-[1.005] hover:border-cyber-blue/30 ' + (isDark ? 'bg-cyber-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-sm') + '">' +
          '<div class="space-y-2.5 min-w-0 flex-1 pr-2">' +
            '<div class="flex items-center gap-2">' +
              '<div class="h-8 w-8 rounded-full bg-cyber-blue/10 flex items-center justify-center text-cyber-blue font-bold text-xs select-none shrink-0">' + con.name.charAt(0) + '</div>' +
              '<div class="min-w-0">' +
                '<h4 class="font-bold ' + (isDark ? 'text-white' : 'text-slate-900') + ' text-xs truncate font-mono">' + con.name.toUpperCase() + '</h4>' +
                '<p class="text-[10px] text-slate-500 truncate">' + con.role + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="space-y-1 text-[11px] font-mono text-slate-400">' +
              '<div class="flex items-center gap-1.5"><i data-lucide="phone" class="h-3.5 w-3.5 text-cyber-blue"></i> <span class="select-all">' + con.phone + '</span></div>' +
              '<div class="flex items-center gap-1.5"><i data-lucide="mail" class="h-3.5 w-3.5 text-slate-600"></i> <span class="select-all truncate">' + (con.email || 'N/A') + '</span></div>' +
            '</div>' +
          '</div>' +
          '<div class="flex flex-col gap-1.5 shrink-0">' +
            '<button onclick="window.pmCopyContact(\'' + safeName + '\', \'' + con.phone + '\')" class="p-2 rounded ' + (isDark ? 'bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-600') + '" title="Copy"><i data-lucide="copy" class="h-4 w-4"></i></button>' +
            '<a href="tel:' + con.phone + '" class="p-2 rounded bg-cyber-blue text-cyber-950 hover:bg-white flex items-center justify-center" title="Call"><i data-lucide="phone-call" class="h-4 w-4"></i></a>' +
          '</div>' +
        '</div>';
      }).join('');

    let paginationHtml = '';
    if (filtered.length > ITEMS_PER_PAGE) {
      paginationHtml = '<div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t ' + (isDark ? 'border-slate-800' : 'border-slate-200') + '">' +
        '<span class="text-[10px] font-mono text-slate-500">' + tLocal.showing + ' ' + (startIdx+1) + '-' + endIdx + ' ' + tLocal.of + ' ' + filtered.length + ' ' + tLocal.results + '</span>' +
        '<div class="flex gap-2">' +
          '<button onclick="window.pmContactPagePrev()" class="px-4 py-2 rounded-lg text-xs font-mono font-semibold border transition-all ' + (state.contactPage <= 1 ? 'opacity-30 cursor-not-allowed ' : '') + (isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600') + '"' + (state.contactPage <= 1 ? ' disabled' : '') + '>' + tLocal.prev + '</button>' +
          '<span class="px-4 py-2 text-xs font-mono font-bold text-cyber-blue">' + state.contactPage + ' / ' + totalPages + '</span>' +
          '<button onclick="window.pmContactPageNext()" class="px-4 py-2 rounded-lg text-xs font-mono font-semibold border transition-all ' + (state.contactPage >= totalPages ? 'opacity-30 cursor-not-allowed ' : '') + (isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600') + '"' + (state.contactPage >= totalPages ? ' disabled' : '') + '>' + tLocal.next + '</button>' +
        '</div>' +
      '</div>';
    }

    container.innerHTML = '<div class="space-y-6">' +
      '<div>' +
        '<h2 class="text-xl font-bold font-mono tracking-tight text-cyber-blue">' + tLocal.header + '</h2>' +
        '<p class="text-xs text-slate-500 mt-0.5 font-mono">' + tLocal.desc + '</p>' +
      '</div>' +
      '<div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b pb-4 ' + (isDark ? 'border-slate-800' : 'border-slate-200') + '">' +
        '<div class="flex gap-2 flex-wrap">' + filterBtns + '</div>' +
        '<div class="relative flex items-center w-full sm:w-80">' +
          '<i data-lucide="search" class="absolute left-3.5 h-4 w-4 text-slate-500"></i>' +
          '<input type="text" id="contact-search-box" value="' + state.contactSearchQuery + '" placeholder="' + tLocal.phSearch + '" class="w-full pl-9 pr-4 py-2 text-xs rounded-lg border outline-none font-mono ' + (isDark ? 'bg-cyber-950 border-slate-800 text-white focus:border-cyber-blue' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-cyber-blue') + '">' +
        '</div>' +
      '</div>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' + cards + '</div>' +
      paginationHtml +
    '</div>';

    // Bind search
    const searchBox = document.getElementById('contact-search-box');
    if (searchBox) {
      searchBox.addEventListener('input', function() {
        state.contactSearchQuery = searchBox.value;
        state.contactPage = 1;
        doRender(stationsData);
      });
    }

    lucide.createIcons();
  }

  // Category switch
  window.pmSetContactCat = function(cat) {
    state.contactCategory = cat;
    state.contactSearchQuery = '';
    state.contactPage = 1;
    if (cat === 'stations' && !_stationsCache) {
      container.innerHTML = '<div class="flex items-center justify-center py-20"><div class="text-center"><div class="inline-block h-10 w-10 animate-spin rounded-full border-4 border-cyber-blue border-t-transparent mb-4"></div><p class="text-xs font-mono text-slate-500">' + tLocal.loading + '</p></div></div>';
      loadStationsData().then(function(data) { doRender(data); });
    } else {
      doRender(_stationsCache);
    }
  };

  // Pagination
  window.pmContactPagePrev = function() {
    if (state.contactPage > 1) {
      state.contactPage--;
      doRender(_stationsCache);
    }
  };

  window.pmContactPageNext = function() {
    state.contactPage++;
    doRender(_stationsCache);
  };

  // Copy
  window.pmCopyContact = function(name, phone) {
    navigator.clipboard.writeText(phone);
    alert('Copied number for ' + name + ' (' + phone + ') to clipboard!');
    logActivity('Copied contact: ' + name, 'contacts');
  };

  // Initial render with core contacts (no stations needed)
  if (state.contactCategory === 'stations') {
    if (_stationsCache) {
      doRender(_stationsCache);
    } else {
      container.innerHTML = '<div class="flex items-center justify-center py-20"><div class="text-center"><div class="inline-block h-10 w-10 animate-spin rounded-full border-4 border-cyber-blue border-t-transparent mb-4"></div><p class="text-xs font-mono text-slate-500">' + tLocal.loading + '</p></div></div>';
      loadStationsData().then(function(data) { doRender(data); });
    }
  } else {
    doRender(null);
  }
}
