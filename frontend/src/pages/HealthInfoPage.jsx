import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  IconActivity, IconAlertCircle, IconArrowR, IconCheckCircle, IconFile,
  IconSearch, IconSend, IconSparkles, IconX
} from '../components/icons.jsx';
import PageHero from '../components/pageHero.jsx';
import ModalShell from '../components/modalShell.jsx';
import { Reveal } from '../components/motion.jsx';
import { DISEASES } from '../data/diseases.js';
import { LIBRARY, HERO_SLIDES, getGuide, askAssistant } from '../data/healthLibrary.js';

/* Screen text (English / Telugu / Hindi). Guide content itself lives in data/healthLibrary.js. */
const COPY = {
  en: {
    search: 'Search a condition…', count: '{n} conditions', learn: 'Learn more',
    signs: 'signs', tests: 'tests', noResults: 'No condition matches “{q}”.', clear: 'Clear search',
    modalSub: 'Health overview and demo AI assistant', close: 'Close', slide: 'Slide',
    tabOverview: 'Overview', tabSymptoms: 'Signs & symptoms', tabPrevention: 'Prevention', tabTests: 'Diagnostic tests', tabAsk: 'Ask AI assistant',
    overviewTitle: 'Clinical overview', symptomsTitle: 'Key signs & symptoms', preventionTitle: 'Prevention & management', testsTitle: 'Recommended diagnostic tests',
    insightLabel: 'AI clinical insight:', insight: 'Early detection significantly improves long-term prognosis. Consult with specialized medical professionals for tailored treatment pathways.',
    assistant: 'MediQAI assistant', topic: 'Topic: {title}', placeholder: 'Ask a question about {title}…', send: 'Send', thinking: 'Analyzing…',
    greeting: 'Hello! I am your MediQAI assistant. How can I help you regarding {title}?',
    demoNote: 'Demo assistant: replies are general information, not medical advice.',
    qSymptoms: 'What are the symptoms?', qPrevent: 'How can I prevent it?', qTests: 'Which tests should I take?',
    disclaimer: 'Educational information only. It is not a diagnosis or medical advice.',
  },
  te: {
    search: 'పరిస్థితిని వెతకండి…', count: '{n} పరిస్థితులు', learn: 'మరింత తెలుసుకోండి',
    signs: 'సంకేతాలు', tests: 'పరీక్షలు', noResults: '“{q}” కు సరిపోయే పరిస్థితి లేదు.', clear: 'శోధనను క్లియర్ చేయండి',
    modalSub: 'ఆరోగ్య అవలోకనం & డెమో AI సహాయకుడు', close: 'మూసివేయండి', slide: 'స్లైడ్',
    tabOverview: 'అవలోకనం', tabSymptoms: 'సంకేతాలు & లక్షణాలు', tabPrevention: 'నివారణ', tabTests: 'నిర్ధారణ పరీక్షలు', tabAsk: 'AI సహాయకుడిని అడగండి',
    overviewTitle: 'క్లినికల్ అవలోకనం', symptomsTitle: 'ముఖ్య సంకేతాలు & లక్షణాలు', preventionTitle: 'నివారణ & నిర్వహణ', testsTitle: 'సిఫార్సు చేసిన నిర్ధారణ పరీక్షలు',
    insightLabel: 'AI క్లినికల్ అంతర్దృష్టి:', insight: 'ముందస్తు గుర్తింపు దీర్ఘకాల ఫలితాలను గణనీయంగా మెరుగుపరుస్తుంది. మీకు తగిన చికిత్స మార్గాల కోసం నిపుణులైన వైద్యులను సంప్రదించండి.',
    assistant: 'MediQAI సహాయకుడు', topic: 'అంశం: {title}', placeholder: '{title} గురించి ప్రశ్న అడగండి…', send: 'పంపండి', thinking: 'విశ్లేషిస్తోంది…',
    greeting: 'నమస్కారం! నేను మీ MediQAI సహాయకుడిని. {title} గురించి నేను ఎలా సహాయపడగలను?',
    demoNote: 'డెమో సహాయకుడు: ఇవి సాధారణ సమాచారం మాత్రమే, వైద్య సలహా కాదు.',
    qSymptoms: 'లక్షణాలు ఏమిటి?', qPrevent: 'దీన్ని ఎలా నివారించాలి?', qTests: 'ఏ పరీక్షలు చేయించుకోవాలి?',
    disclaimer: 'ఇది విద్యా సమాచారం మాత్రమే. రోగ నిర్ధారణ లేదా వైద్య సలహా కాదు.',
  },
  hi: {
    search: 'कोई स्थिति खोजें…', count: '{n} स्थितियां', learn: 'और जानें',
    signs: 'संकेत', tests: 'जांचें', noResults: '“{q}” से मेल खाती कोई स्थिति नहीं।', clear: 'खोज साफ़ करें',
    modalSub: 'स्वास्थ्य अवलोकन और डेमो AI सहायक', close: 'बंद करें', slide: 'स्लाइड',
    tabOverview: 'अवलोकन', tabSymptoms: 'संकेत और लक्षण', tabPrevention: 'रोकथाम', tabTests: 'जांच परीक्षण', tabAsk: 'AI सहायक से पूछें',
    overviewTitle: 'क्लिनिकल अवलोकन', symptomsTitle: 'मुख्य संकेत और लक्षण', preventionTitle: 'रोकथाम और प्रबंधन', testsTitle: 'अनुशंसित जांच परीक्षण',
    insightLabel: 'AI क्लिनिकल अंतर्दृष्टि:', insight: 'शुरुआती पहचान से लंबे समय के नतीजे काफ़ी बेहतर होते हैं। अपने लिए उचित उपचार मार्ग के लिए विशेषज्ञ डॉक्टरों से सलाह लें।',
    assistant: 'MediQAI सहायक', topic: 'विषय: {title}', placeholder: '{title} के बारे में सवाल पूछें…', send: 'भेजें', thinking: 'विश्लेषण हो रहा है…',
    greeting: 'नमस्ते! मैं आपका MediQAI सहायक हूँ। {title} के बारे में मैं आपकी कैसे मदद कर सकता हूँ?',
    demoNote: 'डेमो सहायक: ये सामान्य जानकारी हैं, चिकित्सा सलाह नहीं।',
    qSymptoms: 'लक्षण क्या हैं?', qPrevent: 'इसे कैसे रोकें?', qTests: 'कौन सी जांचें करवाएं?',
    disclaimer: 'यह केवल शैक्षिक जानकारी है। यह निदान या चिकित्सा सलाह नहीं है।',
  },
};
const copy = (lang, key, vars = {}) =>
  Object.entries(vars).reduce(
    (text, [name, value]) => text.replace(`{${name}}`, value),
    (COPY[lang] || COPY.en)[key] ?? COPY.en[key]
  );

const TABS = [
  { id: 'overview', labelKey: 'tabOverview', Icon: IconFile },
  { id: 'symptoms', labelKey: 'tabSymptoms', Icon: IconAlertCircle },
  { id: 'prevention', labelKey: 'tabPrevention', Icon: IconCheckCircle },
  { id: 'tests', labelKey: 'tabTests', Icon: IconActivity },
  { id: 'ask', labelKey: 'tabAsk', Icon: IconSparkles },
];

/* Merge a guide (in the chosen language) with the app's own condition data (icon, colour, names). */
function toCard(item, lang) {
  const disease = DISEASES.find((d) => d.id === item.diseaseId);
  const guide = getGuide(item, lang);
  return {
    id: item.id,
    disease,
    title: item.title,
    displayTitle: lang === 'en' ? item.title : disease.name[lang],
    displayTag: item.tag[lang] || item.tag.en,
    blurb: guide.description,
    overview: guide.overview,
    symptoms: guide.symptoms,
    prevention: guide.prevention,
    tests: guide.tests,
  };
}

const tint = (color, pct = 16) => `color-mix(in srgb, ${color} ${pct}%, var(--surface))`;
const ink = (color) => `color-mix(in srgb, ${color} 70%, var(--ink))`;

/* ---------- Demo assistant state ---------- */
function useAssistant(topic, greeting, lang) {
  const [messages, setMessages] = useState([{ role: 'assistant', text: greeting }]);
  const [generating, setGenerating] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  function send(text) {
    const clean = text.trim();
    if (!clean || generating) return;
    setMessages((m) => [...m, { role: 'user', text: clean }]);
    setGenerating(true);
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: askAssistant(clean, topic, lang) }]);
      setGenerating(false);
    }, 900);
  }
  return { messages, generating, send };
}

function AssistantPanel({ lang, title, assistant }) {
  const [draft, setDraft] = useState('');
  const scrollRef = useRef(null);
  const { messages, generating, send } = assistant;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, generating]);

  function submit(e) {
    e.preventDefault();
    send(draft);
    setDraft('');
  }
  const suggestions = [copy(lang, 'qSymptoms'), copy(lang, 'qPrevent'), copy(lang, 'qTests')];

  return (
    <div className="lm-chat">
      <div className="lm-chat-head">
        <span><i className="lm-live" />{copy(lang, 'assistant')}</span>
        <em>{copy(lang, 'topic', { title })}</em>
      </div>
      <div className="lm-chat-scroll" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={'lm-msg ' + m.role}>
            {m.role === 'assistant' && <b><IconSparkles size={12} /> {copy(lang, 'assistant')}</b>}
            <p>{m.text}</p>
          </div>
        ))}
        {generating && (
          <div className="lm-msg assistant">
            <span className="typing-dots"><span /><span /><span /></span>
            <small>{copy(lang, 'thinking')}</small>
          </div>
        )}
      </div>
      {messages.length === 1 && (
        <div className="lm-chips">
          {suggestions.map((label) => (
            <button key={label} onClick={() => send(label)}>{label}</button>
          ))}
        </div>
      )}
      <form className="lm-chat-form" onSubmit={submit}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={copy(lang, 'placeholder', { title })}
          aria-label={copy(lang, 'placeholder', { title })}
        />
        <button type="submit" disabled={generating || !draft.trim()}>
          <IconSend size={16} /><span>{copy(lang, 'send')}</span>
        </button>
      </form>
      <div className="lm-chat-note">{copy(lang, 'demoNote')}</div>
    </div>
  );
}

/* ---------- Detail dialog ---------- */
function ConditionModal({ card, lang, onClose }) {
  const [tab, setTab] = useState('overview');
  const { disease } = card;
  const assistant = useAssistant(card.displayTitle, copy(lang, 'greeting', { title: card.displayTitle }), lang);

  return (
    <ModalShell onClose={onClose} label={card.displayTitle}>
      <div className="lm-head">
        <div className="lm-head-main">
          <span className="lm-head-icon"><disease.Icon size={24} /></span>
          <div style={{ minWidth: 0 }}>
            <div className="lm-title-row">
              <h2 className="lm-title">{card.displayTitle}</h2>
              <span className="lm-tag">{card.displayTag}</span>
            </div>
            <p className="lm-sub">{copy(lang, 'modalSub')}</p>
          </div>
        </div>
        <button className="lm-close" onClick={onClose} aria-label={copy(lang, 'close')}><IconX size={18} /></button>
      </div>

      <div className="lm-tabs" role="tablist">
        {TABS.map(({ id, labelKey, Icon }) => (
          <button key={id} role="tab" aria-selected={tab === id}
            className={'lm-tab' + (tab === id ? ' active' : '')} onClick={() => setTab(id)}>
            <Icon size={15} /><span>{copy(lang, labelKey)}</span>
          </button>
        ))}
      </div>

      <div className="lm-body">
        {tab === 'overview' && (
          <>
            <div className="lm-panel">
              <h3><IconFile size={18} />{copy(lang, 'overviewTitle')}</h3>
              <p className="lm-text">{card.overview}</p>
            </div>
            <div className="lm-insight">
              <IconSparkles size={20} />
              <p><b>{copy(lang, 'insightLabel')}</b> {copy(lang, 'insight')}</p>
            </div>
          </>
        )}

        {tab === 'symptoms' && (
          <div className="lm-panel">
            <h3><IconAlertCircle size={18} />{copy(lang, 'symptomsTitle')}</h3>
            <ul className="lm-grid2">
              {card.symptoms.map((s) => <li key={s} className="lm-item"><i className="lm-dot" />{s}</li>)}
            </ul>
          </div>
        )}

        {tab === 'prevention' && (
          <div className="lm-panel">
            <h3><IconCheckCircle size={18} />{copy(lang, 'preventionTitle')}</h3>
            <div className="lm-stack">
              {card.prevention.map((p) => (
                <div key={p} className="lm-item lm-item-good"><IconCheckCircle size={18} />{p}</div>
              ))}
            </div>
          </div>
        )}

        {tab === 'tests' && (
          <div className="lm-panel">
            <h3><IconActivity size={18} />{copy(lang, 'testsTitle')}</h3>
            <div className="lm-grid2">
              {card.tests.map((test, i) => (
                <div key={test} className="lm-item lm-item-test"><span className="lm-num">{i + 1}</span>{test}</div>
              ))}
            </div>
          </div>
        )}

        {tab === 'ask' && <AssistantPanel lang={lang} title={card.displayTitle} assistant={assistant} />}
      </div>

      <div className="lm-foot">
        <span>{copy(lang, 'disclaimer')}</span>
        <button className="lm-btn" onClick={onClose}>{copy(lang, 'close')}</button>
      </div>
    </ModalShell>
  );
}

/* ---------- Page ---------- */
function HealthInfoPage({ lang }) {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);

  const cards = useMemo(() => LIBRARY.map((item) => toCard(item, lang)), [lang]);
  const needle = query.trim().toLowerCase();
  const visible = useMemo(
    () => cards.filter((c) =>
      !needle || [c.displayTitle, c.title, c.displayTag, c.blurb].some((text) => text.toLowerCase().includes(needle))),
    [cards, needle]
  );
  const openCard = cards.find((c) => c.id === openId);

  return (
    <div className="fade-in hl">
      <PageHero slides={HERO_SLIDES[lang] || HERO_SLIDES.en} dotLabel={copy(lang, 'slide')} />

      <Reveal className="hl-toolbar">
        <label className="hl-search">
          <IconSearch size={19} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy(lang, 'search')}
            aria-label={copy(lang, 'search')}
          />
          {query && (
            <button type="button" className="hl-clear" onClick={() => setQuery('')} aria-label={copy(lang, 'clear')}>
              <IconX size={15} />
            </button>
          )}
        </label>
        <span className="hl-count">{copy(lang, 'count', { n: visible.length })}</span>
      </Reveal>

      {visible.length === 0 ? (
        <div className="card pg-empty">
          <span className="pg-empty-icon"><IconSearch size={26} /></span>
          <p>{copy(lang, 'noResults', { q: query.trim() })}</p>
          <button className="hp-btn-soft" onClick={() => setQuery('')}>{copy(lang, 'clear')}</button>
        </div>
      ) : (
        <div className="dg-grid">
          {visible.map((c, i) => (
            <Reveal key={c.id} variant="rise" delay={(i % 3) * 90} className="rv-fill">
              <button className="dg-tile" style={{ '--dc': c.disease.color }} onClick={() => setOpenId(c.id)}>
                <span className="dg-tile-top">
                  <span className="dg-tile-icon" style={{ background: tint(c.disease.color), color: ink(c.disease.color) }}>
                    <c.disease.Icon size={28} />
                  </span>
                  <span className="dg-tile-tag" style={{ background: tint(c.disease.color, 14), color: ink(c.disease.color) }}>
                    {c.displayTag}
                  </span>
                </span>
                <span className="dg-tile-name">{c.displayTitle}</span>
                <span className="dg-tile-desc clamp">{c.blurb}</span>
                <span className="dg-tile-foot">
                  <em>{c.symptoms.length} {copy(lang, 'signs')} · {c.tests.length} {copy(lang, 'tests')}</em>
                  <b>{copy(lang, 'learn')} <IconArrowR size={15} /></b>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {openCard && <ConditionModal key={openCard.id} card={openCard} lang={lang} onClose={() => setOpenId(null)} />}
    </div>
  );
}

export default HealthInfoPage;
