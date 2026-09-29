/* Healthy-living habits.
   Titles and categories are English / Telugu / Hindi; the description and the detail
   sections are English here, with Telugu and Hindi versions in healthyHabits.i18n.js
   (picked with getHabit(habit, lang)). */

import { HABITS_I18N } from './healthyHabits.i18n.js';

const HABITS = [
  {
    "id": "sleep",
    "tone": "#4F46E5",
    "title": {
      "en": "Prioritize Quality Sleep",
      "te": "నాణ్యమైన నిద్రకు ప్రాధాన్యం ఇవ్వండి",
      "hi": "अच्छी नींद को प्राथमिकता दें"
    },
    "category": {
      "en": "Rest & Recovery",
      "te": "విశ్రాంతి & కోలుకోవడం",
      "hi": "आराम और रिकवरी"
    },
    "shortDesc": "Aim for 7–9 hours of restful, undisturbed sleep each night to repair your mind and body.",
    "benefits": [
      "Restores neural pathways and enhances cognitive clarity",
      "Regulates appetite hormones (ghrelin and leptin)",
      "Strengthens immune system response to pathogens"
    ],
    "insideBody": "During deep sleep, your brain’s glymphatic system flushes out cellular waste products. Tissues repair, muscle growth occurs, and cortisol levels drop, allowing your cardiovascular system to rest and reset.",
    "goodChanges": [
      "Sharper focus and better memory retention within days",
      "Consistent daily energy without mid-afternoon crashes",
      "Improved emotional resilience and stress tolerance"
    ],
    "problemsAvoided": [
      "Chronic cardiovascular strain and hypertension",
      "Insulin resistance and metabolic dysfunction",
      "Weakened immunity and frequent minor illness"
    ],
    "easyStep": "Set a strict bedtime alarm 30 minutes before sleep and keep your phone in another room tonight."
  },
  {
    "id": "move",
    "tone": "#059669",
    "title": {
      "en": "Move Your Body Daily",
      "te": "ప్రతిరోజూ శరీరాన్ని కదిలించండి",
      "hi": "रोज़ शरीर को सक्रिय रखें"
    },
    "category": {
      "en": "Physical Activity",
      "te": "శారీరక కార్యకలాపం",
      "hi": "शारीरिक गतिविधि"
    },
    "shortDesc": "Engage in 30 minutes of moderate activity like brisk walking, cycling, or swimming.",
    "benefits": [
      "Boosts cardiovascular stamina and lung endurance",
      "Strengthens bones, joints, and postural muscles",
      "Triggers endorphin release for instant mood elevation"
    ],
    "insideBody": "Movement increases blood flow, sending oxygen and vital nutrients to all organs. Muscles absorb glucose directly from the bloodstream, helping balance blood sugar levels without overworking the pancreas.",
    "goodChanges": [
      "Noticeably easier stair climbing and daily chores",
      "Less stiffness in back, knees, and hips",
      "Sustained daily stamina and elevated mood"
    ],
    "problemsAvoided": [
      "Premature joint stiffness and muscle wasting",
      "Poor blood circulation and varicose veins",
      "Elevated resting heart rate and arterial stiffness"
    ],
    "easyStep": "Take a brisk 15-minute walk outside right after your next meal today."
  },
  {
    "id": "nutrition",
    "tone": "#E11D48",
    "title": {
      "en": "Eat Fresh Whole Foods",
      "te": "తాజా సంపూర్ణ ఆహారం తినండి",
      "hi": "ताज़ा साबुत आहार खाएं"
    },
    "category": {
      "en": "Nutrition",
      "te": "పోషణ",
      "hi": "पोषण"
    },
    "shortDesc": "Fill half your plate with colorful vegetables and fresh fruits rich in vital antioxidants.",
    "benefits": [
      "Provides rich dietary fiber for optimal gut microbiome health",
      "Delivers essential vitamins and minerals directly to cells",
      "Maintains stable blood glucose and sustained vitality"
    ],
    "insideBody": "Dietary fiber nourishes beneficial gut bacteria, producing short-chain fatty acids that reduce systemic inflammation and protect the intestinal lining.",
    "goodChanges": [
      "Smoother digestion and reduced bloating",
      "Natural skin radiance and clearer complexion",
      "Fewer intense sugar cravings between meals"
    ],
    "problemsAvoided": [
      "Gastrointestinal tract inflammation and constipation",
      "Micronutrient deficiencies and chronic low fatigue",
      "Unhealthy cholesterol accumulation"
    ],
    "easyStep": "Add one colorful vegetable or leafy green to your lunch and dinner plates today."
  },
  {
    "id": "hydration",
    "tone": "#0284C7",
    "title": {
      "en": "Stay Hydrated Daily",
      "te": "రోజూ తగినంత నీరు తాగండి",
      "hi": "रोज़ पर्याप्त पानी पिएं"
    },
    "category": {
      "en": "Hydration",
      "te": "హైడ్రేషన్",
      "hi": "जलयोजन"
    },
    "shortDesc": "Drink around 8–10 glasses of water daily to support kidney function and energy levels.",
    "benefits": [
      "Lubricates joints and cushions vital organs",
      "Flushes metabolic waste efficiently via the kidneys",
      "Prevents dehydration-induced brain fog and fatigue"
    ],
    "insideBody": "Water maintains optimal blood plasma volume, allowing your heart to pump blood effortlessly and ensuring efficient thermal regulation through sweat production.",
    "goodChanges": [
      "Fewer tension headaches and clearer mental focus",
      "Better joint mobility and reduced physical sluggishness",
      "Healthy kidney filtration and optimal digestion"
    ],
    "problemsAvoided": [
      "Kidney stone formation and urinary tract issues",
      "Persistent muscle cramping and fatigue",
      "Dehydration-related blood pressure spikes"
    ],
    "easyStep": "Keep a full water bottle on your desk or workspace and take 3 sips every hour."
  },
  {
    "id": "checkup",
    "tone": "#2563EB",
    "title": {
      "en": "Schedule Annual Check-ups",
      "te": "ఏటా చెకప్‌లు చేయించుకోండి",
      "hi": "हर साल जांच करवाएं"
    },
    "category": {
      "en": "Preventive Care",
      "te": "నివారణ సంరక్షణ",
      "hi": "रोकथाम देखभाल"
    },
    "shortDesc": "Visit your primary care doctor once a year for routine preventative screenings and bloodwork.",
    "benefits": [
      "Catches silent health shifts before symptoms manifest",
      "Establishes a reliable baseline for vital health markers",
      "Provides personalized guidance based on family history"
    ],
    "insideBody": "Routine blood screens evaluate liver, kidney, blood sugar, and lipid levels, allowing early dietary or medical adjustments before tissue damage can occur.",
    "goodChanges": [
      "Peace of mind knowing your key health numbers",
      "Proactive control over long-term wellness path",
      "Stronger relationship with your health partner"
    ],
    "problemsAvoided": [
      "Undetected high blood pressure or silent diabetes",
      "Late-stage diagnosis of manageable conditions",
      "Unnecessary emergency medical interventions"
    ],
    "easyStep": "Open your calendar now and pick a target month to book your annual preventative visit."
  },
  {
    "id": "sugar-salt",
    "tone": "#D97706",
    "title": {
      "en": "Limit Sugar & Salt Intake",
      "te": "చక్కెర & ఉప్పును పరిమితం చేయండి",
      "hi": "चीनी और नमक सीमित करें"
    },
    "category": {
      "en": "Dietary Balance",
      "te": "ఆహార సమతుల్యత",
      "hi": "आहार संतुलन"
    },
    "shortDesc": "Choose natural seasonings and unrefined whole foods to protect heart and arterial health.",
    "benefits": [
      "Supports steady blood pressure and vascular health",
      "Prevents rapid blood glucose spikes and energy crashes",
      "Reduces unnecessary fluid retention and organ strain"
    ],
    "insideBody": "Reducing excess sodium lowers fluid pressure in blood vessels, relaxing the heart muscle. Cutting added sugars reduces liver fat accumulation and systemic inflammation.",
    "goodChanges": [
      "Reset taste buds to enjoy natural food flavors",
      "Steadier mood and daily energy levels",
      "Reduced facial puffiness and fluid weight"
    ],
    "problemsAvoided": [
      "Arterial stiffening and chronic hypertension",
      "Non-alcoholic fatty liver disease",
      "Dental decay and chronic systemic inflammation"
    ],
    "easyStep": "Swap sugary sodas or processed snacks today with sparkling water or fresh fruits."
  },
  {
    "id": "sitting",
    "tone": "#0D9488",
    "title": {
      "en": "Take Frequent Sitting Breaks",
      "te": "తరచుగా కూర్చోవడం నుండి విరామం తీసుకోండి",
      "hi": "बैठने के बीच बार-बार ब्रेक लें"
    },
    "category": {
      "en": "Ergonomics",
      "te": "ఎర్గోనామిక్స్",
      "hi": "एर्गोनॉमिक्स"
    },
    "shortDesc": "Stand up, stretch, or walk around for 2 minutes every hour during sedentary periods.",
    "benefits": [
      "Re-engages postural core muscles and spinal alignment",
      "Stimulates muscular enzymes that process fats and sugars",
      "Relieves optical strain and mental stiffness"
    ],
    "insideBody": "Standing up contracts major leg muscles, reactivating lipoprotein lipase enzyme activity which breaks down blood fats and clears glucose from circulation.",
    "goodChanges": [
      "Noticeably less neck, shoulder, and lower back tension",
      "Greater mental alertness during long work tasks",
      "Better lower body lymphatic drainage"
    ],
    "problemsAvoided": [
      "Deep vein thrombosis and poor circulation in legs",
      "Spinal disc compression and poor posture patterns",
      "Sluggish metabolic burn rate during sedentary hours"
    ],
    "easyStep": "Set a quiet hourly chime on your watch or computer to stand up and stretch for 60 seconds."
  },
  {
    "id": "mental-health",
    "tone": "#9333EA",
    "title": {
      "en": "Nurture Your Mental Health",
      "te": "మీ మానసిక ఆరోగ్యాన్ని కాపాడుకోండి",
      "hi": "अपने मानसिक स्वास्थ्य का ध्यान रखें"
    },
    "category": {
      "en": "Mindfulness",
      "te": "మైండ్‌ఫుల్‌నెస్",
      "hi": "माइंडफुलनेस"
    },
    "shortDesc": "Practice mindfulness, connect with loved ones, and give yourself space to unplug.",
    "benefits": [
      "Lowers chronic cortisol and adrenaline secretion",
      "Fosters emotional resilience and self-awareness",
      "Improves sleep quality and interpersonal relationships"
    ],
    "insideBody": "Deep relaxation triggers the parasympathetic nervous system (rest and digest), slowing heart rate, lowering blood pressure, and encouraging cellular repair.",
    "goodChanges": [
      "Calmer internal state when facing unexpected stressors",
      "Richer connection with friends and family members",
      "Enhanced capacity for creative thinking"
    ],
    "problemsAvoided": [
      "Chronic stress burnout and nervous exhaustion",
      "Stress-induced digestive distress and tension headaches",
      "Emotional isolation and mood instability"
    ],
    "easyStep": "Take 5 deep, slow belly breaths right now—inhaling for 4 seconds, holding for 4, and exhaling for 6."
  }
];

/* Habit text in the chosen language (English when a translation is missing). */
function getHabit(habit, lang) {
  return (HABITS_I18N[lang] && HABITS_I18N[lang][habit.id]) || habit;
}

export { HABITS, getHabit };
