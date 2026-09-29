import { IconDroplet, IconHeart, IconRibbon, IconBrain, IconKidney, IconLungs } from '../components/icons.jsx';

const DISEASES = [
  {
    id:'diabetes', color:'#0E7C86', bg:'#E3F2F1', Icon:IconDroplet,
    name:{en:'Diabetes', te:'మధుమేహం', hi:'मधुमेह'},
    desc:{en:'Blood sugar regulation', te:'రక్తంలో చక్కెర నియంత్రణ', hi:'रक्त शर्करा नियंत्रण'},
    symptoms:[
      {id:'freq_urination', w:3, label:{en:'Frequent urination', te:'తరచుగా మూత్రవిసర్జన', hi:'बार-बार पेशाब आना'}},
      {id:'excess_thirst', w:3, label:{en:'Excessive thirst', te:'అధిక దాహం', hi:'अत्यधिक प्यास'}},
      {id:'weight_loss', w:2, label:{en:'Unexplained weight loss', te:'కారణం లేని బరువు తగ్గడం', hi:'अकारण वजन घटना'}},
      {id:'fatigue_d', w:1, label:{en:'Constant fatigue', te:'నిరంతర అలసట', hi:'लगातार थकान'}},
      {id:'blurred_vision', w:2, label:{en:'Blurred vision', te:'మసక దృష్టి', hi:'धुंधला दिखना'}},
      {id:'slow_healing', w:2, label:{en:'Slow-healing wounds', te:'నెమ్మదిగా నయమయ్యే గాయాలు', hi:'घाव धीरे भरना'}},
      {id:'tingling', w:2, label:{en:'Tingling in hands/feet', te:'చేతులు/కాళ్లలో జివ్వుమనడం', hi:'हाथ-पैरों में झुनझुनी'}},
    ]
  },
  {
    id:'heart', color:'#E8734A', bg:'#FCE7DE', Icon:IconHeart,
    name:{en:'Heart Disease', te:'గుండె జబ్బు', hi:'हृदय रोग'},
    desc:{en:'Cardiovascular health', te:'హృదయ ఆరోగ్యం', hi:'हृदय स्वास्थ्य'},
    symptoms:[
      {id:'chest_pain', w:3, label:{en:'Chest pain or discomfort', te:'ఛాతీ నొప్పి లేదా అసౌకర్యం', hi:'सीने में दर्द या बेचैनी'}},
      {id:'sob_h', w:3, label:{en:'Shortness of breath', te:'ఊపిరి ఆడకపోవడం', hi:'सांस फूलना'}},
      {id:'fatigue_h', w:1, label:{en:'Unusual fatigue', te:'అసాధారణ అలసట', hi:'असामान्य थकान'}},
      {id:'irregular_hb', w:2, label:{en:'Irregular heartbeat', te:'అసమాన హృదయ స్పందన', hi:'अनियमित धड़कन'}},
      {id:'swelling_legs', w:2, label:{en:'Swelling in legs/ankles', te:'కాళ్లు/చీలమండల వాపు', hi:'पैरों/टखनों में सूजन'}},
      {id:'dizziness', w:1, label:{en:'Dizziness', te:'తలతిరగడం', hi:'चक्कर आना'}},
      {id:'cold_sweats', w:2, label:{en:'Cold sweats', te:'చల్లని చెమటలు', hi:'ठंडा पसीना'}},
    ]
  },
  {
    id:'cancer', color:'#B15A8A', bg:'#F6E4EE', Icon:IconRibbon,
    name:{en:'Cancer Risk Screen', te:'క్యాన్సర్ ప్రమాద పరీక్ష', hi:'कैंसर जोखिम जांच'},
    desc:{en:'Early warning signs', te:'తొలి హెచ్చరిక సంకేతాలు', hi:'शुरुआती चेतावनी संकेत'},
    symptoms:[
      {id:'lump', w:3, label:{en:'A new lump or thickening', te:'కొత్త గడ్డ లేదా గట్టిపడటం', hi:'नई गांठ या मोटा होना'}},
      {id:'skin_change', w:2, label:{en:'Change in skin texture/color', te:'చర్మం రూపం/రంగులో మార్పు', hi:'त्वचा की बनावट/रंग में बदलाव'}},
      {id:'discharge', w:2, label:{en:'Unusual discharge or bleeding', te:'అసాధారణ స్రావం లేదా రక్తస్రావం', hi:'असामान्य स्राव या रक्तस्राव'}},
      {id:'persistent_pain', w:1, label:{en:'Persistent, unexplained pain', te:'నిరంతర, కారణం లేని నొప్పి', hi:'लगातार, अकारण दर्द'}},
      {id:'weight_loss_c', w:2, label:{en:'Unexplained weight loss', te:'కారణం లేని బరువు తగ్గడం', hi:'अकारण वजन घटना'}},
      {id:'fatigue_c', w:1, label:{en:'Persistent fatigue', te:'నిరంతర అలసట', hi:'लगातार थकान'}},
      {id:'swelling_c', w:2, label:{en:'Unusual swelling', te:'అసాధారణ వాపు', hi:'असामान्य सूजन'}},
    ]
  },
  {
    id:'neuro', color:'#3D6FB4', bg:'#E3EBF7', Icon:IconBrain,
    name:{en:'Neurological Risk', te:'నాడీ సంబంధిత ప్రమాదం', hi:'न्यूरोलॉजिकल जोखिम'},
    desc:{en:'Brain & memory health', te:'మెదడు & జ్ఞాపకశక్తి ఆరోగ్యం', hi:'मस्तिष्क व स्मृति स्वास्थ्य'},
    symptoms:[
      {id:'memory_loss', w:3, label:{en:'Memory loss affecting daily life', te:'రోజువారీ జీవితంపై ప్రభావం చూపే జ్ఞాపకశక్తి కోల్పోవడం', hi:'दैनिक जीवन को प्रभावित करने वाली स्मृति हानि'}},
      {id:'confusion', w:2, label:{en:'Confusion or disorientation', te:'గందరగోళం', hi:'भ्रम या दिशाहीनता'}},
      {id:'speech_diff', w:3, label:{en:'Difficulty speaking or finding words', te:'మాట్లాడటంలో లేదా పదాలు గుర్తుపెట్టుకోవడంలో ఇబ్బంది', hi:'बोलने या शब्द याद करने में कठिनाई'}},
      {id:'numbness', w:3, label:{en:'Numbness on one side of body', te:'శరీరం ఒక వైపు తిమ్మిరి', hi:'शरीर के एक तरफ सुन्नपन'}},
      {id:'severe_headache', w:2, label:{en:'Sudden, severe headache', te:'ఆకస్మిక, తీవ్రమైన తలనొప్పి', hi:'अचानक, गंभीर सिरदर्द'}},
      {id:'balance', w:2, label:{en:'Loss of balance or coordination', te:'సమతుల్యత లేదా సమన్వయం కోల్పోవడం', hi:'संतुलन या समन्वय की कमी'}},
      {id:'vision_change', w:1, label:{en:'Sudden vision changes', te:'ఆకస్మిక దృష్టి మార్పులు', hi:'अचानक दृष्टि में बदलाव'}},
    ]
  },
  {
    id:'kidney', color:'#3F9668', bg:'#E3F3E9', Icon:IconKidney,
    name:{en:'Kidney Disease', te:'మూత్రపిండాల వ్యాధి', hi:'किडनी रोग'},
    desc:{en:'Renal function', te:'మూత్రపిండాల పనితీరు', hi:'वृक्क कार्य'},
    symptoms:[
      {id:'swelling_kd', w:2, label:{en:'Swelling in legs/feet', te:'కాళ్లు/పాదాల వాపు', hi:'पैरों में सूजन'}},
      {id:'fatigue_kd', w:1, label:{en:'Fatigue or weakness', te:'అలసట లేదా బలహీనత', hi:'थकान या कमजोरी'}},
      {id:'urination_change', w:3, label:{en:'Changes in urination', te:'మూత్రవిసర్జనలో మార్పులు', hi:'पेशाब में बदलाव'}},
      {id:'foamy_urine', w:2, label:{en:'Foamy urine', te:'నురుగుతో కూడిన మూత్రం', hi:'झागदार पेशाब'}},
      {id:'back_pain', w:1, label:{en:'Lower back pain', te:'నడుము నొప్పి', hi:'पीठ के निचले हिस्से में दर्द'}},
      {id:'nausea_kd', w:2, label:{en:'Nausea or vomiting', te:'వికారం లేదా వాంతులు', hi:'मतली या उल्टी'}},
      {id:'appetite', w:1, label:{en:'Poor appetite', te:'ఆకలి తగ్గడం', hi:'भूख कम लगना'}},
    ]
  },
  {
    id:'respiratory', color:'#C98A2C', bg:'#FBF0D9', Icon:IconLungs,
    name:{en:'Respiratory Disease', te:'శ్వాసకోశ వ్యాధి', hi:'श्वसन रोग'},
    desc:{en:'Lung & breathing health', te:'ఊపిరితిత్తులు & శ్వాస ఆరోగ్యం', hi:'फेफड़े व श्वसन स्वास्थ्य'},
    symptoms:[
      {id:'persistent_cough', w:2, label:{en:'Persistent cough', te:'నిరంతర దగ్గు', hi:'लगातार खांसी'}},
      {id:'wheezing', w:3, label:{en:'Wheezing', te:'గురక శబ్దంతో శ్వాస', hi:'सांस लेते समय सीटी की आवाज़'}},
      {id:'sob_r', w:3, label:{en:'Shortness of breath', te:'ఊపిరి ఆడకపోవడం', hi:'सांस फूलना'}},
      {id:'chest_tightness', w:2, label:{en:'Chest tightness', te:'ఛాతీ బిగుసుకుపోవడం', hi:'छाती में जकड़न'}},
      {id:'frequent_infections', w:1, label:{en:'Frequent chest infections', te:'తరచుగా ఛాతీ ఇన్‌ఫెక్షన్లు', hi:'बार-बार सीने में संक्रमण'}},
      {id:'fatigue_r', w:1, label:{en:'Fatigue', te:'అలసట', hi:'थकान'}},
      {id:'mucus', w:2, label:{en:'Excess mucus production', te:'అధిక కఫం ఉత్పత్తి', hi:'अत्यधिक कफ बनना'}},
    ]
  },
];
const diseaseById = (id)=> DISEASES.find(d=>d.id===id);

const ACTIONS = {
  low:{en:['Keep up your current healthy habits','Book a routine check-up sometime in the next year','Keep an eye out for any new symptoms'],
       te:['మీ ప్రస్తుత ఆరోగ్యకర అలవాట్లను కొనసాగించండి','వచ్చే సంవత్సరంలో ఎప్పుడైనా సాధారణ చెకప్ చేయించుకోండి','కొత్త లక్షణాల కోసం గమనిస్తూ ఉండండి'],
       hi:['अपनी वर्तमान स्वस्थ आदतें जारी रखें','अगले साल के भीतर एक नियमित जांच करवाएं','किसी भी नए लक्षण पर नज़र रखें']},
  medium:{en:['Book a consultation with a doctor within 2–4 weeks','Start tracking your symptoms daily','Cut back on risk factors like smoking, salt or sugar'],
       te:['2-4 వారాలలో వైద్యుడిని సంప్రదించండి','మీ లక్షణాలను ప్రతిరోజూ ట్రాక్ చేయడం ప్రారంభించండి','ధూమపానం, ఉప్పు లేదా చక్కెర వంటి ప్రమాద కారకాలను తగ్గించండి'],
       hi:['2-4 सप्ताह के भीतर डॉक्टर से सलाह लें','अपने लक्षणों को रोज़ाना ट्रैक करना शुरू करें','धूम्रपान, नमक या चीनी जैसे जोखिम कारक कम करें']},
  high:{en:['See a doctor or visit a clinic as soon as possible','Avoid strenuous activity until you are evaluated','Bring this report to your appointment for reference'],
       te:['వీలైనంత త్వరగా వైద్యుడిని కలవండి లేదా క్లినిక్‌ను సందర్శించండి','మిమ్మల్ని పరీక్షించే వరకు కష్టమైన పనులు మానుకోండి','మీ అపాయింట్‌మెంట్‌కు ఈ నివేదికను తీసుకెళ్లండి'],
       hi:['जल्द से जल्द डॉक्टर से मिलें या क्लिनिक जाएं','जांच होने तक कठिन गतिविधियों से बचें','अपनी अपॉइंटमेंट पर संदर्भ के लिए यह रिपोर्ट साथ ले जाएं']},
};

const HEALTH_INFO = DISEASES.map(d=>({
  id:d.id,
  title:d.name,
  body:{
    en:`${d.name.en} develops gradually and early signs are easy to miss. Regular screening, a balanced diet, staying active, and knowing your family history are the best defences. MediQAI's screen is a starting point for a conversation with your doctor — not a replacement for one.`,
    te:`${d.name.te} నెమ్మదిగా అభివృద్ధి చెందుతుంది మరియు తొలి సంకేతాలను గమనించడం కష్టం. క్రమం తప్పకుండా పరీక్షలు, సమతుల్య ఆహారం, చురుకుగా ఉండటం మరియు కుటుంబ చరిత్రను తెలుసుకోవడం ఉత్తమ రక్షణలు. MediQAI పరీక్ష మీ వైద్యుడితో సంభాషణకు ప్రారంభ బిందువు మాత్రమే — దానికి ప్రత్యామ్నాయం కాదు.`,
    hi:`${d.name.hi} धीरे-धीरे विकसित होता है और शुरुआती संकेतों को पहचानना आसान नहीं होता। नियमित जांच, संतुलित आहार, सक्रिय रहना और पारिवारिक इतिहास जानना सबसे अच्छा बचाव है। MediQAI की जांच आपके डॉक्टर से बातचीत की शुरुआत है — डॉक्टर की जगह नहीं लेती।`
  }
}));

const TIPS = [
  {en:'Sleep 7–9 hours a night — recovery time your body needs to regulate hormones and repair itself.', te:'ప్రతి రాత్రి 7-9 గంటలు నిద్రపోండి — శరీరం హార్మోన్లను నియంత్రించడానికి మరియు స్వయంగా బాగుపడటానికి అవసరమైన సమయం.', hi:'रात में 7–9 घंटे सोएं — यह वह समय है जो शरीर को हार्मोन नियंत्रित करने और खुद को ठीक करने के लिए चाहिए।'},
  {en:'Move for at least 30 minutes a day — a brisk walk counts.', te:'రోజుకు కనీసం 30 నిమిషాలు కదలండి — వేగంగా నడవడం కూడా సరిపోతుంది.', hi:'दिन में कम से कम 30 मिनट सक्रिय रहें — तेज़ चलना भी काफी है।'},
  {en:'Fill half your plate with vegetables and fruit at each meal.', te:'ప్రతి భోజనంలో మీ ప్లేటులో సగం కూరగాయలు మరియు పండ్లతో నింపండి.', hi:'हर भोजन में अपनी थाली का आधा हिस्सा सब्ज़ियों और फलों से भरें।'},
  {en:'Drink water through the day — thirst often shows up after you are already dehydrated.', te:'రోజంతా నీరు తాగండి — దాహం సాధారణంగా మీరు ఇప్పటికే డీహైడ్రేట్ అయిన తర్వాత కనిపిస్తుంది.', hi:'दिन भर पानी पीते रहें — प्यास अक्सर तब लगती है जब शरीर पहले से ही निर्जलित हो चुका होता है।'},
  {en:'Get an annual check-up even when you feel fine — many conditions are silent early on.', te:'మీకు బాగానే ఉన్నా ఏటా చెకప్ చేయించుకోండి — చాలా వ్యాధులు తొలి దశలో లక్షణాలు చూపవు.', hi:'ठीक महसूस करने पर भी सालाना जांच कराएं — कई बीमारियां शुरुआत में लक्षण नहीं दिखातीं।'},
  {en:'Limit added sugar and salt — most packaged foods already contain more than you think.', te:'అదనపు చక్కెర మరియు ఉప్పును తగ్గించండి — చాలా ప్యాకేజ్డ్ ఆహారాలలో మీరు అనుకున్నదానికంటే ఎక్కువ ఉంటుంది.', hi:'अतिरिक्त चीनी और नमक सीमित करें — ज़्यादातर पैकेज्ड खाद्य पदार्थों में सोचे से ज़्यादा मात्रा होती है।'},
  {en:'Take breaks from sitting — stand and stretch every hour if you have a desk job.', te:'కూర్చోవడం నుండి విరామం తీసుకోండి — డెస్క్ ఉద్యోగం ఉంటే ప్రతి గంటకు నిలబడి సాగదీయండి.', hi:'बैठे रहने से ब्रेक लें — डेस्क जॉब है तो हर घंटे खड़े होकर स्ट्रेच करें।'},
  {en:'Protect your mental health — stress management is as important as physical fitness.', te:'మీ మానసిక ఆరోగ్యాన్ని కాపాడుకోండి — ఒత్తిడి నిర్వహణ శారీరక ఫిట్‌నెస్ అంత ముఖ్యమైనది.', hi:'अपने मानसिक स्वास्थ्य की रक्षा करें — तनाव प्रबंधन शारीरिक फिटनेस जितना ही ज़रूरी है।'},
];


export { DISEASES, diseaseById, ACTIONS, HEALTH_INFO, TIPS };
