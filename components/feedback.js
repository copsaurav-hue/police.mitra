
// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - Feedback Corner Component (Fully Bilingual)

// Pre-initialize mock data if localStorage is empty
if (!localStorage.getItem('pm_feedbacks')) {
  const mockFeedbacks = [
    {
      id: 1716630000000,
      name: 'Ramesh Singh (Sub-Inspector)',
      pno: '8210133201',
      mobile: '9876543210',
      category: 'welfare',
      message: 'Need clarity on new BNS guidelines for audio recording during search operations.',
      time: '24/05/2026, 14:30',
      replies: [
        {
          from: 'admin',
          text: 'Jai Hind, Ramesh. Standard circular regarding mandatory audio-video protocols has been uploaded in Circulars Desk tab. Please download and review.',
          time: '24/05/2026, 16:15'
        }
      ]
    },
    {
      id: 1716640000000,
      name: 'Amit Verma (Constable)',
      pno: '8210133202',
      mobile: '8765432109',
      category: 'bug',
      message: 'The BNS Comparative search has minor loading issue on older mobile internet connection.',
      time: '25/05/2026, 09:12',
      replies: []
    }
  ];
  localStorage.setItem('pm_feedbacks', JSON.stringify(mockFeedbacks));
}

export function renderFeedback(state, container) {
  const isDark = state.theme === 'dark';
  const lang = state.lang;

  if (!state.feedbackTab) state.feedbackTab = 'submit';

  const tLocal = {
    en: {
      title: 'Feedback Corner',
      subtitle: 'Post suggestions, submit welfare queries, or report system issues',
      formTitle: 'Submit Feedback & Suggestions',
      nameLabel: 'Your Name & Rank',
      namePH: 'e.g. SI Vinayak Mishra',
      pnoLabel: 'PNO / User ID',
      pnoPH: 'e.g. 8210133200',
      mobileLabel: 'Mobile Number',
      mobilePH: 'e.g. 9876543210',
      catLabel: 'Category',
      catWelfare: 'Welfare & Duty Queries',
      catBug: 'Portal Bug / Tech Issue',
      catSuggest: 'General Feedback',
      msgLabel: 'Your Suggestions / Query',
      msgPH: 'Write your message details here...',
      submitBtn: 'Submit Feedback',
      successMsg: 'Feedback submitted successfully! Admin will reply shortly.',
      errorMsg: 'Please fill in all fields correctly. Mobile must be 10 digits.',
      tabSubmit: 'New Feedback',
      tabTrack: 'My Submissions',
      noFeedbacks: 'No feedback submissions found yet.',
      pnoBadge: 'PNO:',
      mobileBadge: 'Mobile:',
      statusPending: 'Pending Review',
      statusReplied: 'Action Taken',
      adminReplyTitle: 'Admin Response:',
      replyPH: 'Waiting for Admin Response...',
      deleteBtn: 'Delete',
      clearAllBtn: 'Clear All',
      confirmDelete: 'Delete this submission?',
      confirmClearAll: 'Delete ALL submissions? This cannot be undone.'
    },
    hi: {
      title: 'प्रतिक्रिया व सुझाव',
      subtitle: 'कल्याणकारी प्रश्न सबमिट करें, तकनीकी खराबी की रिपोर्ट करें या सुझाव दें',
      formTitle: 'सुझाव और प्रतिक्रिया भेजें',
      nameLabel: 'आपका नाम और पद',
      namePH: 'जैसे: उ.नि. विनायक मिश्रा',
      pnoLabel: 'PNO / यूज़र आईडी',
      pnoPH: 'जैसे: 8210133200',
      mobileLabel: 'मोबाइल नंबर',
      mobilePH: 'जैसे: 9876543210',
      catLabel: 'श्रेणी',
      catWelfare: 'कल्याण व ड्यूटी प्रश्न',
      catBug: 'पोर्टल बग / तकनीकी समस्या',
      catSuggest: 'सामान्य सुझाव',
      msgLabel: 'आपका सुझाव / प्रश्न',
      msgPH: 'विवरण यहाँ लिखें...',
      submitBtn: 'सुझाव सबमिट करें',
      successMsg: 'सुझाव सफलतापूर्वक सबमिट हो गया! एडमिन जल्द ही जवाब देंगे।',
      errorMsg: 'कृपया सभी फ़ील्ड सही से भरें। मोबाइल नंबर 10 अंकों का होना चाहिए।',
      tabSubmit: 'नया सुझाव',
      tabTrack: 'मेरे सबमिशन',
      noFeedbacks: 'अभी तक कोई सबमिट किया हुआ सुझाव नहीं मिला।',
      pnoBadge: 'PNO:',
      mobileBadge: 'मोबाइल:',
      statusPending: 'समीक्षाधीन',
      statusReplied: 'कार्रवाई पूर्ण',
      adminReplyTitle: 'प्रशासक की प्रतिक्रिया:',
      replyPH: 'एडमिन की प्रतिक्रिया की प्रतीक्षा है...',
      deleteBtn: 'हटाएं',
      clearAllBtn: 'सब हटाएं',
      confirmDelete: 'इस सबमिशन को हटाएं?',
      confirmClearAll: 'सभी सबमिशन हटाएं? यह वापस नहीं होगा।'
    }
  }[lang];

  const getFeedbacks = () => JSON.parse(localStorage.getItem('pm_feedbacks')) || [];

  container.innerHTML = `
    <div class="space-y-6">
      <!-- HEADER -->
      <div class="flex justify-between items-start border-b border-slate-800/40 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <i data-lucide="message-square-plus" class="h-6 w-6 text-cyber-blue"></i> ${tLocal.title}
          </h2>
          <p class="text-xs text-slate-400 font-mono mt-1">${tLocal.subtitle}</p>
        </div>
      </div>

      <!-- TABS -->
      <div class="flex gap-2">
        <button id="fb-tab-submit" class="px-4 py-2 text-xs font-bold font-mono tracking-wider uppercase rounded-xl border transition-all ${
          state.feedbackTab === 'submit'
            ? 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30 shadow-cyber-glow'
            : isDark
              ? 'bg-slate-900 border-transparent text-slate-400 hover:bg-slate-800'
              : 'bg-slate-100 border-transparent text-slate-600 hover:bg-slate-200'
        }">${tLocal.tabSubmit}</button>
        <button id="fb-tab-track" class="px-4 py-2 text-xs font-bold font-mono tracking-wider uppercase rounded-xl border transition-all relative ${
          state.feedbackTab === 'track'
            ? 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30 shadow-cyber-glow'
            : isDark
              ? 'bg-slate-900 border-transparent text-slate-400 hover:bg-slate-800'
              : 'bg-slate-100 border-transparent text-slate-600 hover:bg-slate-200'
        }">
          ${tLocal.tabTrack}
          <span class="absolute -top-1.5 -right-1 text-[8px] bg-cyber-blue text-cyber-950 font-bold px-1 rounded-full">
            ${getFeedbacks().length}
          </span>
        </button>
      </div>

      <div id="feedback-workspace" class="mt-4"></div>
    </div>
  `;

  const workspace = document.getElementById('feedback-workspace');

  if (state.feedbackTab === 'submit') {
    renderSubmitForm();
  } else {
    renderTracker();
  }

  // ─── RENDERS ──────────────────────────────────────────────────────────────
  function renderSubmitForm() {
    workspace.innerHTML = `
      <div class="w-full max-w-xl mx-auto rounded-2xl border p-6 ${
        isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200 shadow-md'
      }">
        <h3 class="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'} pb-2 flex items-center gap-1.5">
          <i data-lucide="pen-tool" class="h-4 w-4 text-cyber-blue"></i> ${tLocal.formTitle}
        </h3>

        <div id="feedback-alert" class="hidden mb-4 p-3 border rounded-xl text-xs font-mono"></div>

        <form id="fb-form" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[10px] text-slate-400 font-mono uppercase tracking-wider">${tLocal.nameLabel}</label>
              <input type="text" id="fb-name" required placeholder="${tLocal.namePH}" class="w-full px-4 py-2.5 rounded-xl border outline-none text-xs font-mono transition-all ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-white focus:border-cyber-blue' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyber-blue'
              }" />
            </div>
            
            <div class="space-y-1.5">
              <label class="text-[10px] text-slate-400 font-mono uppercase tracking-wider">${tLocal.pnoLabel}</label>
              <input type="text" id="fb-pno" required placeholder="${tLocal.pnoPH}" class="w-full px-4 py-2.5 rounded-xl border outline-none text-xs font-mono transition-all ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-white focus:border-cyber-blue' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyber-blue'
              }" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[10px] text-slate-400 font-mono uppercase tracking-wider">${tLocal.mobileLabel} <span class="text-cyber-blue font-bold">*</span></label>
              <input type="tel" id="fb-mobile" required placeholder="${tLocal.mobilePH}" class="w-full px-4 py-2.5 rounded-xl border outline-none text-xs font-mono transition-all ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-white focus:border-cyber-blue' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyber-blue'
              }" />
            </div>

            <div class="space-y-1.5">
              <label class="text-[10px] text-slate-400 font-mono uppercase tracking-wider">${tLocal.catLabel}</label>
              <select id="fb-cat" class="w-full px-4 py-2.5 rounded-xl border outline-none text-xs font-mono transition-all ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-white focus:border-cyber-blue' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyber-blue'
              }">
                <option value="welfare">${tLocal.catWelfare}</option>
                <option value="bug">${tLocal.catBug}</option>
                <option value="suggest">${tLocal.catSuggest}</option>
              </select>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] text-slate-400 font-mono uppercase tracking-wider">${tLocal.msgLabel}</label>
            <textarea id="fb-msg" required rows="4" placeholder="${tLocal.msgPH}" class="w-full px-4 py-2.5 rounded-xl border outline-none text-xs font-mono transition-all resize-none ${
              isDark ? 'bg-slate-950/60 border-slate-800 text-white focus:border-cyber-blue' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyber-blue'
            }"></textarea>
          </div>

          <button type="submit" class="w-full py-3 mt-2 bg-cyber-blue text-cyber-950 font-bold uppercase tracking-wider rounded-xl shadow-[0_0_12px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:bg-white transition-all flex items-center justify-center gap-2 text-xs">
            <i data-lucide="send-to-back" class="h-4 w-4"></i> ${tLocal.submitBtn}
          </button>
        </form>
      </div>
    `;

    document.getElementById('fb-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fb-name').value.trim();
      const pno = document.getElementById('fb-pno').value.trim();
      const mobile = document.getElementById('fb-mobile').value.trim();
      const category = document.getElementById('fb-cat').value;
      const message = document.getElementById('fb-msg').value.trim();
      const alertBox = document.getElementById('feedback-alert');

      // Verify mobile number is exactly 10 digits
      if (!/^\d{10}$/.test(mobile)) {
        alertBox.className = 'mb-4 p-3 bg-red-950/20 border border-red-500/50 rounded-xl text-red-400 text-xs font-mono flex items-center gap-2';
        alertBox.innerHTML = `<span>⚠️</span> <span>${tLocal.errorMsg}</span>`;
        alertBox.classList.remove('hidden');
        return;
      }

      const list = getFeedbacks();
      const newFeedback = {
        id: Date.now(),
        name,
        pno,
        mobile,
        category,
        message,
        time: new Date().toLocaleString(),
        replies: []
      };

      list.unshift(newFeedback);
      localStorage.setItem('pm_feedbacks', JSON.stringify(list));
      logActivity(`Feedback submitted by ${name} (PNO: ${pno})`, 'system');

      alertBox.className = 'mb-4 p-3 bg-emerald-950/20 border border-emerald-500/50 rounded-xl text-emerald-400 text-xs font-mono flex items-center gap-2';
      alertBox.innerHTML = `<span>✓</span> <span>${tLocal.successMsg}</span>`;
      alertBox.classList.remove('hidden');

      document.getElementById('fb-form').reset();
      
      // Update badge count
      renderFeedback(state, container);
    });
  }

  function renderTracker() {
    const list = getFeedbacks();
    if (list.length === 0) {
      workspace.innerHTML = `
        <div class="text-center py-12 text-slate-500 font-mono text-xs">
          <i data-lucide="message-square-off" class="h-10 w-10 text-slate-700 mx-auto mb-3"></i>
          ${tLocal.noFeedbacks}
        </div>
      `;
      lucide.createIcons();
      return;
    }

    workspace.innerHTML = `
      <div class="space-y-4 max-w-2xl mx-auto">

        <!-- Clear All bar -->
        <div class="flex justify-end">
          <button id="fb-clear-all" class="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-[9px] font-mono font-bold uppercase tracking-wider rounded-xl border border-red-500/20 hover:border-red-500 transition-all">
            <i data-lucide="trash-2" class="h-3 w-3"></i> ${tLocal.clearAllBtn}
          </button>
        </div>

        ${list.map(fb => {
          const replied = fb.replies && fb.replies.length > 0;
          return `
            <div class="p-5 rounded-2xl border transition-all ${
              isDark
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-white border-slate-200 shadow-sm'
            }">
              
              <!-- Title & Header -->
              <div class="flex justify-between items-start gap-2 mb-3">
                <div>
                  <h4 class="text-xs font-bold text-white font-mono">${fb.name}</h4>
                  <p class="text-[9px] text-slate-500 font-mono mt-0.5">
                    ${tLocal.pnoBadge} <span class="text-slate-400 font-bold">${fb.pno}</span> &nbsp;·&nbsp;
                    ${tLocal.mobileBadge} <span class="text-slate-400 font-bold">${fb.mobile}</span>
                  </p>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <span class="text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    replied
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }">
                    ${replied ? tLocal.statusReplied : tLocal.statusPending}
                  </span>
                  <span class="text-[9px] text-slate-600 font-mono shrink-0">${fb.time}</span>
                  <!-- Delete Button -->
                  <button data-del-id="${fb.id}" class="fb-delete-btn flex items-center gap-1 px-2 py-0.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-[8px] font-mono font-bold uppercase rounded-lg border border-red-500/20 hover:border-red-500 transition-all">
                    <i data-lucide="trash" class="h-2.5 w-2.5"></i> ${tLocal.deleteBtn}
                  </button>
                </div>
              </div>

              <!-- Message -->
              <p class="text-[10px] text-slate-300 font-mono bg-slate-950/30 border border-slate-800/40 p-3 rounded-xl leading-relaxed whitespace-pre-wrap mb-4">${fb.message}</p>

              <!-- Replies / Thread -->
              ${replied ? `
                <div class="mt-2 space-y-2 border-l-2 border-cyber-blue pl-4 pt-1">
                  <span class="text-[9px] text-cyber-blue font-bold font-mono tracking-wider uppercase block mb-1">
                    <i data-lucide="shield-check" class="h-3 w-3 inline shrink-0 mr-1"></i> ${tLocal.adminReplyTitle}
                  </span>
                  ${fb.replies.map(rep => `
                    <div class="space-y-1">
                      <p class="text-[10px] text-emerald-400 font-mono font-bold leading-relaxed whitespace-pre-wrap">${rep.text}</p>
                      <span class="text-[8px] text-slate-500 font-mono block">${rep.time}</span>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="text-[9px] text-slate-500 font-mono italic">
                  <i data-lucide="hourglass" class="h-3 w-3 inline shrink-0 mr-1"></i> ${tLocal.replyPH}
                </div>
              `}

            </div>
          `;
        }).join('')}
      </div>
    `;
    lucide.createIcons();

    // Wire up per-card delete buttons
    document.querySelectorAll('.fb-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm(tLocal.confirmDelete)) return;
        const id = Number(btn.dataset.delId);
        const updated = getFeedbacks().filter(f => f.id !== id);
        localStorage.setItem('pm_feedbacks', JSON.stringify(updated));
        logActivity('Deleted feedback submission id: ' + id, 'feedback');
        renderFeedback(state, container);
        state.feedbackTab = 'track';
        renderFeedback(state, container);
      });
    });

    // Wire up Clear All
    const clearAllBtn = document.getElementById('fb-clear-all');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        if (!confirm(tLocal.confirmClearAll)) return;
        localStorage.setItem('pm_feedbacks', JSON.stringify([]));
        logActivity('Cleared all feedback submissions', 'feedback');
        state.feedbackTab = 'track';
        renderFeedback(state, container);
      });
    }
  }

  // ─── TAB EVENT LISTENERS ──────────────────────────────────────────────────
  document.getElementById('fb-tab-submit').addEventListener('click', () => {
    state.feedbackTab = 'submit';
    renderFeedback(state, container);
  });

  document.getElementById('fb-tab-track').addEventListener('click', () => {
    state.feedbackTab = 'track';
    renderFeedback(state, container);
  });

  lucide.createIcons();
}
