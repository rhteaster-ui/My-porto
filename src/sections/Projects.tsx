import { motion, AnimatePresence, useReducedMotion, type PanInfo } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { projects, type Project } from '../data/projects';
import { Reveal } from '../components/Reveal';

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
      }
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

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
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mx-auto mt-14 w-full max-w-3xl">
          <div className="relative mx-auto flex h-[560px] w-full items-center justify-center sm:h-[540px]" style={{ perspective: '1400px' }}>
            {projects.map((p, i) => {
              const off = signedOffset(i);
              const abs = Math.abs(off);
              const isActive = off === 0;
              const visible = abs <= 2;

              return (
                <motion.button
                  key={p.title}
                  type="button"
                  onClick={() => {
                    if (!isActive) {
                      setDirection(off > 0 ? 1 : -1);
                      setActive(i);
                    }
                  }}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info: PanInfo) => {
                    if (info.offset.x < -50) next();
                    if (info.offset.x > 50) prev();
                  }}
                  className="absolute left-1/2 top-1/2 block w-[92%] max-w-md cursor-grab text-left focus:outline-none active:cursor-grabbing sm:w-[430px]"
                  style={{ zIndex: 50 - abs, transformStyle: 'preserve-3d', pointerEvents: visible ? 'auto' : 'none' }}
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${off * 28}%)`,
                    y: '-50%',
                    scale: 1 - abs * 0.08,
                    rotateY: reduce ? 0 : off * -8,
                    z: -abs * 120,
                    opacity: abs > 2 ? 0 : 1 - abs * 0.28,
                    filter: `blur(${abs === 0 ? 0 : abs === 1 ? 1 : 2}px)`,
                  }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 26, mass: 0.8 }}
                >
                  <DeckCard project={p} index={i} active={isActive} />
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button type="button" onClick={prev} className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.04] text-fg/70">
              <ChevronLeft />
            </button>
            <span className="font-mono text-[11px] text-fg/40">{String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <button type="button" onClick={next} className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.04] text-fg/70">
              <ChevronRight />
            </button>
          </div>

          <div aria-live="polite" className="sr-only">{direction > 0 ? 'Next: ' : 'Previous: '}{projects[active]?.title}</div>
        </div>
      </Reveal>
    </section>
  );
}

function DeckCard({ project, index, active }: { project: Project; index: number; active: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current || !active) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <article ref={ref} onMouseMove={onMouseMove} className="relative h-[500px] overflow-hidden rounded-2xl border border-fg/10 bg-[rgb(var(--canvas-rgb))] p-4 shadow-glass sm:h-[480px]">
      {active && (
        <AnimatePresence>
          <motion.div key="spot" className="pointer-events-none absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--accent-rgb) / 0.12), transparent 60%)' }} />
        </AnimatePresence>
      )}
      <img src={project.image} alt={`Preview ${project.title}`} loading="lazy" className="h-48 w-full rounded-xl border border-fg/10 object-cover" />
      <div className="mt-4 flex flex-wrap gap-1.5">{project.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
      <h3 className="mt-4 text-lg font-semibold text-fg">{project.title}</h3>
      <p className="mt-2 text-sm text-fg/65">{project.summary}</p>
      <a href={project.url} target="_blank" rel="noreferrer" className="btn-primary absolute bottom-4 left-4 right-4 justify-center">Kunjungi Website</a>
      <span className="absolute right-4 top-4 rounded-full border border-accent/30 bg-accent/[0.08] px-2 py-0.5 text-[10px] text-accent/90">{String(index + 1).padStart(2, '0')} · {project.year}</span>
    </article>
  );
}

function ChevronLeft() { return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M15 6l-6 6 6 6" /></svg>; }
function ChevronRight() { return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 6l6 6-6 6" /></svg>; }
