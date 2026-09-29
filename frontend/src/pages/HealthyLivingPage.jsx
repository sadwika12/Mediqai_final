import React, { useState } from 'react';
import {
  IconActivity, IconApple, IconArrowR, IconCheckCircle, IconCookie, IconDroplet, IconHeart, IconInfo,
  IconMoon, IconShieldAlert, IconSparkles, IconStetho, IconUserCheck, IconX
} from '../components/icons.jsx';
import PageHero from '../components/pageHero.jsx';
import ModalShell from '../components/modalShell.jsx';
import { Reveal } from '../components/motion.jsx';
import { HABITS, getHabit } from '../data/healthyHabits.js';

const HABIT_ICONS = {
  sleep: IconMoon,
  move: IconActivity,
  nutrition: IconApple,
  hydration: IconDroplet,
  checkup: IconStetho,
  'sugar-salt': IconCookie,
  sitting: IconUserCheck,
  'mental-health': IconHeart,
};

/* Screen text (English / Telugu / Hindi). Habit content lives in data/healthyHabits.js. */
const COPY = {
  en: {
    tag: 'Practical, Evidence-Based Guidance', title: 'Healthy living tips',
    text: 'Small, consistent daily choices create lasting wellness. Explore these essential daily habits to protect your long-term health and feel your best every day.',
    learn: 'Learn benefits & tips', benefits: 'Key benefits', inside: 'What it does inside your body',
    changes: "Good changes you'll feel", avoided: 'Health problems avoided', step: 'Easy step to start today',
    gotIt: 'Got it, thanks!', close: 'Close',
  },
  te: {
    tag: 'ఆచరణాత్మక, ఆధారాల ఆధారిత మార్గదర్శకం', title: 'ఆరోగ్యకర జీవన చిట్కాలు',
    text: 'చిన్న, నిరంతర రోజువారీ ఎంపికలు దీర్ఘకాల ఆరోగ్యాన్ని ఇస్తాయి. మీ ఆరోగ్యాన్ని కాపాడుకోవడానికి ఈ ముఖ్యమైన రోజువారీ అలవాట్లను చూడండి.',
    learn: 'ప్రయోజనాలు & చిట్కాలు తెలుసుకోండి', benefits: 'ముఖ్య ప్రయోజనాలు', inside: 'ఇది మీ శరీరంలో ఏమి చేస్తుంది',
    changes: 'మీరు అనుభవించే మంచి మార్పులు', avoided: 'నివారించే ఆరోగ్య సమస్యలు', step: 'ఈ రోజే ప్రారంభించడానికి సులభమైన అడుగు',
    gotIt: 'సరే, ధన్యవాదాలు!', close: 'మూసివేయండి',
  },
  hi: {
    tag: 'व्यावहारिक, साक्ष्य-आधारित मार्गदर्शन', title: 'स्वस्थ जीवन के सुझाव',
    text: 'छोटे, नियमित रोज़मर्रा के फैसले लंबे समय तक सेहत बनाए रखते हैं। अपनी सेहत की रक्षा के लिए इन ज़रूरी दैनिक आदतों को जानें।',
    learn: 'लाभ और सुझाव जानें', benefits: 'मुख्य लाभ', inside: 'यह आपके शरीर में क्या करता है',
    changes: 'जो अच्छे बदलाव आप महसूस करेंगे', avoided: 'जिन स्वास्थ्य समस्याओं से बचाव होता है', step: 'आज शुरू करने का आसान कदम',
    gotIt: 'समझ गया, धन्यवाद!', close: 'बंद करें',
  },
};
const copy = (lang, key) => (COPY[lang] || COPY.en)[key] ?? COPY.en[key];

const tint = (color, pct = 16) => `color-mix(in srgb, ${color} ${pct}%, var(--surface))`;
const ink = (color) => `color-mix(in srgb, ${color} 70%, var(--ink))`;

/* Card text for the chosen language (titles/categories plus the translated detail text). */
function toCard(habit, lang) {
  const text = getHabit(habit, lang);
  return {
    id: habit.id,
    tone: habit.tone,
    Icon: HABIT_ICONS[habit.id],
    displayTitle: habit.title[lang] || habit.title.en,
    displayCategory: habit.category[lang] || habit.category.en,
    blurb: text.shortDesc,
    benefits: text.benefits,
    insideBody: text.insideBody,
    goodChanges: text.goodChanges,
    problemsAvoided: text.problemsAvoided,
    easyStep: text.easyStep,
  };
}

function HabitModal({ card, lang, onClose }) {
  return (
    <ModalShell onClose={onClose} label={card.displayTitle} width={720}>
      <div className="lm-habit-top" style={{ '--hc': card.tone }}>
        <span className="lm-habit-icon" style={{ background: tint(card.tone, 16), color: ink(card.tone) }}>
          <card.Icon size={32} />
        </span>
        <div>
          <span className="lm-habit-cat">{card.displayCategory}</span>
          <h2>{card.displayTitle}</h2>
        </div>
        <button className="lm-close lm-close-soft" onClick={onClose} aria-label={copy(lang, 'close')}><IconX size={18} /></button>
      </div>

      <div className="lm-body lm-habit">
        <p className="lm-lead">{card.blurb}</p>

        <section>
          <h4 className="lm-h4"><IconCheckCircle size={16} className="c-good" />{copy(lang, 'benefits')}</h4>
          <ul className="lm-list">
            {card.benefits.map((b) => <li key={b}><i className="lm-dot" />{b}</li>)}
          </ul>
        </section>

        <section className="lm-callout lm-callout-info">
          <h4 className="lm-h4"><IconInfo size={16} />{copy(lang, 'inside')}</h4>
          <p>{card.insideBody}</p>
        </section>

        <section>
          <h4 className="lm-h4"><IconSparkles size={16} className="c-warn" />{copy(lang, 'changes')}</h4>
          <div className="lm-stack">
            {card.goodChanges.map((c) => <div key={c} className="lm-item lm-item-warn"><i className="lm-dot lm-dot-warn" />{c}</div>)}
          </div>
        </section>

        <section>
          <h4 className="lm-h4"><IconShieldAlert size={16} className="c-bad" />{copy(lang, 'avoided')}</h4>
          <ul className="lm-list">
            {card.problemsAvoided.map((p) => <li key={p}><span className="lm-x">✕</span>{p}</li>)}
          </ul>
        </section>

        <section className="lm-callout lm-callout-step">
          <h4 className="lm-h4"><IconArrowR size={16} />{copy(lang, 'step')}</h4>
          <p><b>{card.easyStep}</b></p>
        </section>
      </div>

      <div className="lm-foot lm-foot-end">
        <button className="lm-btn lm-btn-primary" onClick={onClose}>{copy(lang, 'gotIt')}</button>
      </div>
    </ModalShell>
  );
}

function HealthyLivingPage({ lang }) {
  const [openId, setOpenId] = useState(null);
  const cards = HABITS.map((h) => toCard(h, lang));
  const openCard = cards.find((c) => c.id === openId);
  const slides = [{ tag: copy(lang, 'tag'), title: copy(lang, 'title'), description: copy(lang, 'text') }];

  return (
    <div className="fade-in hl">
      <PageHero slides={slides} />

      <div className="dg-grid dg-grid-4">
        {cards.map((c, i) => (
          <Reveal key={c.id} variant="rise" delay={(i % 4) * 90} className="rv-fill">
            <button className="dg-tile" style={{ '--dc': c.tone }} onClick={() => setOpenId(c.id)}>
              <span className="dg-tile-top">
                <span className="dg-tile-icon" style={{ background: tint(c.tone), color: ink(c.tone) }}><c.Icon size={28} /></span>
                <span className="dg-tile-tag" style={{ background: tint(c.tone, 14), color: ink(c.tone) }}>{c.displayCategory}</span>
              </span>
              <span className="dg-tile-name">{c.displayTitle}</span>
              <span className="dg-tile-desc clamp">{c.blurb}</span>
              <span className="dg-tile-foot"><b>{copy(lang, 'learn')} <IconArrowR size={15} /></b></span>
            </button>
          </Reveal>
        ))}
      </div>

      {openCard && <HabitModal key={openCard.id} card={openCard} lang={lang} onClose={() => setOpenId(null)} />}
    </div>
  );
}

export default HealthyLivingPage;
