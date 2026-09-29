/* Health information library: condition guides, hero slides and the demo assistant.
   English text lives here; the Telugu and Hindi versions of every guide are in
   healthLibrary.i18n.js and are picked with getGuide(item, lang). */

import { LIBRARY_I18N } from './healthLibrary.i18n.js';

const LIBRARY = [
  {
    "id": "diabetes",
    "diseaseId": "diabetes",
    "title": "Type 2 Diabetes",
    "tag": {
      "en": "Metabolic & Renal",
      "te": "జీవక్రియ & మూత్రపిండాలు",
      "hi": "चयापचय व गुर्दा"
    },
    "description": "A chronic metabolic condition characterized by insulin resistance or insufficient insulin production, leading to elevated blood glucose levels.",
    "overview": "Type 2 diabetes is a multifaceted metabolic disorder wherein the body either resists the effects of insulin—a hormone that regulates the movement of sugar into your cells—or does not produce enough insulin to maintain normal glucose levels. Over prolonged periods, untreated or poorly managed hyperglycemia can precipitate devastating microvascular and macrovascular complications, including diabetic retinopathy, neuropathy, chronic kidney disease, and severe cardiovascular events. Contributing risk factors span genetic predisposition, sedentary lifestyles, dietary habits high in refined sugars, and visceral adiposity. Comprehensive clinical management mandates regular glycemic tracking via HbA1c panels, personalized nutritional therapy prioritizing complex carbohydrates and dietary fiber, consistent moderate aerobic exercise, and pharmacological intervention where lifestyle modifications alone prove insufficient to achieve optimal metabolic control.",
    "symptoms": [
      "Increased thirst (polydipsia) and frequent urination (polyuria)",
      "Extreme fatigue and lethargy",
      "Blurred or fluctuating vision",
      "Slow-healing sores, bruises, or frequent skin infections",
      "Unexplained weight loss despite normal or increased appetite"
    ],
    "prevention": [
      "Maintain a healthy body weight through portion control and mindful eating",
      "Engage in at least 150 minutes of moderate aerobic exercise per week",
      "Consume a fiber-rich diet with whole grains, leafy greens, and lean proteins",
      "Limit sugary beverages, processed snacks, and trans fats"
    ],
    "tests": [
      "Glycated hemoglobin (A1C) test (measures 3-month average blood sugar)",
      "Fasting plasma glucose (FPG) test",
      "Oral glucose tolerance test (OGTT)",
      "Random blood glucose test"
    ]
  },
  {
    "id": "heart-disease",
    "diseaseId": "heart",
    "title": "Cardiovascular Disease",
    "tag": {
      "en": "Cardiovascular",
      "te": "హృదయ సంబంధ",
      "hi": "हृदय संबंधी"
    },
    "description": "Conditions affecting the heart and blood vessels, including coronary artery disease, arrhythmias, and heart failure.",
    "overview": "Cardiovascular disease encompasses a broad spectrum of pathological conditions impacting the heart muscle and the body’s extensive vascular network, with atherosclerosis remaining the primary underlying driver. Atherosclerosis involves the insidious accumulation of cholesterol plaques, inflammatory cells, and fibrous tissue within arterial walls, progressively narrowing luminal diameter and restricting oxygenated blood delivery to vital organs. If these plaques rupture, they can trigger acute thrombotic occlusions resulting in myocardial infarctions or cerebrovascular accidents. Primary clinical determinants include chronic hypertension, dyslipidemia, cigarette smoking, systemic inflammation, and insulin resistance. Effective prevention and long-term care strategies require rigorous blood pressure regulation, lipid-lowering pharmacological therapies such as statins, adherence to a Mediterranean-style cardioprotective diet, regular cardiovascular conditioning, and routine echocardiographic or stress testing.",
    "symptoms": [
      "Chest pain, pressure, tightness, or discomfort (angina)",
      "Shortness of breath during exertion or at rest",
      "Pain, numbness, weakness, or coldness in legs or arms if blood vessels are narrowed",
      "Pain or discomfort in the neck, jaw, upper abdomen, or back",
      "Palpitations or irregular heartbeat"
    ],
    "prevention": [
      "Quit smoking and strictly avoid secondhand smoke exposure",
      "Monitor and control blood pressure and LDL cholesterol levels",
      "Adopt a heart-healthy diet low in sodium and saturated fats",
      "Manage chronic stress through mindfulness, yoga, and adequate sleep"
    ],
    "tests": [
      "Electrocardiogram (ECG or EKG)",
      "Echocardiogram (ultrasound of the heart)",
      "Exercise stress test",
      "Coronary computed tomography angiography (CCTA)"
    ]
  },
  {
    "id": "cancer-risk",
    "diseaseId": "cancer",
    "title": "Oncology & Cancer Screening",
    "tag": {
      "en": "Oncology Risk",
      "te": "ఆంకాలజీ ప్రమాదం",
      "hi": "ऑन्कोलॉजी जोखिम"
    },
    "description": "Guidance on early detection, risk factors, and preventative screenings for various prevalent oncological conditions.",
    "overview": "Oncology focuses on the complex cellular mechanisms underlying carcinogenesis, wherein genetic mutations bypass normal regulatory checkpoints governing cell division, apoptosis, and DNA repair. Uncontrolled proliferation results in benign or malignant neoplasms capable of local tissue destruction and distant metastasis through hematogenous or lymphatic pathways. Modern preventative oncology emphasizes reducing modifiable environmental carcinogen exposures, including tobacco smoke, excess ultraviolet radiation, oncogenic viral infections like HPV and Hepatitis B, and dietary imbalances. Furthermore, structured routine screening protocols—such as mammography, colonoscopy, low-dose CT scans, and cervical cytology—are fundamentally designed to catch precancerous lesions or early-stage malignancies when curative interventions exhibit maximal therapeutic efficacy. Personalized oncology also increasingly integrates genetic profiling to tailor targeted therapies for specific molecular tumor signatures.",
    "symptoms": [
      "Unexplained, rapid weight loss or persistent loss of appetite",
      "Chronic fatigue that does not improve with rest",
      "New lumps, nodules, or tissue thickening under the skin",
      "Persistent cough, hoarseness, or difficulty swallowing",
      "Unexplained changes in bowel or bladder habits"
    ],
    "prevention": [
      "Avoid all tobacco products and limit excessive sun/UV exposure",
      "Maintain a healthy weight and stay physically active",
      "Eat a plant-rich diet containing ample antioxidants and cruciferous vegetables",
      "Receive recommended vaccinations such as HPV and Hepatitis B"
    ],
    "tests": [
      "Mammography and clinical breast exams",
      "Colonoscopy and fecal occult blood testing (FOBT)",
      "Pap smear and HPV co-testing for cervical health",
      "Low-dose computed tomography (LDCT) for high-risk smokers"
    ]
  },
  {
    "id": "neurological-risk",
    "diseaseId": "neuro",
    "title": "Neurological Disorders",
    "tag": {
      "en": "Brain & Nervous System",
      "te": "మెదడు & నాడీ వ్యవస్థ",
      "hi": "मस्तिष्क व तंत्रिका तंत्र"
    },
    "description": "Conditions affecting the central and peripheral nervous system, including cognitive impairment, migraines, and neurodegeneration.",
    "overview": "Neurological disorders involve intricate structural, biochemical, or electrical abnormalities spanning the central nervous system (brain and spinal cord) and peripheral nerve pathways. Conditions range from neurodegenerative processes like Alzheimer’s and Parkinson’s disease—characterized by abnormal protein aggregation and neuronal loss—to episodic disorders such as migraines, epilepsy, and peripheral neuropathies. Preserving neurological vitality relies heavily on maintaining robust cerebrovascular health, engaging in lifelong cognitive stimulation, protecting against traumatic brain injuries, and securing adequate restorative sleep cycles essential for glymphatic clearance of metabolic waste products in the brain. Advanced neuroimaging techniques, electroencephalography, and cerebrospinal fluid biomarker analysis enable clinicians to diagnose conditions earlier, monitor progression accurately, and deploy targeted symptom-management therapies.",
    "symptoms": [
      "Progressive memory loss, confusion, and executive function changes",
      "Chronic, recurring headaches or severe migraines",
      "Numbness, tingling, or loss of sensation in fingers or toes",
      "Tremors, muscle rigidity, or balance and coordination issues",
      "Unexplained shifts in mood, personality, or behavioral patterns"
    ],
    "prevention": [
      "Engage in lifelong mental stimulation (reading, learning new languages, puzzles)",
      "Maintain regular aerobic exercise to enhance cerebral blood flow",
      "Protect against traumatic brain injuries by wearing helmets and seatbelts",
      "Prioritize 7-9 hours of restorative sleep every night"
    ],
    "tests": [
      "Brain Magnetic Resonance Imaging (MRI)",
      "Computed Tomography (CT) scans",
      "Electroencephalogram (EEG) for brainwave evaluation",
      "Cerebrospinal fluid analysis via lumbar puncture"
    ]
  },
  {
    "id": "asthma-respiratory",
    "diseaseId": "respiratory",
    "title": "Asthma & Respiratory Care",
    "tag": {
      "en": "Respiratory Health",
      "te": "శ్వాసకోశ ఆరోగ్యం",
      "hi": "श्वसन स्वास्थ्य"
    },
    "description": "A chronic inflammatory respiratory condition causing airway constriction, wheezing, and breathing difficulties.",
    "overview": "Asthma is a prevalent chronic inflammatory disorder of the airways characterized by bronchial hyperresponsiveness, reversible airflow obstruction, and excessive mucus hypersecretion. When individuals encounter specific environmental triggers—such as aeroallergens, cold ambient air, viral respiratory infections, or physical exertion—immune-mediated pathways provoke acute bronchoconstriction and mucosal edema. This restricts airflow and elicits characteristic respiratory distress symptoms. Effective long-term management relies on creating personalized asthma action plans, minimizing exposure to known domestic triggers, utilizing daily anti-inflammatory controller medications (such as inhaled corticosteroids), and having fast-acting bronchodilator rescue inhalers readily available for acute symptom relief during sudden exacerbation episodes.",
    "symptoms": [
      "Whistling or wheezing sound when breathing out",
      "Shortness of breath, especially during physical exertion",
      "Chest tightness, pressure, or aching sensation",
      "Chronic coughing that worsens at night or early morning"
    ],
    "prevention": [
      "Identify and avoid personal allergy triggers (dust mites, pollen, pet dander)",
      "Keep living spaces well-ventilated and free of indoor mold",
      "Use prescribed controller inhalers consistently as directed",
      "Monitor peak flow meters regularly"
    ],
    "tests": [
      "Spirometry (pulmonary function testing)",
      "Peak expiratory flow measurement",
      "Allergy skin prick or blood IgE testing",
      "Methacholine challenge test"
    ]
  },
  {
    "id": "chronic-kidney",
    "diseaseId": "kidney",
    "title": "Chronic Kidney Disease",
    "tag": {
      "en": "Renal Function",
      "te": "మూత్రపిండాల పనితీరు",
      "hi": "गुर्दे का कार्य"
    },
    "description": "Gradual loss of kidney function over time, impairing the body’s ability to filter waste and excess fluids from the blood.",
    "overview": "Chronic kidney disease entails the progressive, irreversible loss of renal function over months or years, ultimately compromising the kidneys’ vital role in filtering metabolic waste products, regulating electrolyte homeostasis, and producing erythropoietin. The two leading etiologies worldwide are long-standing diabetic nephropathy and systemic hypertension, both of which inflict sustained microvascular damage upon the delicate glomerular filtration units (nephrons). Because CKD frequently remains asymptomatic until advanced stages, regular biomarker screening via estimated glomerular filtration rate (eGFR) blood tests and urine albumin-to-creatinine ratios is indispensable for early detection. Therapeutic goals focus on aggressive blood pressure control, glycemic optimization, dietary sodium and protein moderation, and avoiding nephrotoxic substances to slow disease progression and prevent end-stage renal failure.",
    "symptoms": [
      "Swelling in ankles, feet, legs, or hands (edema)",
      "Persistent fatigue due to anemia associated with kidney decline",
      "Changes in urination frequency, color, or foamy urine",
      "Itchy, dry skin caused by mineral and nutrient imbalances",
      "Nausea, loss of appetite, or metallic taste in the mouth"
    ],
    "prevention": [
      "Keep blood pressure and blood sugar levels strictly managed",
      "Stay well-hydrated with water rather than sugary sodas",
      "Avoid regular overuse of nonsteroidal anti-inflammatory drugs (NSAIDs)",
      "Undergo routine annual urinalysis and creatinine blood tests"
    ],
    "tests": [
      "Estimated Glomerular Filtration Rate (eGFR) blood test",
      "Urine Albumin-to-Creatinine Ratio (uACR)",
      "Renal ultrasound imaging",
      "Kidney tissue biopsy if indicated"
    ]
  }
];

const HERO_SLIDES = {
  "en": [
    {
      "tag": "Practical, Evidence-Based Guidance",
      "title": "Health information library",
      "description": "A resource center with details on various diseases to support your long-term health.\nLearn more from our information guides below."
    },
    {
      "tag": "AI-Powered Clinical Insights",
      "title": "Proactive health monitoring",
      "description": "Empowering you with early detection signs, preventative protocols, and expert-vetted knowledge bases."
    },
    {
      "tag": "Cardiovascular & Metabolic Care",
      "title": "Know your biomarkers & risks",
      "description": "Access curated diagnostic pathways and connect with specialized medical screening guidance instantly."
    }
  ],
  "te": [
    {
      "tag": "ఆచరణాత్మక, ఆధారాల ఆధారిత మార్గదర్శకం",
      "title": "ఆరోగ్య సమాచార గ్రంథాలయం",
      "description": "మీ దీర్ఘకాల ఆరోగ్యానికి తోడ్పడే వివిధ వ్యాధుల వివరాలతో కూడిన వనరుల కేంద్రం.\nకింది సమాచార గైడ్‌లలో మరింత తెలుసుకోండి."
    },
    {
      "tag": "AI ఆధారిత క్లినికల్ అంతర్దృష్టులు",
      "title": "ముందస్తు ఆరోగ్య పర్యవేక్షణ",
      "description": "తొలి గుర్తింపు సంకేతాలు, నివారణ పద్ధతులు మరియు విశ్వసనీయ జ్ఞాన వనరులతో మిమ్మల్ని శక్తివంతం చేస్తుంది."
    },
    {
      "tag": "హృదయ & జీవక్రియ సంరక్షణ",
      "title": "మీ బయోమార్కర్లు & ప్రమాదాలను తెలుసుకోండి",
      "description": "ఎంపిక చేసిన నిర్ధారణ మార్గాలను చూడండి మరియు ప్రత్యేక స్క్రీనింగ్ మార్గదర్శకాన్ని వెంటనే పొందండి."
    }
  ],
  "hi": [
    {
      "tag": "व्यावहारिक, साक्ष्य-आधारित मार्गदर्शन",
      "title": "स्वास्थ्य जानकारी पुस्तकालय",
      "description": "आपके दीर्घकालिक स्वास्थ्य में मदद करने वाली विभिन्न बीमारियों की जानकारी का संसाधन केंद्र।\nनीचे दिए गए जानकारी गाइड से और जानें।"
    },
    {
      "tag": "AI-संचालित क्लिनिकल अंतर्दृष्टि",
      "title": "सक्रिय स्वास्थ्य निगरानी",
      "description": "शुरुआती पहचान के संकेत, रोकथाम के तरीके और भरोसेमंद ज्ञान-आधार के साथ आपको सशक्त बनाना।"
    },
    {
      "tag": "हृदय और चयापचय देखभाल",
      "title": "अपने बायोमार्कर और जोखिम जानें",
      "description": "चुने हुए जांच मार्गों तक पहुंचें और विशेष स्क्रीनिंग मार्गदर्शन तुरंत पाएं।"
    }
  ]
};

/* Guide text in the chosen language (English when a translation is missing). */
function getGuide(item, lang) {
  return (LIBRARY_I18N[lang] && LIBRARY_I18N[lang][item.id]) || item;
}

/* ---- Demo assistant ----
   Keyword-based canned replies (no AI model behind it yet), in English, Telugu and
   Hindi. Rules are checked in order and the first match wins; the reply language
   follows the app language, and keywords work in any of the three languages. */
const REPLIES = {
  en: {
    greeting: 'Hello! I am your MediQAI assistant specializing in {topic}. How can I assist you with symptoms, prevention strategies, or recommended tests today?',
    thanks: "You're very welcome! If you have any further questions regarding {topic} or preventative wellness, please don't hesitate to ask. Stay proactive about your health!",
    symptoms: 'When evaluating symptoms related to {topic}, it is crucial to observe frequency, duration, and severity. Common warning signs often include persistent physical changes or discomfort. If these symptoms persist or worsen, you should schedule an appointment with a qualified healthcare provider for a thorough physical evaluation.',
    treat: 'Management and treatment protocols for {topic} typically integrate evidence-based lifestyle modifications—such as structured nutrition, regular physical activity, and stress management—alongside personalized pharmacological or specialist-guided interventions tailored to your unique clinical biomarker profile.',
    tests: 'Diagnostic testing for {topic} is designed to assess foundational biomarkers and detect early-stage indicators. Standard clinical evaluations often include targeted blood panels, imaging studies, or functional screenings recommended by established medical guidelines.',
    prevent: 'Preventative care for {topic} focuses on mitigating modifiable risk factors: maintaining a nutrient-rich diet, engaging in consistent aerobic exercise, eliminating tobacco use, and adhering strictly to routine wellness screenings.',
    fallback: 'That is a thoughtful inquiry regarding "{q}". While I can provide educational insights for {topic}, every individual\'s physiological profile is unique. For precise diagnosis and personalized medical care, I strongly recommend consulting directly with a specialized healthcare professional.',
  },
  te: {
    greeting: 'నమస్కారం! నేను {topic} గురించి ప్రత్యేక పరిజ్ఞానం ఉన్న మీ MediQAI సహాయకుడిని. లక్షణాలు, నివారణ పద్ధతులు లేదా సిఫార్సు చేసిన పరీక్షల గురించి నేను ఈ రోజు ఎలా సహాయపడగలను?',
    thanks: 'ధన్యవాదాలు! {topic} లేదా నివారణ ఆరోగ్య సంరక్షణ గురించి ఇంకా ఏవైనా ప్రశ్నలు ఉంటే, నిస్సంకోచంగా అడగండి. మీ ఆరోగ్యం పట్ల ముందు జాగ్రత్తగా ఉండండి!',
    symptoms: '{topic} విషయంలో లక్షణాలను అంచనా వేసేటప్పుడు అవి ఎంత తరచుగా, ఎంతకాలం, ఎంత తీవ్రంగా ఉన్నాయో గమనించడం ముఖ్యం. సాధారణ హెచ్చరిక సంకేతాల్లో తరచుగా శరీరంలో తగ్గని మార్పులు లేదా అసౌకర్యం ఉంటాయి. ఈ లక్షణాలు కొనసాగినా లేదా ఎక్కువైనా, సమగ్ర శారీరక పరీక్ష కోసం అర్హత కలిగిన వైద్యుడిని కలవండి.',
    treat: '{topic} చికిత్స, నిర్వహణ విధానాలు సాధారణంగా ఆధారాల ఆధారిత జీవనశైలి మార్పులను — క్రమబద్ధమైన ఆహారం, క్రమం తప్పని శారీరక శ్రమ, ఒత్తిడి నియంత్రణ వంటివి — మీ వ్యక్తిగత ఆరోగ్య సూచికలకు తగిన మందులు లేదా నిపుణుల నేతృత్వంలోని చికిత్సలతో కలుపుతాయి.',
    tests: '{topic} కోసం చేసే పరీక్షలు ప్రాథమిక ఆరోగ్య సూచికలను అంచనా వేయడానికి, తొలి దశ సంకేతాలను గుర్తించడానికి రూపొందించబడ్డాయి. ప్రామాణిక వైద్య మార్గదర్శకాలు సూచించే లక్ష్యిత రక్త పరీక్షలు, ఇమేజింగ్ అధ్యయనాలు లేదా పనితీరు పరీక్షలు సాధారణంగా వీటిలో ఉంటాయి.',
    prevent: '{topic} నివారణ సంరక్షణ మార్చుకోగల ప్రమాద కారకాలను తగ్గించడంపై దృష్టి పెడుతుంది: పోషకాలు ఎక్కువగా ఉన్న ఆహారం, క్రమం తప్పని ఏరోబిక్ వ్యాయామం, పొగాకు పూర్తిగా మానేయడం, మరియు క్రమమైన ఆరోగ్య పరీక్షలను తప్పక పాటించడం.',
    fallback: '“{q}” గురించి మీరు అడిగింది ఆలోచనాత్మకమైన ప్రశ్న. {topic} గురించి నేను విద్యా సంబంధమైన సమాచారం ఇవ్వగలను, కానీ ప్రతి వ్యక్తి శరీర తత్వం భిన్నంగా ఉంటుంది. కచ్చితమైన నిర్ధారణ, వ్యక్తిగత వైద్య సంరక్షణ కోసం ప్రత్యేక వైద్య నిపుణుడిని నేరుగా సంప్రదించమని గట్టిగా సూచిస్తున్నాను.',
  },
  hi: {
    greeting: 'नमस्ते! मैं {topic} पर विशेष जानकारी देने वाला आपका MediQAI सहायक हूँ। आज मैं लक्षणों, रोकथाम की रणनीतियों या अनुशंसित जांचों के बारे में आपकी कैसे मदद कर सकता हूँ?',
    thanks: 'आपका स्वागत है! {topic} या निवारक स्वास्थ्य देखभाल के बारे में कोई और सवाल हो तो बेझिझक पूछें। अपनी सेहत को लेकर सजग रहें!',
    symptoms: '{topic} से जुड़े लक्षणों का आकलन करते समय यह देखना ज़रूरी है कि वे कितनी बार, कितने समय से और कितनी तीव्रता से हो रहे हैं। आम चेतावनी संकेतों में अक्सर शरीर में बने रहने वाले बदलाव या बेचैनी शामिल होती है। यदि ये लक्षण बने रहें या बढ़ें, तो संपूर्ण शारीरिक जांच के लिए किसी योग्य चिकित्सक से मिलें।',
    treat: '{topic} के प्रबंधन और उपचार में आम तौर पर साक्ष्य-आधारित जीवनशैली बदलाव — जैसे संतुलित पोषण, नियमित शारीरिक गतिविधि और तनाव प्रबंधन — के साथ आपके स्वास्थ्य संकेतकों के अनुरूप दवाएं या विशेषज्ञ-निर्देशित उपचार शामिल होते हैं।',
    tests: '{topic} के लिए जांचें बुनियादी स्वास्थ्य संकेतकों का आकलन करने और शुरुआती अवस्था के संकेतों को पकड़ने के लिए बनी हैं। स्थापित चिकित्सा दिशानिर्देशों द्वारा सुझाई गई लक्षित रक्त जांचें, इमेजिंग अध्ययन या कार्यक्षमता जांचें इनमें आम तौर पर शामिल होती हैं।',
    prevent: '{topic} की रोकथाम में उन जोखिम कारकों को घटाने पर ध्यान दिया जाता है जिन्हें बदला जा सकता है: पोषक तत्वों से भरपूर आहार, नियमित एरोबिक व्यायाम, तंबाकू का पूरी तरह त्याग और नियमित स्वास्थ्य जांचों का सख़्ती से पालन।',
    fallback: '“{q}” के बारे में आपका सवाल विचारणीय है। मैं {topic} पर शैक्षिक जानकारी दे सकता हूँ, लेकिन हर व्यक्ति की शारीरिक संरचना अलग होती है। सटीक निदान और व्यक्तिगत चिकित्सा देखभाल के लिए मैं किसी विशेषज्ञ स्वास्थ्य पेशेवर से सीधे सलाह लेने की पुरज़ोर सलाह देता हूँ।',
  },
};

const GREETINGS = [
  'hi', 'hello', 'hey', 'greetings', 'good morning', 'good evening', 'sup', 'hiya', 'namaste',
  'నమస్కారం', 'నమస్తే', 'హలో', 'హాయ్',
  'नमस्ते', 'नमस्कार', 'हैलो', 'हाय',
];
const isGreeting = (q) => GREETINGS.some((g) => q === g || q.startsWith(g + ' '));

const RULES = [
  { reply: 'thanks', words: ['thanks', 'thank you', 'thx', 'appreciate', 'great', 'awesome', 'ధన్యవాద', 'థ్యాంక్స్', 'धन्यवाद', 'शुक्रिया', 'थैंक'] },
  { reply: 'symptoms', words: ['symptom', 'sign', 'feel', 'pain', 'hurt', 'discomfort', 'లక్షణ', 'సంకేత', 'నొప్పి', 'लक्षण', 'संकेत', 'दर्द'] },
  { reply: 'treat', words: ['treat', 'cure', 'medicine', 'medication', 'drug', 'therapy', 'చికిత్స', 'మందు', 'ఔషధ', 'इलाज', 'उपचार', 'दवा', 'दवाई'] },
  { reply: 'tests', words: ['test', 'screen', 'check', 'diagnos', 'blood', 'scan', 'పరీక్ష', 'స్కాన్', 'जांच', 'परीक्षण', 'स्कैन'] },
  { reply: 'prevent', words: ['prevent', 'risk', 'avoid', 'stop', 'cause', 'నివార', 'ప్రమాద', 'కారణ', 'रोक', 'बचाव', 'जोखिम', 'कारण'] },
];

function askAssistant(question, topic, lang = 'en') {
  const q = question.toLowerCase().trim().replace(/[!?.,।]+$/, '');
  const text = REPLIES[lang] || REPLIES.en;
  const fill = (template) => template.split('{topic}').join(topic).split('{q}').join(question);
  if (isGreeting(q)) return fill(text.greeting);
  const rule = RULES.find((r) => r.words.some((w) => q.includes(w)));
  return fill(text[rule ? rule.reply : 'fallback']);
}

export { LIBRARY, HERO_SLIDES, getGuide, askAssistant };
