// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - LERS & Financial Nodal Directory

import { FINANCIAL_NODALS } from './financial_nodals_data.js';

const LERS_PORTALS = [
  {
    "category": "Social Media",
    "platform": "Instagram",
    "title": "Instagram Law Enforcement Request System/Portal",
    "url": "https://www.facebook.com/records",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Facbook",
    "title": "Facbook Law Enforcement Request System/Portal",
    "url": "https://www.facebook.com/records",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Twitter",
    "title": "Twitter Law Enforcement Request System/Portal",
    "url": "https://legalrequests.twitter.com/forms/landing_disclaimer",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Whatsapp",
    "title": "Whatsapp Law Enforcement Request System/Portal",
    "url": "https://www.whatsapp.com/records",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "All Google Products",
    "title": "All Google Products Law Enforcement Request System/Portal",
    "url": "https://lers.google.com/",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Yahoo",
    "title": "Yahoo Law Enforcement Request System/Portal",
    "url": "https://lawenforcementrequests.oath.com",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Pinterest",
    "title": "Pinterest Law Enforcement Request System/Portal",
    "url": "https://help.pinterest.com/en/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "kik",
    "title": "kik Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/kik/signin",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "zoom",
    "title": "zoom Law Enforcement Request System/Portal",
    "url": "https://lers.zoom.us/",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Linkedin",
    "title": "Linkedin Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/linkedin/signin",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Badoo - Dating & Meet People",
    "title": "Badoo - Dating & Meet People  Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/badoo/signup",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Gab(Social networking)",
    "title": "Gab(Social networking) Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/gab/signup",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Bumble (Social and dating app)",
    "title": "Bumble (Social and dating app) Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/bmbl/signup",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Amino",
    "title": "Amino Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/amino/signup",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Snapchat",
    "title": "Snapchat Nodal Officer Contact Details",
    "url": "https://www.cyberyodha.org/2022/05/nodal-officer-snapchat.html",
    "is_sublink": true
  },
  {
    "category": "Social Media",
    "platform": "Sharechat",
    "title": "Sharechat Nodal Officer Contact Details",
    "url": "https://www.cyberyodha.org/2022/05/nodal-officer-sharechat.html",
    "is_sublink": true
  },
  {
    "category": "Social Media",
    "platform": "MX TakaTak",
    "title": "MX TakaTak Nodal Officer Contact Details",
    "url": "https://www.cyberyodha.org/2022/05/nodal-officer-mx-takatak.html",
    "is_sublink": true
  },
  {
    "category": "Social Media",
    "platform": "Koo",
    "title": "Koo Nodal Officer Contact Details",
    "url": "https://www.cyberyodha.org/2022/05/koo-nodal-officer-contact-details.html",
    "is_sublink": true
  },
  {
    "category": "Cryptocurrency",
    "platform": "Binance",
    "title": "Binance Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/binance/signup",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "Binance French",
    "title": "Binance French Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/binance-fr/signup",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "Coinbase",
    "title": "Coinbase Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/coinbase-intl/signup",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "Coinbase-US",
    "title": "Coinbase-US Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/coinbase-us/signup",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "FTX US",
    "title": "FTX US Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/ftx-us/signup",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "MoonPay",
    "title": "MoonPay Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/moonpay/signup",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "Crossriver",
    "title": "Crossriver Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/crossriver/signup",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "OpenSea",
    "title": "OpenSea Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/opensea/signup",
    "is_sublink": false
  },
  {
    "category": "E-Wallet",
    "platform": "Google Pay",
    "title": "Google Pay Law Enforcement Request System/Portal",
    "url": "https://support.google.com/pay/india/contact/pay_india_requests",
    "is_sublink": false
  },
  {
    "category": "E-Wallet",
    "platform": "PhonePe",
    "title": "PhonePe Law Enforcement Request System/Portal",
    "url": "https://cybercell.phonepe.com",
    "is_sublink": false
  },
  {
    "category": "E-Wallet",
    "platform": "Razorpay",
    "title": "Razorpay Law Enforcement Request System/Portal",
    "url": "https://razorpay.com/support/?cybercrime=true",
    "is_sublink": false
  },
  {
    "category": "E-Wallet",
    "platform": "Paytm",
    "title": "Paytm Nodal Officer Contact Details",
    "url": "https://www.cyberyodha.org/2022/06/e-commerc-paytm-nodal-officer-contact.html",
    "is_sublink": true
  },
  {
    "category": "E-Wallet",
    "platform": "Freecharge",
    "title": "Freecharge Nodal Officer Contact Details",
    "url": "https://www.cyberyodha.org/2022/06/e-commerc-freecharge-nodal-officer.html",
    "is_sublink": true
  },
  {
    "category": "E-Wallet",
    "platform": "BillDesk",
    "title": "BillDesk Nodal Officer Contact Details",
    "url": "https://www.cyberyodha.org/2022/06/e-commerc-billdesk-nodal-officer.html",
    "is_sublink": true
  },
  {
    "category": "E-Wallet",
    "platform": "SBIBUDDY",
    "title": "SBIBUDDY Nodal Officer Contact Details",
    "url": "https://www.cyberyodha.org/2022/06/e-commerc-sbibuddy-nodal-officer.html",
    "is_sublink": true
  },
  {
    "category": "E-Mail/SMS",
    "platform": "G-Mail",
    "title": "G-Mail Law Enforcement Request System/Portal",
    "url": "https://lers.google.com/",
    "is_sublink": false
  },
  {
    "category": "E-Mail/SMS",
    "platform": "Outlook",
    "title": "Outlook Law Enforcement Request System/Portal",
    "url": "https://leportal.microsoft.com/",
    "is_sublink": false
  },
  {
    "category": "E-Mail/SMS",
    "platform": "SendGrid (Email Delivery Service)",
    "title": "SendGrid (Email Delivery Service)Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/sendgrid/signup",
    "is_sublink": false
  },
  {
    "category": "E-Mail/SMS",
    "platform": "Vfirst(SMS,WhatsApp,Email APIs)",
    "title": "Vfirst(SMS,WhatsApp,Email APIs)Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/vfirst/signup",
    "is_sublink": false
  },
  {
    "category": "E-Mail/SMS",
    "platform": "Twilio",
    "title": "Twilio Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/twlo/signup",
    "is_sublink": false
  },
  {
    "category": "E-Mail/SMS",
    "platform": "Rediffmail",
    "title": "Rediffmail Nodal Officer Contact Details",
    "url": "https://www.cyberyodha.org/2022/06/e-mail-rediffmail-nodal-officer-contact.html",
    "is_sublink": true
  },
  {
    "category": "VoIP",
    "platform": "2nd Line - US phone number",
    "title": "2nd Line - US phone number",
    "url": "http://2ndline.net/en/privacy_policy.html",
    "is_sublink": false
  },
  {
    "category": "VoIP",
    "platform": "Burner: 2nd Phone Number Line",
    "title": "Burner: 2nd Phone Number Line",
    "url": "https://www.burnerapp.com/privacy-policy/",
    "is_sublink": false
  },
  {
    "category": "VoIP",
    "platform": "CoverMe - Second Phone Number",
    "title": "CoverMe - Second Phone Number",
    "url": "http://www.coverme.ws/pp",
    "is_sublink": false
  },
  {
    "category": "VoIP",
    "platform": "Dingtone: US Phone Number",
    "title": "Dingtone: US Phone Number",
    "url": "https://www.dingtone.me/privacy_policy.html",
    "is_sublink": false
  },
  {
    "category": "VoIP",
    "platform": "Call India - IndiaCall",
    "title": "Call India - IndiaCall",
    "url": "https://www.freecall.me/static/privacy_policy.html",
    "is_sublink": false
  },
  {
    "category": "VoIP",
    "platform": "GrooVe IP VoIP Calls & Text",
    "title": "GrooVe IP VoIP Calls & Text",
    "url": "https://snrblabs.com/GrooVeIP/PrivacyPolicy",
    "is_sublink": false
  },
  {
    "category": "VoIP",
    "platform": "Hushed - Second Phone Number",
    "title": "Hushed - Second Phone Number",
    "url": "https://hushed.com/privacy-policy/",
    "is_sublink": false
  },
  {
    "category": "VoIP",
    "platform": "Line2 - Second Phone Number",
    "title": "Line2 - Second Phone Number",
    "url": "https://www.line2.com/privacy/",
    "is_sublink": false
  },
  {
    "category": "VoIP",
    "platform": "Line2 - Second Phone Number",
    "title": "Line2 - Second Phone Number",
    "url": "https://www.talkatone.com/privacy/",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Twilio Authy",
    "title": "Twilio Authy Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/authy/signup",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Fintech Fincrime Exchange",
    "title": "Fintech Fincrime Exchange Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/ffe/signup",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Roblox (Online Game)",
    "title": "Roblox (Online Game) Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/roblox/signup",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Segment (Software company)",
    "title": "Segment (Software company) Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/segment/signup",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Subsentio",
    "title": "Subsentio Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/subsentio/signup",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Twilio Zipwhip",
    "title": "Twilio Zipwhip Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/zip-whip/signup",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Amazon & AWS",
    "title": "Amazon & AWS Law Enforcement Request System/Portal",
    "url": "https://lawenforcementrequests.amazon.com/",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Microsoft",
    "title": "Microsoft Law Enforcement Request Portal",
    "url": "https://leportal.microsoft.com/",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Apple",
    "title": "Apple Law Enforcement Request System/Portal",
    "url": "https://lers.apple.com/",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Airbnb",
    "title": "Airbnb Law Enforcement Request Portal",
    "url": "https://www.airbnb.com/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Adobe",
    "title": "Adobe Law Enforcement Request System/Portal",
    "url": "https://lawenforcementrequests.adobe.com/",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Netflix",
    "title": "Netflix Law Enforcement Guidelines",
    "url": "https://www.netflix.com/law-enforcement-guidelines",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Dropbox",
    "title": "Dropbox Law Enforcement Guidelines & Portal",
    "url": "https://www.dropbox.com/guidelines/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "eBay",
    "title": "eBay Law Enforcement Request Portal",
    "url": "https://www.ebay.com/law-enforcement-request-portal",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Etsy",
    "title": "Etsy Law Enforcement Guidelines & Portal",
    "url": "https://www.etsy.com/legal/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Evernote",
    "title": "Evernote Law Enforcement Guidelines & Portal",
    "url": "https://evernote.com/legal/law-enforcement-guidelines",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Fastly",
    "title": "Fastly Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/fastly/signup",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "GitHub",
    "title": "GitHub Law Enforcement Records Portal",
    "url": "https://github.com/records/",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "GoDaddy",
    "title": "GoDaddy Law Enforcement Request Portal",
    "url": "https://www.godaddy.com/legal/agreements/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Imgur",
    "title": "Imgur Law Enforcement Request System/Portal",
    "url": "https://imgur.com/legal/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Mailchimp",
    "title": "Mailchimp Law Enforcement Guidelines & Portal",
    "url": "https://mailchimp.com/legal/law-enforcement/",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Medium",
    "title": "Medium Law Enforcement Request System/Portal",
    "url": "https://medium.com/policy/medium-law-enforcement-guidelines",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Namecheap",
    "title": "Namecheap Law Enforcement Request Portal",
    "url": "https://www.namecheap.com/legal/law-enforcement/",
    "is_sublink": false
  },
  {
    "category": "E-Wallet",
    "platform": "PayPal",
    "title": "PayPal Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/paypal/signup",
    "is_sublink": false
  },
  {
    "category": "E-Mail/SMS",
    "platform": "Proton",
    "title": "ProtonMail and ProtonVPN Law Enforcement Request Portal",
    "url": "https://proton.me/legal/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Reddit",
    "title": "Reddit Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/reddit/signup",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Salesforce",
    "title": "Salesforce Law Enforcement Request Portal",
    "url": "https://www.salesforce.com/company/legal/law-enforcement-guidelines/",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Scribd",
    "title": "Scribd Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/scribd/signup",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Slack",
    "title": "Slack Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/slack/signin",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Spotify",
    "title": "Spotify Law Enforcement Request Portal",
    "url": "https://www.spotify.com/legal/law-enforcement-guidelines/",
    "is_sublink": false
  },
  {
    "category": "E-Wallet",
    "platform": "Stripe",
    "title": "Stripe Law Enforcement Guidelines & Portal",
    "url": "https://stripe.com/docs/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Tumblr",
    "title": "Tumblr Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/tumblr/signup",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Viber",
    "title": "Viber Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/viber/signup",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Vimeo",
    "title": "Vimeo Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/vimeo/signup",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "WordPress.com",
    "title": "Automattic / WordPress Law Enforcement Portal",
    "url": "https://automattic.com/law-enforcement/",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Zoho",
    "title": "Zoho Law Enforcement Guidelines & Portal",
    "url": "https://www.zoho.com/privacy/law-enforcement-guidelines.html",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "TikTok",
    "title": "TikTok Law Enforcement Request System/Portal",
    "url": "https://www.tiktok.com/legal/law-enforcement-guidelines",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Discord",
    "title": "Discord Law Enforcement Request Portal",
    "url": "https://discord.com/safety/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Social Media",
    "platform": "Signal Messenger",
    "title": "Signal Law Enforcement Request System/Portal",
    "url": "https://signal.org/legal/",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "Kraken",
    "title": "Kraken Crypto Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/kraken/signup",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "Bitstamp",
    "title": "Bitstamp Crypto Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/bitstamp/signup",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "WazirX",
    "title": "WazirX India Law Enforcement Portal",
    "url": "https://wazirx.com/legal/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "CoinDCX",
    "title": "CoinDCX India Law Enforcement Request Portal",
    "url": "https://coindcx.com/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "Bitbns",
    "title": "Bitbns India Law Enforcement Request Portal",
    "url": "https://bitbns.com/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "KuCoin",
    "title": "KuCoin Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/kucoin/signup",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "OKX",
    "title": "OKX Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/okx/signup",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "Bybit",
    "title": "Bybit Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/bybit/signup",
    "is_sublink": false
  },
  {
    "category": "Cryptocurrency",
    "platform": "Gemini",
    "title": "Gemini Trust Law Enforcement Request System/Portal",
    "url": "https://app.kodex.us/gemini/signup",
    "is_sublink": false
  },
  {
    "category": "E-Wallet",
    "platform": "Ola Money",
    "title": "Ola Money Law Enforcement Request Portal",
    "url": "https://www.olamoney.com/law-enforcement",
    "is_sublink": false
  },
  {
    "category": "E-Wallet",
    "platform": "Amazon Pay India",
    "title": "Amazon Pay India Law Enforcement Request Portal",
    "url": "https://www.amazon.in/gp/help/customer/display.html?nodeId=201505260",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Uber",
    "title": "Uber Law Enforcement Request Portal",
    "url": "https://www.uber.com/legal/en/document?name=guidelines-for-law-enforcement",
    "is_sublink": false
  },
  {
    "category": "Other",
    "platform": "Ola Cabs",
    "title": "Ola Cabs Law Enforcement Request Portal",
    "url": "https://www.olacabs.com/law-enforcement",
    "is_sublink": false
  }
];

const LERS_CATEGORIES = {
  all: { label_en: 'All Portals', label_hi: 'सभी पोर्टल', icon: 'globe', color: 'cyber-blue' },
  'Social Media': { label_en: 'Social Media', label_hi: 'सोशल मीडिया', icon: 'share-2', color: 'violet-400' },
  'Cryptocurrency': { label_en: 'Cryptocurrency', label_hi: 'क्रिप्टोकरंसी', icon: 'coins', color: 'amber-400' },
  'E-Wallet': { label_en: 'E-Wallets', label_hi: 'ई-वॉलेट', icon: 'wallet', color: 'emerald-400' },
  'E-Mail/SMS': { label_en: 'E-Mail & SMS', label_hi: 'ईमेल व एसएमएस', icon: 'mail', color: 'sky-400' },
  'VoIP': { label_en: 'VoIP Services', label_hi: 'वीओआईपी सेवाएं', icon: 'phone-call', color: 'cyan-400' },
  'Other': { label_en: 'Other Portals', label_hi: 'अन्य पोर्टल', icon: 'layers', color: 'slate-400' }
};

export function renderNodalSearch(state, container) {
  const isDark = state.theme === 'dark';
  const lang = state.lang;

  if (!state.nodalActiveTab || state.nodalActiveTab === 'up') state.nodalActiveTab = 'global';
  if (!state.nodalSearchQuery) state.nodalSearchQuery = '';
  if (!state.lersCategory) state.lersCategory = 'all';
  if (!state.financialCategory) state.financialCategory = 'all';
  if (!state.nodalLimit) state.nodalLimit = 20;

  const tLocal = {
    en: {
      header: 'CYBER LERS & NODALS DIRECTORY',
      desc: 'Access official Law Enforcement Request System (LERS) portals and national financial / telecom nodal directories.',
      phSearchGlobal: 'Search platform (e.g. Google, Binance, PhonePe, Paytm, Zoom)...',
      phSearchFinancial: 'Search bank, telecom provider, officer, or email...',
      tabGlobal: 'Global LERS Portals',
      tabFinancial: 'Financial & Telecom Nodals',
      btnCopy: 'Copy Details',
      btnMail: 'Email',
      copysuccess: 'Details copied to clipboard!',
      noResults: 'No records found matching your query.',
      btnLaunch: 'Launch Portal ↗',
      btnViewDetails: 'View Details ↗',
      categoryTitle: 'Platform Category'
    },
    hi: {
      header: 'साइबर LERS और नोडल निर्देशिका खोज',
      desc: 'आधिकारिक कानून प्रवर्तन अनुरोध प्रणाली (LERS) पोर्टल और राष्ट्रीय वित्तीय व टेलीकॉम नोडल निर्देशिका तक पहुंचें।',
      phSearchGlobal: 'प्लेटफ़ॉर्म खोजें (जैसे Google, Binance, PhonePe, Paytm, Zoom)...',
      phSearchFinancial: 'बैंक, टेलीकॉम प्रदाता, अधिकारी, या ईमेल खोजें...',
      tabGlobal: 'वैश्विक LERS पोर्टल',
      tabFinancial: 'वित्तीय व टेलीकॉम नोडल',
      btnCopy: 'कॉपी करें',
      btnMail: 'ईमेल',
      copysuccess: 'विवरण क्लिपबोर्ड पर कॉपी किया गया!',
      noResults: 'आपके खोज अनुरोध से मेल खाता कोई रिकॉर्ड नहीं मिला।',
      btnLaunch: 'पोर्टल खोलें ↗',
      btnViewDetails: 'विवरण देखें ↗',
      categoryTitle: 'प्लेटफ़ॉर्म श्रेणी'
    }
  }[lang];

  // Filtering Logic
  const q = state.nodalSearchQuery.toLowerCase().trim();
  
  let filteredGlobal = [];
  let filteredFinancial = [];

  if (state.nodalActiveTab === 'global') {
    filteredGlobal = LERS_PORTALS.filter(p => {
      const catMatch = state.lersCategory === 'all' || p.category === state.lersCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        p.platform.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.url.toLowerCase().includes(q)
      );
    });
  } else if (state.nodalActiveTab === 'financial') {
    filteredFinancial = FINANCIAL_NODALS.filter(f => {
      const catMatch = state.financialCategory === 'all' || f.category === state.financialCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        f.platform.toLowerCase().includes(q) ||
        f.officer.toLowerCase().includes(q) ||
        f.email.toLowerCase().includes(q) ||
        f.phone.toLowerCase().includes(q) ||
        f.address.toLowerCase().includes(q)
      );
    });
  }

  // Category counts for LERS
  const lersCounts = {};
  for (const cat of Object.keys(LERS_CATEGORIES)) {
    if (cat === 'all') {
      lersCounts.all = LERS_PORTALS.length;
    } else {
      lersCounts[cat] = LERS_PORTALS.filter(p => p.category === cat).length;
    }
  }

  // Financial category counts
  const finCounts = {
    all: FINANCIAL_NODALS.length,
    Bank: FINANCIAL_NODALS.filter(f => f.category === 'Bank').length,
    Telecom: FINANCIAL_NODALS.filter(f => f.category === 'Telecom').length
  };

  const colorMap = {
    'cyber-blue': 'text-cyan-400', 'violet-400': 'text-violet-400', 'amber-400': 'text-amber-400',
    'emerald-400': 'text-emerald-400', 'sky-400': 'text-sky-400', 'cyan-400': 'text-cyan-400',
    'slate-400': 'text-slate-400'
  };

  const bgMap = {
    'cyber-blue': 'bg-cyan-400/10 border-cyan-500/30', 'violet-400': 'bg-violet-400/10 border-violet-500/30',
    'amber-400': 'bg-amber-400/10 border-amber-500/30', 'emerald-400': 'bg-emerald-400/10 border-emerald-500/30',
    'sky-400': 'bg-sky-400/10 border-sky-500/30', 'cyan-400': 'bg-cyan-400/10 border-cyan-500/30',
    'slate-400': 'bg-slate-400/10 border-slate-500/30'
  };

  // Build category filters layout
  let categoryFiltersHTML = '';
  if (state.nodalActiveTab === 'global') {
    categoryFiltersHTML = `
      <div class="flex flex-wrap gap-2 py-1">
        ${Object.entries(LERS_CATEGORIES).map(([key, cat]) => {
          const active = state.lersCategory === key;
          const count = lersCounts[key] || 0;
          const colorCls = colorMap[cat.color] || 'text-cyber-blue';
          const bgCls = bgMap[cat.color] || 'bg-cyan-400/10 border-cyan-500/30';
          const activeCls = active ? `${bgCls} ${colorCls}` : (isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100');
          return `
            <button onclick="window.pmSwitchLersCategory('${key}')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold font-mono transition-all border ${activeCls}">
              <i data-lucide="${cat.icon}" class="h-3.5 w-3.5"></i>
              <span>${lang === 'hi' ? cat.label_hi : cat.label_en}</span>
              <span class="text-[8px] opacity-60">(${count})</span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  } else if (state.nodalActiveTab === 'financial') {
    const activeClass = 'bg-cyan-400/10 border-cyan-500/30 text-cyan-400';
    const inactiveClass = isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100';
    categoryFiltersHTML = `
      <div class="flex flex-wrap gap-2 py-1">
        <button onclick="window.pmSwitchFinancialCategory('all')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold font-mono transition-all border ${state.financialCategory === 'all' ? activeClass : inactiveClass}">
          <i data-lucide="globe" class="h-3.5 w-3.5"></i>
          <span>${lang === 'hi' ? 'सभी नोडल' : 'All Nodals'}</span>
          <span class="text-[8px] opacity-60">(${finCounts.all})</span>
        </button>
        <button onclick="window.pmSwitchFinancialCategory('Bank')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold font-mono transition-all border ${state.financialCategory === 'Bank' ? 'bg-emerald-400/10 border-emerald-500/30 text-emerald-400' : inactiveClass}">
          <i data-lucide="building-2" class="h-3.5 w-3.5"></i>
          <span>${lang === 'hi' ? 'बैंकिंग व वॉलेट' : 'Banks & Wallets'}</span>
          <span class="text-[8px] opacity-60">(${finCounts.Bank})</span>
        </button>
        <button onclick="window.pmSwitchFinancialCategory('Telecom')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold font-mono transition-all border ${state.financialCategory === 'Telecom' ? 'bg-sky-400/10 border-sky-500/30 text-sky-400' : inactiveClass}">
          <i data-lucide="phone-outgoing" class="h-3.5 w-3.5"></i>
          <span>${lang === 'hi' ? 'टेलीकॉम व आईएसपी' : 'Telecom & ISPs'}</span>
          <span class="text-[8px] opacity-60">(${finCounts.Telecom})</span>
        </button>
      </div>
    `;
  }

  // Build grid data HTML
  let gridHTML = '';
  const totalMatched = state.nodalActiveTab === 'global' ? filteredGlobal.length : filteredFinancial.length;

  if (state.nodalActiveTab === 'global') {
    const slicedGlobal = filteredGlobal.slice(0, state.nodalLimit);
    if (slicedGlobal.length === 0) {
      gridHTML = `
        <div class="text-center py-12 text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-2xl">
          <i data-lucide="search-x" class="h-10 w-10 text-slate-700 mx-auto mb-3"></i>
          ${tLocal.noResults}
        </div>
      `;
    } else {
      const cards = slicedGlobal.map(p => {
        const catObj = LERS_CATEGORIES[p.category] || LERS_CATEGORIES['Other'];
        const colorCls = colorMap[catObj.color] || 'text-slate-400';
        const bgCls = bgMap[catObj.color] || 'bg-slate-400/10';

        let dispPlatform = p.platform;
        if (q) {
          const esc = q.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const re = new RegExp(`(${esc})`, 'gi');
          dispPlatform = p.platform.replace(re, '<mark class="bg-cyber-blue/30 text-cyber-blue rounded px-0.5">$1</mark>');
        }

        const safePlatform = p.platform.replace(/'/g, "\\'");

        return `
          <div class="group p-5 rounded-2xl border transition-all hover:scale-[1.01] hover:shadow-lg relative overflow-hidden flex flex-col justify-between ${
            isDark ? 'bg-slate-900/60 border-slate-800 hover:border-cyber-blue/30' : 'bg-white border-slate-200 shadow-sm hover:border-cyber-blue/30'
          }">
            <div>
              <div class="flex justify-between items-start mb-3 border-b ${isDark ? 'border-slate-800 pb-2' : 'border-slate-100 pb-2'}">
                <div>
                  <span class="text-[9px] font-bold font-mono px-2 py-0.5 rounded-full ${bgCls} ${colorCls} border border-white/5 uppercase tracking-widest inline-flex items-center gap-1">
                    <i data-lucide="${catObj.icon}" class="h-2.5 w-2.5"></i>
                    ${lang === 'hi' ? catObj.label_hi : catObj.label_en}
                  </span>
                  <h4 class="text-sm font-bold text-white font-mono mt-2 flex items-center gap-1.5">${dispPlatform}</h4>
                  <p class="text-[9px] text-slate-500 font-mono mt-0.5">${p.title}</p>
                </div>
                <i data-lucide="shield-check" class="h-5 w-5 text-emerald-400/30 shrink-0"></i>
              </div>
              <div class="space-y-1 text-[10px] font-mono mb-4">
                <p class="text-slate-400 leading-relaxed">
                  ${lang === 'hi' ? 'इस प्लेटफॉर्म का कानून प्रवर्तन अनुरोध दर्ज करने/जांच प्रेषित करने का आधिकारिक पोर्टल/नोडल ईमेल आईडी।' : 'Official portal/email system for submitting legal disclosures, subpoenas, and record requests to this platform.'}
                </p>
                <p class="text-[9px] text-slate-500 mt-2 truncate text-cyan-400/80">
                  <i data-lucide="link" class="h-3 w-3 inline mr-1 opacity-70"></i>
                  ${p.url}
                </p>
              </div>
            </div>
            <div class="flex gap-2 mt-2">
              <a href="${p.url}" target="_blank" class="flex-1 py-2 bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20 transition-all rounded-lg font-mono text-[9px] font-bold uppercase border border-cyber-blue/20 flex items-center justify-center gap-1">
                <i data-lucide="external-link" class="h-3 w-3"></i> 
                ${p.is_sublink ? tLocal.btnViewDetails : tLocal.btnLaunch}
              </a>
              <button onclick="window.pmCopyLers('${safePlatform}', '${p.url}', '${p.category}')" class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white transition-all rounded-lg font-mono text-[9px] font-bold uppercase border border-slate-700 flex items-center justify-center" title="Copy Link">
                <i data-lucide="copy" class="h-3 w-3"></i>
              </button>
            </div>
          </div>
        `;
      }).join('');

      const loadMoreBtn = totalMatched > state.nodalLimit ? `
        <div class="flex justify-center mt-6 col-span-full">
          <button onclick="window.pmLoadMoreNodals()" class="px-6 py-2.5 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-mono font-bold hover:bg-cyber-blue/20 transition-all uppercase tracking-wider flex items-center gap-2">
            <i data-lucide="chevrons-down" class="h-4 w-4"></i> Show More (+${totalMatched - state.nodalLimit} Portals)
          </button>
        </div>
      ` : '';

      gridHTML = `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">${cards}</div>${loadMoreBtn}`;
    }
  } else if (state.nodalActiveTab === 'financial') {
    const slicedFinancial = filteredFinancial.slice(0, state.nodalLimit);
    if (slicedFinancial.length === 0) {
      gridHTML = `
        <div class="text-center py-12 text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-2xl">
          <i data-lucide="search-x" class="h-10 w-10 text-slate-700 mx-auto mb-3"></i>
          ${tLocal.noResults}
        </div>
      `;
    } else {
      const cards = slicedFinancial.map(f => {
        const isBank = f.category === 'Bank';
        const catIcon = isBank ? 'building-2' : 'phone-outgoing';
        const catColor = isBank ? 'text-emerald-400' : 'text-sky-400';
        const catBg = isBank ? 'bg-emerald-400/10 border-emerald-500/20' : 'bg-sky-400/10 border-sky-500/20';

        let dispPlatform = f.platform;
        if (q) {
          const esc = q.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const re = new RegExp(`(${esc})`, 'gi');
          dispPlatform = f.platform.replace(re, '<mark class="bg-cyber-blue/30 text-cyber-blue rounded px-0.5">$1</mark>');
        }

        const safePlatform = f.platform.replace(/'/g, "\\'");
        const safeOfficer = f.officer.replace(/'/g, "\\'");

        const mailBtn = f.email !== 'Not Available' ? `
          <a href="mailto:${f.email.split(',')[0].trim()}" class="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white transition-all rounded-lg font-mono text-[9px] font-bold uppercase border border-slate-700 flex items-center justify-center gap-1">
            <i data-lucide="mail" class="h-3 w-3"></i> ${tLocal.btnMail}
          </a>
        ` : '';

        return `
          <div class="group p-5 rounded-2xl border transition-all hover:scale-[1.01] hover:shadow-lg relative overflow-hidden flex flex-col justify-between ${
            isDark ? 'bg-slate-900/60 border-slate-800 hover:border-cyber-blue/30' : 'bg-white border-slate-200 shadow-sm hover:border-cyber-blue/30'
          }">
            <div>
              <div class="flex justify-between items-start mb-3 border-b ${isDark ? 'border-slate-800 pb-2' : 'border-slate-100 pb-2'}">
                <div>
                  <span class="text-[9px] font-bold font-mono px-2 py-0.5 rounded-full ${catBg} ${catColor} border uppercase tracking-widest inline-flex items-center gap-1">
                    <i data-lucide="${catIcon}" class="h-2.5 w-2.5"></i>
                    ${isBank ? (lang === 'hi' ? 'बैंकिंग व वॉलेट' : 'Bank & Wallet') : (lang === 'hi' ? 'टेलीकॉम व आईएसपी' : 'Telecom & ISP')}
                  </span>
                  <h4 class="text-xs font-bold text-white font-mono mt-2">${dispPlatform}</h4>
                  <p class="text-[9px] text-slate-500 font-mono mt-0.5">${f.officer}</p>
                </div>
                <i data-lucide="shield" class="h-5 w-5 text-slate-600/40 shrink-0"></i>
              </div>
              <div class="space-y-2 text-[10px] font-mono mb-4">
                <p class="flex items-start gap-2 text-slate-300">
                  <i data-lucide="mail" class="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0"></i>
                  <span class="break-all">Email: <span class="text-cyan-400/90">${f.email}</span></span>
                </p>
                <p class="flex items-center gap-2 text-slate-300">
                  <i data-lucide="phone" class="h-3.5 w-3.5 text-slate-500 shrink-0"></i>
                  <span>Mobile/Phone: <span class="text-slate-400">${f.phone}</span></span>
                </p>
                <p class="flex items-start gap-2 text-slate-300">
                  <i data-lucide="map-pin" class="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0"></i>
                  <span class="line-clamp-2">Office: <span class="text-slate-400" title="${f.address}">${f.address}</span></span>
                </p>
              </div>
            </div>
            <div class="flex gap-2">
              <button onclick="window.pmCopyFinancial('${safePlatform}', '${safeOfficer}', '${f.email}', '${f.phone}')" class="flex-1 py-2 bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20 transition-all rounded-lg font-mono text-[9px] font-bold uppercase border border-cyber-blue/20 flex items-center justify-center gap-1">
                <i data-lucide="copy" class="h-3 w-3"></i> ${tLocal.btnCopy}
              </button>
              ${mailBtn}
            </div>
          </div>
        `;
      }).join('');

      const loadMoreBtn = totalMatched > state.nodalLimit ? `
        <div class="flex justify-center mt-6 col-span-full">
          <button onclick="window.pmLoadMoreNodals()" class="px-6 py-2.5 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-mono font-bold hover:bg-cyber-blue/20 transition-all uppercase tracking-wider flex items-center gap-2">
            <i data-lucide="chevrons-down" class="h-4 w-4"></i> Show More (+${totalMatched - state.nodalLimit} Nodals)
          </button>
        </div>
      ` : '';

      gridHTML = `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">${cards}</div>${loadMoreBtn}`;
    }
  }

  container.innerHTML = `
    <div class="space-y-6">
      <!-- HEADER -->
      <div class="flex justify-between items-start border-b border-slate-800/40 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <i data-lucide="git-branch" class="h-6 w-6 text-cyber-blue shrink-0"></i> ${tLocal.header}
          </h2>
          <p class="text-xs text-slate-400 font-mono mt-1">${tLocal.desc}</p>
        </div>
      </div>

      <!-- SEGMENTED SWITCH (2 TABS) -->
      <div class="flex p-1 rounded-xl bg-slate-950/60 border border-slate-800/85 max-w-xl font-mono text-xs">
        <button onclick="window.pmSwitchNodalTab('global')" class="flex-1 py-2 px-1.5 text-center font-bold rounded-lg transition-all ${
          state.nodalActiveTab === 'global'
            ? 'bg-cyber-blue text-cyber-950 shadow-md'
            : 'text-slate-400 hover:text-white bg-transparent'
        }">
          ${tLocal.tabGlobal} (${LERS_PORTALS.length})
        </button>
        <button onclick="window.pmSwitchNodalTab('financial')" class="flex-1 py-2 px-1.5 text-center font-bold rounded-lg transition-all ${
          state.nodalActiveTab === 'financial'
            ? 'bg-cyber-blue text-cyber-950 shadow-md'
            : 'text-slate-400 hover:text-white bg-transparent'
        }">
          ${tLocal.tabFinancial} (${FINANCIAL_NODALS.length})
        </button>
      </div>

      <!-- SEARCH BOX -->
      <div class="relative">
        <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none"></i>
        <input
          id="nodal-directory-search-input"
          type="text"
          value="${state.nodalSearchQuery}"
          placeholder="${
            state.nodalActiveTab === 'global'
              ? tLocal.phSearchGlobal
              : tLocal.phSearchFinancial
          }"
          class="w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-mono transition-all focus:outline-none focus:ring-2 focus:ring-cyber-blue/40 ${
            isDark
              ? 'bg-cyber-950 border-slate-800 text-white placeholder-slate-600'
              : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
          }"
        />
      </div>

      <!-- FILTERS -->
      ${categoryFiltersHTML}

      <!-- DATA GRID -->
      ${gridHTML}
    </div>
  `;

  // Bind Search Input
  const inp = document.getElementById('nodal-directory-search-input');
  if (inp) {
    inp.addEventListener('input', (e) => {
      state.nodalSearchQuery = e.target.value;
      state.nodalLimit = 20;
      renderNodalSearch(state, container);
    });
    // Maintain focus but move cursor to end
    inp.focus();
    const val = inp.value;
    inp.value = '';
    inp.value = val;
  }

  // Nodal switch tab
  window.pmSwitchNodalTab = (tab) => {
    state.nodalActiveTab = tab;
    state.nodalSearchQuery = '';
    state.nodalLimit = 20;
    renderNodalSearch(state, container);
  };

  // LERS category switch
  window.pmSwitchLersCategory = (cat) => {
    state.lersCategory = cat;
    state.nodalLimit = 20;
    renderNodalSearch(state, container);
  };

  // Financial category switch
  window.pmSwitchFinancialCategory = (cat) => {
    state.financialCategory = cat;
    state.nodalLimit = 20;
    renderNodalSearch(state, container);
  };

  // Load More nodals
  window.pmLoadMoreNodals = () => {
    state.nodalLimit += 30;
    renderNodalSearch(state, container);
  };

  // Copy Global LERS
  window.pmCopyLers = (platform, url, category) => {
    const text = `Law Enforcement Request System (LERS) Portal:\nPlatform: ${platform}\nCategory: ${category}\nAccess URL: ${url}`;
    navigator.clipboard.writeText(text).then(() => {
      showToast(tLocal.copysuccess);
    });
    logActivity(`Copied LERS portal URL for ${platform}`, 'cyber_dashboard');
  };

  // Copy Financial Nodal
  window.pmCopyFinancial = (platform, officer, email, phone) => {
    const text = `Nodal Officer Contact Details:\nPlatform: ${platform}\nOfficer: ${officer}\nEmail: ${email}\nPhone: ${phone}`;
    navigator.clipboard.writeText(text).then(() => {
      showToast(tLocal.copysuccess);
    });
    logActivity(`Copied contact details for ${platform}`, 'cyber_dashboard');
  };

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-cyber-900 border border-cyber-blue/40 text-xs font-mono text-cyber-blue shadow-cyber-glow flex items-center gap-2 animate-fade-in';
    toast.innerHTML = `<span>✓</span><span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  }

  lucide.createIcons();
}
