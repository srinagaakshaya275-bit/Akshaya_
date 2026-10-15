import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

/** Buttery inertial scrolling + anchor links routed through Lenis. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.style.scrollBehavior = 'auto';
    const lenis = new Lenis({ duration: 1.25, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.4 });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute('href')!;
      e.preventDefault();
      lenis.scrollTo(hash === '#' ? 0 : hash, { offset: -100 });
    };
    document.addEventListener('click', onClick);
    return () => { cancelAnimationFrame(id); document.removeEventListener('click', onClick); lenis.destroy(); };
  }, []);
  return null;
}

const words = ['Hello', 'Namaste', 'Hola', 'Bonjour', 'Vanakkam', 'Akshaya ✳'];

/** Opening page: greeting cycle + counter, then curtain lift. */
export function IntroScreen() {
  const [i, setI] = useState(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');
  useEffect(() => {
    if (sessionStorage.getItem('intro-seen')) { setPhase('done'); return; }
    document.body.style.overflow = 'hidden';
    const w = setInterval(() => setI(v => Math.min(v + 1, words.length - 1)), 330);
    const c = setInterval(() => setCount(v => Math.min(v + 3, 100)), 60);
    const end = setTimeout(() => { setPhase('out'); document.body.style.overflow = ''; sessionStorage.setItem('intro-seen', '1'); }, 2300);
    const gone = setTimeout(() => setPhase('done'), 3300);
    return () => { clearInterval(w); clearInterval(c); clearTimeout(end); clearTimeout(gone); document.body.style.overflow = ''; };
  }, []);
  if (phase === 'done') return null;
  return <div className={`intro ${phase === 'out' ? 'intro-out' : ''}`} role="presentation">
    <div className="intro-word" key={i}><span className="status-dot" /> {words[i]}</div>
    <div className="intro-meta"><span>Marketing · Culture · Search</span><span className="intro-count">{String(count).padStart(3, '0')}</span></div>
    <div className="intro-bar" style={{ transform: `scaleX(${count / 100})` }} />
    <button className="intro-skip" onClick={() => setPhase('out')}>Skip intro →</button>
  </div>;
}

/** Soft trailing cursor that grows over interactive elements (pointer devices only). */
export function CursorBlob() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, id = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const hot = (e.target as HTMLElement).closest('a,button,.skill-chip,.cert-chip');
      ref.current?.classList.toggle('is-hot', !!hot);
    };
    const loop = () => { cx += (x - cx) * 0.16; cy += (y - cy) * 0.16; if (ref.current) ref.current.style.transform = `translate(${cx}px, ${cy}px)`; id = requestAnimationFrame(loop); };
    window.addEventListener('pointermove', move); id = requestAnimationFrame(loop);
    ref.current?.classList.add('is-on');
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(id); };
  }, []);
  return <div ref={ref} className="cursor-blob" aria-hidden="true" />;
}

const roles = ['brand moments', 'AI answers', 'social chatter', 'search results', 'stories'];
/** Rotating word for the hero subtitle. */
export function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % roles.length), 2200); return () => clearInterval(t); }, []);
  return <span className="rotating-word" key={i}>{roles[i]}</span>;
}

/** Interactive "vibe check" — pick a goal, get the matching playbook. */
const vibes = [
  { q: 'People don’t find us', a: 'AEO + SEO sprint: audit how AI engines describe the brand, fix the sources they trust, track sentiment weekly. Did it once — neutral to positive in 30 days.' },
  { q: 'Nobody talks about us', a: 'Social storytelling + creators + UGC loops. Content with a point of view, community replies within the hour. Delivered a 65% lift before.' },
  { q: 'Our reputation is shaky', a: 'ORM playbook: listen across platforms, respond with empathy, escalate fast, publish proof. Calm brand, credible story.' },
  { q: 'We have a podcast nobody hears', a: 'Clip-first distribution, guest co-promotion and platform-native hooks. Ran it end-to-end for 4 clients.' },
];
export function VibeCheck() {
  const [i, setI] = useState(0);
  return <section className="section site-width" id="vibe" aria-label="Marketing vibe check">
    <div className="section-head reveal"><div><div className="eyebrow">✳ INTERACTIVE / VIBE CHECK</div><h2>What’s your brand<br/>struggling with?</h2></div><p className="section-intro">Tap a problem. Get the playbook I’d run.<br/>No deck required.</p></div>
    <div className="vibe-grid">
      <div className="vibe-options">{vibes.map((v, k) => <button key={v.q} className={`vibe-option ${k === i ? 'is-active' : ''}`} aria-pressed={k === i} onClick={() => setI(k)}><span>0{k + 1}</span>{v.q}</button>)}</div>
      <div className="vibe-answer" key={i}><div className="eyebrow">THE PLAYBOOK</div><p>{vibes[i]?.a}</p></div>
    </div>
  </section>;
}
