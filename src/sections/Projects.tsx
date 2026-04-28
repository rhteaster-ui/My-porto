import { motion, AnimatePresence, useReducedMotion, type PanInfo } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { projects, type Project } from '../data/projects';
import { Reveal } from '../components/Reveal';

/**
 * Projects deck — horizontal stacked cards.
 *
 * Layout: the active card sits in front, dead-center. Neighbours peek out
 * to the left and right, scaled down and pushed back. Further-away cards
 * disappear into the haze behind them. Buttons / keyboard / drag all
 * navigate the deck.
 */
export function Projects() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const reduce = useReducedMotion();
  const total = projects.length;

  const go = useCallback(
    (delta: number) => {
      setDirection(delta > 0 ? 1 : -1);
      setActive((prev) => (prev + delta + total) % total);
    },
    [total],
  );

  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // signed offset (-2,-1,0,1,2) wrapping around the deck
  const signedOffset = (i: number) => {
    const half = Math.floor(total / 2);
    let d = i - active;
    if (d > half) d -= total;
    if (d < -half) d += total;
    return d;
  };

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="heading-eyebrow">Selected Work</span>
            <h2 className="heading-2 mt-3">Projects</h2>
          </div>
          <p className="max-w-md text-sm text-fg/55">
            Sebagian dari 50+ proyek yang dibangun, di-debug, dan dioptimalkan secara
            mandiri — full-device, fokus pada performa & kejernihan.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mx-auto mt-14 w-full max-w-3xl">
          {/* deck */}
          <div
            className="relative mx-auto flex h-[480px] w-full items-center justify-center sm:h-[460px]"
            style={{ perspective: '1400px' }}
            aria-roledescription="carousel"
            aria-label="Selected projects"
          >
            {projects.map((p, i) => {
              const off = signedOffset(i);
              const abs = Math.abs(off);
              const isActive = off === 0;

              // Cards beyond ±2 are kept mounted but invisible — keeps drag
              // physics smooth and prevents popping.
              const visible = abs <= 2;

              // translate, scale, opacity per offset slot
              const xPct = off * 28; // % of card width
              const scale = 1 - abs * 0.08;
              const z = -abs * 140;
              const rotY = off * -8; // tilt side cards toward the camera
              const opacity = abs > 2 ? 0 : 1 - abs * 0.28;
              const blur = abs === 0 ? 0 : abs === 1 ? 1 : 3;
              const zIndex = 50 - abs;

              return (
                <motion.button
                  key={p.title}
                  type="button"
                  onClick={() => {
                    if (!isActive) {
                      // clicking a side card shifts it to the front
                      setDirection(off > 0 ? 1 : -1);
                      setActive(i);
                    }
                  }}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info: PanInfo) => {
                    const swipe = Math.abs(info.offset.x) * Math.abs(info.velocity.x);
                    if (info.offset.x < -60 || swipe > 6000) next();
                    else if (info.offset.x > 60 || swipe > 6000) prev();
                  }}
                  aria-label={isActive ? `${p.title} (active)` : `Show ${p.title}`}
                  aria-current={isActive ? 'true' : undefined}
                  tabIndex={visible ? 0 : -1}
                  className="absolute left-1/2 top-1/2 block w-[88%] max-w-md cursor-grab text-left focus:outline-none active:cursor-grabbing sm:w-[420px]"
                  style={{
                    zIndex,
                    transformStyle: 'preserve-3d',
                    pointerEvents: visible ? 'auto' : 'none',
                  }}
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${xPct}%)`,
                    y: '-50%',
                    scale,
                    rotateY: reduce ? 0 : rotY,
                    z,
                    opacity,
                    filter: `blur(${blur}px)`,
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 220, damping: 26, mass: 0.8 }
                  }
                >
                  <DeckCard project={p} index={i} active={isActive} />
                </motion.button>
              );
            })}
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous project"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.04] text-fg/70 transition-all duration-300 hover:border-accent/40 hover:text-fg hover:shadow-glow"
            >
              <ChevronLeft />
            </button>

            <div className="flex flex-1 items-center justify-center gap-3">
              <span className="font-mono text-[11px] text-fg/40">
                {String(active + 1).padStart(2, '0')}
                <span className="mx-1 text-fg/25">/</span>
                {String(total).padStart(2, '0')}
              </span>
              <ol className="flex items-center gap-1.5" aria-label="Project pages">
                {projects.map((p, i) => (
                  <li key={p.title}>
                    <button
                      type="button"
                      onClick={() => {
                        setDirection(i > active ? 1 : -1);
                        setActive(i);
                      }}
                      aria-label={`Go to ${p.title}`}
                      aria-current={i === active ? 'true' : undefined}
                      className={
                        'h-1.5 rounded-full transition-all duration-300 ' +
                        (i === active
                          ? 'w-6 bg-accent/80'
                          : 'w-1.5 bg-fg/15 hover:bg-fg/30')
                      }
                    />
                  </li>
                ))}
              </ol>
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next project"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.04] text-fg/70 transition-all duration-300 hover:border-accent/40 hover:text-fg hover:shadow-glow"
            >
              <ChevronRight />
            </button>
          </div>

          {/* caption announces direction for SR users */}
          <div aria-live="polite" className="sr-only">
            {direction > 0 ? 'Next: ' : 'Previous: '}
            {projects[active]?.title}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/**
 * Card body — same content as the previous design, minus tilt-on-hover
 * (the deck does the depth work now). Active card gets the live spotlight.
 */
function DeckCard({
  project,
  index,
  active,
}: {
  project: Project;
  index: number;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current || !active) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="glass relative h-[420px] overflow-hidden p-7 transition-shadow duration-500 sm:h-[400px]"
      style={{
        boxShadow: active ? 'var(--shadow-glow)' : undefined,
      }}
    >
      {/* spotlight only when active */}
      {active && (
        <AnimatePresence>
          <motion.div
            key="spot"
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background:
                'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--accent-rgb) / 0.16), transparent 55%)',
            }}
          />
        </AnimatePresence>
      )}

      <div className="relative flex items-center justify-between">
        <span className="rounded-full border border-accent/30 bg-accent/[0.06] px-2.5 py-0.5 text-[10px] uppercase tracking-widestplus text-accent/95">
          {project.kind}
        </span>
        <span className="font-mono text-[11px] text-fg/40">
          {String(index + 1).padStart(2, '0')} · {project.year}
        </span>
      </div>

      <h3 className="relative mt-6 text-xl font-semibold tracking-tight text-fg">
        {project.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-fg/60">
        {project.summary}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <div className="hairline absolute inset-x-7 bottom-6 flex items-center justify-between pt-4 text-[12px] text-fg/45">
        <span className="font-mono">case study</span>
        <span className="inline-flex items-center gap-1 text-fg/55">
          view
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
