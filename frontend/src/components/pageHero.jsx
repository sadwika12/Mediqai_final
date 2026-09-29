import React, { useEffect, useRef, useState } from 'react';
import { IconSparkles } from './icons.jsx';
import { useHeroParallax } from './motion.jsx';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Green banner used at the top of the health-information pages.
   `slides` is a list of {tag, title, description}. With more than one slide the
   banner rotates every `interval` ms (paused while hovered, off for
   reduced-motion users) and shows clickable dots. */
function PageHero({ slides, interval = 5000, dotLabel = 'Slide' }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const heroRef = useRef(null);
  useHeroParallax(heroRef);

  const count = slides.length;
  useEffect(() => {
    if (count < 2 || paused || prefersReducedMotion()) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(timer);
  }, [count, paused, interval]);

  const slide = slides[index % count];
  return (
    <section
      className="ph-hero"
      ref={heroRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="ph-blob ph-blob-1" />
      <span className="ph-blob ph-blob-2" />
      <svg className="ph-art" viewBox="0 0 320 320" aria-hidden="true">
        <circle cx="160" cy="160" r="150" />
        <circle cx="160" cy="160" r="108" strokeDasharray="4 9" />
        <circle cx="160" cy="160" r="66" />
        <path d="M20 168h74l22-46 34 92 26-70 16 24h108" />
      </svg>
      <div className="ph-text">
        <div key={index} className="ph-slide">
          <span className="ph-pill"><IconSparkles size={15} />{slide.tag}</span>
          <h1 className="ph-title">{slide.title}</h1>
          <p className="ph-desc">{slide.description}</p>
        </div>
        {count > 1 && (
          <div className="ph-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={'ph-dot' + (i === index ? ' on' : '')}
                onClick={() => setIndex(i)}
                aria-label={`${dotLabel} ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PageHero;
