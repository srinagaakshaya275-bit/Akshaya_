import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, ArrowRight, Asterisk, Sparkles, MapPin, Download, Menu, X, Search, MessageCircle, Target, BadgeCheck, Mail, TrendingUp, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import heroImage from '@/assets/creative-sculpture.jpg';
import catGamerImage from '@/assets/gamer-cat.jpg';
import studentCatImage from '@/assets/student-cat.png';
import { projects, experience } from '@/lib/portfolio';
import { CursorBlob, RotatingWord, VibeCheck } from '@/components/Experience';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Akshaya Reddy — Marketing, culture & measurable impact' },
    { name: 'description', content: 'Meet Akshaya Reddy, Associate Marketing Manager at Masai. Explore her work in AEO, brand reputation, social strategy and content marketing.' },
    { property: 'og:title', content: 'Akshaya Reddy — Marketing with a little main-character energy' },
    { property: 'og:description', content: 'A portfolio of brand-building, answer-engine visibility, social storytelling and measurable marketing impact.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Portfolio,
});

const filters = ['All work', 'Search & AI', 'Social & Content'];
const specialties = [
  { icon: Search, name: 'Found in the right places.', description: 'AEO, SEO and SERP strategies that help brands show up in search — and in the answers people trust.' },
  { icon: MessageCircle, name: 'Part of the conversation.', description: 'Social storytelling, influencers, UGC and communities. Content with a point of view, not just a posting schedule.' },
  { icon: Target, name: 'Built on brand trust.', description: 'Online reputation, thoughtful responses and crisis management. Keeping the brand story consistent and credible.' },
];
const stack = [
  { title: 'Strategy & discovery', items: ['AEO', 'SEO', 'SERP visibility', 'ORM', 'Brand marketing', 'Marketing strategy'] },
  { title: 'Content & community', items: ['Social strategy', 'Content creation', 'Content writing', 'Influencer marketing', 'UGC', 'Community management'] },
  { title: 'Create & collaborate', items: ['Canva', 'InShot', 'VN', 'Notion', 'Office 365', 'AI tools'] },
  { title: 'Manage & measure', items: ['Sprout Social', 'Agorapulse', 'Hootsuite', 'Metabase'] },
];
const certifications = [
  'Fundamentals of Digital Marketing',
  'Search Engine Optimisation',
  'Google Analytics',
  'Google Ads',
  'CRM',
  'Omni-channel Marketing',
  'Generative AI',
  'Content Writing',
  'Fundamentals of Social Media Marketing',
  'Meta Social Media Marketing Specialization',
  'Social Media Monitoring',
  'Content Creation using Canva'
];
const humanSkills = ['Ownership', 'Team collaboration', 'Problem solving', 'Effective communication', 'Time management'];

function CookieIntro({ onEnter }: { onEnter: () => void }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [closing, setClosing] = useState(false);

  const dodgeButton = () => {
    const randomX = Math.floor(Math.random() * 160) - 80;
    const randomY = Math.floor(Math.random() * 80) - 40;
    setNoPos({ x: randomX, y: randomY });
  };

  const handleAccept = () => {
    setClosing(true);
    setTimeout(() => {
      onEnter();
    }, 320);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
        closing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-full max-w-md mx-4 p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/10 text-left shadow-2xl">
        <div className="text-3xl mb-3 select-none">🍪</div>

        <h3 className="text-xl font-bold text-white mb-2">
          Before we get ahead of ourselves...
        </h3>

        <p className="text-sm text-neutral-300 leading-relaxed mb-6">
          We use high-intent cookies, gut instinct, and questionable amounts of coffee 
          to convince you I’m worth hiring. By entering, you agree that marketing shouldn't be boring.
        </p>

        <div className="flex items-center gap-3 relative">
          <Button
            type="button"
            onClick={handleAccept}
            className="flex-1 py-2.5 px-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors shadow-sm"
          >
            Accept & Be Impressed
          </Button>

          <button
            type="button"
            onMouseEnter={dodgeButton}
            onClick={dodgeButton}
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            className="py-2 px-3 rounded-xl border border-white/15 text-neutral-300 font-medium text-xs whitespace-nowrap hover:border-white/30 select-none cursor-pointer"
          >
            No, I hate revenue
          </button>
        </div>
      </div>
    </div>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextState = !isDark;
    setIsDark(nextState);
    if (nextState) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-2 group-hover:translate-x-0 hidden sm:inline-block text-xs py-1.5 px-3 rounded-full bg-black/85 text-white dark:bg-white/90 dark:text-black shadow-lg backdrop-blur-sm whitespace-nowrap">
        {isDark ? "🧛 Batman mode on." : "☀️ Flashbang warning? Click to dim."}
      </span>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/90 dark:bg-[#1a1a1a]/90 border border-neutral-300 dark:border-white/10 shadow-xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        {isDark ? (
          <>
            <Moon size={16} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-neutral-200">Night shift</span>
          </>
        ) : (
          <>
            <Sun size={16} className="text-amber-500 fill-amber-500" />
            <span className="text-xs font-semibold text-neutral-700">Dim lights</span>
          </>
        )}
      </button>
    </div>
  );
}

function Portfolio() {
  const [hasEntered, setHasEntered] = useState(false);
  const [filter, setFilter] = useState('All work');
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = projects.filter(p => filter === 'All work' || p.category === filter);
  const nav = [['About', 'about'], ['Selected work', 'work'], ['Experience', 'experience'], ['The toolkit', 'toolkit']];

  return <>
    {!hasEntered && <CookieIntro onEnter={() => setHasEntered(true)} />}
    <CursorBlob /><div className="scroll-progress" />
    <ThemeToggle />
    <header className="site-header site-width">
      <a href="#" className="brand" aria-label="Akshaya Reddy home">ar<span className="brand-star">✳</span></a>
      <nav aria-label="Main navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        {nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <Button asChild className="pill-button"><a href="#connect" onClick={() => setMenuOpen(false)}>Let’s connect <ArrowUpRight /></a></Button>
      </nav>
      <Button variant="ghost" size="icon" className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X/> : <Menu/>}</Button>
    </header>
    <main>
      {/* HERO SECTION - Tight typography and sculpture anchored behind text */}
      <section className="hero site-width relative overflow-hidden flex flex-col justify-between" aria-label="Meet Akshaya">
        {/* Background Artwork */}
        <div className="absolute top-0 right-0 w-[105%] sm:w-[85%] md:w-[65%] h-[340px] sm:h-[440px] md:h-full pointer-events-none z-0 overflow-hidden">
          <img 
            className="hero-art w-full h-full object-contain md:object-cover object-[90%_20%] md:object-center opacity-75 dark:opacity-55 md:opacity-100" 
            src={heroImage} 
            width={1536} 
            height={1024} 
            alt="Playful sculptural coral chrome asterisk with mint and blue spheres" 
            fetchPriority="high" 
          />
          <div className="hero-sticker hidden sm:flex"><Sparkles/> Strategy brain.<br/>Creative soul.</div>
        </div>

        {/* Hero Copy */}
        <div className="hero-copy relative z-10 pt-1 sm:pt-4 max-w-[620px]">
          <div className="eyebrow mb-2 sm:mb-3"><span className="status-dot"/> MARKETING. CULTURE. A LITTLE CHAOS.</div>
          <h1 className="text-[46px] leading-[0.92] sm:text-7xl md:text-[104px] tracking-tight font-bold">
            <span className="block">Akshaya</span>
            <span className="name-line block -mt-1 sm:mt-0">Reddy.<Asterisk aria-hidden="true"/></span>
          </h1>
          <p className="hero-subtitle mt-3 sm:mt-4 text-xl sm:text-2xl leading-snug">I turn <RotatingWord /><br/>into lasting impact.</p>
          <p className="hero-description text-base sm:text-lg leading-relaxed mt-2.5 sm:mt-3">Associate Marketing Manager at Masai.<br/>Connecting culture, content & search to make brands<br className="hidden md:block"/> more seen, more trusted, and more loved.</p>
          <div className="hero-actions mt-5 mb-3 md:mb-0">
            <Button asChild className="pill-button"><a href="#work">Explore my work <ArrowUpRight/></a></Button>
            <Button variant="link" asChild className="text-sm">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">My résumé <Download/></a>
            </Button>
          </div>
        </div>

        <div className="hero-foot text-sm relative z-10 mt-4 md:mt-0"><span className="flex items-center gap-1.5"><MapPin size={14}/> Bengaluru, India </span><a href="#impact" className="flex items-center gap-2">A little scroll, a lot of story <ArrowDown size={20}/></a></div>
      </section>

      <section className="metric-band site-width" id="impact" aria-label="Career impact">
        <div className="metric"><strong>3<span> years</span></strong><p className="text-base">Across full-time & internship roles</p></div>
        <div className="metric"><strong>30<span> days</span></strong><p className="text-base">To shift answer-engine brand sentiment</p></div>
        <div className="metric"><strong>65<span>%</span></strong><p className="text-base">Lift in brand presence & engagement</p></div>
        <div className="metric"><strong>4<span> clients</span></strong><p className="text-base">Podcast marketing, end to end</p></div>
      </section>

      <div className="marquee" aria-hidden="true"><div className="marquee-track">{[0,1,2,3].map(n => <span key={n}>{['BRAND BUILDER', 'CULTURE CURIOUS', 'AEO OBSESSED', 'STORY FIRST', 'IMPACT ALWAYS'].map(t => <span key={t}>{t}<Asterisk/></span>)}</span>)}</div></div>

      {/* 01 / SELECTED WORK */}
      <section className="section site-width" id="work">
        <div className="section-head reveal"><div><div className="eyebrow">01 / SELECTED WORK</div><h2>Less noise.<br/>More influence.</h2></div><p className="section-intro text-lg">A few things I’ve helped move forward.<br/>Real challenges. Thoughtful strategy. Visible impact.</p></div>
        <div className="work-filters" aria-label="Filter selected work">{filters.map(f => <Button className="filter-button text-sm" variant={f===filter ? 'default' : 'outline'} aria-pressed={f===filter} onClick={() => setFilter(f)} key={f}>{f}</Button>)}</div>
        
        <div className="project-grid">
          {visibleProjects.map((p, index) => (
            <Button
              variant="ghost"
              className="project-card reveal transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2.5 hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl cursor-pointer"
              key={p.id}
              onClick={() => setSelected(p)}
              aria-label={`View case study: ${p.company}`}
            >
              <div className={`project-visual ${p.theme}`}>
                <div className="project-label text-sm">{p.label}<ArrowUpRight size={15}/></div>
                <h3 className="text-xl sm:text-2xl">{p.title}</h3>
                {p.id==='aeo' && <div className="sentiment-path text-sm"><span>Neutral / negative</span><ArrowRight size={14}/><span>Positive & reliable ↗</span></div>}
                {p.id==='social' && <div className="signal-bars" aria-hidden="true"><i/><i/><i/><i/></div>}
                {p.id==='podcast' && <div className="waveform" aria-hidden="true">{Array.from({length:38},(_,i)=><i key={i}/>)}</div>}
                <div className="project-bottom">
                  <div className="project-result font-semibold">
                    <strong>{p.metric}</strong>
                    {p.id==='aeo' ? 'SENTIMENT TRANSFORMATION' : p.id==='social' ? 'PRESENCE & ENGAGEMENT' : 'STORIES. AMPLIFIED.'}
                  </div>
                  <span className="open-circle transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight size={16}/></span>
                </div>
              </div>
              <div className="project-caption text-sm font-medium">{p.company}<span className="text-xs">CASE STUDY / 0{index+1}</span></div>
              <div className="project-tags text-sm">{p.tags.join(' · ')}</div>
            </Button>
          ))}
        </div>
        <p className="section-note text-sm mt-4">Selected experience, drawn from my résumé. Case studies unpack the strategy behind the outcomes.</p>
      </section>

      <VibeCheck />
      
      {/* 02 / ABOUT SECTION */}
      <section className="about-band" id="about"><div className="section site-width">
        <div className="about-layout reveal">
          <div>
            <div className="eyebrow">02 / THE PERSON BEHIND THE STRATEGY</div>
            <h2>Chronically curious.<br/>Intentionally strategic.</h2>
          </div>
          <div>
            <p className="about-copy text-lg" style={{ color: 'var(--foreground, #111827)' }}>
              I work at the intersection of <span className="highlight-text">what people care about</span> and what brands want to say. From managing reputation to shaping the next AI answer, I turn insights into thoughtful, culture-aware marketing.
            </p>
            <p className="section-intro mt-4 text-base sm:text-lg" style={{ color: 'var(--muted-foreground, #4b5563)' }}>
              Around three years of hands-on experience. A digital marketing foundation. A love for stories that connect — and strategies that actually deliver.
            </p>
            <div className="about-meta text-sm font-medium mt-4">
              <span>Bengaluru, Karnataka</span>
              <span>English · Hindi · Telugu</span>
            </div>
          </div>
        </div>
        <div className="specialties">
          {specialties.map(s => (
            <div className="specialty reveal" key={s.name}>
              <s.icon/>
              <h3>{s.name}</h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--muted-foreground, #4b5563)' }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div></section>
      
      {/* 03 / THE JOURNEY */}
      <section className="section site-width" id="experience">
        <div className="experience-layout">
          <div className="reveal md:sticky md:top-24 md:self-start">
            <div className="eyebrow">03 / THE JOURNEY</div>
            <h2>Every role.<br/>A new perspective.</h2>
            <p className="section-intro mt-5 text-lg">From content calendars to brand trust.<br/>The experiences that shaped how I think, create and lead.</p>
            <Button variant="link" asChild className="mt-4 mb-6 px-0 text-sm font-medium">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">The full résumé <ArrowUpRight/></a>
            </Button>

            {/* GAMER CAT COMPANION CARD */}
            <div className="relative mt-2 max-w-[280px] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg bg-neutral-100 dark:bg-neutral-900 group">
              <img
                src={catGamerImage}
                alt="Marketing strategist cat locked in"
                className="w-full h-auto aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Locked In / Delivering ROI
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Handling campaigns, SERP answers & sudden client crises.
                </p>
              </div>
            </div>
          </div>

          <div>
            {experience.map(e => (
              <article className="timeline-entry reveal" key={e.company} style={{ marginBottom: '2.5rem' }}>
                <div className="timeline-top">
                  <h3 style={{ fontSize: '1.85rem', fontWeight: 700 }}>{e.company}</h3>
                  <span style={{ fontSize: '1rem', textAlign: 'right' }}>{e.date}<br/>{e.location}</span>
                </div>
                {e.roles.map((r: any) => (
                  <div key={r.title} style={{ marginTop: '1.4rem', marginBottom: '1.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
                          {r.title}
                        </h4>
                        {r.promoted && (
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', padding: '2px 9px', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.12)', color: '#059669', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <TrendingUp size={12} /> Promoted
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--muted-foreground, #666)' }}>
                        {r.date ? r.date : (r.title === 'Associate Marketing Manager' ? 'APR 2026 — PRESENT' : r.title === 'Marketing Operations Specialist' ? 'JUN 2025 — APR 2026' : '')}
                      </span>
                    </div>
                    <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                      {r.points.map((p: string) => (
                        <li key={p} style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--muted-foreground, #444)', marginTop: '0.4rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <span style={{ opacity: 0.5, userSelect: 'none' }}>—</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 / THE TOOLKIT */}
      <section className="stack-band" id="toolkit">
        <div className="section site-width">
          <div className="section-head reveal">
            <div><div className="eyebrow">04 / THE TOOLKIT</div><h2>Good instincts.<br/>An even better stack.</h2></div>
            <p className="section-intro text-lg">The skills and tools behind the ideas.<br/>Strategy-led. Creatively executed. Always learning.</p>
          </div>
          <div className="stack-grid">
            {stack.map(s => (
              <div className="stack-group reveal" key={s.title}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{s.title}</h3>
                <div>{s.items.map(i => <span className="skill-chip" style={{ fontSize: '0.95rem', padding: '0.4rem 0.85rem' }} key={i}>{i}</span>)}</div>
              </div>
            ))}
          </div>

          {/* Formatted Side-by-Side Human Skills */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <span className="block text-xs font-bold tracking-wider uppercase opacity-80 mb-3">THE HUMAN SKILLS</span>
            <div className="flex flex-wrap items-center gap-2.5">
              {humanSkills.map(skill => (
                <span 
                  key={skill} 
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-black/15 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/10 transition-transform active:scale-95 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 / THE FOUNDATION */}
      <section className="section site-width" id="foundation">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">05 / THE FOUNDATION</div>
            <h2>Learning is the long game.</h2>
          </div>
        </div>
        <div className="foundation-grid">
          <div className="reveal">
            <h3 className="foundation-title" style={{ fontSize: '1.35rem' }}>Education</h3>

            {/* BBA Degree Only */}
            <div className="education-row" style={{ padding: '0.85rem 0', borderBottom: '1px solid var(--border, rgba(0,0,0,0.1))' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 600 }}>BBA · Digital Marketing</h4>
                <p style={{ fontSize: '0.95rem', marginTop: '0.2rem' }}>Vellore Institute of Technology<br/>2022 – 2025</p>
              </div>
              <div className="education-grade" style={{ fontSize: '1.35rem' }}>
                9.15<small style={{ fontSize: '0.75rem', marginLeft: '0.2rem' }}>CGPA</small>
              </div>
            </div>

            {/* Enlarged Student Cat Card */}
            <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem', borderRadius: '1.25rem', background: 'var(--muted, rgba(0,0,0,0.03))', border: '1px solid var(--border, rgba(0,0,0,0.08))' }}>
              <img
                src={studentCatImage}
                alt="Student cat studying"
                style={{ width: '135px', height: '135px', objectFit: 'contain', flexShrink: 0 }}
              />
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-foreground, #666)' }}>
                  Always Learning
                </span>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.5', fontWeight: 500, margin: '0.35rem 0 0 0', color: 'var(--foreground, #111)' }}>
                  Constantly studying consumer behavior, search shifts, and what makes campaigns click.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal">
            <h3 className="foundation-title" style={{ fontSize: '1.35rem' }}>Courses & certifications</h3>
            <div className="cert-list flex flex-wrap gap-2.5">
              {certifications.map(c => (
                <button
                  type="button"
                  key={c}
                  className="group relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium
                             bg-white border border-black/10 dark:bg-neutral-900 dark:border-white/10
                             transition-all duration-200 ease-out select-none cursor-pointer text-left
                             hover:-translate-y-1 hover:border-emerald-500/60
                             hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] dark:hover:shadow-[0_0_25px_rgba(16,185,129,0.45)]
                             active:-translate-y-1 active:border-emerald-500/80
                             active:shadow-[0_0_22px_rgba(16,185,129,0.55)] dark:active:shadow-[0_0_25px_rgba(16,185,129,0.65)]
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 pointer-events-none" />
                  <BadgeCheck
                    size={17}
                    className="text-emerald-500 transition-all duration-200 group-hover:scale-110 group-active:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] group-active:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                  />
                  <span className="relative z-10 text-neutral-800 dark:text-neutral-200 transition-colors duration-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-active:text-emerald-600 dark:group-active:text-emerald-400">
                    {c}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-band" id="connect">
        <div className="contact-inner site-width">
          <div>
            <div className="eyebrow"><Asterisk size={14}/> NEXT UP / SOMETHING GOOD</div>
            <h2>Let’s make your<br/>competitors nervous</h2>
            <p className="text-lg leading-relaxed text-neutral-1000 mt-3">
              Brand strategy, content, or the next big question in search.<br/>
              Got an opportunity or a campaign that needs thoughtful direction? Let's talk.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button asChild className="pill-button px-6 py-3 text-base">
              <a href="mailto:srinagaakshaya275@gmail.com?subject=Let's%20collaborate">
                Say hello / Get in touch <Mail size={16} className="ml-2" />
              </a>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-5 py-3 text-sm border-white/20 hover:border-white/40">
              <a href="https://www.linkedin.com/in/akshayareddyp/" target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={14} className="ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>

    <footer className="site-width footer">
      <a className="brand text-foreground" href="#">ar<span className="brand-star">✳</span></a>
      <span className="text-sm text-neutral-800 dark:text-neutral-400">© {new Date().getFullYear()} Akshaya Reddy</span>
      <a href="#" className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-white">Back to top <ArrowUpRight size={14}/></a>
    </footer>

    {/* CASE STUDY MODAL DIALOG - TEXT CONTRAST FIXED FOR DARK MODE */}
    <Dialog open={selected!==null} onOpenChange={open=>{if(!open)setSelected(null)}}>
      <DialogContent className="case-modal max-w-2xl bg-white dark:bg-[#141414] text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-white/10 shadow-2xl p-6 sm:p-8">
        {selected && <>
          <div className="eyebrow text-xs font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">{selected.company} / {selected.label}</div>
          <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mt-1 mb-2 leading-snug">{selected.title}</DialogTitle>
          <DialogDescription className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal mb-5">{selected.summary}</DialogDescription>
          
          <h3 className="text-lg font-bold text-neutral-950 dark:text-neutral-100 mt-4 mb-1">The challenge</h3>
          <p className="text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-300 mb-4">{selected.challenge}</p>
          
          <h3 className="text-lg font-bold text-neutral-950 dark:text-neutral-100 mt-4 mb-2">The approach</h3>
          <ul className="space-y-2 mb-6">
            {selected.approach.map(a => (
              <li key={a} className="text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-300 flex items-start gap-2">
                <span className="text-neutral-500 dark:text-emerald-400 font-bold">→</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
          
          <div className="case-outcome p-4 sm:p-5 rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-white/10">
            <div className="eyebrow text-xs font-bold tracking-wider text-neutral-600 dark:text-neutral-400 uppercase">THE IMPACT / {selected.metric}</div>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-900 dark:text-neutral-100 font-medium">{selected.outcome}</p>
          </div>
          
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">Experience summary based on the supplied résumé, not a standalone campaign report.</p>
        </>}
      </DialogContent>
    </Dialog>
  </>;
}