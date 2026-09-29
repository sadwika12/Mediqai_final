import React, { useState } from 'react';
import { IconArrowR, IconCheck, IconInfo, IconMicroscope } from '../components/icons.jsx';
import PageHero from '../components/pageHero.jsx';
import { Reveal } from '../components/motion.jsx';
import { DISEASES } from '../data/diseases.js';

/* Screen text (English / Telugu / Hindi). Symptom names come from data/diseases.js. */
const COPY = {
  en: {
    tag: 'Know the signs', text: 'Choose a condition to see the warning signs to watch for, from the strongest to the most general.',
    key: 'Key warning signs', keyHint: 'Strongest link to this condition',
    common: 'Common signs', commonHint: 'Often seen',
    other: 'Other signs', otherHint: 'Can point to it alongside others',
    count: '{n} signs', check: 'Check {name}', guide: 'Read the full guide',
    note: 'This list is a guide, not a diagnosis. If symptoms are severe or come on suddenly, seek medical care right away.',
  },
  te: {
    tag: 'సంకేతాలను తెలుసుకోండి', text: 'ఒక పరిస్థితిని ఎంచుకుని, గమనించాల్సిన హెచ్చరిక సంకేతాలను — అత్యంత ముఖ్యమైన వాటి నుండి సాధారణ వాటి వరకు — చూడండి.',
    key: 'ముఖ్య హెచ్చరిక సంకేతాలు', keyHint: 'ఈ పరిస్థితితో బలమైన సంబంధం',
    common: 'సాధారణ సంకేతాలు', commonHint: 'తరచుగా కనిపిస్తాయి',
    other: 'ఇతర సంకేతాలు', otherHint: 'ఇతర వాటితో కలిసి సూచించవచ్చు',
    count: '{n} సంకేతాలు', check: '{name} తనిఖీ చేయండి', guide: 'పూర్తి గైడ్ చదవండి',
    note: 'ఈ జాబితా ఒక మార్గదర్శకం మాత్రమే, రోగ నిర్ధారణ కాదు. లక్షణాలు తీవ్రంగా ఉన్నా లేదా అకస్మాత్తుగా మొదలైనా వెంటనే వైద్య సహాయం తీసుకోండి.',
  },
  hi: {
    tag: 'संकेतों को जानें', text: 'किसी स्थिति को चुनें और देखें कि किन चेतावनी संकेतों पर ध्यान देना है, सबसे अहम से लेकर सामान्य तक।',
    key: 'मुख्य चेतावनी संकेत', keyHint: 'इस स्थिति से सबसे मज़बूत संबंध',
    common: 'आम संकेत', commonHint: 'अक्सर देखे जाते हैं',
    other: 'अन्य संकेत', otherHint: 'दूसरे संकेतों के साथ संकेत दे सकते हैं',
    count: '{n} संकेत', check: '{name} की जांच करें', guide: 'पूरी गाइड पढ़ें',
    note: 'यह सूची केवल मार्गदर्शन है, निदान नहीं। लक्षण गंभीर हों या अचानक शुरू हों तो तुरंत चिकित्सा सहायता लें।',
  },
};
const copy = (lang, key, vars = {}) =>
  Object.entries(vars).reduce(
    (text, [name, value]) => text.replace(`{${name}}`, value),
    (COPY[lang] || COPY.en)[key] ?? COPY.en[key]
  );

/* A symptom's weight (1-3) in the screening model decides which group it sits in. */
const GROUPS = [
  { weight: 3, key: 'key', hint: 'keyHint', level: 'strong' },
  { weight: 2, key: 'common', hint: 'commonHint', level: 'medium' },
  { weight: 1, key: 'other', hint: 'otherHint', level: 'light' },
];

const tint = (color, pct = 16) => `color-mix(in srgb, ${color} ${pct}%, var(--surface))`;
const ink = (color) => `color-mix(in srgb, ${color} 70%, var(--ink))`;

function SymptomsPage({ lang, t, onCheck, onGuide }) {
  const [activeId, setActiveId] = useState(DISEASES[0].id);
  const disease = DISEASES.find((d) => d.id === activeId);
  const groups = GROUPS
    .map((g) => ({ ...g, items: disease.symptoms.filter((s) => s.w === g.weight) }))
    .filter((g) => g.items.length > 0);
  const slides = [{ tag: copy(lang, 'tag'), title: t('sideSymptoms'), description: copy(lang, 'text') }];

  return (
    <div className="fade-in hl">
      <PageHero slides={slides} />

      <Reveal>
        <div className="sp-picker" role="tablist" aria-label={t('sideSymptoms')}>
          {DISEASES.map((d) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={d.id === activeId}
              className={'sp-pick' + (d.id === activeId ? ' active' : '')}
              style={{ '--dc': d.color }}
              onClick={() => setActiveId(d.id)}
            >
              <span className="sp-pick-icon" style={{ background: tint(d.color), color: ink(d.color) }}><d.Icon size={22} /></span>
              <span className="sp-pick-name">{d.name[lang]}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="sp-panel" key={disease.id} style={{ '--dc': disease.color }}>
        <aside className="sp-summary">
          <span className="sp-summary-icon" style={{ background: tint(disease.color, 20), color: ink(disease.color) }}>
            <disease.Icon size={34} />
          </span>
          <h2>{disease.name[lang]}</h2>
          <p>{disease.desc[lang]}</p>
          <span className="sp-count">{copy(lang, 'count', { n: disease.symptoms.length })}</span>
          <button className="sp-cta" onClick={() => onCheck(disease.id)}>
            {copy(lang, 'check', { name: disease.name[lang] })} <IconArrowR size={16} />
          </button>
          <button className="sp-link" onClick={onGuide}>
            <IconMicroscope size={15} /> {copy(lang, 'guide')}
          </button>
        </aside>

        <div className="sp-groups">
          {groups.map((g) => (
            <section key={g.key} className={'sp-group ' + g.level}>
              <header>
                <h3>{copy(lang, g.key)}</h3>
                <span>{copy(lang, g.hint)}</span>
              </header>
              <ul>
                {g.items.map((s) => (
                  <li key={s.id}><IconCheck size={14} />{s.label[lang]}</li>
                ))}
              </ul>
            </section>
          ))}
          <p className="sp-note"><IconInfo size={16} />{copy(lang, 'note')}</p>
        </div>
      </div>
    </div>
  );
}

export default SymptomsPage;
