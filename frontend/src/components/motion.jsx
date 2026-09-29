import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { IconArrowUp } from './icons.jsx';

/*
 * Scroll / motion helpers.
 *
 *  - useInView / Reveal   : an element "rises" (or zooms / slides) into place the
 *                           first time it scrolls into view.
 *  - MotionGate           : lets a parent hold every Reveal back (used so nothing
 *                           animates underneath the splash screen).
 *  - CountUp              : numbers that count up once they become visible.
 *  - useScrollProgress    : 0 → 1 value that follows a section through the viewport.
 *  - useHeroParallax      : writes a --hp-p CSS variable that the hero uses for parallax.
 *  - usePointerParallax   : writes --mx / --my (-1…1) following the mouse over an element.
 *  - ScrollTopButton      : floating "back to top" button that appears after scrolling.
 *
 * Everything respects `prefers-reduced-motion` — those users simply see the
 * final state straight away.
 */

const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const MotionCtx = createContext({ paused: false });
function MotionGate({ paused, children }) {
  return <MotionCtx.Provider value={{ paused: !!paused }}>{children}</MotionCtx.Provider>;
}

function useInView({ rootMargin = '0px 0px -10% 0px', threshold = 0 } = {}) {
  const { paused } = useContext(MotionCtx);
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen || paused) return;
    if (reducedMotion() || !('IntersectionObserver' in window)) { setSeen(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); }
    }, { rootMargin, threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [seen, paused, rootMargin, threshold]);
  return [ref, seen];
}

/* variant: 'rise' | 'zoom' | 'left' | 'right' | 'flip' */
function Reveal({ as: Tag = 'div', variant = 'rise', delay = 0, className = '', style, children, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <Tag
      ref={ref}
      className={`rv rv-${variant}${seen ? ' in' : ''}${className ? ' ' + className : ''}`}
      style={{ '--rv-d': delay + 'ms', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function CountUp({ to, start = true, duration = 1100, suffix = '' }) {
  const [val, setVal] = useState(reducedMotion() ? to : 0);
  useEffect(() => {
    if (!start) return;
    if (reducedMotion()) { setVal(to); return; }
    let raf = 0; let t0;
    const step = (t) => {
      if (t0 === undefined) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, start, duration]);
  return <>{val}{suffix}</>;
}

/* 0 when the section's top is still below the fold, 1 once it has moved well
   up the screen. Quantised so React only re-renders when it visibly changes. */
function useScrollProgress(ref, { start = 0.9, span = 0.7 } = {}) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) { setP(1); return; }
    let raf = 0;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const v = Math.min(1, Math.max(0, (vh * start - r.top) / (Math.max(r.height, 1) * span)));
      setP((prev) => (Math.abs(prev - v) >= 0.01 ? Math.round(v * 100) / 100 : prev));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, start, span]);
  return p;
}

/* Sets --hp-p (0 = hero fully in view, 1 = hero scrolled out) on the element.
   Written straight to the DOM so scrolling never triggers a React re-render. */
function useHeroParallax(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1.2, -r.top / Math.max(r.height, 1)));
      el.style.setProperty('--hp-p', p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

/* Sets --mx / --my (each -1…1, 0 at the centre) while the pointer moves over the
   element. Skipped on touch devices and for reduced-motion users. */
function usePointerParallax(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !window.matchMedia('(hover: hover)').matches) return undefined;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty('--mx', x.toFixed(3));
      el.style.setProperty('--my', y.toFixed(3));
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => { x = 0; y = 0; if (!raf) raf = requestAnimationFrame(apply); };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

function ScrollTopButton({ label }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow((window.scrollY || 0) > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={'to-top' + (show ? ' show' : '')}
      aria-label={label}
      title={label}
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' })}
    >
      <IconArrowUp size={20} />
    </button>
  );
}

export { MotionGate, useInView, Reveal, CountUp, useScrollProgress, useHeroParallax, usePointerParallax, ScrollTopButton };
