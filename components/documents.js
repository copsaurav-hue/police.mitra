
// Safe wrapper to prevent circular dependency
const logActivity = (...args) => { if (window.logActivity) window.logActivity(...args); else console.log(...args); };
// Police Mitra - Documents Component (Praroop UPP - Google Drive Integration)
// Real document repository from Google Drive folder: 1N8qsXTnir2eexNNiQYmz0aXHRWsqgrPF

// ─── REAL DOCUMENT DATABASE ───────────────────────────────────────────────────
const DRIVE_FOLDER_URL = '#';

const ALL_DOCS = [
  {
    id: '1JAC8hVfg8GJCUkQ-f6DLMoV584aB70qf',
    name: '151 CRPC चालानी',
    ext: 'jpeg',
    category: 'investigation',
    keywords: ['crpc', '151', 'challani', 'चालानी', 'गिरफ्तार', 'अभियोजन', 'challan', 'arrest'],
    desc: 'CrPC धारा 151 चालानी प्रारूप - निवारक गिरफ्तारी'
  },
  {
    id: '1lTmysNEvPB3g6IxvXSninyE-s-A3d7o_',
    name: '203 MV Act',
    ext: 'docx',
    category: 'investigation',
    keywords: ['mv act', '203', 'motor vehicle', 'चालान', 'वाहन', 'ट्रैफिक', 'traffic', 'vehicle'],
    desc: 'Motor Vehicle Act 203 प्रारूप - वाहन चालान'
  },
  {
    id: '1B_cS4cmCiFzP5ftHMDW8K7JxrAbnFD0b',
    name: 'FCR Naksha',
    ext: 'docx',
    category: 'investigation',
    keywords: ['fcr', 'naksha', 'नक्शा', 'site map', 'crime scene', 'अपराध स्थल', 'नक्शा नजरी'],
    desc: 'FCR नक्शा नजरी प्रारूप - अपराध स्थल का नक्शा'
  },
  {
    id: '136yAYisrhOkIucc0WPTvjq2mpR79knAl',
    name: 'FORM NO. 54',
    ext: 'docx',
    category: 'investigation',
    keywords: ['form 54', 'form no 54', 'प्रारूप 54', 'upp form', 'court format'],
    desc: 'फॉर्म 54 - न्यायालय प्रारूप'
  },
  {
    id: '1iTQEhrOUhb2OytmbCuBeNnoefjVmbIkK',
    name: 'Notice 41 170 CrPC PRAROP',
    ext: 'docx',
    category: 'investigation',
    keywords: ['notice', '41', '170', 'crpc', 'धारा 41', 'नोटिस', '170 crpc', 'arrest notice', 'section 41'],
    desc: 'CrPC धारा 41 / 170 नोटिस प्रारूप'
  },
  {
    id: '1BankUnfreezeDocId',
    name: 'बैंक खाता अनफ्रीज (Unfreeze Bank Account)',
    ext: 'docx',
    category: 'investigation',
    keywords: ['bank', 'unfreeze', 'account', 'बैंक', 'खाता', 'अनफ्रीज', 'release', 'cyber cell', 'विवेचना', 'cyber crime', 'hold'],
    desc: 'बैंक खाता अनफ्रीज करने हेतु बैंक प्रबंधक को पत्र प्रारूप'
  },
  {
    id: '1BankBlockAmountDocId',
    name: 'बैंक राशि ब्लॉक (Block Amount through Bank)',
    ext: 'docx',
    category: 'investigation',
    keywords: ['bank', 'block', 'amount', 'freeze', 'बैंक', 'राशि', 'ब्लॉक', 'साइबर अपराध', 'hold amount', 'cyber cell', 'विवेचना', 'debit freeze'],
    desc: 'साइबर ठगी की राशि को बैंक खाते में होल्ड/ब्लॉक करने हेतु पत्र प्रारूप'
  },
  {
    id: '1BdfS6f7M6pROl2Fcwe--gR6ChCf2MRGj',
    name: 'NBW, 82 CRPC, 83 CRPC PRAROP',
    ext: 'docx',
    category: 'investigation',
    keywords: ['nbw', 'non bailable warrant', 'crpc 82', 'crpc 83', 'कुर्की', 'भगोड़ा', 'warrant', 'attachment'],
    desc: 'गैर जमानती वारंट / धारा 82-83 CrPC कुर्की प्रारूप'
  },
  {
    id: '1dsEsQ27HAYQKtSYaVpHj-q21RXbwRVv2',
    name: 'NDPS विधि विज्ञान प्रयोगशाला',
    ext: 'docx',
    category: 'investigation',
    keywords: ['ndps', 'fsl', 'forensic', 'विधि विज्ञान', 'प्रयोगशाला', 'नशीले पदार्थ', 'drugs', 'narcotics'],
    desc: 'NDPS एफएसएल रिपोर्ट प्रारूप - विधि विज्ञान प्रयोगशाला'
  },
  {
    id: '1JfXxDeyrcp_OiuvfuD98Odbi4ieM7X6c',
    name: 'Call Diversion Report',
    ext: 'docx',
    category: 'investigation',
    keywords: ['cdr', 'call diversion', 'call detail record', 'phone', 'कॉल डायवर्जन', 'टेलीफोन रिपोर्ट', 'mobile records'],
    desc: 'कॉल डायवर्जन रिपोर्ट प्रारूप - दूरसंचार रिकॉर्ड'
  },
  {
    id: '1bavRjRCv2YltetNcYvxmujQlUSPVfkZC',
    name: 'Gumsuda JIPNET Praroop',
    ext: 'docx',
    category: 'investigation',
    keywords: ['gumsuda', 'missing', 'jipnet', 'गुमशुदा', 'लापता व्यक्ति', 'missing person', 'hue and cry'],
    desc: 'गुमशुदा रिपोर्ट / JIPNET प्रारूप'
  },
  {
    id: '1xJQdErSlGJR2dc0LyTaePLgVuZZpMVJa',
    name: 'Night Pass',
    ext: 'docx',
    category: 'investigation',
    keywords: ['night pass', 'रात्रि पास', 'night duty', 'duty slip', 'रात्रि ड्यूटी', 'night check'],
    desc: 'रात्रि पास प्रारूप - रात्रि ड्यूटी अनुमति'
  },
  {
    id: '1hcBQV2fJGnQRZORa5AxPNiEufC4bdhrh',
    name: 'Constable Rules 2015',
    ext: 'pdf',
    category: 'rules',
    keywords: ['constable rules', 'const rules', '2015', 'आरक्षी नियमावली', 'police rules', 'service rules'],
    desc: 'उत्तर प्रदेश आरक्षी नागरिक पुलिस नियमावली 2015'
  },
  {
    id: '16pDZQQfdlvE3rMXTkXqap0erps5cZCXB',
    name: 'Constable Niyamavali 2015 (Full)',
    ext: 'pdf',
    category: 'rules',
    keywords: ['constable rules', 'niyamavali', '2015', 'आरक्षी नियमावली संशोधन', 'police norms', 'नियम'],
    desc: 'आरक्षी नियमावली 2015 - सम्पूर्ण संस्करण'
  },
  {
    id: '1Jhf46APtIwuQBIHbWSBdPEtrvoGDWHsg',
    name: 'Flag Code of India (Hindi)',
    ext: 'pdf',
    category: 'rules',
    keywords: ['flag code', 'national flag', 'झंडा संहिता', 'तिरंगा', 'राष्ट्रीय ध्वज', 'republic day', 'flag protocol'],
    desc: 'भारतीय झंडा संहिता - राष्ट्रीय ध्वज नियम (हिंदी)'
  },
  {
    id: '15oZX4dhFh6xm9V4Srj8SQcNYMBlwEskM',
    name: 'Acts and Sections',
    ext: 'pdf',
    category: 'rules',
    keywords: ['acts', 'sections', 'bns', 'ipc', 'bnss', 'crpc', 'धाराएं', 'कानून', 'law', 'sections list'],
    desc: 'महत्वपूर्ण धाराएं एवं अधिनियम - त्वरित संदर्भ'
  },
  {
    id: '16LEQJMzYHitgdIdQCxoBhqzT0iE5-5ZJ',
    name: 'HRA 2022',
    ext: 'pdf',
    category: 'salary',
    keywords: ['hra', 'house rent allowance', '2022', 'मकान किराया भत्ता', 'hra rate', 'rent allowance'],
    desc: 'मकान किराया भत्ता (HRA) दरें 2022 - शहर श्रेणीवार'
  },
  {
    id: '1tgHiB6qnNOWFAcucEG4uMDj4sNaMAvZN',
    name: 'HRA Praroop',
    ext: 'pdf',
    category: 'salary',
    keywords: ['hra form', 'hra praroop', 'house rent form', 'मकान भत्ता प्रारूप', 'rent application'],
    desc: 'मकान किराया भत्ता आवेदन प्रारूप'
  },
  {
    id: '1lu2qbOuU0EIork0x2BfTJfqrz6CEvTtP',
    name: 'DA Rate (महंगाई भत्ता दर)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['da rate', 'dearness allowance', 'महंगाई भत्ता', 'da', 'salary revision', 'वेतन संशोधन'],
    desc: 'महंगाई भत्ता (DA) दरें - वर्तमान दर चार्ट'
  },
  {
    id: '1lLdEjMV4nHiadEcmSf318XZCZTlP-yef',
    name: 'Axis Bank Defence Salary Package',
    ext: 'pdf',
    category: 'salary',
    keywords: ['axis bank', 'salary package', 'defence salary', 'bank', 'वेतन पैकेज', 'banking'],
    desc: 'Axis Bank रक्षा / पुलिस वेतन पैकेज विवरण'
  },
  {
    id: '1GMT_zwWt-iX-KILArQpHTuHh4pBQ155A',
    name: 'Police Shiksha Nidhi',
    ext: 'pdf',
    category: 'salary',
    keywords: ['shiksha nidhi', 'education fund', 'पुलिस शिक्षा निधि', 'children education', 'बच्चों की शिक्षा', 'welfare fund'],
    desc: 'पुलिस शिक्षा निधि - कर्मचारी बच्चों की शिक्षा कोष'
  },
  {
    id: '1TRWzQREy4wZLiHHBf7VMwcGTP_6rHr1T',
    name: 'Pension & Gratuity',
    ext: 'pdf',
    category: 'salary',
    keywords: ['pension', 'gratuity', 'retirement', 'सेवानिवृत्ति', 'पेंशन', 'उपदान', 'pension rules'],
    desc: 'पेंशन एवं उपदान नियम - सेवानिवृत्ति लाभ'
  },
  {
    id: '1tl2IRmpXDxbV5KvfGszzzE8xc_yxY10E',
    name: 'Group Insurance (GIS)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['gis', 'group insurance', 'सामूहिक बीमा', 'insurance', 'जीआईएस', 'life insurance'],
    desc: 'सामूहिक बीमा योजना (GIS) - पुलिस जीवन बीमा'
  },
  {
    id: '10uDpDN5Qx7kA_SlLUSsRuFia6t2_50Yt',
    name: 'Awakash Yatra Suvidha (LTC)',
    ext: 'pdf',
    category: 'leave',
    keywords: ['ltc', 'leave travel', 'awakash yatra', 'अवकाश यात्रा सुविधा', 'यात्रा भत्ता', 'leave travel concession', 'ticket'],
    desc: 'अवकाश यात्रा सुविधा (LTC) - नियम एवं प्रारूप'
  },
  {
    id: '1I888Wlhrf2iNr5zqr2jP48LHYHlRz8WC',
    name: 'CL के मध्य अकार्य दिवस',
    ext: 'pdf',
    category: 'leave',
    keywords: ['cl', 'casual leave', 'holidays', 'अकार्य दिवस', 'sunday', 'रविवार', 'general holiday', 'leave rules'],
    desc: 'आकस्मिक अवकाश के मध्य पड़ने वाले अकार्य दिवस नियम'
  },
  {
    id: '1K89uP1kFhkpRg1nNxfmskrmKXWyxT6Q7',
    name: 'EL Naksha (Earned Leave Map)',
    ext: 'docx',
    category: 'leave',
    keywords: ['el', 'earned leave', 'el naksha', 'अर्जित अवकाश', 'leave map', 'leave chart', 'annual leave'],
    desc: 'अर्जित अवकाश नक्शा - वार्षिक अवकाश विवरण'
  },
  {
    id: '1LZ9Ho4dFFr-C9W1zb-kw9k9--RAUJSHY',
    name: 'A Category Medical Certificate',
    ext: 'pdf',
    category: 'medical',
    keywords: ['a category medical', 'medical certificate', 'चिकित्सा प्रमाण पत्र', 'category a', 'medical exam'],
    desc: 'श्रेणी-A चिकित्सा प्रमाण पत्र - स्वास्थ्य परीक्षण'
  },
  {
    id: '1wAWBnLyDgsbkquSppZy0qE3DmRFj_5Jj',
    name: 'A Category Medical Certificate (Alt)',
    ext: 'pdf',
    category: 'medical',
    keywords: ['medical certificate', 'category a', 'fit certificate', 'चिकित्सा प्रमाण पत्र', 'health certificate'],
    desc: 'A श्रेणी चिकित्सा प्रमाण पत्र - वैकल्पिक प्रारूप'
  },
  {
    id: '160MHQUoY5jEck28R153iMsYqtCZ3sQel',
    name: 'Cashless Hospital UP List',
    ext: 'pdf',
    category: 'medical',
    keywords: ['cashless', 'hospital list', 'cashless hospital', 'कैशलेस', 'up hospital', 'empanelled', 'इलाज', 'चिकित्सा'],
    desc: 'उत्तर प्रदेश कैशलेस अस्पताल सूची'
  },
  {
    id: '1Fz0EVLz8CCMjtuNiJUFdLopDVTuhds4B',
    name: 'Medical Reimbursement',
    ext: 'pdf',
    category: 'medical',
    keywords: ['medical reimbursement', 'bill', 'claim', 'चिकित्सा प्रतिपूर्ति', 'hospital bill', 'refund'],
    desc: 'चिकित्सा व्यय प्रतिपूर्ति प्रारूप - बिल दावा'
  },
  {
    id: '1UiSWRVHyq5FVnLpcan8Y0MpxoktwlcJl',
    name: 'Medical Proforma SGPGI (1)',
    ext: 'pdf',
    category: 'medical',
    keywords: ['sgpgi', 'pgi', 'medical proforma', 'lucknow pgi', 'specialist referral', 'चिकित्सा प्रोफॉर्मा'],
    desc: 'SGPGI लखनऊ चिकित्सा प्रोफॉर्मा - विशेषज्ञ रेफरल प्रारूप'
  },
  {
    id: '1Hp39w50z6URl3xEKAtH-ax5UIk6P_832',
    name: 'Medical Proforma SGPGI',
    ext: 'pdf',
    category: 'medical',
    keywords: ['sgpgi', 'pgi', 'medical proforma', 'lucknow', 'specialist', 'प्रोफॉर्मा', 'pgi certificate'],
    desc: 'SGPGI चिकित्सा प्रोफॉर्मा - पुलिस अस्पताल प्रेषण'
  },
  {
    id: '1HGhK3rcjryCy06N3ZAaDASg3s-IGwk1v',
    name: 'All Police Station No. and Email 2020',
    ext: 'pdf',
    category: 'other',
    keywords: ['police station', 'contact', 'phone number', 'email', 'directory', 'थाना', 'निर्देशिका', 'contact list', '2020'],
    desc: 'सभी पुलिस थानों के संपर्क नंबर एवं ईमेल 2020'
  },
  {
    id: '1FH5IzdUBFBMcZaagobksFYCsel13X4u4',
    name: 'Home District Change Rule',
    ext: 'pdf',
    category: 'other',
    keywords: ['home district', 'transfer', 'गृह जनपद', 'तबादला', 'district change', 'home posting'],
    desc: 'गृह जनपद बदलाव नियम - पदस्थापना संबंधी'
  },
  {
    id: '1KWNNSA7Ol1GDpjO0SHDLjKJQtziOqanH',
    name: 'I Card Praroop',
    ext: 'docx',
    category: 'other',
    keywords: ['identity card', 'i card', 'id card', 'पहचान पत्र', 'idcard format', 'police id'],
    desc: 'पुलिस परिचय पत्र प्रारूप (.docx)'
  },
  {
    id: '1YroRvTHbdT21t3QcY7qB3zlSOqY3rPjD',
    name: 'ID Card Praroop',
    ext: 'pdf',
    category: 'other',
    keywords: ['identity card', 'id card', 'पहचान पत्र', 'police id card', 'id format', 'card template'],
    desc: 'पुलिस परिचय पत्र प्रारूप (.pdf)'
  },
  {
    id: '1tacFpXsPHFGrAwXCe3oPZXZbR8rp46P3',
    name: 'IMG - Reference Image',
    ext: 'jpg',
    category: 'other',
    keywords: ['image', 'photo', 'circular image', 'reference', 'jpeg'],
    desc: 'संदर्भ चित्र / सर्कुलर छायाचित्र'
  },
  {
    id: '1wlv2ICnpZ8v5JwSw6plzd1A7tubSMB8G',
    name: 'Important Forms Collection',
    ext: 'pdf',
    category: 'other',
    keywords: ['important forms', 'welfare forms', 'police forms', 'फॉर्म संग्रह', 'all forms', 'upp forms'],
    desc: 'महत्वपूर्ण फॉर्म संग्रह - कल्याण एवं विवेचना'
  },
  {
    id: '1jZqTaKmLE4Gg9qJhP_AH48U60ivtqDzY',
    name: 'Citizen Charter Board',
    ext: 'docx',
    category: 'other',
    keywords: ['citizen charter', 'board', 'नागरिक चार्टर', 'थाना बोर्ड', 'public display', 'citizen rights'],
    desc: 'नागरिक चार्टर बोर्ड - थाने पर प्रदर्शन हेतु'
  },
  {
    id: 'uppolice_petroleum_noc',
    name: 'पेट्रोलियम उत्पाद/सीएनजी/एलपीजी भण्डारण एनओसी (Petroleum/CNG/LPG NOC)',
    ext: 'pdf',
    category: 'other',
    keywords: ['petroleum', 'cng', 'lpg', 'noc', 'storage', 'भंडारण', 'एनओसी', 'पेट्रोलियम', 'गैस', 'gas'],
    desc: 'पेट्रोलियम उत्पाद, सीएनजी और एलपीजी के भंडारण हेतु अनापत्ति प्रमाण पत्र (NOC) प्राप्त करने का आधिकारिक प्रारूप (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/pdf/Petroleum_CNG_LPG.pdf?cd=NAA4ADkAOAA%3D'
  },
  {
    id: 'uppolice_lucknow_ps_jurisdiction',
    name: 'लखनऊ कमिश्नरेट थाना कार्यक्षेत्र अधिसूचना (Lucknow PS Jurisdiction)',
    ext: 'pdf',
    category: 'rules',
    keywords: ['lucknow', 'ps', 'jurisdiction', 'कार्यक्षेत्र', 'थाना', 'लखनऊ', 'कमिश्नरेट', 'अधिसूचना'],
    desc: 'लखनऊ कमिश्नरेट के अंतर्गत पुलिस थानों के कार्यक्षेत्र की आधिकारिक अधिसूचना (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/pdf/lucknow_ps.pdf'
  },
  {
    id: 'uppolice_vns_notification',
    name: 'वाराणसी कमिश्नरेट पुलिस अधिसूचना (Varanasi Police Notification)',
    ext: 'pdf',
    category: 'rules',
    keywords: ['varanasi', 'notification', 'अधिसूचना', 'वाराणसी', 'कमिश्नरेट', 'सीमा'],
    desc: 'वाराणसी कमिश्नरेट पुलिस थाना सीमाओं और कार्यक्षेत्र की आधिकारिक अधिसूचना (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/pdf/notification_vns.pdf'
  },
  {
    id: 'uppolice_motor_vehicles_act',
    name: 'मोटर वाहन अधिनियम (Motor Vehicles Act - Hindi)',
    ext: 'pdf',
    category: 'rules',
    keywords: ['mv act', 'motor vehicle', 'मोटर वाहन', 'अधिनियम', 'यातायात', 'traffic', 'challan'],
    desc: 'मोटर वाहन अधिनियम (MV Act 1988) की आधिकारिक हिंदी प्रति और नियम (UP Police Utility Forms)', customUrl: 'https://legislative.gov.in/sites/default/files/H198859.pdf?cd=NAA4ADgAMwA%3D'
  },
  {
    id: 'uppolice_notification',
    name: 'उत्तर प्रदेश पुलिस सामान्य कार्यक्षेत्र अधिसूचना (UP Police Jurisdiction)',
    ext: 'pdf',
    category: 'rules',
    keywords: ['jurisdiction', 'notification', 'कार्यक्षेत्र', 'अधिसूचना', 'सीमा', 'boundary'],
    desc: 'उत्तर प्रदेश पुलिस थानों और कार्यक्षेत्र सीमाओं की सामान्य अधिसूचना (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/pdf/notification.pdf'
  },
  {
    id: 'uppolice_knp_notification',
    name: 'कानपुर कमिश्नरेट पुलिस अधिसूचना (Kanpur Police Notification)',
    ext: 'pdf',
    category: 'rules',
    keywords: ['kanpur', 'notification', 'अधिसूचना', 'कानपुर', 'कमिश्नरेट', 'सीमा'],
    desc: 'कानपुर कमिश्नरेट पुलिस थाना कार्यक्षेत्र और सीमाओं की आधिकारिक अधिसूचना (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/pdf/notification_knp.pdf'
  },
  {
    id: 'uppolice_telemanas',
    name: 'टेली-मानस मानसिक स्वास्थ्य हेल्पलाइन (Suicide Prevention Helpline)',
    ext: 'pdf',
    category: 'other',
    keywords: ['telemanas', 'helpline', 'suicide', 'mental health', 'आत्महत्या', 'रोकथाम', 'हेल्पलाइन', 'स्वास्थ्य'],
    desc: 'मानसिक स्वास्थ्य सहायता और आत्महत्या रोकथाम हेतु आधिकारिक टेली-मानस हेल्पलाइन निर्देश (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/pdf/TeleManas.pdf'
  },
  {
    id: 'uppolice_holiday_list',
    name: 'उत्तर प्रदेश पुलिस अवकाश सूची (UP Police Holiday List)',
    ext: 'pdf',
    category: 'leave',
    keywords: ['holiday', 'leave', 'छुट्टी', 'अवकाश', 'त्योहार', 'calendar', 'राजपत्रित'],
    desc: 'उत्तर प्रदेश पुलिस विभाग हेतु निर्धारित सरकारी छुट्टियों की वार्षिक आधिकारिक सूची (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/pdf/holiday.pdf'
  },
  {
    id: 'uppolice_tenant_verification_hi',
    name: 'किरायेदार सत्यापन प्रारूप - हिंदी (Tenant Verification Form - Hindi)',
    ext: 'pdf',
    category: 'other',
    keywords: ['tenant', 'verification', 'किरायेदार', 'सत्यापन', 'pg', 'सत्यापन फॉर्म', 'किराया'],
    desc: 'किरायेदारों और पीजी निवासियों के सत्यापन हेतु पुलिस आवेदन प्रारूप (हिंदी माध्यम) (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/Site-Content/uploaded-content/Web_Page/29_7_2013_16_36_41_verify_tenant_hindi.pdf'
  },
  {
    id: 'uppolice_tenant_verification_en',
    name: 'किरायेदार सत्यापन प्रारूप - अंग्रेजी (Tenant Verification Form - English)',
    ext: 'pdf',
    category: 'other',
    keywords: ['tenant', 'verification', 'rent', 'agreement', 'pg', 'flat', 'landlord'],
    desc: 'Tenant and PG Verification Form for police records (English Medium) (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/Site-Content/uploaded-content/Web_Page/29_7_2013_16_17_44_verify_tenant_eng.pdf'
  },
  {
    id: 'uppolice_domestic_servant',
    name: 'घरेलू सहायक सत्यापन प्रारूप (Domestic Servant Verification Form)',
    ext: 'pdf',
    category: 'other',
    keywords: ['servant', 'domestic', 'helper', 'verification', 'घरेलू', 'नौकर', 'सत्यापन', 'सहायक', 'कामवाली'],
    desc: 'घरेलू नौकरों और सहायकों के पुलिस सत्यापन हेतु आधिकारिक आवेदन प्रारूप (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/Site-Content/uploaded-content/pdf/DOMESTIC%20SERVANT%20VERI.pdf'
  },
  {
    id: 'uppolice_suraksha_gunner',
    name: 'सुरक्षा गनर नियम व आवेदन (Security Gunner Guidelines & Forms)',
    ext: 'pdf',
    category: 'other',
    keywords: ['gunner', 'security', 'suraksha', 'गनर', 'सुरक्षा', 'व्यक्तिगत', 'y श्रेणी', 'vip security'],
    desc: 'व्यक्तिगत सुरक्षा हेतु पुलिस गनर या सुरक्षा कर्मी प्राप्त करने के नियम, दिशानिर्देश और आवेदन प्रपत्र (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/article/en/forms-guidelines-for-suraksha-gunner'
  },
  {
    id: 'uppolice_pps_property',
    name: 'PPS अधिकारियों हेतु संपत्ति विवरण प्रोफार्मा (PPS Property Details)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['pps', 'property', 'details', 'अधिकारी', 'संपत्ति', 'विवरण', 'अचल', 'घोषणा'],
    desc: 'प्रांतीय पुलिस सेवा (PPS) अधिकारियों के अचल संपत्ति विवरण का वार्षिक घोषणा प्रारूप (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_13_13_33_Property_PPS.pdf'
  },
  {
    id: 'uppolice_medical_reimbursement',
    name: 'चिकित्सा प्रतिपूर्ति फार्म (Medical Reimbursement Form)',
    ext: 'pdf',
    category: 'medical',
    keywords: ['medical', 'reimbursement', 'चिकित्सा', 'प्रतिपूर्ति', 'बिल', 'hospital', 'claim', 'दवा'],
    desc: 'पुलिस कर्मियों के स्वयं व परिवार के चिकित्सा बिलों के भुगतान/प्रतिपूर्ति का आवेदन प्रपत्र (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_13_55_16_Medical%20Reimbursment.pdf'
  },
  {
    id: 'uppolice_cashless_pgi',
    name: 'SGPGI लखनऊ कैशलेस इलाज प्रोफार्मा (Cashless Treatment SGPGI)',
    ext: 'pdf',
    category: 'medical',
    keywords: ['sgpgi', 'cashless', 'pgi', 'लखनऊ', 'कैशलेस', 'इलाज', 'रेफरल', 'अस्पताल'],
    desc: 'संजय गांधी पीजीआई लखनऊ में पुलिस कर्मियों के कैशलेस इलाज हेतु अधिकृत प्रोफार्मा (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/19_11_2014_15_27_8_medical%20proforma.pdf'
  },
  {
    id: 'uppolice_cashless_labs',
    name: 'लखनऊ लैब्स कैशलेस डायग्नोस्टिक प्रपत्र (Cashless Diagnostic Labs)',
    ext: 'pdf',
    category: 'medical',
    keywords: ['labs', 'diagnostic', 'cashless', 'लखनऊ', 'जांच', 'कैशलेस', 'laboratory', 'परीक्षण'],
    desc: 'लखनऊ की सूचीबद्ध प्रयोगशालाओं में कैशलेस जांच व परीक्षण कराने हेतु आवेदन प्रोफार्मा (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/10_12_2014_16_58_58_Cashless%20proforma.pdf'
  },
  {
    id: 'uppolice_anukampa_anudan',
    name: 'अनुकम्पा कोष से अनुदान प्रार्थना पत्र (Anukampa Kosh Se Anudan)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['anukampa', 'anudan', 'grant', 'financial', 'सहायता', 'अनुकम्पा', 'कोष', 'दिवंगत', 'आश्रित'],
    desc: 'सेवाकाल में दिवंगत पुलिस कर्मियों के आश्रितों को अनुकम्पा कोष से वित्तीय सहायता प्राप्त करने का प्रारूप (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_13_56_54_Anugrah_anudaan.pdf'
  },
  {
    id: 'uppolice_mritak_ashrit',
    name: 'मृतक आश्रित सेवा योजन आवेदन (Dying in Harness Appointment Form)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['mritak', 'ashrit', 'appointment', 'dying', 'harness', 'मृतक', 'आश्रित', 'नौकरी', 'सेवा योजन'],
    desc: 'दिवंगत पुलिस कर्मियों के योग्य आश्रितों को अनुकम्पा के आधार पर सेवा योजन (नौकरी) हेतु आवेदन प्रपत्र (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_13_57_49_Mritak%20Ashrit%20sewayozan.pdf'
  },
  {
    id: 'uppolice_anugrah_grant',
    name: 'सहायता संस्थान अनुग्रह अनुदान प्रपत्र (Sahayta Sansthan Anugrah Grant)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['sahayta', 'sansthan', 'anugrah', 'grant', 'अनुग्रह', 'अनुदान', 'सहायता', 'संस्थान', 'कल्याण'],
    desc: 'उत्तर प्रदेश पुलिस एवं सशस्त्र बल सहायता संस्थान से अनुग्रह राशि प्राप्त करने का प्रार्थना पत्र (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/11_3_2014_20_48_35_1.pdf'
  },
  {
    id: 'uppolice_girl_marriage',
    name: 'पुत्री की शादी हेतु सहायता अनुदान (Sahayta Sansthan Girl Marriage)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['marriage', 'marriage grant', 'girl', 'लड़की', 'शादी', 'विवाह', 'अनुदान', 'सहायता', 'संस्थान'],
    desc: 'पुलिस कर्मियों की पुत्री के विवाह हेतु कल्याणकारी सहायता संस्थान से अनुदान राशि आवेदन (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/11_3_2014_20_50_14_2.pdf'
  },
  {
    id: 'uppolice_welfare_fund',
    name: 'पुलिस कल्याण कोष ऋण/सहायता प्रारूप (UP Police Welfare Fund)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['welfare', 'fund', 'loan', 'कल्याण', 'कोष', 'वेलफेयर', 'ऋण', 'सहायता', 'वेलफेयर फंड'],
    desc: 'पुलिस वेलफेयर फंड से आकस्मिक सहायता या ऋण प्राप्त करने का आवेदन प्रोफार्मा (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_14_0_24_Police%20welfare%20fund.pdf'
  },
  {
    id: 'uppolice_memorial_scholarship',
    name: 'पुलिस मेमोरियल फंड छात्रवृत्ति प्रपत्र (Memorial Fund Scholarship)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['scholarship', 'memorial', 'fund', 'छात्रवृत्ति', 'मेमोरियल', 'फंड', 'शहीद', 'बच्चे'],
    desc: 'शहीद/दिवंगत पुलिस कर्मियों के मेधावी बच्चों हेतु पुलिस मेमोरियल फंड से छात्रवृत्ति आवेदन (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_14_1_9_Scholarship.pdf'
  },
  {
    id: 'uppolice_shiksha_nidhi',
    name: 'पुलिस शिक्षा निधि छात्रवृत्ति एवं अनुदान (Police Shiksha Nidhi)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['shiksha', 'nidhi', 'scholarship', 'शिक्षा', 'निधि', 'छात्रवृत्ति', 'अनुदान', 'बच्चों', 'कल्याण'],
    desc: 'पुलिस कर्मियों के बच्चों की उच्च शिक्षा हेतु शिक्षा निधि से छात्रवृत्ति व अनुदान आवेदन प्रारूप (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_14_2_12_Police%20shiksha%20Nidhi.pdf'
  },
  {
    id: 'uppolice_pension_gratuity',
    name: 'पेंशन एवं ग्रेचुटी आवेदन प्रपत्र (Pension/Gratuity Proforma)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['pension', 'gratuity', 'retirement', 'पेंशन', 'ग्रेचुटी', 'उपदान', 'सेवानिवृत्ति'],
    desc: 'सेवानिवृत्त होने वाले कार्मिकों के पेंशन और ग्रेचुटी (उपदान) भुगतान हेतु निर्धारित विभागीय प्रारूप (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_14_3_14_Pension_gratuity.pdf'
  },
  {
    id: 'uppolice_earned_leave',
    name: 'अर्जित अवकाश आवेदन प्रारूप (Earned Leave Proforma)',
    ext: 'pdf',
    category: 'leave',
    keywords: ['leave', 'earned leave', 'el', 'अर्जित', 'अवकाश', 'प्रार्थना पत्र', 'छूटी'],
    desc: 'अर्जित अवकाश (EL) की अनुमति व प्रस्थान हेतु पुलिस विभाग का आधिकारिक आवेदन प्रोफार्मा (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/5_11_2014_11_48_13_EL%20form.pdf'
  },
  {
    id: 'uppolice_leave_encashment',
    name: 'अवकाश नकदीकरण हेतु प्रारूप (Earned Leave Encashment)',
    ext: 'pdf',
    category: 'leave',
    keywords: ['leave', 'encashment', 'नकदीकरण', 'अर्जित', 'अवकाश', 'भुगतान', 'पैसा'],
    desc: 'अर्जित अवकाश के बदले नगद भुगतान (Leave Encashment) प्राप्त करने का आवेदन प्रारूप (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_14_5_14_Avkash%20nakdikaran.pdf'
  },
  {
    id: 'uppolice_gis_nomination',
    name: 'ग्रुप इन्श्योरेंस स्कीम नामांकन फॉर्म (GIS Nomination Form)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['gis', 'insurance', 'nomination', 'बीमा', 'ग्रुप', 'नामांकन', 'जीआईएस', 'सामूहिक'],
    desc: 'सामूहिक बीमा योजना (GIS) के अंतर्गत नामांकित व्यक्ति (Nominee) घोषित करने का फॉर्म (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_14_7_53_group%20insurance.pdf'
  },
  {
    id: 'uppolice_gis_claim',
    name: 'ग्रुप इन्श्योरेंस स्कीम दावा फॉर्म (GIS Claim Form)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['gis', 'insurance', 'claim', 'बीमा', 'दावा', 'भुगतान', 'जीआईएस', 'दावा फार्म'],
    desc: 'सामूहिक बीमा योजना (GIS) के दावों (Claim) के भुगतान हेतु भरा जाने वाला आधिकारिक दावा प्रपत्र (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_14_8_51_Group%20insurance%20claim.pdf'
  },
  {
    id: 'uppolice_gpf_advance',
    name: 'जीपीएफ से अस्थाई अग्रिम आवेदन (GPF Temporary Advance)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['gpf', 'advance', 'temporary', 'जीपीएफ', 'अग्रिम', 'अस्थाई', 'भविष्य निधि', 'लोन'],
    desc: 'सामान्य भविष्य निधि (GPF) खाते से अस्थाई अग्रिम (लोन) राशि प्राप्त करने का प्रार्थना पत्र (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_14_10_2_Asthayi%20Agrim.pdf'
  },
  {
    id: 'uppolice_gpf_withdrawal',
    name: 'जीपीएफ से अंतिम निष्कासन प्रारूप (GPF Final Withdrawal)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['gpf', 'withdrawal', 'final', 'जीपीएफ', 'निकासी', 'अंतिम', 'निष्कासन', 'भविष्य निधि'],
    desc: 'सामान्य भविष्य निधि (GPF) खाते से आंशिक या अंतिम निकासी (Final Withdrawal) का आवेदन प्रपत्र (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_14_11_30_Final%20Withdrawal.pdf'
  },
  {
    id: 'uppolice_ltc_application',
    name: 'LTC अवकाश यात्रा सुविधा प्रार्थना पत्र (LTC Application Form)',
    ext: 'pdf',
    category: 'leave',
    keywords: ['ltc', 'travel', 'yatra', 'अवकाश', 'यात्रा', 'सुविधा', 'एलटीसी', 'टिकट'],
    desc: 'पुलिस कर्मियों के लिए अवकाश यात्रा सुविधा (LTC) का लाभ लेने व यात्रा भत्ता दावा प्रपत्र (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_14_12_19_Awakash%20yatra%20suvidha.pdf'
  },
  {
    id: 'uppolice_benevolent_fund',
    name: 'जीवन रक्षक निधि से अग्रिम सहायता (Benevolent Fund Advance)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['benevolent', 'fund', 'medical', 'जीवन', 'रक्षक', 'निधि', 'बीमारी', 'सहायता', 'इलाज'],
    desc: 'गंभीर बीमारी की स्थिति में जीवन रक्षक निधि (Benevolent Fund) से अग्रिम चिकित्सा ऋण/सहायता (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_16_6_4_APPLICATION%20FORM%20OF%20JRN.pdf'
  },
  {
    id: 'uppolice_retiring_checklist',
    name: 'सेवानिवृत्त कर्मियों हेतु चेक लिस्ट (Check List for Retiring Personnel)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['retiring', 'checklist', 'sevanivritti', 'सेवानिवृत्त', 'चेक लिस्ट', 'रिटायरमेंट', 'देयक'],
    desc: 'रिटायर होने वाले कार्मिकों या दिवंगत कर्मियों के आश्रितों के देयकों के निस्तारण की चेक लिस्ट (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/writereaddata/uploaded-content/Web_Page/26_11_2013_16_7_48_Ashrit%20Awashesh.pdf'
  },
  {
    id: 'uppolice_pension_proforma',
    name: 'नया पेंशन प्रोफार्मा (New Pension Proforma)',
    ext: 'pdf',
    category: 'salary',
    keywords: ['pension', 'proforma', 'retirement', 'पेंशन', 'प्रोफार्मा', 'सेवानिवृत्ति'],
    desc: 'नवीनतम नियमों के अंतर्गत पेंशन निर्धारण व सेवा पुस्तिका सत्यापन हेतु पेंशन प्रोफार्मा (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/pdf/pension_forms.pdf?cd=MQA0ADYAOAA%3d'
  },
  {
    id: 'uppolice_email_policy',
    name: 'भारत सरकार ईमेल नीति निर्देशिका (Government Email Policy)',
    ext: 'pdf',
    category: 'rules',
    keywords: ['email', 'policy', 'rules', 'ईमेल', 'नीति', 'सुरक्षा', 'cyber', 'guidelines', 'सरकारी'],
    desc: 'शासकीय कार्यों में आधिकारिक ईमेल (gov.in/nic.in) का सुरक्षित उपयोग करने की केंद्रीय ईमेल नीति (UP Police Utility Forms)', customUrl: 'https://uppolice.gov.in/article/hi/site/writereaddata/siteContent/Rules/202006091547318548E-mail_policy_of_Government_of_India_3.pdf'
  },
  {
    id: 'uppolice_character_verification',
    name: 'चरित्र प्रमाण पत्र आवेदन (Character Certificate Application Form)',
    ext: 'pdf',
    category: 'other',
    keywords: ['character', 'certificate', 'verification', 'चरित्र', 'प्रमाण पत्र', 'सत्यापन', 'आचरण'],
    desc: 'पुलिस चरित्र प्रमाण पत्र (Character Certificate) प्राप्त करने हेतु पुलिस अधीक्षक कार्यालय को प्रस्तुत किया जाने वाला आवेदन प्रारूप', customUrl: 'https://cctnsup.gov.in/citizenportal/login.aspx?cd=NAA0ADIANAA%3D'
  }
];

const CATEGORIES = {
  all: { label_en: 'All Documents', label_hi: 'सभी दस्तावेज़', icon: 'files', color: 'cyber-blue' },
  investigation: { label_en: 'Investigation & Court', label_hi: 'विवेचना व न्यायालय', icon: 'scale', color: 'red-400' },
  rules: { label_en: 'Rules & Acts', label_hi: 'नियम व अधिनियम', icon: 'book-open', color: 'amber-400' },
  salary: { label_en: 'Salary & Welfare', label_hi: 'वेतन व कल्याण', icon: 'indian-rupee', color: 'emerald-400' },
  leave: { label_en: 'Leave Rules', label_hi: 'अवकाश नियम', icon: 'calendar-check', color: 'violet-400' },
  medical: { label_en: 'Medical Reimbursement', label_hi: 'चिकित्सा सुविधा', icon: 'stethoscope', color: 'pink-400' },
  other: { label_en: 'Directories & Formats', label_hi: 'निर्देशिका व अन्य', icon: 'folder-open', color: 'sky-400' },
};

const EXT_ICONS = {
  pdf:  { icon: 'file-type', color: 'text-red-400', bg: 'bg-red-400/10', label: 'PDF' },
  docx: { icon: 'file-type-2', color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'DOCX' },
  doc:  { icon: 'file-type-2', color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'DOC' },
  xlsx: { icon: 'table-2', color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'XLSX' },
  pdf_big: { icon: 'file-text', color: 'text-red-400', bg: 'bg-red-400/10', label: 'PDF' },
  jpeg: { icon: 'image', color: 'text-sky-400', bg: 'bg-sky-400/10', label: 'JPEG' },
  jpg:  { icon: 'image', color: 'text-sky-400', bg: 'bg-sky-400/10', label: 'JPG' },
  png:  { icon: 'image', color: 'text-purple-400', bg: 'bg-purple-400/10', label: 'PNG' },
};

// ─── AI ASSISTANT RESPONSES ───────────────────────────────────────────────────
const AI_KEYWORDS = [
  { keywords: ['ltc', 'leave travel', 'अवकाश यात्रा', 'यात्रा सुविधा', 'टिकट'], category: 'leave', reply_hi: 'अवकाश यात्रा सुविधा (LTC) के नियम और प्रारूप नीचे खोजे गए हैं:', reply_en: 'Found LTC / Leave Travel Concession documents:' },
  { keywords: ['hra', 'house rent', 'मकान किराया', 'मकान भत्ता', 'rent allowance'], category: 'salary', reply_hi: 'मकान किराया भत्ता (HRA) से संबंधित दस्तावेज़:', reply_en: 'HRA - House Rent Allowance documents:' },
  { keywords: ['pension', 'gratuity', 'retirement', 'पेंशन', 'सेवानिवृत्ति', 'उपदान'], category: 'salary', reply_hi: 'पेंशन एवं उपदान से संबंधित दस्तावेज़:', reply_en: 'Pension and Gratuity documents:' },
  { keywords: ['medical', 'cashless', 'चिकित्सा', 'अस्पताल', 'hospital', 'doctor', 'reimbursement', 'प्रतिपूर्ति'], category: 'medical', reply_hi: 'चिकित्सा सुविधा एवं प्रतिपूर्ति दस्तावेज़:', reply_en: 'Medical reimbursement and hospital documents:' },
  { keywords: ['nbw', 'warrant', 'वारंट', 'कुर्की', 'भगोड़ा', 'attach', 'abscond'], category: 'investigation', reply_hi: 'वारंट और कुर्की से संबंधित प्रारूप:', reply_en: 'Non-Bailable Warrant and Attachment formats:' },
  { keywords: ['ndps', 'narco', 'drug', 'forensic', 'fsl', 'विधि विज्ञान', 'नशीला'], category: 'investigation', reply_hi: 'NDPS और विधि विज्ञान प्रयोगशाला प्रारूप:', reply_en: 'NDPS / FSL forensic lab formats:' },
  { keywords: ['notice', 'नोटिस', '41', '170', 'section 41'], category: 'investigation', reply_hi: 'CrPC नोटिस प्रारूप (धारा 41 / 170):', reply_en: 'CrPC Notice formats (Section 41/170):' },
  { keywords: ['gumsuda', 'missing', 'लापता', 'गुमशुदा', 'hue and cry'], category: 'investigation', reply_hi: 'गुमशुदा / लापता व्यक्ति रिपोर्ट प्रारूप:', reply_en: 'Missing person / JIPNET report formats:' },
  { keywords: ['night pass', 'रात्रि पास', 'night duty', 'रात्रि ड्यूटी'], category: 'investigation', reply_hi: 'रात्रि पास प्रारूप:', reply_en: 'Night pass / night duty format:' },
  { keywords: ['gis', 'insurance', 'बीमा', 'group insurance', 'सामूहिक'], category: 'salary', reply_hi: 'सामूहिक बीमा योजना (GIS) दस्तावेज़:', reply_en: 'Group Insurance Scheme (GIS) documents:' },
  { keywords: ['education', 'shiksha', 'शिक्षा', 'children', 'बच्चे', 'scholarship'], category: 'salary', reply_hi: 'पुलिस शिक्षा निधि कल्याण दस्तावेज़:', reply_en: 'Police education fund / welfare documents:' },
  { keywords: ['da', 'dearness', 'महंगाई', 'salary', 'वेतन', 'pay'], category: 'salary', reply_hi: 'वेतन / महंगाई भत्ता दर दस्तावेज़:', reply_en: 'Salary / Dearness Allowance rate documents:' },
  { keywords: ['contact', 'phone', 'email', 'directory', 'थाना', 'station', 'निर्देशिका'], category: 'other', reply_hi: 'थाना निर्देशिका और संपर्क सूची:', reply_en: 'Police station directory and contacts:' },
  { keywords: ['flag', 'झंडा', 'tricolor', 'तिरंगा', 'national flag', 'republic'], category: 'rules', reply_hi: 'झंडा संहिता / राष्ट्रीय ध्वज नियम:', reply_en: 'National Flag code documents:' },
  { keywords: ['constable', 'rules', 'आरक्षी', 'नियमावली', 'service rules', 'police rules'], category: 'rules', reply_hi: 'आरक्षी पुलिस नियमावली दस्तावेज़:', reply_en: 'Constable Police Service rules documents:' },
  { keywords: ['id card', 'identity', 'पहचान', 'परिचय', 'i card'], category: 'other', reply_hi: 'पुलिस परिचय पत्र प्रारूप:', reply_en: 'Police identity card formats:' },
  { keywords: ['citizen charter', 'नागरिक', 'board', 'public', 'display', 'बोर्ड'], category: 'other', reply_hi: 'नागरिक चार्टर बोर्ड प्रारूप:', reply_en: 'Citizen charter board format:' },
  { keywords: ['acts', 'sections', 'ipc', 'bns', 'bnss', 'crpc', 'law', 'धाराएं', 'कानून'], category: 'rules', reply_hi: 'धाराएं और अधिनियम संदर्भ सूची:', reply_en: 'Acts and Sections quick reference:' },
  { keywords: ['casual leave', 'cl', 'आकस्मिक', 'holiday', 'छुट्टी', 'leave'], category: 'leave', reply_hi: 'अवकाश नियम एवं प्रारूप:', reply_en: 'Leave rules and formats:' },
  { keywords: ['transfer', 'home district', 'तबादला', 'गृह जनपद', 'posting'], category: 'other', reply_hi: 'तबादला / गृह जनपद परिवर्तन नियम:', reply_en: 'Transfer / home district change rules:' },
  { keywords: ['bank', 'unfreeze', 'block', 'होल्ड', 'खाता', 'अनफ्रीज', 'राशि', 'debit freeze'], category: 'investigation', reply_hi: 'बैंक खाता अनफ्रीज करने एवं संदिग्ध राशि ब्लॉक करने से संबंधित विवेचना प्रारूप नीचे खोजे गए हैं:', reply_en: 'Found Bank Account Unfreezing and Amount Blocking workflow formats:' },
];

// ─── MAIN RENDER FUNCTION ─────────────────────────────────────────────────────
export function renderDocuments(state, container) {
  const isDark = state.theme === 'dark';
  const lang = state.lang;

  if (!state.docCategory) state.docCategory = 'all';
  if (!state.docSearch) state.docSearch = '';
  if (!state.aiMessages) state.aiMessages = [
    {
      from: 'bot',
      text: lang === 'hi'
        ? '🙏 नमस्ते! मैं आपका दस्तावेज़ सहायक हूँ। आप हिंदी या अंग्रेजी में खोज सकते हैं।\nउदाहरण: "LTC rules", "NBW प्रारूप", "चिकित्सा प्रतिपूर्ति"'
        : '🙏 Hello! I am your Document Assistant. Search in Hindi or English.\nExamples: "LTC rules", "NBW format", "Medical reimbursement", "रात्रि पास"'
    }
  ];

  const catLabel = (cat) => lang === 'hi' ? CATEGORIES[cat].label_hi : CATEGORIES[cat].label_en;

  // Filter logic
  const searchTerm = state.docSearch.toLowerCase().trim();
  let filtered = ALL_DOCS.filter(doc => {
    const catMatch = state.docCategory === 'all' || doc.category === state.docCategory;
    if (!catMatch) return false;
    if (!searchTerm) return true;
    return (
      doc.name.toLowerCase().includes(searchTerm) ||
      doc.desc.toLowerCase().includes(searchTerm) ||
      doc.keywords.some(k => k.toLowerCase().includes(searchTerm))
    );
  });

  const catCounts = {};
  for (const cat of Object.keys(CATEGORIES)) {
    if (cat === 'all') { catCounts.all = ALL_DOCS.length; continue; }
    catCounts[cat] = ALL_DOCS.filter(d => d.category === cat).length;
  }

  const getViewUrl = (id) => `https://drive.google.com/file/d/${id}/view?usp=drivesdk`;
  const getDownloadUrl = (id) => `https://drive.google.com/uc?export=download&id=${id}`;

  const colorMap = {
    'cyber-blue': 'text-cyan-400', 'red-400': 'text-red-400', 'amber-400': 'text-amber-400',
    'emerald-400': 'text-emerald-400', 'violet-400': 'text-violet-400',
    'pink-400': 'text-pink-400', 'sky-400': 'text-sky-400'
  };
  const bgMap = {
    'cyber-blue': 'bg-cyan-400/10 border-cyan-500/30', 'red-400': 'bg-red-400/10 border-red-500/30',
    'amber-400': 'bg-amber-400/10 border-amber-500/30', 'emerald-400': 'bg-emerald-400/10 border-emerald-500/30',
    'violet-400': 'bg-violet-400/10 border-violet-500/30', 'pink-400': 'bg-pink-400/10 border-pink-500/30',
    'sky-400': 'bg-sky-400/10 border-sky-500/30'
  };

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <i data-lucide="folder-open" class="h-5 w-5 text-cyber-blue"></i>
            <h2 class="text-xl font-bold font-mono tracking-tight text-cyber-blue">${lang === 'hi' ? 'पुलिस दस्तावेज़ संग्रह' : 'POLICE DOCUMENT REPOSITORY'}</h2>
          </div>
          <p class="text-xs text-slate-500 mt-0.5 font-mono">
            ${lang === 'hi' ? 'सामरिक व प्रशासनिक पुलिस प्रारूप (ऑफ़लाइन उपयोग के लिए उपलब्ध)' : 'Tactical & Administrative Police Formats (Available for Offline Use)'}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono text-slate-500">${ALL_DOCS.length} documents</span>
          <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-[10px] font-mono text-emerald-400 uppercase">Live</span>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="relative">
        <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none"></i>
        <input
          id="doc-search-input"
          type="text"
          value="${state.docSearch}"
          placeholder="${lang === 'hi' ? 'खोजें: अवकाश यात्रा, NBW, CrPC, HRA, पेंशन...' : 'Search: LTC, NBW, CRPC, HRA, pension, night pass...'}"
          class="w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-mono transition-all focus:outline-none focus:ring-2 focus:ring-cyber-blue/40 ${
            isDark
              ? 'bg-cyber-950 border-slate-800 text-white placeholder-slate-600'
              : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
          }"
        />
        ${state.docSearch ? `<button id="doc-clear-search" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"><i data-lucide="x" class="h-4 w-4"></i></button>` : ''}
      </div>

      <!-- Main Grid: Sidebar + Content -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">

        <!-- ── Sidebar ─────────────────────────── -->
        <div class="lg:col-span-1 space-y-4">
          <!-- Category Filters -->
          <div class="p-4 rounded-xl border ${isDark ? 'bg-cyber-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} space-y-1.5">
            <span class="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-widest block mb-2">${lang === 'hi' ? 'श्रेणी फ़िल्टर' : 'Category Filter'}</span>
            ${Object.entries(CATEGORIES).map(([key, cat]) => {
              const active = state.docCategory === key;
              const count = catCounts[key] || 0;
              const colorCls = colorMap[cat.color] || 'text-cyber-blue';
              return `
                <button onclick="window.pmFilterDocs('${key}')" class="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-all ${
                  active
                    ? `${bgMap[cat.color] || 'bg-cyan-400/10 border-cyan-500/30'} border font-bold ${colorCls}`
                    : isDark
                      ? 'hover:bg-slate-800 text-slate-400 border border-transparent'
                      : 'hover:bg-slate-100 text-slate-600 border border-transparent'
                }">
                  <span class="flex items-center gap-2">
                    <i data-lucide="${cat.icon}" class="h-3.5 w-3.5 ${active ? colorCls : 'text-slate-500'}"></i>
                    ${key === 'all' ? catLabel(key) : catLabel(key)}
                  </span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white/10' : isDark ? 'bg-slate-800' : 'bg-slate-100'}">${count}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- AI Assistant Widget -->
          <div class="rounded-xl border overflow-hidden ${isDark ? 'bg-cyber-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}">
            <div class="p-3 border-b flex items-center gap-2 ${isDark ? 'border-slate-800 bg-cyber-950/40' : 'border-slate-100 bg-slate-50'}">
              <div class="h-7 w-7 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center">
                <i data-lucide="bot" class="h-3.5 w-3.5 text-cyber-blue"></i>
              </div>
              <div>
                <p class="text-xs font-bold font-mono text-white">${lang === 'hi' ? 'खोज सहायक' : 'AI Search Assistant'}</p>
                <p class="text-[9px] font-mono text-slate-500">${lang === 'hi' ? 'हिंदी / अंग्रेजी में पूछें' : 'Ask in Hindi or English'}</p>
              </div>
            </div>
            <div id="ai-chat-messages" class="p-3 space-y-2 max-h-48 overflow-y-auto text-xs">
              ${state.aiMessages.map(msg => `
                <div class="flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}">
                  <div class="max-w-[90%] rounded-xl px-3 py-2 text-[10px] font-mono leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-cyber-blue/20 text-cyan-300 rounded-tr-none'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 rounded-tl-none'
                        : 'bg-slate-100 text-slate-700 rounded-tl-none'
                  }">
                    ${msg.text}
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="p-2 border-t flex gap-2 ${isDark ? 'border-slate-800' : 'border-slate-100'}">
              <input
                id="ai-chat-input"
                type="text"
                placeholder="${lang === 'hi' ? 'यहाँ टाइप करें...' : 'Type here...'}"
                class="flex-1 text-[10px] px-3 py-2 rounded-lg border font-mono ${
                  isDark
                    ? 'bg-cyber-950 border-slate-800 text-white placeholder-slate-600'
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                } focus:outline-none"
              />
              <button id="ai-send-btn" class="px-3 py-2 bg-cyber-blue text-cyber-950 rounded-lg font-bold text-[10px] hover:opacity-90 transition-all">
                <i data-lucide="send" class="h-3 w-3"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- ── Document Cards Grid ─────────────── -->
        <div class="lg:col-span-3">
          ${filtered.length === 0 ? `
            <div class="flex flex-col items-center justify-center h-64 text-center space-y-3">
              <i data-lucide="search-x" class="h-12 w-12 text-slate-700"></i>
              <p class="text-slate-500 font-mono text-sm font-bold">${lang === 'hi' ? 'कोई दस्तावेज़ नहीं मिला' : 'No documents found'}</p>
              <p class="text-slate-600 font-mono text-xs">${lang === 'hi' ? `"${state.docSearch}" के लिए कोई परिणाम नहीं` : `No results for "${state.docSearch}"`}</p>
              <button onclick="window.pmClearSearch()" class="px-4 py-2 text-xs font-mono bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 rounded-lg hover:bg-cyber-blue/20 transition-all">
                ${lang === 'hi' ? 'खोज साफ़ करें' : 'Clear Search'}
              </button>
            </div>
          ` : `
            <div class="mb-3 flex items-center justify-between">
              <span class="text-[10px] font-mono text-slate-500">${filtered.length} ${lang === 'hi' ? 'दस्तावेज़ मिले' : 'documents found'}</span>
              <span class="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <i data-lucide="shield-check" class="h-3 w-3"></i>
                ${lang === 'hi' ? 'ऑफ़लाइन एन्क्रिप्शन सक्रिय' : 'Offline Encryption Active'}
              </span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${filtered.map(doc => {
                const extInfo = EXT_ICONS[doc.ext.toLowerCase()] || EXT_ICONS['pdf'];
                const catInfo = CATEGORIES[doc.category];
                const catColor = colorMap[catInfo.color] || 'text-cyan-400';
                const viewUrl = getViewUrl(doc.id);
                const dlUrl = getDownloadUrl(doc.id);

                // Highlight search term in name and desc
                let displayName = doc.name;
                let displayDesc = doc.desc;
                if (searchTerm) {
                  const esc = searchTerm.replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, '\\\\$&');
                  const re = new RegExp(`(${esc})`, 'gi');
                  displayName = doc.name.replace(re, '<mark class="bg-cyber-blue/30 text-cyber-blue rounded px-0.5">$1</mark>');
                  displayDesc = doc.desc.replace(re, '<mark class="bg-cyber-blue/30 text-cyber-blue rounded px-0.5">$1</mark>');
                }

                return `
                  <div class="group p-4 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 ${
                    isDark
                      ? 'bg-cyber-900 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }">
                    <!-- Header -->
                    <div class="flex items-start gap-3 mb-3">
                      <div class="h-10 w-10 rounded-xl ${extInfo.bg} flex items-center justify-center shrink-0">
                        <i data-lucide="${extInfo.icon}" class="h-5 w-5 ${extInfo.color}"></i>
                      </div>
                      <div class="min-w-0 flex-1">
                        <p class="text-xs font-bold font-mono text-white leading-snug truncate" title="${doc.name}">${displayName}</p>
                        <span class="text-[9px] font-mono font-bold ${catColor} uppercase tracking-wider">${catLabel(doc.category)}</span>
                      </div>
                      <div class="flex items-center gap-1.5 shrink-0">
                        ${doc.customUrl ? `
                          <a href="${doc.customUrl}" target="_blank" class="text-slate-500 hover:text-cyber-blue transition-all p-1 rounded hover:bg-slate-800 flex items-center justify-center" title="${lang === 'hi' ? 'आधिकारिक स्रोत' : 'Official Source'}">
                            <i data-lucide="external-link" class="h-3.5 w-3.5"></i>
                          </a>
                        ` : ''}
                        <span class="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${extInfo.bg} ${extInfo.color}">${extInfo.label}</span>
                      </div>
                    </div>

                    <!-- Description -->
                    <p class="text-[10px] text-slate-400 font-mono leading-relaxed mb-3 line-clamp-2">${displayDesc}</p>

                    <!-- Actions -->
                    <div class="flex gap-2">
                      <button onclick="window.pmOpenTemplateModal('${doc.id}')" class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20 transition-all text-[10px] font-bold font-mono border border-cyber-blue/20">
                        <i data-lucide="eye" class="h-3 w-3"></i>
                        ${lang === 'hi' ? 'देखें व संपादित करें' : 'View & Customise'}
                      </button>
                      <button onclick="window.pmDownloadOfflineDoc('${doc.id}', 'doc')" class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all text-[10px] font-bold font-mono border border-emerald-500/20">
                        <i data-lucide="download" class="h-3 w-3"></i>
                        ${lang === 'hi' ? 'डाउनलोड (.doc)' : 'Download (.doc)'}
                      </button>
                      <button onclick="window.pmDownloadOfflineDoc('${doc.id}', 'txt')" class="p-2 rounded-lg ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-500'} transition-all" title="${lang === 'hi' ? 'टेक्स्ट डाउनलोड करें' : 'Download Plain Text'}">
                        <i data-lucide="file-text" class="h-3.5 w-3.5"></i>
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    </div>
  `;

  // ─── BIND EVENTS ────────────────────────────────────────────
  // Category Filter
  window.pmFilterDocs = (cat) => {
    state.docCategory = cat;
    renderDocuments(state, container);
  };

  // Clear search
  window.pmClearSearch = () => {
    state.docSearch = '';
    renderDocuments(state, container);
  };

  // Search input
  const searchInput = document.getElementById('doc-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.docSearch = e.target.value;
      renderDocuments(state, container);
    });
    searchInput.focus();
  }

  // Clear X button
  const clearBtn = document.getElementById('doc-clear-search');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.docSearch = '';
      renderDocuments(state, container);
    });
  }

  // Log doc opened
  window.pmDocOpened = (name) => {
    logActivity(`Opened document: ${name}`, 'documents');
  };

  // Copy link
  window.pmCopyLink = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-cyber-900 border border-cyber-blue/40 text-xs font-mono text-cyber-blue shadow-cyber-glow flex items-center gap-2 animate-fade-in';
      toast.innerHTML = '<span>✓</span><span>Link copied to clipboard!</span>';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2200);
    });
    logActivity('Document link copied.', 'documents');
  };

  // ─── AI ASSISTANT ─────────────────────────────────────────────
  const aiInput = document.getElementById('ai-chat-input');
  const aiSendBtn = document.getElementById('ai-send-btn');

  function sendAiMessage() {
    const text = (aiInput && aiInput.value) ? aiInput.value.trim() : '';
    if (!text) return;

    state.aiMessages.push({ from: 'user', text });
    aiInput.value = '';

    // Find best match
    const lower = text.toLowerCase();
    let matched = null;
    let bestScore = 0;
    for (const rule of AI_KEYWORDS) {
      const score = rule.keywords.filter(kw => lower.includes(kw.toLowerCase())).length;
      if (score > bestScore) {
        bestScore = score;
        matched = rule;
      }
    }

    setTimeout(() => {
      if (matched) {
        const replyText = lang === 'hi' ? matched.reply_hi : matched.reply_en;
        state.aiMessages.push({ from: 'bot', text: replyText });
        state.docCategory = matched.category;
        state.docSearch = '';
        logActivity(`AI Assistant: search for "${text}"`, 'documents');
        renderDocuments(state, container);
      } else {
        state.aiMessages.push({
          from: 'bot',
          text: lang === 'hi'
            ? `❓ "${text}" के लिए सीधा परिणाम नहीं मिला। कृपया ऊपर खोज बार में टाइप करें, या श्रेणी फ़िल्टर चुनें।`
            : `❓ No direct match for "${text}". Please use the search bar above or pick a category filter.`
        });
        renderDocuments(state, container);
      }
    }, 400);
  }

  if (aiSendBtn) aiSendBtn.addEventListener('click', sendAiMessage);
  if (aiInput) {
    aiInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendAiMessage();
    });
  }

  // Scroll AI messages to bottom
  const chatBox = document.getElementById('ai-chat-messages');
  if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;

  lucide.createIcons();
}


// ─── OFFLINE TEMPLATE CONTENT DATABASE ───────────────────────────────────────
const OFFLINE_TEMPLATES = {
  'uppolice_tenant_verification_hi': {
    title: 'किरायेदार सत्यापन प्रपत्र (Tenant Verification - Hindi)',
    content: `किरायेदार सत्यापन (सत्यापन प्रपत्र) - उत्तर प्रदेश पुलिस

सेवा में,
श्रीमान थाना प्रभारी महोदय,
थाना: [थाना का नाम], जनपद: [जनपद का नाम], उत्तर प्रदेश

विषय: किरायेदार सत्यापन (Police Verification) हेतु आवेदन पत्र।

महोदय,
सविनय निवेदन है कि प्रार्थी/आवेदक [मकान मालिक का नाम], पुत्र [पिता का नाम], निवासी [मकान मालिक का पता] का एक मकान/भवन [किराए के मकान का पता] में स्थित है। प्रार्थी ने अपने इस मकान का एक हिस्सा/कमरा निम्नलिखित किरायेदार को किराए पर दिया है:

किरायेदार का विवरण:
1. किरायेदार का पूरा नाम: [किरायेदार का नाम]
2. पिता/पति का नाम: [पिता/पति का नाम]
3. स्थाई पता: [किरायेदार का स्थाई पता]
4. मोबाइल नंबर: [किरायेदार का मोबाइल]
5. आधार/पहचान पत्र संख्या: [आधार कार्ड नंबर]
6. व्यवसाय/कार्यस्थल का पता: [व्यवसाय/नौकरी का पता]
7. परिवार के कुल सदस्यों की संख्या: [सदस्यों की संख्या]
8. पूर्व निवास स्थान (यदि कोई हो): [पूर्व पता]

अतः श्रीमान जी से सविनय अनुरोध है कि सुरक्षा एवं लोक शांति की दृष्टि से उक्त किरायेदार का स्थानीय पुलिस रिकॉर्ड से सत्यापन (Police Verification) कराने की कृपा करें। किरायेदार के पहचान पत्र (आधार कार्ड) की प्रति संलग्न है।

संलग्नक:
1. किरायेदार के आधार कार्ड की प्रति
2. किरायेदार का पासपोर्ट साइज छायाचित्र

दिनांक: [दिनांक]

भवदीय,
मकान मालिक के हस्ताक्षर: ............................
नाम: [मकान मालिक का नाम]
मोबाइल नंबर: [मकान मालिक का मोबाइल]
`
  },
  'uppolice_tenant_verification_en': {
    title: 'Tenant Verification Form (English)',
    content: `TENANT VERIFICATION FORM - UTTAR PRADESH POLICE

To,
The Officer-in-Charge,
Police Station: [Police Station Name], District: [District Name], Uttar Pradesh

Subject: Request for Police Verification of Tenant.

Respected Sir,
I, [Landlord Name], Son/Daughter of [Father's Name], resident of [Landlord Address], have let out my premises/portion situated at [Rented Property Address] to the tenant whose details are given below:

Tenant Particulars:
1. Full Name of Tenant: [Tenant Full Name]
2. Father's / Husband's Name: [Father/Husband Name]
3. Permanent Address: [Tenant Permanent Address]
4. Mobile / Contact Number: [Tenant Contact Number]
5. ID Proof Type & Number (e.g. Aadhaar): [Aadhaar/ID Number]
6. Office / Business Address: [Tenant Occupation Details]
7. Co-inhabitants / Family Members: [Number of Family Members]
8. References in the Area: [Reference Name & Contact]

Kindly conduct the necessary police background verification for the above-mentioned tenant for security purposes. Enclosures (Aadhaar, Passport Photo, Rent Agreement) are attached herewith.

Date: [Current Date]

Yours faithfully,
Landlord Signature: ............................
Name: [Landlord Name]
Mobile Number: [Landlord Contact]
`
  },
  'uppolice_domestic_servant': {
    title: 'घरेलू सहायक सत्यापन प्रारूप (Domestic Servant Verification)',
    content: `घरेलू सहायक / नौकर सत्यापन प्रपत्र - उत्तर प्रदेश पुलिस

सेवा में,
श्रीमान थाना प्रभारी महोदय,
थाना: [थाना का नाम], जनपद: [जनपद का नाम], उत्तर प्रदेश

विषय: घरेलू नौकर/सहायक के पुलिस सत्यापन हेतु प्रार्थना पत्र।

महोदय,
सविनय निवेदन है कि प्रार्थी [मकान मालिक का नाम], निवासी [मकान मालिक का पता], अपने घर पर घरेलू कार्यों (जैसे साफ-सफाई, खाना बनाना, सुरक्षा आदि) हेतु निम्नलिखित व्यक्ति को घरेलू सहायक के रूप में नियुक्त कर रहा है/किया है:

घरेलू सहायक का विवरण:
1. पूरा नाम: [सहायक का नाम]
2. पिता का नाम: [पिता का नाम]
3. स्थाई निवासी: [सहायक का स्थाई पता]
4. वर्तमान निवासी: [सहायक का वर्तमान पता]
5. आधार/पहचान पत्र संख्या: [आधार कार्ड संख्या]
6. मोबाइल नंबर: [सहायक का मोबाइल]
7. पूर्व कार्यस्थल का विवरण: [पूर्व नियोक्ता का नाम व पता]
8. दो स्थानीय गवाहों के नाम व पते:
   क) [गवाह 1 का नाम व मोबाइल]
   ख) [गवाह 2 का नाम व मोबाइल]

अतः श्रीमान जी से सादर अनुरोध है कि उक्त घरेलू सहायक का पुलिस रिकॉर्ड सत्यापन करने की कृपा करें, ताकि प्रार्थी के परिवार की सुरक्षा व शांति सुनिश्चित रहे। पहचान पत्र एवं छायाचित्र संलग्न है।

दिनांक: [दिनांक]

भवदीय,
नियोक्ता (मकान मालिक) के हस्ताक्षर: ............................
नाम: [नियोक्ता का नाम]
मोबाइल नंबर: [नियोक्ता का मोबाइल]
`
  },
  'uppolice_suraksha_gunner': {
    title: 'पुलिस सुरक्षा / गनर प्रदाता आवेदन (Security Gunner Policy)',
    content: `पुलिस गनर / सुरक्षा कर्मी प्राप्ति हेतु आवेदन पत्र

सेवा में,
श्रीमान वरिष्ठ पुलिस अधीक्षक / पुलिस अधीक्षक महोदय,
जनपद: [जनपद का नाम], उत्तर प्रदेश।

विषय: जीवन सुरक्षा हेतु सरकारी पुलिस गनर / सुरक्षा कर्मी प्रदान करने के संबंध में।

महोदय,
सविनय निवेदन है कि प्रार्थी [आपका नाम], पुत्र [पिता का नाम], निवासी [आपका पूरा पता], वर्तमान में [आपका व्यवसाय/राजनीतिक/सामाजिक पद] के रूप में कार्यरत है।

प्रार्थी को विगत कुछ समय से अज्ञात असामाजिक तत्वों एवं विरोधियों द्वारा जान से मारने की धमकियां मिल रही हैं। इस संबंध में प्रार्थी ने थाना [थाना का नाम] में दिनांक [दिनांक] को मु.अ.सं. [मुकदमा नंबर] / शिकायत भी दर्ज कराई है। प्रार्थी के जीवन पर गंभीर सुरक्षा खतरा मंडरा रहा है, जिससे प्रार्थी का सार्वजनिक व व्यावसायिक जीवन बाधित हो रहा है।

अतः श्रीमान जी से अत्यंत विनम्र अनुरोध है कि प्रार्थी के जीवन की रक्षा हेतु नियमानुसार सरकारी दर पर (या विभागीय नियमों के अंतर्गत) एक सशस्त्र पुलिस गनर / सुरक्षा कर्मी स्वीकृत करने की कृपा करें। प्रार्थी सुरक्षा शुल्क के अग्रिम भुगतान हेतु तैयार है।

संलग्नक:
1. धमकी भरे पत्रों/कॉल्स की प्रति
2. दर्ज कराई गई एफआईआर/शिकायत की प्रति
3. पहचान पत्र व निवास प्रमाण पत्र

दिनांक: [दिनांक]

भवदीय,
आवेदक के हस्ताक्षर: ............................
नाम: [आपका नाम]
मोबाइल नंबर: [आपका मोबाइल]
`
  },
  'uppolice_character_verification': {
    title: 'चरित्र प्रमाण पत्र आवेदन प्रारूप (Character Certificate)',
    content: `चरित्र प्रमाण पत्र आवेदन प्रपत्र (Character Certificate Application)

सेवा में,
श्रीमान वरिष्ठ पुलिस अधीक्षक / पुलिस अधीक्षक महोदय,
जनपद: [जनपद का नाम], उत्तर प्रदेश।

विषय: पुलिस चरित्र प्रमाण पत्र (Character Certificate) जारी करने हेतु आवेदन।

महोदय,
सविनय निवेदन है कि आवेदक [आवेदक का पूरा नाम], पुत्र/पुत्री [पिता का नाम], निवासी [स्थाई पता], वर्तमान में [सरकारी नौकरी/विदेशी वीजा/संविदा कार्य/अन्य] हेतु आवेदन कर रहा है, जिसके लिए पुलिस सत्यापन चरित्र प्रमाण पत्र की अत्यंत आवश्यकता है।

आवेदक का विवरण इस प्रकार है:
1. पूरा नाम (हिंदी): [आपका नाम]
2. Full Name (English): [Your Name]
3. पिता का नाम: [पिता का नाम]
4. जन्म तिथि व आयु: [जन्म तिथि]
5. स्थाई पता: [स्थाई निवासी पता]
6. वर्तमान पता (यदि अलग हो): [वर्तमान पता]
7. मोबाइल नंबर: [मोबाइल नंबर]
8. आधार/पहचान पत्र संख्या: [आधार कार्ड नंबर]

आवेदक यह प्रमाणित करता है कि उसके विरुद्ध किसी भी न्यायालय या थाने में कोई भी आपराधिक मुकदमा लंबित नहीं है और न ही उसे कभी गिरफ्तार या सजायाफ्ता किया गया है।

अतः श्रीमान जी से सादर अनुरोध है कि स्थानीय थाने से आवेदक की साख एवं चरित्र का सत्यापन कराकर चरित्र प्रमाण पत्र जारी करने की कृपा करें।

संलग्नक:
1. आधार कार्ड की छायाप्रति
2. राजपत्रित अधिकारी द्वारा जारी चरित्र प्रमाण पत्र
3. पासपोर्ट साइज छायाचित्र

दिनांक: [दिनांक]

भवदीय,
आवेदक के हस्ताक्षर: ............................
नाम: [आवेदक का नाम]
मोबाइल नंबर: [आवेदक का मोबाइल]
`
  },

  '1JAC8hVfg8GJCUkQ-f6DLMoV584aB70qf': {
    title: '151 CRPC चालानी प्रारूप (चालान रिपोर्ट)',
    content: `न्यायालय श्रीमान उप-जिला मजिस्ट्रेट महोदय, [जनपद का नाम]
चालानी रिपोर्ट अंतर्गत धारा 151 दंड प्रक्रिया संहिता (CrPC) / 170 BNSS

थाना: [थाना का नाम]
जनपद: [जनपद का नाम]
दिनांक: [वर्तमान दिनांक]

श्रीमान जी,
सविनय निवेदन है कि आज दिनांक [दिनांक] को मुखबिर की सूचना पर अभियुक्त [अभियुक्त का नाम], पुत्र [पिता का नाम], निवासी [अभियुक्त का पता] को शांतिभंग की आशंका के तहत गिरफ्तार किया गया है। अभियुक्त के पास से किसी प्रकार का कोई अवैध शस्त्र बरामद नहीं हुआ है।

अभियुक्त के कृत्य से लोक शांति भंग होने की पूर्ण आशंका है, अतः शांति व्यवस्था बनाए रखने हेतु अभियुक्त का चालान माननीय न्यायालय के समक्ष प्रस्तुत किया जा रहा है।

संलग्नक:
1. गिरफ्तारी फर्द
2. गवाहों के बयान

हस्ताक्षर विवेचक / थाना प्रभारी
थाना: [थाना का नाम]
`
  },
  '1Notice41170': {
    title: 'Notice 41/170 CrPC PRAROP',
    content: `कार्यालय थाना प्रभारी, [थाना का नाम]
जनपद: [जनपद का नाम], उत्तर प्रदेश

नोटिस अंतर्गत धारा 41 (ए) दंड प्रक्रिया संहिता (CrPC) / 35(3) BNSS

प्रेषित:
[अभियुक्त का नाम]
पुत्र: [पिता का नाम]
निवासी: [अभियुक्त का पता]

आपको सूचित किया जाता है कि मुकदमा अपराध संख्या [मु.अ.सं.] वर्ष [वर्ष] अंतर्गत धारा [धाराएं] थाना [थाना] में आपकी संलिप्तता पायी गयी है। इस प्रकरण में विवेचना हेतु आपकी उपस्थिति अनिवार्य है।

अतः आप इस नोटिस प्राप्ति के 3 दिवस के भीतर विवेचनाधिकारी के समक्ष उपस्थित होकर जांच में सहयोग करें। उपस्थित न होने या असहयोग करने की स्थिति में अग्रिम विधिक कार्रवाई करते हुए आपकी गिरफ्तारी की जा सकती है।

दिनांक: [दिनांक]
स्थान: [स्थान]

हस्ताक्षर विवेचनाधिकारी / थाना प्रभारी
`
  },
  '1tgHiB6qnNOWFAcucEG4uMDj4sNaMAvZN': {
    title: 'HRA मकान किराया भत्ता प्रार्थना पत्र',
    content: `सेवा में,
श्रीमान वरिष्ठ पुलिस अधीक्षक / पुलिस अधीक्षक महोदय,
जनपद: [जनपद का नाम]

विषय: मकान किराया भत्ता (HRA) स्वीकृत करने हेतु प्रार्थना पत्र।

महोदय,
सविनय निवेदन है कि प्रार्थी [आपका नाम], पद: [आपका पद], PNO संख्या: [PNO नंबर], वर्तमान में थाना/शाखा [थाना/शाखा का नाम] में नियुक्त है। 

प्रार्थी वर्तमान में सरकारी आवास में निवास नहीं कर रहा है और बाहरी निजी क्षेत्र में किराए के मकान में निवास कर रहा है। प्रार्थी ने निजी किराए के मकान का अनुबंध एवं किराया रसीद संलग्न कर दी है।

अतः श्रीमान जी से सविनय अनुरोध है कि प्रार्थी का नियमानुसार मकान किराया भत्ता (HRA) स्वीकृत करने की कृपा करें।

संलग्नक:
1. किराए का अनुबंध पत्र (Rent Agreement)
2. मकान मालिक की किराया रसीद
3. गैर-सरकारी आवास प्रमाण पत्र (Non-Allotment Certificate)

भवदीय,
नाम: [आपका नाम]
पद: [आपका पद]
PNO: [PNO नंबर]
मोबाइल: [मोबाइल नंबर]
`
  },
  '1xJQdErSlGJR2dc0LyTaePLgVuZZpMVJa': {
    title: 'Night Pass / रात्रि पास प्रारूप',
    content: `कार्यालय पुलिस अधीक्षक, [जनपद का नाम]
रात्रि पास / नाइट ड्यूटी अनुमति पत्र

क्र.सं.: [पास संख्या]
दिनांक: [वर्तमान दिनांक]

पदधारी का नाम: [पुलिसकर्मी का नाम]
पद: [पुलिस पद]
PNO नंबर: [PNO संख्या]
नियुक्ति स्थान: [थाना/शाखा]

अनुमति क्षेत्र: [अनुमति प्राप्त क्षेत्र/मार्ग]
वैधता अवधि: दिनांक [प्रारंभ दिनांक] से दिनांक [समाप्ति दिनांक] तक (केवल रात्रि [समय] से [समय] बजे तक)

प्रयोजन: रात्रि गश्त, सामरिक चैकिंग एवं कानून व्यवस्था ड्यूटी।

थाना प्रभारियों को निर्देशित किया जाता है कि उक्त पुलिसकर्मी को रात्रि गश्त एवं आवश्यक पुलिस ड्यूटी के दौरान बिना किसी बाधा के आवागमन की अनुमति प्रदान करें।

हस्ताक्षर जारीकर्ता अधिकारी
(पुलिस अधीक्षक / क्षेत्राधिकारी)
`
  },
  '1BankUnfreezeDocId': {
    title: 'बैंक खाता अनफ्रीज करने का पत्र प्रारूप',
    content: `सेवा में,
श्रीमान शाखा प्रबंधक महोदय,
[बैंक का नाम], शाखा: [शाखा का नाम]
जनपद: [जनपद का नाम]

विषय: बैंक खाता संख्या [खाता संख्या] को अनफ्रीज (सक्रिय) करने के संबंध में।
संदर्भ: मुकदमा अपराध संख्या / साइबर शिकायत संख्या: [शिकायत संख्या/मु.अ.सं.]

महोदय,
सविनय निवेदन है कि साइबर अपराध सेल / थाना [थाना का नाम] द्वारा विवेचना के दौरान खाताधारक [खाताधारक का नाम] के बैंक खाता संख्या [खाता संख्या] को संदिग्ध संव्यवहार के कारण अस्थाई रूप से फ्रीज करने हेतु दिनांक [दिनांक] को एक पत्र प्रेषित किया गया था।

विवेचना के दौरान खाताधारक द्वारा प्रस्तुत साक्ष्यों एवं जांच के उपरांत उक्त खाता संख्या [खाता संख्या] पर लगी रोक (Freeze) को हटाने का निर्णय लिया गया है। उक्त खाते को विवेचना में आगे किसी संदिग्ध गतिविधि से मुक्त पाया गया है।

अतः आपसे अनुरोध है कि उक्त खाता संख्या [खाता संख्या] को तत्काल प्रभाव से अनफ्रीज (सक्रिय) करने की कृपा करें, ताकि खाताधारक अपने खाते का सामान्य रूप से संचालन कर सके।

सहयोग के लिए धन्यवाद।

दिनांक: [दिनांक]
स्थान: [स्थान]

भवदीय,
हस्ताक्षर विवेचनाधिकारी / थाना प्रभारी
नाम: [विवेचक का नाम]
पद: [पद]
PNO नंबर: [PNO संख्या]
थाना / साइबर सेल: [थाना/साइबर सेल का नाम]
`
  },
  '1BankBlockAmountDocId': {
    title: 'संदिग्ध ठगी राशि ब्लॉक करने का पत्र प्रारूप',
    content: `सेवा में,
श्रीमान नोडल अधिकारी / शाखा प्रबंधक महोदय,
[बैंक का नाम], शाखा: [शाखा का नाम]

विषय: साइबर अपराध के तहत संदिग्ध राशि रुपये [राशि] खाता संख्या [खाता संख्या] में होल्ड / ब्लॉक करने के संबंध में।
संदर्भ: राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (NCCRP) शिकायत संख्या: [शिकायत संख्या]

महोदय,
आपको सूचित किया जाता है कि राष्ट्रीय साइबर अपराध पोर्टल पर दर्ज शिकायत संख्या [शिकायत संख्या] के अनुसार, पीड़ित [पीड़ित का नाम] के साथ रुपये [ठगी की राशि] की साइबर धोखाधड़ी की गयी है। तकनीकी विश्लेषण से ज्ञात हुआ है कि उक्त धोखाधड़ी की राशि में से रुपये [ब्लॉक करने योग्य राशि] आपके बैंक की शाखा [शाखा का नाम] के खाताधारक [अभियुक्त/संदेही का नाम] के खाता संख्या [खाता संख्या] में हस्तांतरित हुई है।

अतः लोक हित एवं न्याय सुरक्षा की दृष्टि से धारा 102 CrPC / 106 BNSS के अंतर्गत प्रदत्त शक्तियों का प्रयोग करते हुए आपको निर्देशित किया जाता है कि उक्त संदिग्ध राशि रुपये [ब्लॉक करने योग्य राशि] को उक्त खाता संख्या [खाता संख्या] में तत्काल प्रभाव से होल्ड / ब्लॉक (Debit Freeze) कर दें, ताकि उक्त राशि को अभियुक्त द्वारा निकाला न जा सके। खाते के शेष भाग को प्रभावित न किया जाए।

उक्त कार्रवाई करने के उपरांत कृत कार्रवाई की आख्या इस कार्यालय को तत्काल प्रेषित करें।

दिनांक: [दिनांक]
स्थान: [स्थान]

भवदीय,
हस्ताक्षर विवेचनाधिकारी / थाना प्रभारी
नाम: [विवेचक का नाम]
पद: [पद]
PNO नंबर: [PNO संख्या]
थाना / साइबर सेल: [थाना/साइबर सेल का नाम]
`
  }
};

// Global Template Content Fetcher
function getTemplateText(id, docName) {
  if (OFFLINE_TEMPLATES[id]) {
    return OFFLINE_TEMPLATES[id].content;
  }
  // Generic Template Generator if specific template does not exist
  return `पुलिस मित्र - कल्याण व प्रशासनिक प्रारूप प्रणाली
दस्तावेज़ का नाम: ${docName}
आईडी: ${id}

[प्रशासकीय प्रारूप संदर्भ - विभाग उपयोग हेतु]

प्रेषक:
नाम: [आपका नाम]
पद: [आपका पद]
PNO नंबर: [PNO संख्या]
नियुक्ति स्थान: [थाना/जनपद]

सेवा में,
सक्षम अधिकारी महोदय,
उत्तर प्रदेश पुलिस विभाग।

विषय: ${docName} के संबंध में आवेदन / रिपोर्ट।

महोदय,
सविनय निवेदन है कि उपर्युक्त विषय के संबंध में प्रार्थी का आवश्यक विवरण इस प्रकार है:
1. नाम एवं पद: [आपका विवरण]
2. PNO आईडी: [PNO संख्या]
3. विषय वस्तु का विवरण: [यहाँ आवश्यक विवरण या स्पष्टीकरण लिखें]

अतः श्रीमान जी से सादर अनुरोध है कि उक्त प्रकरण में त्वरित अनुकूल कार्रवाई करने की कृपा करें।

दिनांक: [वर्तमान दिनांक]
स्थान: [स्थान]

प्रार्थी,
हस्ताक्षर: ............................
नाम: [आपका नाम]
पद: [आपका पद]
PNO: [PNO संख्या]
मोबाइल नंबर: [मोबाइल नंबर]
`;
}

// Global modal triggers
window.pmOpenTemplateModal = function(id) {
  const list = ALL_DOCS;
  const doc = list.find(d => d.id === id) || { name: 'दस्तावेज़ प्रारूप', id };
  const docName = doc.name;
  const text = getTemplateText(id, docName);

  // Remove existing modal if any
  const oldModal = document.getElementById('pm-template-modal');
  if (oldModal) oldModal.remove();

  const modal = document.createElement('div');
  modal.id = 'pm-template-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60';
  modal.innerHTML = `
    <div class="relative w-full max-w-3xl rounded-2xl border border-cyber-blue/30 bg-slate-900 shadow-2xl overflow-hidden flex flex-col transform transition-all animate-in fade-in zoom-in-95 duration-200">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/50">
        <div class="flex items-center gap-2">
          <i data-lucide="file-text" class="h-5 w-5 text-cyber-blue"></i>
          <h3 class="text-sm font-bold font-mono tracking-wider text-white uppercase">${docName}</h3>
        </div>
        <button onclick="document.getElementById('pm-template-modal').remove()" class="p-2 rounded hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors">
          <i data-lucide="x" class="h-5 w-5"></i>
        </button>
      </div>

      <!-- Preview Body -->
      <div class="p-5 flex-1 overflow-y-auto max-h-[450px]">
        <span class="text-[9px] font-bold font-mono text-cyan-400 uppercase tracking-widest block mb-2">📄 Interactive Template Draft (Editable)</span>
        <textarea id="modal-template-editor" class="w-full h-80 p-4 rounded-xl border border-slate-800 bg-slate-950/80 text-white font-mono text-xs leading-relaxed outline-none focus:border-cyber-blue/50 resize-none">${text}</textarea>
      </div>

      <!-- Actions Footer -->
      <div class="p-4 bg-slate-950/80 border-t border-slate-800 flex justify-between items-center sm:flex-row flex-col gap-4">
        <p class="text-[9px] text-slate-500 font-mono">Jai Hind! Offline support active.</p>
        <div class="flex gap-2">
          <button onclick="window.pmCopyModalTemplate()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 border border-slate-700">
            <i data-lucide="copy" class="h-3.5 w-3.5"></i> Copy Text
          </button>
          <button onclick="window.pmDownloadModalTemplate('${id}', 'txt')" class="px-4 py-2 bg-cyber-blue/10 hover:bg-cyber-blue/20 text-cyber-blue rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 border border-cyber-blue/30">
            <i data-lucide="file-text" class="h-3.5 w-3.5"></i> Download Plain Text
          </button>
          <button onclick="window.pmDownloadModalTemplate('${id}', 'doc')" class="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-cyber-950 font-bold rounded-xl font-mono text-xs transition-all flex items-center gap-1.5">
            <i data-lucide="download" class="h-4 w-4"></i> Download .doc (Word)
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Bind modal button functions
  window.pmCopyModalTemplate = () => {
    const txt = document.getElementById('modal-template-editor').value;
    navigator.clipboard.writeText(txt).then(() => {
      alert('Template text copied successfully!');
    });
  };

  window.pmDownloadModalTemplate = (docId, type) => {
    const txt = document.getElementById('modal-template-editor').value;
    const docName = (ALL_DOCS.find(d => d.id === docId) || { name: 'Template' }).name;
    triggerDownload(docName, txt, type);
  };

  lucide.createIcons();
};

// Global direct download triggers
window.pmDownloadOfflineDoc = function(id, type) {
  const list = ALL_DOCS;
  const doc = list.find(d => d.id === id) || { name: 'दस्तावेज़ प्रारूप', id };
  const text = getTemplateText(id, doc.name);
  triggerDownload(doc.name, text, type);
};

// Low-level Blob Downloader Helper
function triggerDownload(docName, content, type) {
  let blob, filename;
  
  if (type === 'txt') {
    blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    filename = `${docName}_प्रारूप.txt`;
  } else {
    // Generate Rich HTML format wrapped inside a DOC container
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>\${docName}</title>
      <style>
        body { font-family: 'Courier New', Courier, monospace; line-height: 1.6; }
        h2 { text-align: center; text-transform: uppercase; color: #0f172a; margin-bottom: 20px; }
      </style>
      </head>
      <body>
        <h2>\${docName} - प्रारूप</h2>
        <p style="white-space: pre-wrap;">\${content}</p>
      </body>
      </html>
    `;
    blob = new Blob([htmlContent], { type: 'application/msword' });
    filename = `${docName}_प्रारूप.doc`;
  }

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  
  logActivity(`Downloaded offline document: ${docName} (.${type})`, 'documents');
}
