import React, { useRef } from 'react';
import {
  IconActivity, IconArrowR, IconBrain, IconChat, IconDroplet, IconEye, IconForm,
  IconHeart, IconHistory, IconLungs, IconShield, IconSparkles
} from '../components/icons.jsx';
import { MotionGate, Reveal, useHeroParallax, usePointerParallax, useScrollProgress } from '../components/motion.jsx';
import { DISEASES } from '../data/diseases.js';
import '../landing.css';

/* Landing page (signed-out home).
   All wording comes from the existing translation keys, unchanged. Only the layout,
   styling and motion live here. */

/* Four condition icons that orbit the pulse in the hero. */
const ORBIT = [
  { Icon: IconHeart, angle: 315, color: '#E8734A' },
  { Icon: IconBrain, angle: 45, color: '#3D6FB4' },
  { Icon: IconLungs, angle: 135, color: '#C98A2C' },
  { Icon: IconDroplet, angle: 225, color: '#0E7C86' },
];

function PulseArt() {
  return (
    <div className="lp-art" aria-hidden="true">
      <div className="lp-art-inner">
        <span className="lp-ring lp-ring-outer" />
        <span className="lp-ring lp-ring-inner" />
        <span className="lp-ripple" />
        <span className="lp-ripple lp-ripple-late" />
        <div className="lp-disc">
          <div className="lp-ecg">
            <svg viewBox="0 0 300 120">
              <path className="lp-ecg-ghost" d="M0 62h84l16-42 26 88 20-66 14 20h140" />
              <path className="lp-ecg-line" d="M0 62h84l16-42 26 88 20-66 14 20h140" />
              <circle className="lp-ecg-dot" cx="0" cy="0" r="6" />
            </svg>
          </div>
        </div>
        <div className="lp-orbit">
          {ORBIT.map(({ Icon, angle, color }) => (
            <div key={angle} className="lp-slot" style={{ '--a': `${angle}deg` }}>
              <span className="lp-tile" style={{ '--c': color }}><Icon size={26} /></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHead({ title, sub, id, Tag = 'h2' }) {
  return (
    <Reveal className="lp-head" id={id}>
      <span className="lp-bar" />
      <Tag>{title}</Tag>
      <p>{sub}</p>
    </Reveal>
  );
}

/* Three steps joined by a line that fills as the section scrolls into view. */
function Steps({ steps }) {
  const ref = useRef(null);
  const progress = useScrollProgress(ref, { start: 0.85, span: 0.6 });
  const last = steps.length - 1;
  return (
    <div className="lp-steps" ref={ref}>
      {steps.map((step, i) => {
        const fill = Math.max(0, Math.min(1, progress * last - i));
        const lit = i === 0 ? progress > 0.02 : progress * last >= i - 0.02;
        return (
          <Reveal key={step.number} variant="rise" delay={i * 130} className="rv-fill">
            <article className={'lp-step' + (lit ? ' lit' : '')}>
              <span className="lp-step-num">{step.number}</span>
              {i < last && <span className="lp-step-line"><i style={{ '--fill': fill }} /></span>}
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

function LandingPage({ t, lang, onGetStarted, onGoInfo, onSelectDisease, ready = true }) {
  const heroRef = useRef(null);
  useHeroParallax(heroRef);
  usePointerParallax(heroRef);

  const why = [
    { Icon: IconEye, number: '01', title: t('why1t'), desc: t('why1d') },
    { Icon: IconActivity, number: '02', title: t('why2t'), desc: t('why2d') },
    { Icon: IconShield, number: '03', title: t('why3t'), desc: t('why3d') },
  ];
  const steps = [
    { number: '01', title: t('how1t'), desc: t('how1d') },
    { number: '02', title: t('how2t'), desc: t('how2d') },
    { number: '03', title: t('how3t'), desc: t('how3d') },
  ];
  const features = [
    { Icon: IconForm, number: '01', title: t('feature1t'), desc: t('feature1d') },
    { Icon: IconChat, number: '02', title: t('feature2t'), desc: t('feature2d') },
    { Icon: IconSparkles, number: '03', title: t('feature3t'), desc: t('feature3d') },
    { Icon: IconHistory, number: '04', title: t('feature4t'), desc: t('feature4d') },
  ];

  return (
    <MotionGate paused={!ready}>
      <div className="lp">
        {/* ---------- HERO ---------- */}
        <div className="lp-hero-wrap">
          <section className={'lp-hero' + (ready ? ' lp-go' : '')} ref={heroRef}>
            <span className="lp-blob lp-blob-a" />
            <span className="lp-blob lp-blob-b" />
            <div className="lp-hero-inner">
              <div className="lp-hero-text">
                <h1 className="lp-in" style={{ '--i': 0 }}>{t('heroTitle')}</h1>
                <p className="lp-in" style={{ '--i': 1 }}>{t('heroSub')}</p>
                <div className="lp-hero-actions lp-in" style={{ '--i': 2 }}>
                  <button className="pillbtn accent lp-btn-main" onClick={onGetStarted}>
                    {t('getStarted')} <IconArrowR size={17} />
                  </button>
                  <button className="lp-btn-ghost" onClick={onGoInfo}>{t('seeHow')}</button>
                </div>
              </div>
              <div className="lp-hero-art lp-in-art">
                <PulseArt />
              </div>
            </div>
          </section>
        </div>

        {/* ---------- WHY ---------- */}
        <section className="lp-section">
          <SectionHead title={t('whyTitle')} sub={t('whySub')} />
          <div className="lp-grid lp-grid-3">
            {why.map((item, i) => (
              <Reveal key={item.number} variant="rise" delay={i * 110} className="rv-fill">
                <article className="lp-card">
                  <span className="lp-card-num">{item.number}</span>
                  <span className="lp-icon"><item.Icon size={26} /></span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- HOW IT WORKS ---------- */}
        <section className="lp-section lp-band">
          <SectionHead title={t('howTitle')} sub={t('howSub')} />
          <Steps steps={steps} />
        </section>

        {/* ---------- FEATURES ---------- */}
        <section className="lp-section">
          <SectionHead title={t('featuresTitle')} sub={t('featuresSub')} />
          <div className="lp-grid lp-grid-2">
            {features.map((item, i) => (
              <Reveal key={item.number} variant={i % 2 === 0 ? 'left' : 'right'} delay={(i % 2) * 90} className="rv-fill">
                <article className="lp-feature">
                  <span className="lp-icon"><item.Icon size={26} /></span>
                  <div>
                    <span className="lp-feature-num">{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- HEALTH TOPICS ---------- */}
        <section className="lp-section lp-band">
          <SectionHead id="mq-public-info" title={t('healthTopicsTitle')} sub={t('healthTopicsSub')} />
          <div className="lp-grid lp-grid-3 lp-topics">
            {DISEASES.map((d, i) => (
              <Reveal key={d.id} variant="rise" delay={(i % 3) * 100} className="rv-fill">
                <button className="lp-topic" style={{ '--dc': d.color }} onClick={() => onSelectDisease && onSelectDisease(d.id)}>
                  <span className="lp-topic-icon"><d.Icon size={28} /></span>
                  <h3>{d.name[lang]}</h3>
                  <p>{d.desc[lang]}</p>
                  <span className="lp-topic-more">{t('learnMore')} <IconArrowR size={15} /></span>
                </button>
              </Reveal>
            ))}
          </div>
          <Reveal className="lp-center">
            <button className="lp-btn-outline" onClick={onGoInfo}>{t('viewAllTopics')}</button>
          </Reveal>
        </section>

        {/* ---------- FINAL CTA ---------- */}
        <section className="lp-section lp-section-last">
          <Reveal variant="zoom">
            <div className="lp-cta">
              <span className="lp-blob lp-blob-c" />
              <h2>{t('ctaTitle')}</h2>
              <p>{t('ctaSub')}</p>
              <span className="lp-cta-pulse">
                <button className="pillbtn accent lp-btn-main" onClick={onGetStarted}>{t('getStarted')}</button>
              </span>
            </div>
          </Reveal>
        </section>
      </div>
    </MotionGate>
  );
}

export default LandingPage;
