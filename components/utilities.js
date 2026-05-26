
// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - Tactical Utilities (Hindi Tools)

export function renderUtilities(state, container) {
  const isDark = state.theme === 'dark';

  const tLocal = {
    en: {
      header: "HINDI TRANSLATION & TYPING TOOLS",
      desc: "Tactical tools for fast Hindi documentation, voice transcription, and phonetic Hinglish conversion.",
      voiceTitle: "Hindi Voice Typing",
      voiceDesc: "Transcribe spoken Hindi into text automatically.",
      startVoice: "START MICROPHONE",
      stopVoice: "STOP RECORDING",
      typeTitle: "Hinglish to Hindi Converter",
      typeDesc: "Type in English (Hinglish) and click Convert Now to automatically convert to Hindi (Mangal/Unicode).",
      convertBtn: "Convert Now",
      clearBtn: "Clear text",
      copyBtn: "Copy to Clipboard",
      placeholder: "Your text will appear here..."
    },
    hi: {
      header: "हिंदी अनुवाद और टाइपिंग उपकरण",
      desc: "तेज़ हिंदी दस्तावेज़ीकरण, वॉयस ट्रांसक्रिप्शन और हिंग्लिश रूपांतरण के लिए सामरिक उपकरण।",
      voiceTitle: "हिंदी वॉयस टाइपिंग",
      voiceDesc: "बोली जाने वाली हिंदी को स्वचालित रूप से टेक्स्ट में ट्रांसक्रिप्ट करें।",
      startVoice: "माइक्रोफोन शुरू करें",
      stopVoice: "रिकॉर्डिंग रोकें",
      typeTitle: "हिंग्लिश से हिंदी कनवर्टर",
      typeDesc: "अंग्रेजी (हिंग्लिश) में टाइप करें और यह अपने आप हिंदी (मंगल/यूनिकोड) में बदल जाएगा। 'कन्वर्ट' बटन पर क्लिक करें।",
      convertBtn: "कन्वर्ट करें",
      clearBtn: "टेक्स्ट हटाएं",
      copyBtn: "कॉपी करें",
      placeholder: "आपका टेक्स्ट यहां दिखाई देगा..."
    }
  }[state.lang];

  container.innerHTML = `
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-bold font-mono tracking-tight text-cyber-blue flex items-center gap-2">
          <i data-lucide="mic" class="h-6 w-6"></i>
          <span>${tLocal.header}</span>
        </h2>
        <p class="text-xs text-slate-500 mt-0.5 font-mono">${tLocal.desc}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Voice Typing -->
        <div class="p-6 rounded-xl border flex flex-col ${isDark ? 'bg-cyber-900 border-slate-800' : 'bg-white border-slate-200'}">
          <div class="flex items-center gap-3 mb-4 border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}">
            <div class="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
              <i data-lucide="mic" class="h-5 w-5"></i>
            </div>
            <div>
              <h3 class="font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}">${tLocal.voiceTitle}</h3>
              <p class="text-[10px] text-slate-500 font-mono">${tLocal.voiceDesc}</p>
            </div>
          </div>
          
          <div class="flex-1 mb-4 relative">
            <textarea id="voice-textarea" class="w-full h-full min-h-[150px] p-4 text-sm rounded-lg border outline-none resize-none font-sans ${isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-cyber-blue' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyber-blue'}" placeholder="${tLocal.placeholder}"></textarea>
            <div id="voice-status-indicator" class="absolute top-2 right-2 flex items-center gap-1.5 hidden">
              <span class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span class="text-[10px] text-red-500 font-bold uppercase tracking-widest font-mono">Listening</span>
            </div>
          </div>
          
          <div class="flex gap-2">
            <button id="voice-start-btn" class="flex-1 py-3 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white rounded-lg font-bold font-mono tracking-wider text-xs transition-all flex items-center justify-center gap-2">
              <i data-lucide="mic" class="h-4 w-4"></i> ${tLocal.startVoice}
            </button>
            <button onclick="window.pmCopyText('voice-textarea')" class="px-4 py-3 bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 hover:bg-cyber-blue hover:text-cyber-950 rounded-lg transition-all" title="${tLocal.copyBtn}">
              <i data-lucide="copy" class="h-4 w-4"></i>
            </button>
            <button onclick="document.getElementById('voice-textarea').value=''" class="px-4 py-3 bg-slate-500/10 text-slate-500 border border-slate-500/30 hover:bg-slate-500 hover:text-white rounded-lg transition-all" title="${tLocal.clearBtn}">
              <i data-lucide="trash-2" class="h-4 w-4"></i>
            </button>
          </div>
        </div>

        <!-- Hinglish to Hindi -->
        <div class="p-6 rounded-xl border flex flex-col ${isDark ? 'bg-cyber-900 border-slate-800' : 'bg-white border-slate-200'}">
          <div class="flex items-center gap-3 mb-4 border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}">
            <div class="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
              <i data-lucide="keyboard" class="h-5 w-5"></i>
            </div>
            <div>
              <h3 class="font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}">${tLocal.typeTitle}</h3>
              <p class="text-[10px] text-slate-500 font-mono">${tLocal.typeDesc}</p>
            </div>
          </div>
          
          <div class="flex-1 mb-4">
            <textarea id="transliteration-textarea" class="w-full h-full min-h-[150px] p-4 text-sm rounded-lg border outline-none resize-none font-sans ${isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'}" placeholder="Type hinglish here and press space... (e.g. 'namaste')"></textarea>
          </div>
          
          <div class="flex gap-2">
            <button id="convert-btn" onclick="window.pmConvertHindi()" class="flex-1 py-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 hover:bg-emerald-500 hover:text-emerald-950 rounded-lg font-bold font-mono tracking-wider text-xs transition-all flex items-center justify-center gap-2">
              <i data-lucide="refresh-cw" class="h-4 w-4"></i> ${tLocal.convertBtn}
            </button>
            <button onclick="window.pmCopyText('transliteration-textarea')" class="px-4 py-3 bg-amber-500/10 text-amber-500 border border-amber-500/30 hover:bg-amber-500 hover:text-amber-950 rounded-lg transition-all" title="${tLocal.copyBtn}">
              <i data-lucide="copy" class="h-4 w-4"></i>
            </button>
            <button onclick="document.getElementById('transliteration-textarea').value=''" class="px-4 py-3 bg-slate-500/10 text-slate-500 border border-slate-500/30 hover:bg-slate-500 hover:text-white rounded-lg transition-all" title="${tLocal.clearBtn}">
              <i data-lucide="trash-2" class="h-4 w-4"></i>
            </button>
          </div>
        </div>

      </div>
    </div>
  `;

  // --- Voice Typing Logic ---
  const voiceBtn = document.getElementById('voice-start-btn');
  const voiceArea = document.getElementById('voice-textarea');
  const voiceStatus = document.getElementById('voice-status-indicator');
  
  let recognition = null;
  let isRecording = false;

  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN'; // Force Hindi
    
    recognition.onresult = function(event) {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        voiceArea.value += finalTranscript + ' ';
      }
      // Note: interim results can be shown but we keep it simple to avoid jumping text
    };
    
    recognition.onerror = function(e) {
      console.error('Speech recognition error', e);
      stopRecording();
    };
    
    recognition.onend = function() {
      // Auto restart if still recording (bypasses timeout limits)
      if (isRecording) {
        try { recognition.start(); } catch(e){}
      } else {
        stopRecording();
      }
    };
  } else {
    voiceBtn.innerHTML = '<i data-lucide="alert-triangle" class="h-4 w-4"></i> NOT SUPPORTED';
    voiceBtn.disabled = true;
  }

  function startRecording() {
    if (!recognition) return;
    isRecording = true;
    voiceBtn.innerHTML = '<i data-lucide="square" class="h-4 w-4"></i> ' + tLocal.stopVoice;
    voiceBtn.className = voiceBtn.className.replace('bg-red-500/10', 'bg-red-500').replace('text-red-500', 'text-white');
    voiceStatus.classList.remove('hidden');
    try { recognition.start(); } catch(e) {}
    logActivity('Started Hindi Voice Dictation', 'utilities');
    lucide.createIcons();
  }

  function stopRecording() {
    isRecording = false;
    if (recognition) {
      try { recognition.stop(); } catch(e) {}
    }
    voiceBtn.innerHTML = '<i data-lucide="mic" class="h-4 w-4"></i> ' + tLocal.startVoice;
    voiceBtn.className = voiceBtn.className.replace('bg-red-500', 'bg-red-500/10').replace('text-white', 'text-red-500');
    voiceStatus.classList.add('hidden');
    lucide.createIcons();
  }

  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      if (isRecording) stopRecording();
      else startRecording();
    });
  }

  window.pmConvertHindi = async () => {
    const transArea = document.getElementById('transliteration-textarea');
    if (!transArea || !transArea.value.trim()) return;
    
    const text = transArea.value;
    const btn = document.getElementById('convert-btn');
    const originalHtml = btn.innerHTML;
    
    // UI Loading state
    btn.innerHTML = '<i data-lucide="loader-2" class="h-4 w-4 animate-spin"></i> Converting...';
    btn.disabled = true;
    
    try {
      // Split text into chunks if it's too long, but for a paragraph, it's fine.
      const urlText = encodeURIComponent(text);
      const response = await fetch('https://inputtools.google.com/request?text=' + urlText + '&itc=hi-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=test');
      const data = await response.json();
      
      if (data && data[0] === 'SUCCESS' && data[1][0][1] && data[1][0][1].length > 0) {
        const hindiText = data[1][0][1][0]; // First suggestion for entire string
        transArea.value = hindiText;
        logActivity('Converted Hinglish to Hindi', 'utilities');
      } else {
        alert("Conversion failed. Please check network.");
      }
    } catch (err) {
      console.error('Transliteration failed:', err);
      alert("Conversion service unavailable.");
    } finally {
      btn.innerHTML = originalHtml;
      btn.disabled = false;
      lucide.createIcons();
    }
  };

  window.pmCopyText = (id) => {
    const el = document.getElementById(id);
    if (el && el.value) {
      navigator.clipboard.writeText(el.value);
      logActivity('Copied Hindi text to clipboard', 'utilities');
      alert('Text copied to clipboard!');
    }
  };

  lucide.createIcons();
}
