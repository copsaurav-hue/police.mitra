
// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - SANHITA Legal Lookup System v2.0
// Premium Glassmorphic Cyber-Legal Interface

/* =========================================================================
   COMPREHENSIVE SANHITA DATABASE
   BNS = Bharatiya Nyaya Sanhita (Cyber Blue)
   BNSS = Bharatiya Nagarik Suraksha Sanhita (Crimson)
   BSA = Bharatiya Sakshya Adhiniyam (Gold)
   ========================================================================= */
const SANHITA_DB = {
  BNS: [
    { sec: '101', title: 'Murder', hindi: 'हत्या', old: 'IPC 302', desc: 'Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine. Replaces IPC Section 302 with enhanced digital evidence provisions.', keywords: ['murder', 'death', 'kill', 'hत्या'] },
    { sec: '103', title: 'Culpable Homicide not amounting to Murder', hindi: 'गैर इरादतन हत्या', old: 'IPC 304', desc: 'Whoever commits culpable homicide not amounting to murder, shall be punished with imprisonment for life.', keywords: ['homicide', 'culpable', 'manslaughter'] },
    { sec: '111', title: 'Organised Crime', hindi: 'संगठित अपराध', old: 'NEW', desc: 'New section targeting organised criminal syndicates, cyber fraud gangs, and economic crime networks. Non-bailable. Punishment: imprisonment not less than 5 years, extendable to life.', keywords: ['organised', 'gang', 'syndicate', 'cyber gang', 'fraud network', 'संगठित'] },
    { sec: '113', title: 'Terrorist Act', hindi: 'आतंकवाद', old: 'UAPA', desc: 'Acts of terrorism including cyber-terrorism. Punishment: death or life imprisonment.', keywords: ['terror', 'bomb', 'cyber terror'] },
    { sec: '115', title: 'Voluntarily Causing Hurt', hindi: 'स्वेच्छा से चोट पहुँचाना', old: 'IPC 323', desc: 'Whoever voluntarily causes hurt shall be punished with imprisonment up to one year or with fine up to ten thousand rupees or with both.', keywords: ['hurt', 'assault', 'beat', 'चोट'] },
    { sec: '117', title: 'Voluntarily Causing Grievous Hurt', hindi: 'गंभीर चोट', old: 'IPC 325', desc: 'Whoever voluntarily causes grievous hurt shall be punished with imprisonment up to seven years and shall also be liable to fine.', keywords: ['grievous', 'serious hurt', 'गंभीर'] },
    { sec: '152', title: 'Act endangering sovereignty', hindi: 'संप्रभुता को खतरा', old: 'IPC 124A (Sedition Replacement)', desc: 'Whoever, purposely or knowingly, by words either spoken or written, or by signs, or by visible representation, or by electronic communication, excites or attempts to excite, secession or armed rebellion or subversive activities.', keywords: ['sedition', 'sovereignty', 'rebellion', 'राजद्रोह'] },
    { sec: '175', title: 'Negligent Act', hindi: 'लापरवाह कार्य', old: 'IPC 304A', desc: 'Whoever causes the death of any person by doing any rash or negligent act not amounting to culpable homicide shall be punished with imprisonment up to five years.', keywords: ['negligence', 'rash', 'accident', 'लापरवाही'] },
    { sec: '189', title: 'Unlawful Assembly', hindi: 'गैरकानूनी सभा', old: 'IPC 141', desc: 'An assembly of five or more persons is designated an unlawful assembly if the common object is to commit any act that is an offence under the BNS.', keywords: ['assembly', 'riot', 'mob', 'भीड़'] },
    { sec: '191', title: 'Rioting', hindi: 'दंगा', old: 'IPC 146', desc: 'Whoever is guilty of rioting shall be punished with imprisonment up to two years or with fine or with both.', keywords: ['riot', 'mob violence', 'दंगा'] },
    { sec: '238', title: 'Counterfeiting Currency', hindi: 'नकली मुद्रा', old: 'IPC 489A', desc: 'Whoever counterfeits or whoever performs any part of the process of counterfeiting Indian currency notes shall be punished with imprisonment for life.', keywords: ['counterfeit', 'fake currency', 'नकली'] },
    { sec: '303', title: 'Theft', hindi: 'चोरी', old: 'IPC 379', desc: 'Replaces IPC Section 379. Enhanced scope explicitly covers hardware extraction, server-room intrusion data thefts, and smartphone stealing. Punishment: imprisonment up to three years.', keywords: ['theft', 'steal', 'rob', 'चोरी', 'data theft', 'phone theft'] },
    { sec: '304', title: 'Theft in Dwelling', hindi: 'घर में चोरी', old: 'IPC 380', desc: 'Whoever commits theft in any building, tent, or vessel which is used as a human dwelling, or used for the custody of property, shall be punished with imprisonment up to seven years.', keywords: ['house theft', 'burglary', 'dwelling', 'घर चोरी'] },
    { sec: '308', title: 'Extortion', hindi: 'जबरन वसूली', old: 'IPC 383', desc: 'Whoever intentionally puts any person in fear of any injury to that person, or to any other person, in order to induce that person to deliver any property, commits extortion.', keywords: ['extortion', 'blackmail', 'ransomware', 'वसूली'] },
    { sec: '310', title: 'Dacoity', hindi: 'डकैती', old: 'IPC 391', desc: 'When five or more persons conjointly commit or attempt to commit a robbery, every person so committing or aiding such act is guilty of dacoity.', keywords: ['dacoity', 'robbery gang', 'डकैती'] },
    { sec: '316', title: 'Criminal Breach of Trust', hindi: 'आपराधिक विश्वासघात', old: 'IPC 406', desc: 'Whoever, being in any manner entrusted with property, dishonestly misappropriates the same shall be punished with imprisonment up to three years.', keywords: ['breach of trust', 'embezzlement', 'विश्वासघात'] },
    { sec: '318', title: 'Cheating & Financial Fraud', hindi: 'धोखाधड़ी', old: 'IPC 420', desc: 'Replaces IPC Section 420. Strictly maps internet/email banking phishing, fake domain layouts, UPI credential harvesting, OTP fraud, and social media impersonation scams. Punishment: imprisonment up to seven years.', keywords: ['cheating', 'fraud', 'phishing', 'upi fraud', 'otp', 'scam', 'धोखाधड़ी', '420'] },
    { sec: '319', title: 'Cheating by Personation', hindi: 'प्रतिरूपण धोखाधड़ी', old: 'IPC 416', desc: 'A person is said to cheat by personation if he cheats by pretending to be some other person, or by knowingly substituting one person for another.', keywords: ['personation', 'impersonation', 'fake identity', 'प्रतिरूपण'] },
    { sec: '323', title: 'Forgery', hindi: 'जालसाजी', old: 'IPC 463', desc: 'Whoever makes any false document or false electronic record with intent to cause damage or injury shall be punished with imprisonment up to two years.', keywords: ['forgery', 'fake document', 'जालसाजी', 'false record'] },
    { sec: '351', title: 'Criminal Intimidation', hindi: 'आपराधिक भय', old: 'IPC 503', desc: 'Whoever threatens another with any injury to his person, reputation, or property, with intent to cause alarm, commits criminal intimidation.', keywords: ['threat', 'intimidation', 'threatening message', 'धमकी'] },
    { sec: '356', title: 'Defamation', hindi: 'मानहानि', old: 'IPC 499', desc: 'Making or publishing imputations concerning any person — now covers social media posts, WhatsApp messages, and digital content. Punishment: imprisonment up to two years.', keywords: ['defamation', 'libel', 'slander', 'social media defamation', 'मानहानि'] },
  ],
  BNSS: [
    { sec: '35', title: 'Notice of Appearance (Arrest Guidelines)', hindi: 'गिरफ्तारी नोटिस', old: 'CrPC 41A', desc: 'Replaces CrPC 41A. Police shall issue notice of appearance before arresting any person accused of an offence carrying imprisonment below seven years. Electronic notices via CUG email are admissible.', keywords: ['arrest', 'notice', 'appearance', 'गिरफ्तारी', '41A'] },
    { sec: '48', title: 'FIR Registration', hindi: 'एफआईआर दर्ज करना', old: 'CrPC 154', desc: 'Replaces CrPC 154. Every report relating to a cognisable offence shall be registered. Online FIR via e-police portal is now mandatory for cyber offences. Complainant to receive copy free of charge electronically.', keywords: ['FIR', 'first information report', 'complaint', 'एफआईआर'] },
    { sec: '94', title: 'Production of Documents', hindi: 'दस्तावेज़ की पेशी', old: 'CrPC 91', desc: 'Replaces CrPC 91. Any court or police officer may summon any person to produce any document or electronic record. Covers device extraction warrants, cloud data orders, and CCTV footage.', keywords: ['documents', 'electronic record', 'CDR', 'call records', 'दस्तावेज़'] },
    { sec: '105', title: 'Attachment of Property', hindi: 'संपत्ति की कुर्की', old: 'CrPC 102', desc: 'Police officer may seize any property found under circumstances which create suspicion of commission of any offence, including digital wallets, cryptocurrency accounts, and online gaming assets.', keywords: ['seizure', 'attachment', 'property', 'digital wallet', 'कुर्की'] },
    { sec: '167', title: 'Custody and Remand', hindi: 'रिमांड', old: 'CrPC 167', desc: 'Judicial remand provisions. Magistrate may authorise detention up to 60 or 90 days based on offence severity. Video-conferencing for remand hearings is now statutorily permitted.', keywords: ['remand', 'custody', 'judicial custody', 'रिमांड'] },
    { sec: '176', title: 'Inquest Report', hindi: 'जांच रिपोर्ट', old: 'CrPC 174', desc: 'Procedure for inquest. Now mandates photographic and video documentation of scene, body, and evidence by investigating officer using body-worn cameras or mobile devices.', keywords: ['inquest', 'postmortem', 'death inquiry', 'जांच'] },
    { sec: '193', title: 'Charge Sheet (Final Report)', hindi: 'चार्जशीट', old: 'CrPC 173', desc: 'Replaces CrPC 173. Police report (chargesheet) to be filed within 60/90 days. Digital evidence annexures mandatory. E-filing via court management portal is permitted.', keywords: ['chargesheet', 'final report', 'challan', 'चार्जशीट'] },
    { sec: '479', title: 'Bail for Undertrial Prisoners', hindi: 'विचाराधीन कैदी की जमानत', old: 'CrPC 436A', desc: 'Person who has undergone detention for half the maximum imprisonment shall be released on bail. Reformative provision to reduce undertrial population.', keywords: ['bail', 'undertrial', 'जमानत', 'release'] },
    { sec: '530', title: 'Trial by Electronic Means', hindi: 'ई-सुनवाई', old: 'NEW', desc: 'Trials, inquiries, and hearings may be conducted using electronic means including video-conferencing. Documents may be submitted digitally. E-summons valid in law.', keywords: ['e-court', 'video conference', 'electronic trial', 'ई-सुनवाई'] },
  ],
  BSA: [
    { sec: '2', title: 'Definitions - Electronic Records', hindi: 'इलेक्ट्रॉनिक साक्ष्य', old: 'IEA 3', desc: 'Replaces IEA Section 3. Explicitly includes electronic records, digital documents, SMS, WhatsApp messages, emails, call records, and metadata as admissible evidence.', keywords: ['electronic evidence', 'digital evidence', 'email', 'whatsapp', 'CDR', 'इलेक्ट्रॉनिक'] },
    { sec: '23', title: 'Admissions', hindi: 'स्वीकारोक्ति', old: 'IEA 17', desc: 'Statements made by parties to proceedings including digital confessions, electronically signed statements, and voice-recorded admissions.', keywords: ['admission', 'confession', 'statement', 'स्वीकारोक्ति'] },
    { sec: '26', title: 'Confession to Police Officer', hindi: 'पुलिस को कबूलनामा', old: 'IEA 25', desc: 'No confession made to a police officer shall be proved against a person accused of any offence. Audio/video recorded confessions before magistrates remain admissible.', keywords: ['confession', 'police statement', 'कबूलनामा'] },
    { sec: '57', title: 'Documents in Electronic Form', hindi: 'इलेक्ट्रॉनिक दस्तावेज़', old: 'IEA 65B', desc: 'Replaces IEA 65B. Certificate for admissibility of electronic records. Any output of a computer system, CCTV footage, WhatsApp chat exports, call records shall be admissible with a Section 57 certificate signed by the custodian.', keywords: ['65B', 'electronic certificate', 'CCTV', 'digital evidence certificate', 'BSA 57', 'इलेक्ट्रॉनिक दस्तावेज़'] },
    { sec: '61', title: 'Proof of Contents of Electronic Records', hindi: 'इलेक्ट्रॉनिक सामग्री का प्रमाण', old: 'IEA 65A', desc: 'Contents of electronic records may be proved by producing the electronic record itself or by the certificate under section 57. Hash values and metadata serve as integrity verification.', keywords: ['electronic record proof', 'hash value', 'metadata', 'electronic contents'] },
    { sec: '63', title: 'Secondary Evidence', hindi: 'द्वितीयक साक्ष्य', old: 'IEA 63', desc: 'Secondary evidence may include printouts of electronic records, screenshots duly certified, and electronic copies of originals. Forensic copies from UFED/Cellebrite admissible.', keywords: ['secondary evidence', 'copy', 'screenshot', 'printout', 'द्वितीयक'] },
    { sec: '79', title: 'Presumption as to Electronic Records', hindi: 'इलेक्ट्रॉनिक अनुमान', old: 'IEA 79A', desc: 'Courts shall presume electronic messages sent from a registered device/number as genuine unless contrary is proved. Strengthens prosecution of cybercrime cases.', keywords: ['presumption', 'electronic message', 'registered device', 'WhatsApp presumption'] },
  ]
};

/* IPC to BNS/BNSS/BSA comprehensive mapping */
const IPC_MAP = {
  '1': { new: 'BNS 1', title: 'Short Title', law: 'BNS' },
  '34': { new: 'BNS 3(5)', title: 'Common Intention', law: 'BNS' },
  '107': { new: 'BNS 45', title: 'Abetment', law: 'BNS' },
  '120A': { new: 'BNS 61', title: 'Criminal Conspiracy (Definition)', law: 'BNS' },
  '120B': { new: 'BNS 61', title: 'Criminal Conspiracy (Punishment)', law: 'BNS' },
  '121': { new: 'BNS 147', title: 'Waging War Against State', law: 'BNS' },
  '124A': { new: 'BNS 152', title: 'Sedition/Sovereignty (Replaced)', law: 'BNS' },
  '141': { new: 'BNS 189', title: 'Unlawful Assembly', law: 'BNS' },
  '146': { new: 'BNS 191', title: 'Rioting', law: 'BNS' },
  '292': { new: 'BNS 294', title: 'Obscene Content', law: 'BNS' },
  '302': { new: 'BNS 101', title: 'Murder', law: 'BNS' },
  '304': { new: 'BNS 105', title: 'Culpable Homicide', law: 'BNS' },
  '304A': { new: 'BNS 106', title: 'Causing Death by Negligence', law: 'BNS' },
  '307': { new: 'BNS 109', title: 'Attempt to Murder', law: 'BNS' },
  '309': { new: 'REMOVED', title: 'Attempt to Suicide (Decriminalised)', law: 'BNS', note: 'Decriminalised under BNS.' },
  '323': { new: 'BNS 115', title: 'Voluntarily Causing Hurt', law: 'BNS' },
  '325': { new: 'BNS 117', title: 'Voluntarily Causing Grievous Hurt', law: 'BNS' },
  '354': { new: 'BNS 74', title: 'Assault on Woman (Modesty)', law: 'BNS' },
  '354A': { new: 'BNS 75', title: 'Sexual Harassment', law: 'BNS' },
  '354D': { new: 'BNS 78', title: 'Stalking', law: 'BNS' },
  '363': { new: 'BNS 137', title: 'Kidnapping', law: 'BNS' },
  '375': { new: 'BNS 63', title: 'Rape', law: 'BNS' },
  '376': { new: 'BNS 64', title: 'Punishment for Rape', law: 'BNS' },
  '379': { new: 'BNS 303', title: 'Theft', law: 'BNS' },
  '380': { new: 'BNS 304', title: 'Theft in Dwelling', law: 'BNS' },
  '383': { new: 'BNS 308', title: 'Extortion', law: 'BNS' },
  '391': { new: 'BNS 310', title: 'Dacoity', law: 'BNS' },
  '392': { new: 'BNS 309', title: 'Robbery', law: 'BNS' },
  '395': { new: 'BNS 311', title: 'Dacoity with Murder', law: 'BNS' },
  '406': { new: 'BNS 316', title: 'Criminal Breach of Trust', law: 'BNS' },
  '416': { new: 'BNS 319', title: 'Cheating by Personation', law: 'BNS' },
  '420': { new: 'BNS 318', title: 'Cheating & Fraud', law: 'BNS' },
  '448': { new: 'BNS 329', title: 'House Trespass', law: 'BNS' },
  '463': { new: 'BNS 323', title: 'Forgery', law: 'BNS' },
  '489A': { new: 'BNS 238', title: 'Counterfeiting Currency', law: 'BNS' },
  '499': { new: 'BNS 356', title: 'Defamation', law: 'BNS' },
  '503': { new: 'BNS 351', title: 'Criminal Intimidation', law: 'BNS' },
  '506': { new: 'BNS 351(2)', title: 'Punishment for Criminal Intimidation', law: 'BNS' },
  '509': { new: 'BNS 79', title: 'Words Gestures Insulting Modesty', law: 'BNS' },
  // CrPC -> BNSS
  '41A': { new: 'BNSS 35', title: 'Notice of Appearance', law: 'BNSS' },
  '91': { new: 'BNSS 94', title: 'Summons to Produce Documents', law: 'BNSS' },
  '102': { new: 'BNSS 105', title: 'Seizure of Property', law: 'BNSS' },
  '154': { new: 'BNSS 173', title: 'FIR Registration', law: 'BNSS' },
  '167': { new: 'BNSS 187', title: 'Procedure of Custody', law: 'BNSS' },
  '173': { new: 'BNSS 193', title: 'Report of Police Officer (Chargesheet)', law: 'BNSS' },
  '174': { new: 'BNSS 194', title: 'Inquest', law: 'BNSS' },
  '436A': { new: 'BNSS 479', title: 'Bail Undertrial (Half Period)', law: 'BNSS' },
  // IEA -> BSA
  '65A': { new: 'BSA 61', title: 'Proof of Electronic Records', law: 'BSA' },
  '65B': { new: 'BSA 57', title: 'Certificate for Electronic Evidence', law: 'BSA' },
};

/* IT Act Sections (remain valid alongside BNS) */
const IT_ACT = [
  { sec: '43', title: 'Penalty for Damage to Computer', hindi: 'कंप्यूटर नुकसान', desc: 'If any person without permission accesses or downloads data from a computer, or introduces any computer contaminant or virus, he shall be liable to pay damages.', keywords: ['hacking', 'unauthorized access', 'computer damage'] },
  { sec: '66', title: 'Computer Related Offences', hindi: 'साइबर अपराध', desc: 'If any person dishonestly or fraudulently does any act referred to in section 43, he shall be punishable with imprisonment up to three years or fine up to five lakh rupees.', keywords: ['hacking', 'cybercrime', 'IT act 66', 'साइबर अपराध'] },
  { sec: '66A', title: 'Sending offensive messages (Struck Down)', hindi: 'अपमानजनक संदेश', desc: 'STRUCK DOWN by Supreme Court in Shreya Singhal v. UOI (2015). No longer in force.', keywords: ['offensive message', '66A', 'struck down'] },
  { sec: '66B', title: 'Dishonestly receiving stolen computer resource', hindi: 'चोरी का कंप्यूटर', desc: 'Punishment for dishonestly receiving any stolen computer resource or communication device. Imprisonment up to three years or fine up to one lakh rupees.', keywords: ['stolen computer', 'stolen device', 'IMEI change'] },
  { sec: '66C', title: 'Identity Theft', hindi: 'पहचान चोरी', desc: 'Punishment for fraudulent use of any person\'s electronic signature, password, or any other unique identification feature. Imprisonment up to three years and fine up to one lakh rupees.', keywords: ['identity theft', 'password theft', 'OTP theft', 'UPI fraud', '66C', 'पहचान चोरी'] },
  { sec: '66D', title: 'Cheating by Impersonation using Computer', hindi: 'ऑनलाइन प्रतिरूपण', desc: 'Whoever cheats someone by impersonating using any communication device or computer resource. Covers fake social media profiles, WhatsApp impersonation, and fake police officer calls.', keywords: ['impersonation', 'fake profile', 'online cheating', '66D', 'fake call'] },
  { sec: '66E', title: 'Violation of Privacy', hindi: 'गोपनीयता उल्लंघन', desc: 'Intentionally capturing, publishing or transmitting image of private parts of any person without consent. Punishment: imprisonment up to three years or fine up to two lakh rupees.', keywords: ['privacy', 'voyeurism', 'morphed images', 'MMS', '66E'] },
  { sec: '66F', title: 'Cyber Terrorism', hindi: 'साइबर आतंकवाद', desc: 'Whoever commits or conspires to commit cyber terrorism shall be punished with imprisonment which may extend to life.', keywords: ['cyber terror', 'critical infrastructure', '66F'] },
  { sec: '67', title: 'Publishing Obscene Material Electronically', hindi: 'अश्लील सामग्री', desc: 'Punishment for publishing or transmitting obscene material in electronic form. First conviction: imprisonment up to three years, second conviction: up to five years.', keywords: ['obscene', 'porn', 'pornography', 'MMS', '67', 'अश्लील'] },
  { sec: '67A', title: 'Publishing Sexually Explicit Material', hindi: 'यौन सामग्री', desc: 'Punishment for publishing material containing sexually explicit act in electronic form. Imprisonment up to five years.', keywords: ['sexually explicit', 'sexual content', 'revenge porn', '67A'] },
  { sec: '67B', title: 'Child Pornography', hindi: 'बाल पोर्नोग्राफी', desc: 'Publishing, transmitting or creating material depicting children in sexually explicit act. First conviction up to five years, second up to seven years.', keywords: ['CSAM', 'child abuse', 'child porn', '67B'] },
  { sec: '69', title: 'Power to intercept, monitor or decrypt', hindi: 'निगरानी', desc: 'Government may direct any agency to intercept, monitor or decrypt any information through computer resource for national security purposes.', keywords: ['interception', 'surveillance', 'monitoring', 'CDR', '69'] },
  { sec: '72', title: 'Penalty for Breach of Confidentiality', hindi: 'गोपनीयता भंग', desc: 'Any person who has secured access to any electronic record or information without consent of the person concerned and discloses such information shall be punished.', keywords: ['breach of confidentiality', 'data leak', '72'] },
  { sec: '75', title: 'Act to apply for offence outside India', hindi: 'भारत के बाहर अपराध', desc: 'The provisions of this Act shall apply also to any offence committed outside India by any person if the act involves a computer, computer system or computer network located in India.', keywords: ['jurisdiction', 'international cyber crime', 'overseas'] },
];

// Build all items combined for global search
const ALL_ENTRIES = [
  ...SANHITA_DB.BNS.map(e => ({ ...e, law: 'BNS' })),
  ...SANHITA_DB.BNSS.map(e => ({ ...e, law: 'BNSS' })),
  ...SANHITA_DB.BSA.map(e => ({ ...e, law: 'BSA' })),
  ...IT_ACT.map(e => ({ ...e, law: 'IT_ACT' })),
];

const LAW_COLORS = {
  BNS: { accent: '#0ea5e9', bg: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.3)', badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30', name: 'BNS', full: 'Bharatiya Nyaya Sanhita' },
  BNSS: { accent: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)', badge: 'bg-red-500/20 text-red-300 border-red-500/30', name: 'BNSS', full: 'Bharatiya Nagarik Suraksha Sanhita' },
  BSA: { accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30', name: 'BSA', full: 'Bharatiya Sakshya Adhiniyam' },
  IT_ACT: { accent: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', name: 'IT Act', full: 'Information Technology Act 2000' },
};

/* =========================================================================
   MAIN RENDER FUNCTION
   ========================================================================= */
export function renderLawAssistance(state, container) {
  if (!state.sanhitaTab) state.sanhitaTab = 'portal'; // portal | search | convert | procedures | fir
  if (!state.sanhitaActiveLaw) state.sanhitaActiveLaw = null;
  if (!state.sanhitaQuery) state.sanhitaQuery = '';
  if (!state.sanhitaLangHindi) state.sanhitaLangHindi = false;

  container.innerHTML = `
    <div style="font-family:'Inter',sans-serif;" class="space-y-5">
      <!-- HEADER BAND -->
      <div style="background:linear-gradient(135deg,rgba(15,22,36,0.95),rgba(5,10,20,0.98));border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:24px 28px;" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <div style="background:linear-gradient(135deg,#0ea5e9,#ef4444,#f59e0b);padding:2px;border-radius:10px;">
              <div style="background:#0a0f1a;border-radius:8px;padding:8px;">
                <i data-lucide="scale" style="width:20px;height:20px;color:#0ea5e9;"></i>
              </div>
            </div>
            <div>
              <h2 style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:800;color:#f1f5f9;letter-spacing:0.5px;">SANHITA LEGAL LOOKUP</h2>
              <p style="font-size:10px;color:#64748b;letter-spacing:2px;text-transform:uppercase;font-weight:600;">BNS · BNSS · BSA · IT Act Reference</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mt-1">
            <span style="font-size:9px;padding:3px 8px;border-radius:100px;background:rgba(14,165,233,0.1);border:1px solid rgba(14,165,233,0.25);color:#38bdf8;font-weight:700;">BNS 2023</span>
            <span style="font-size:9px;padding:3px 8px;border-radius:100px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);color:#f87171;font-weight:700;">BNSS 2023</span>
            <span style="font-size:9px;padding:3px 8px;border-radius:100px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);color:#fbbf24;font-weight:700;">BSA 2023</span>
            <span style="font-size:9px;padding:3px 8px;border-radius:100px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.25);color:#34d399;font-weight:700;">IT ACT 2000</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="window.sanhitaToggleLang()" style="padding:8px 16px;border-radius:10px;font-size:11px;font-weight:700;border:1px solid rgba(14,165,233,0.3);background:rgba(14,165,233,0.1);color:#38bdf8;cursor:pointer;transition:all 0.2s;" id="sanhita-lang-btn">
            ${state.sanhitaLangHindi ? 'ENGLISH' : 'हिन्दी'}
          </button>
        </div>
      </div>

      <!-- TAB NAVIGATION -->
      <div style="display:flex;gap:4px;background:rgba(15,22,36,0.7);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:6px;" class="flex-wrap">
        ${[
          { id: 'portal', icon: 'layout-grid', label: 'Interactive Portal' },
          { id: 'search', icon: 'search', label: 'Quick Search' },
          { id: 'convert', icon: 'refresh-cw', label: 'IPC Converter' },
          { id: 'procedures', icon: 'clipboard-list', label: 'Police Workflows' },
          { id: 'fir', icon: 'file-warning', label: 'FIR Templates' }
        ].map(tab => `
          <button onclick="window.sanhitaSetTab('${tab.id}')" style="
            flex:1;min-width:120px;padding:10px 14px;border-radius:10px;font-size:11px;font-weight:700;
            letter-spacing:0.5px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:6px;justify-content:center;
            ${state.sanhitaTab === tab.id 
              ? 'background:rgba(14,165,233,0.15);border:1px solid rgba(14,165,233,0.4);color:#38bdf8;' 
              : 'background:transparent;border:1px solid transparent;color:#64748b;'}
          ">
            <i data-lucide="${tab.icon}" style="width:13px;height:13px;"></i>${tab.label}
          </button>
        `).join('')}
      </div>

      <!-- TAB CONTENT -->
      <div id="sanhita-workspace"></div>
    </div>
  `;

  // Bind global tab switch
  window.sanhitaSetTab = (tab) => {
    state.sanhitaTab = tab;
    renderLawAssistance(state, container);
  };
  window.sanhitaToggleLang = () => {
    state.sanhitaLangHindi = !state.sanhitaLangHindi;
    renderLawAssistance(state, container);
  };

  const ws = document.getElementById('sanhita-workspace');
  if (state.sanhitaTab === 'portal') renderPortalIframe(state, ws, container);
  else if (state.sanhitaTab === 'search') renderSanhitaSearch(state, ws, container);
  else if (state.sanhitaTab === 'convert') renderIpcConverter(state, ws, container);
  else if (state.sanhitaTab === 'procedures') renderProcedures(state, ws, container);
  else if (state.sanhitaTab === 'fir') renderFirTemplates(state, ws, container);

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderPortalIframe(state, ws, container) {
  ws.innerHTML = `
    <div style="background:rgba(15,22,36,0.5);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:6px;backdrop-filter:blur(20px);box-shadow:0 15px 30px rgba(0,0,0,0.5);overflow:hidden;position:relative;">
      <iframe src="./sanhita_portal/index.html" style="width:100%;height:850px;border:none;border-radius:12px;background:#050b14;display:block;" id="sanhita-iframe-portal"></iframe>
    </div>
  `;
}

/* =========================================================================
   TAB 1: SANHITA SEARCH (Unified Law Search with Autocomplete)
   ========================================================================= */
function renderSanhitaSearch(state, ws, container) {
  const q = state.sanhitaQuery.toLowerCase();
  const filtered = q.length >= 1 ? ALL_ENTRIES.filter(e =>
    (e.sec && e.sec.toLowerCase().includes(q)) ||
    (e.title && e.title.toLowerCase().includes(q)) ||
    (e.desc && e.desc.toLowerCase().includes(q)) ||
    (e.old && e.old.toLowerCase().includes(q)) ||
    (e.keywords && e.keywords.some(k => k.toLowerCase().includes(q))) ||
    (state.sanhitaLangHindi && e.hindi && e.hindi.includes(state.sanhitaQuery))
  ) : ALL_ENTRIES.slice(0, 20);

  const active = state.sanhitaActiveLaw 
    ? ALL_ENTRIES.find(e => e.law === state.sanhitaActiveLaw.law && e.sec === state.sanhitaActiveLaw.sec)
    : (filtered.length > 0 ? filtered[0] : ALL_ENTRIES[0]);

  const col = active ? LAW_COLORS[active.law] : LAW_COLORS.BNS;

  ws.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1.6fr;gap:16px;" class="lg:grid-cols-2">
      <!-- LEFT: Search + Results List -->
      <div style="display:flex;flex-direction:column;gap:12px;">
        <!-- Law Filter Chips -->
        <div class="flex flex-wrap gap-2">
          ${['ALL', 'BNS', 'BNSS', 'BSA', 'IT_ACT'].map(law => `
            <button onclick="window.sanhitaFilterLaw('${law}')" style="
              padding:5px 12px;border-radius:100px;font-size:10px;font-weight:700;cursor:pointer;transition:all 0.2s;
              ${state.sanhitaLawFilter === law || (!state.sanhitaLawFilter && law === 'ALL')
                ? `background:${law === 'ALL' ? 'rgba(14,165,233,0.2)' : (LAW_COLORS[law] && LAW_COLORS[law].bg) || 'rgba(14,165,233,0.2)'};border:1px solid ${law === 'ALL' ? 'rgba(14,165,233,0.4)' : (LAW_COLORS[law] && LAW_COLORS[law].border) || 'rgba(14,165,233,0.4)'};color:${law === 'ALL' ? '#38bdf8' : (LAW_COLORS[law] && LAW_COLORS[law].accent) || '#38bdf8'};`
                : 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#64748b;'
              }
            ">${law === 'IT_ACT' ? 'IT ACT' : law}</button>
          `).join('')}
        </div>

        <!-- Search Box with Autocomplete -->
        <div style="position:relative;">
          <div style="position:absolute;left:14px;top:50%;transform:translateY(-50%);pointer-events:none;">
            <i data-lucide="search" style="width:16px;height:16px;color:#475569;"></i>
          </div>
          <input 
            id="sanhita-search-input"
            type="text" 
            placeholder="${state.sanhitaLangHindi ? 'कानून खोजें... (BNS 318, धोखाधड़ी, murder...)' : 'Search law... (BNS 318, cheating, 420, IPC 302...)'}" 
            value="${state.sanhitaQuery}"
            autocomplete="off"
            style="width:100%;padding:12px 14px 12px 42px;border-radius:12px;background:rgba(15,22,36,0.8);border:1px solid rgba(255,255,255,0.1);color:#e2e8f0;font-size:13px;outline:none;box-sizing:border-box;transition:border-color 0.2s;"
            onfocus="this.style.borderColor='rgba(14,165,233,0.5)'"
            onblur="this.style.borderColor='rgba(255,255,255,0.1)'"
          >
          ${state.sanhitaQuery.length > 0 ? `
            <button onclick="window.sanhitaClearSearch()" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:#64748b;cursor:pointer;">
              <i data-lucide="x" style="width:14px;height:14px;"></i>
            </button>
          ` : ''}
          <!-- Autocomplete Dropdown -->
          <div id="sanhita-autocomplete" style="display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;background:rgba(10,15,28,0.98);border:1px solid rgba(14,165,233,0.3);border-radius:10px;z-index:100;max-height:200px;overflow-y:auto;backdrop-filter:blur(12px);"></div>
        </div>

        <!-- Results Count -->
        <div style="font-size:10px;color:#475569;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
          ${filtered.length} section${filtered.length !== 1 ? 's' : ''} found
        </div>

        <!-- Results List -->
        <div style="display:flex;flex-direction:column;gap:6px;max-height:480px;overflow-y:auto;padding-right:4px;">
          ${filtered.length === 0 ? `
            <div style="text-align:center;padding:32px;color:#475569;">
              <i data-lucide="search-x" style="width:32px;height:32px;margin:0 auto 8px;display:block;"></i>
              <p style="font-size:13px;">No results. Try different keywords.</p>
            </div>
          ` : filtered.map(entry => {
            const c = LAW_COLORS[entry.law];
            const isActive = active && active.sec === entry.sec && active.law === entry.law;
            return `
              <button onclick="window.sanhitaSelectEntry('${entry.law}','${entry.sec}')" style="
                width:100%;text-align:left;padding:12px;border-radius:10px;cursor:pointer;transition:all 0.2s;
                background:${isActive ? c.bg : 'rgba(255,255,255,0.02)'};
                border:1px solid ${isActive ? c.border : 'rgba(255,255,255,0.06)'};
              ">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                  <span style="font-size:13px;font-weight:700;color:${isActive ? c.accent : '#cbd5e1'};">${entry.law} §${entry.sec}</span>
                  <span style="font-size:9px;padding:2px 7px;border-radius:100px;background:${c.bg};border:1px solid ${c.border};color:${c.accent};font-weight:700;">${c.name}</span>
                </div>
                <p style="font-size:11px;color:${isActive ? '#94a3b8' : '#64748b'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                  ${state.sanhitaLangHindi && entry.hindi ? entry.hindi : entry.title}
                  ${entry.old && entry.old !== 'NEW' && entry.old !== 'REMOVED' ? `<span style="color:#475569;"> ← ${entry.old}</span>` : ''}
                </p>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- RIGHT: Detail Panel -->
      <div id="sanhita-detail-panel" style="
        background:rgba(15,22,36,0.7);
        border:1px solid ${active ? col.border : 'rgba(255,255,255,0.07)'};
        border-radius:16px;
        padding:24px;
        backdrop-filter:blur(16px);
        position:sticky;
        top:0;
      ">
        ${active ? renderDetailPanel(active, state, col) : `
          <div style="text-align:center;padding:40px 0;color:#475569;">
            <i data-lucide="scale" style="width:40px;height:40px;margin:0 auto 12px;display:block;opacity:0.3;"></i>
            <p>Select a law section to view details</p>
          </div>
        `}
      </div>
    </div>
  `;

  // Community Banner
  ws.innerHTML += `
    <div style="margin-top:16px;background:linear-gradient(135deg,rgba(14,165,233,0.08),rgba(245,158,11,0.06));border:1px solid rgba(14,165,233,0.15);border-radius:14px;padding:16px 20px;display:flex;align-items:center;gap:16px;">
      <img src="https://yt3.ggpht.com/z5GtKCdDrLqaRlYHvSwWCADBDYWFt8lyJ54N5mfRk9SMA6QyZjeHJe8XNsQ9s6lWOwva8KM2=s176-c-k-c0x00ffffff-no-rj" 
        style="width:44px;height:44px;border-radius:50%;border:2px solid rgba(14,165,233,0.4);" 
        onerror="this.style.display='none'" alt="Smart Cyber Cops">
      <div style="flex:1;">
        <p style="font-size:12px;font-weight:800;color:#e2e8f0;margin:0 0 2px;">Smart Cyber Cops</p>
        <p style="font-size:10px;color:#64748b;margin:0;">Legal Reference powered by Police Mitra • Jai Hind 🇮🇳</p>
      </div>
      <span style="font-size:9px;padding:4px 10px;border-radius:100px;background:rgba(14,165,233,0.15);border:1px solid rgba(14,165,233,0.3);color:#38bdf8;font-weight:700;">OFFICIAL</span>
    </div>
  `;

  // Bind search input
  const inp = document.getElementById('sanhita-search-input');
  const acDrop = document.getElementById('sanhita-autocomplete');

  if (inp) {
    inp.addEventListener('input', () => {
      state.sanhitaQuery = inp.value;
      const qt = inp.value.toLowerCase();
      if (qt.length >= 1) {
        const matches = ALL_ENTRIES.filter(e =>
          (e.sec && e.sec.toLowerCase().includes(qt)) ||
          (e.title && e.title.toLowerCase().includes(qt)) ||
          (e.keywords && e.keywords.some(k => k.toLowerCase().includes(qt)))
        ).slice(0, 8);

        if (matches.length > 0) {
          acDrop.style.display = 'block';
          acDrop.innerHTML = matches.map(m => `
            <button onclick="window.sanhitaAutocompleteSelect('${m.law}','${m.sec}')" style="
              width:100%;text-align:left;padding:10px 14px;background:none;border:none;border-bottom:1px solid rgba(255,255,255,0.04);
              color:#cbd5e1;font-size:12px;cursor:pointer;display:flex;gap:10px;align-items:center;
            " onmouseover="this.style.background='rgba(14,165,233,0.1)'" onmouseout="this.style.background='none'">
              <span style="color:${LAW_COLORS[m.law].accent};font-weight:700;font-size:11px;min-width:60px;">${m.law} §${m.sec}</span>
              <span style="color:#94a3b8;">${m.title}</span>
            </button>
          `).join('');
        } else {
          acDrop.style.display = 'none';
        }
      } else {
        acDrop.style.display = 'none';
      }
      renderSanhitaSearch(state, ws, container);
    });

    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') acDrop.style.display = 'none';
      if (e.key === 'Enter') { acDrop.style.display = 'none'; }
    });

    document.addEventListener('click', (e) => {
      if (!inp.contains(e.target) && !acDrop.contains(e.target)) {
        acDrop.style.display = 'none';
      }
    }, { once: true });
  }

  window.sanhitaFilterLaw = (law) => {
    state.sanhitaLawFilter = law === 'ALL' ? null : law;
    renderSanhitaSearch(state, ws, container);
  };

  window.sanhitaSelectEntry = (law, sec) => {
    state.sanhitaActiveLaw = { law, sec };
    logActivity(`Viewed ${law} §${sec}`, 'law');
    renderSanhitaSearch(state, ws, container);
  };

  window.sanhitaAutocompleteSelect = (law, sec) => {
    state.sanhitaActiveLaw = { law, sec };
    const entry = ALL_ENTRIES.find(e => e.law === law && e.sec === sec);
    if (entry) state.sanhitaQuery = `${law} ${entry.sec} ${entry.title}`;
    logActivity(`Quick-selected ${law} §${sec}`, 'law');
    if (document.getElementById('sanhita-autocomplete')) {
      document.getElementById('sanhita-autocomplete').style.display = 'none';
    }
    renderSanhitaSearch(state, ws, container);
  };

  window.sanhitaClearSearch = () => {
    state.sanhitaQuery = '';
    state.sanhitaActiveLaw = null;
    renderSanhitaSearch(state, ws, container);
  };

  window.sanhitaCopySection = (law, sec) => {
    const entry = ALL_ENTRIES.find(e => e.law === law && e.sec === sec);
    if (entry) {
      const text = `${entry.law} SECTION ${entry.sec}: ${entry.title}\n${entry.old ? `(Replaces: ${entry.old})\n` : ''}${entry.desc}`;
      navigator.clipboard.writeText(text).then(() => {
        logActivity(`Copied ${law} §${sec}`, 'law');
        alert(`✅ Copied: ${entry.law} §${entry.sec}`);
      });
    }
  };

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderDetailPanel(entry, state, col) {
  return `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;gap:12px;">
      <div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px;">
          <span style="font-size:22px;font-weight:900;color:${col.accent};font-family:'Outfit',sans-serif;">${entry.law} §${entry.sec}</span>
          <span style="font-size:9px;padding:3px 10px;border-radius:100px;background:${col.bg};border:1px solid ${col.border};color:${col.accent};font-weight:700;text-transform:uppercase;">${col.full}</span>
        </div>
        <h3 style="font-size:15px;font-weight:700;color:#f1f5f9;margin:0 0 4px;font-family:'Outfit',sans-serif;">
          ${state.sanhitaLangHindi && entry.hindi ? entry.hindi : entry.title}
        </h3>
        ${entry.old ? `
          <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
            <span style="font-size:9px;color:#64748b;font-weight:600;">REPLACES:</span>
            <span style="font-size:10px;padding:2px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#94a3b8;font-weight:700;">${entry.old}</span>
          </div>
        ` : ''}
      </div>
      <button onclick="window.sanhitaCopySection('${entry.law}','${entry.sec}')" style="
        padding:8px 14px;border-radius:10px;background:${col.bg};border:1px solid ${col.border};color:${col.accent};
        font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;display:flex;align-items:center;gap:6px;transition:all 0.2s;
      ">
        <i data-lucide="copy" style="width:12px;height:12px;"></i>COPY
      </button>
    </div>

    <div style="background:rgba(0,0,0,0.2);border-radius:10px;padding:16px;border:1px solid rgba(255,255,255,0.05);margin-bottom:16px;">
      <p style="font-size:13px;line-height:1.8;color:#cbd5e1;font-family:'Inter',sans-serif;">
        ${entry.desc}
      </p>
    </div>

    ${entry.keywords && entry.keywords.length > 0 ? `
      <div>
        <p style="font-size:9px;color:#475569;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;">RELATED KEYWORDS</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${entry.keywords.slice(0, 6).map(k => `
            <span style="font-size:10px;padding:3px 10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:100px;color:#64748b;">${k}</span>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:6px;">
      <i data-lucide="shield-check" style="width:14px;height:14px;color:${col.accent};"></i>
      <span style="font-size:10px;color:#475569;font-weight:600;">Police Mitra • Legislative Reference • Jai Hind 🇮🇳</span>
    </div>
  `;
}

/* =========================================================================
   TAB 2: IPC/CrPC/IEA → BNS/BNSS/BSA CONVERTER
   ========================================================================= */
function renderIpcConverter(state, ws, container) {
  const allOld = Object.keys(IPC_MAP);
  
  ws.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <!-- INPUT SIDE -->
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div style="background:rgba(15,22,36,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:20px;">
          <h3 style="font-family:'Outfit',sans-serif;font-size:14px;font-weight:800;color:#f1f5f9;margin:0 0 4px;">Old Law → New Sanhita</h3>
          <p style="font-size:11px;color:#64748b;margin:0 0 16px;">Convert IPC / CrPC / IEA sections to BNS / BNSS / BSA</p>

          <div style="position:relative;margin-bottom:12px;">
            <input 
              id="ipc-input-main"
              type="text"
              placeholder="Type old section (e.g. 302, 420, 41A, 65B...)"
              value="${state.ipcConvertQuery || ''}"
              autocomplete="off"
              style="width:100%;padding:12px 14px;border-radius:10px;background:rgba(10,15,25,0.8);border:1px solid rgba(255,255,255,0.1);color:#e2e8f0;font-size:13px;outline:none;box-sizing:border-box;"
              onfocus="this.style.borderColor='rgba(14,165,233,0.5)'"
              onblur="this.style.borderColor='rgba(255,255,255,0.1)'"
            >
            <div id="ipc-autocomplete-drop" style="display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;background:rgba(10,15,28,0.98);border:1px solid rgba(14,165,233,0.3);border-radius:10px;z-index:100;max-height:180px;overflow-y:auto;"></div>
          </div>

          <button onclick="window.doIpcConvert()" style="
            width:100%;padding:12px;border-radius:10px;background:linear-gradient(135deg,rgba(14,165,233,0.3),rgba(14,165,233,0.1));
            border:1px solid rgba(14,165,233,0.4);color:#38bdf8;font-size:12px;font-weight:800;cursor:pointer;transition:all 0.2s;
            display:flex;align-items:center;justify-content:center;gap:8px;letter-spacing:1px;
          ">
            <i data-lucide="refresh-cw" style="width:14px;height:14px;"></i>CONVERT SECTION
          </button>
        </div>

        <!-- Quick Tags -->
        <div style="background:rgba(15,22,36,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px;">
          <p style="font-size:10px;color:#475569;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 10px;">COMMON IPC QUICK CONVERTS</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${['302', '420', '379', '354', '376', '120B', '354D', '41A', '65B', '66', '173'].map(sec => `
              <button onclick="window.quickConvert('${sec}')" style="
                padding:6px 12px;border-radius:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);
                color:#94a3b8;font-size:11px;font-weight:700;cursor:pointer;transition:all 0.15s;
              " onmouseover="this.style.background='rgba(14,165,233,0.1)';this.style.color='#38bdf8'" 
                onmouseout="this.style.background='rgba(255,255,255,0.04)';this.style.color='#94a3b8'">
                ${sec}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- OUTPUT SIDE -->
      <div id="ipc-convert-result" style="
        background:rgba(15,22,36,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:24px;
        display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;min-height:250px;
        color:#475569;
      ">
        <i data-lucide="arrow-right-left" style="width:36px;height:36px;margin-bottom:12px;opacity:0.3;"></i>
        <p style="font-size:13px;">Enter an old section number and click Convert</p>
        <p style="font-size:11px;margin-top:4px;color:#334155;">Supports IPC, CrPC, IEA sections</p>
      </div>
    </div>
  `;

  // Autocomplete for IPC input
  const ipcInp = document.getElementById('ipc-input-main');
  const ipcDrop = document.getElementById('ipc-autocomplete-drop');

  if (ipcInp) {
    ipcInp.addEventListener('input', () => {
      state.ipcConvertQuery = ipcInp.value;
      const qt = ipcInp.value.toLowerCase();
      if (qt.length >= 1) {
        const matches = Object.entries(IPC_MAP).filter(([k]) => k.toLowerCase().includes(qt)).slice(0, 8);
        if (matches.length > 0) {
          ipcDrop.style.display = 'block';
          ipcDrop.innerHTML = matches.map(([k, v]) => `
            <button onclick="window.quickConvert('${k}')" style="
              width:100%;text-align:left;padding:9px 14px;background:none;border:none;border-bottom:1px solid rgba(255,255,255,0.04);
              color:#cbd5e1;font-size:12px;cursor:pointer;display:flex;gap:10px;align-items:center;
            " onmouseover="this.style.background='rgba(14,165,233,0.1)'" onmouseout="this.style.background='none'">
              <span style="color:#f87171;font-weight:700;min-width:50px;">IPC ${k}</span>
              <span style="color:#94a3b8;">→ ${v.new}</span>
              <span style="color:#64748b;font-size:11px;">${v.title}</span>
            </button>
          `).join('');
        } else {
          ipcDrop.style.display = 'none';
        }
      } else {
        ipcDrop.style.display = 'none';
      }
    });
  }

  window.doIpcConvert = () => {
    const val = ((document.getElementById('ipc-input-main') && document.getElementById('ipc-input-main').value) || '').trim().toUpperCase();
    const key = val.replace(/^(IPC|CRPC|IEA)\s*/i, '');
    window.quickConvert(key);
  };

  window.quickConvert = (sec) => {
    if (document.getElementById('ipc-input-main')) {
      document.getElementById('ipc-input-main').value = sec;
      state.ipcConvertQuery = sec;
    }
    if (ipcDrop) ipcDrop.style.display = 'none';

    const match = IPC_MAP[sec];
    const result = document.getElementById('ipc-convert-result');
    if (!result) return;

    logActivity(`Converted IPC/CrPC §${sec} → ${match ? match.new : 'Not Found'}`, 'law');

    if (match) {
      const col = LAW_COLORS[match.law] || LAW_COLORS.BNS;
      result.innerHTML = `
        <div style="width:100%;text-align:left;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <span style="font-size:11px;font-weight:800;color:${col.accent};letter-spacing:1px;text-transform:uppercase;">CONVERSION RESULT</span>
            <span style="font-size:9px;padding:3px 10px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);color:#34d399;border-radius:100px;font-weight:700;">✓ MATCHED</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
            <div style="padding:12px;border-radius:10px;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.2);">
              <p style="font-size:9px;color:#f87171;font-weight:700;text-transform:uppercase;margin:0 0 4px;">OLD SECTION</p>
              <p style="font-size:18px;font-weight:900;color:#f1f5f9;margin:0;">§ ${sec}</p>
              <p style="font-size:10px;color:#94a3b8;margin:4px 0 0;">${match.law === 'BNS' ? 'IPC' : match.law === 'BNSS' ? 'CrPC' : 'IEA'}</p>
            </div>
            <div style="padding:12px;border-radius:10px;background:${col.bg};border:1px solid ${col.border};">
              <p style="font-size:9px;color:${col.accent};font-weight:700;text-transform:uppercase;margin:0 0 4px;">NEW ${match.law}</p>
              <p style="font-size:18px;font-weight:900;color:${col.accent};margin:0;">${match.new}</p>
              <p style="font-size:10px;color:#94a3b8;margin:4px 0 0;">${col.full}</p>
            </div>
          </div>
          <div style="padding:12px;border-radius:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);">
            <p style="font-size:12px;font-weight:700;color:#f1f5f9;margin:0 0 4px;">${match.title}</p>
            ${match.note ? `<p style="font-size:11px;color:#f59e0b;margin:0;">${match.note}</p>` : ''}
          </div>
        </div>
      `;
    } else {
      result.innerHTML = `
        <div style="text-align:center;color:#64748b;">
          <i data-lucide="shield-alert" style="width:36px;height:36px;color:#ef4444;margin-bottom:12px;display:block;margin-left:auto;margin-right:auto;"></i>
          <p style="font-size:14px;font-weight:700;color:#f1f5f9;margin:0 0 6px;">Section Not Found</p>
          <p style="font-size:11px;">IPC §${sec} not in database.<br>Try the Law Search tab.</p>
        </div>
      `;
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* =========================================================================
   TAB 3: POLICE PROCEDURES
   ========================================================================= */
const PROCEDURES = [
  {
    key: 'freeze',
    icon: 'shield-alert',
    title: 'Bank Account Freeze (Cyber Fraud)',
    color: '#0ea5e9',
    steps: [
      'Log incident on 1930 / cybercrime.gov.in portal — obtain 15-digit Complaint ID.',
      'Extract target bank Nodal Officer email from state/district police nodal list.',
      'Draft freeze request citing BNSS Section 105 (replaces CrPC 102) with: Account No., Transaction IDs, Debit timestamps, Frozen amount.',
      'Dispatch signed nodal email from CUG address to bank nodal officer (CC: SP Cyber Cell).',
      'Banks are mandated to initiate 48-hour HOLD within 1 hour of receiving CUG nodal mail.',
      'Register case diary entry and FIR under BNS 318 + IT Act 66C/66D as applicable.',
      'Attach BSA 57 Certificate for any electronic evidence (CDR, WhatsApp screenshots).'
    ]
  },
  {
    key: 'notice',
    icon: 'file-text',
    title: 'Arrest Notice — BNSS 35 (Old CrPC 41A)',
    color: '#ef4444',
    steps: [
      'Issue notice under BNSS Section 35 for offences with sentence below 7 years.',
      'Notice must state: IO name, PS address, date/time of appearance.',
      'Serve notice in duplicate — obtain signed counterfoil from accused.',
      'Electronic notices via CUG email are admissible under BSA.',
      'If accused complies, arrest requires SP written approval per non-compliance log.',
      'Document all steps in case diary with timestamps.',
      'Video-record serving of notice where possible (BNSS 176 mandate).'
    ]
  },
  {
    key: 'chargesheet',
    icon: 'clipboard-list',
    title: 'Chargesheet (BNSS 193 — Old CrPC 173)',
    color: '#f59e0b',
    steps: [
      'File final police report within 60 days (BNSS offences) or 90 days (heinous offences).',
      'Include: FIR copy, witness statements, FSL/CFSL reports, CDR analysis, digital evidence.',
      'Attach BSA Section 57 certificate for ALL electronic records.',
      'Accused\'s property/device seizure memo (BNSS 105) must be appended.',
      'E-file chargesheet via court management system if available.',
      'Ensure all digital evidence has hash value verification (MD5/SHA256).',
      'Forward copy to Public Prosecutor within 3 days of filing.'
    ]
  },
  {
    key: 'cdr',
    icon: 'phone-call',
    title: 'CDR / IPDR Requisition Process',
    color: '#10b981',
    steps: [
      'Draft CDR/IPDR requisition under BNSS Section 94 (old CrPC 91).',
      'Address to Nodal Officer of concerned telecom company (Jio/Airtel/Vi/BSNL).',
      'Mention: Mobile number, IMEI, date range (max 60 days per request).',
      'Send via CUG email to official telecom nodal address only.',
      'Expected response: 48-72 hours (priority cases: 12 hours).',
      'Verify received CDR hash/signature before use as evidence.',
      'Attach CDR with BSA 57 certificate in chargesheet.'
    ]
  },
];

function renderProcedures(state, ws, container) {
  if (!state.selectedProc) state.selectedProc = 'freeze';
  const active = PROCEDURES.find(p => p.key === state.selectedProc) || PROCEDURES[0];

  ws.innerHTML = `
    <div style="display:grid;grid-template-columns:240px 1fr;gap:16px;">
      <!-- Selector -->
      <div style="display:flex;flex-direction:column;gap:6px;">
        <p style="font-size:9px;color:#475569;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px;">PROCEDURES LIBRARY</p>
        ${PROCEDURES.map(p => `
          <button onclick="window.selectProc('${p.key}')" style="
            width:100%;text-align:left;padding:12px;border-radius:10px;cursor:pointer;transition:all 0.2s;
            background:${state.selectedProc === p.key ? `rgba(${hexToRgb(p.color)},0.1)` : 'rgba(255,255,255,0.02)'};
            border:1px solid ${state.selectedProc === p.key ? p.color.replace(')', ',0.4)').replace('rgb', 'rgba') : 'rgba(255,255,255,0.06)'};
            display:flex;align-items:center;gap:10px;
          ">
            <i data-lucide="${p.icon}" style="width:15px;height:15px;color:${p.color};flex-shrink:0;"></i>
            <span style="font-size:11px;font-weight:700;color:${state.selectedProc === p.key ? p.color : '#94a3b8'};">${p.title}</span>
          </button>
        `).join('')}
      </div>

      <!-- Detail -->
      <div style="background:rgba(15,22,36,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:24px;backdrop-filter:blur(16px);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="padding:8px;border-radius:10px;background:rgba(${hexToRgb(active.color)},0.12);border:1px solid rgba(${hexToRgb(active.color)},0.3);">
              <i data-lucide="${active.icon}" style="width:18px;height:18px;color:${active.color};"></i>
            </div>
            <h3 style="font-family:'Outfit',sans-serif;font-size:14px;font-weight:800;color:#f1f5f9;margin:0;">${active.title}</h3>
          </div>
          <button onclick="window.copyProc('${active.key}')" style="
            padding:7px 14px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;
            background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;
            display:flex;align-items:center;gap:6px;
          "><i data-lucide="copy" style="width:12px;height:12px;"></i>COPY</button>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${active.steps.map((step, i) => `
            <div style="display:flex;gap:12px;padding:12px;border-radius:10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);">
              <div style="min-width:28px;height:28px;border-radius:50%;background:rgba(${hexToRgb(active.color)},0.15);border:1px solid rgba(${hexToRgb(active.color)},0.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <span style="font-size:11px;font-weight:800;color:${active.color};">${i + 1}</span>
              </div>
              <p style="font-size:12px;line-height:1.7;color:#cbd5e1;margin:0;padding-top:4px;">${step}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  window.selectProc = (key) => {
    state.selectedProc = key;
    renderProcedures(state, ws, container);
  };

  window.copyProc = (key) => {
    const p = PROCEDURES.find(x => x.key === key);
    if (p) {
      const text = `${p.title}\n\n${p.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
      navigator.clipboard.writeText(text).then(() => alert(`✅ Procedure copied: ${p.title}`));
      logActivity(`Copied procedure: ${p.title}`, 'law');
    }
  };

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* =========================================================================
   TAB 4: FIR TEMPLATES
   ========================================================================= */
const FIR_TEMPLATES = [
  {
    key: 'upi_fraud',
    title: 'UPI / Online Financial Fraud FIR',
    sections: 'BNS §318, IT Act §66C, §66D',
    template: `To,
The Inspector In Charge / SHO,
[Police Station Name], [District]
Uttar Pradesh Police

Subject: First Information Report for Online UPI Financial Fraud

Sir,

I, [Complainant Full Name], S/o D/o [Father's Name], R/o [Full Address], 
Mobile: [Your Mobile Number], respectfully submit that:

1. On [Date] at approximately [Time], I received a call/message claiming to be from [Bank/Company Name].
2. The fraudster induced me to share my OTP / UPI PIN / net banking credentials.
3. Fraudulent transaction of Rs. [Amount] was debited from my account [Account Number] at [Bank Name].
4. Transaction Reference: [UPI/Transaction ID]
5. Fraud Mobile Number used: [Suspect Number]

I request registration of FIR under:
- BNS Section 318 (Cheating & Financial Fraud)
- IT Act Section 66C (Identity Theft) 
- IT Act Section 66D (Cheating by Impersonation)

And immediate freeze of the beneficiary account under BNSS Section 105.

I also request action on National Cybercrime Portal Complaint ID: [1930 Complaint ID]

Yours faithfully,
[Complainant Name]
Date: [Date]
Signature / Thumb Impression`
  },
  {
    key: 'cyber_harassment',
    title: 'Cyber Harassment / Stalking FIR',
    sections: 'BNS §351, §78, IT Act §66E',
    template: `To,
The Inspector In Charge / SHO,
[Police Station Name], [District]

Subject: FIR for Cyber Harassment and Online Stalking

Sir,

I, [Complainant Name], respectfully submit:

1. The accused [Name if known / Unknown] has been continuously harassing me online.
2. Nature of harassment: [Describe - morphed images / threatening messages / fake profiles / cyberstalking]
3. Platform used: [WhatsApp / Instagram / Facebook / Other]
4. Evidence: Screenshots/recordings attached.
5. Accused contact: [Mobile / Profile URL if known]

Request registration under:
- BNS Section 351 (Criminal Intimidation)
- BNS Section 78 (Stalking)  
- IT Act Section 66E (Privacy Violation) if applicable
- BSA Section 57 Certificate to be obtained for digital evidence

Yours faithfully,
[Name, Date, Signature]`
  },
  {
    key: 'identity_theft',
    title: 'Identity Theft / Fake Profile FIR',
    sections: 'BNS §319, IT Act §66C, §66D',
    template: `To,
The Inspector In Charge,
[Police Station], [District]

Subject: FIR regarding Fake Profile Creation and Identity Theft

Sir,

I, [Your Name], report that unknown person(s) have:
1. Created fake profile in my name on [Platform: Facebook/Instagram/Twitter].
2. Fake Profile URL: [URL]
3. The accused has been posting objectionable content / soliciting money using my identity.
4. My original profile: [Your Profile URL]

Documents attached: Aadhar/ID proof, screenshots of fake profile, complaint to platform.

Request action under:
- BNS Section 319 (Cheating by Personation)
- IT Act Section 66C (Identity Theft)
- IT Act Section 66D (Cheating by Impersonation via Computer)

Yours faithfully,
[Name, Date, Signature, Mobile]`
  }
];

function renderFirTemplates(state, ws, container) {
  if (!state.selectedFir) state.selectedFir = 'upi_fraud';
  const active = FIR_TEMPLATES.find(f => f.key === state.selectedFir) || FIR_TEMPLATES[0];

  ws.innerHTML = `
    <div style="display:grid;grid-template-columns:260px 1fr;gap:16px;">
      <!-- FIR List -->
      <div style="display:flex;flex-direction:column;gap:6px;">
        <p style="font-size:9px;color:#475569;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px;">FIR FORMAT LIBRARY</p>
        ${FIR_TEMPLATES.map(f => `
          <button onclick="window.selectFir('${f.key}')" style="
            width:100%;text-align:left;padding:12px;border-radius:10px;cursor:pointer;transition:all 0.2s;
            background:${state.selectedFir === f.key ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.02)'};
            border:1px solid ${state.selectedFir === f.key ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.06)'};
          ">
            <p style="font-size:11px;font-weight:700;color:${state.selectedFir === f.key ? '#f87171' : '#94a3b8'};margin:0 0 3px;">${f.title}</p>
            <p style="font-size:9px;color:#475569;margin:0;">${f.sections}</p>
          </button>
        `).join('')}
      </div>

      <!-- FIR Template Preview -->
      <div style="background:rgba(15,22,36,0.7);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:24px;backdrop-filter:blur(16px);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div>
            <h3 style="font-family:'Outfit',sans-serif;font-size:14px;font-weight:800;color:#f1f5f9;margin:0 0 3px;">${active.title}</h3>
            <span style="font-size:9px;padding:2px 8px;border-radius:6px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);color:#f87171;font-weight:700;">${active.sections}</span>
          </div>
          <button onclick="window.copyFir('${active.key}')" style="
            padding:8px 16px;border-radius:9px;font-size:11px;font-weight:800;cursor:pointer;
            background:rgba(14,165,233,0.15);border:1px solid rgba(14,165,233,0.35);color:#38bdf8;
            display:flex;align-items:center;gap:6px;
          "><i data-lucide="copy" style="width:12px;height:12px;"></i>COPY TEMPLATE</button>
        </div>
        <pre style="
          white-space:pre-wrap;font-family:'Inter',monospace;font-size:12px;line-height:1.8;
          color:#cbd5e1;background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.06);
          border-radius:10px;padding:16px;overflow-x:auto;max-height:420px;overflow-y:auto;
        ">${active.template}</pre>
      </div>
    </div>
  `;

  window.selectFir = (key) => {
    state.selectedFir = key;
    renderFirTemplates(state, ws, container);
  };

  window.copyFir = (key) => {
    const f = FIR_TEMPLATES.find(x => x.key === key);
    if (f) {
      navigator.clipboard.writeText(f.template).then(() => alert(`✅ FIR Template copied: ${f.title}`));
      logActivity(`Copied FIR template: ${f.title}`, 'law');
    }
  };

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* Utility: hex color to rgb triplet for inline rgba usage */
function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : '14,165,233';
}
