import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { projects, type Project } from '../data/projects';
import { Reveal } from '../components/Reveal';

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="heading-eyebrow">Selected Work</span>
            <h2 className="heading-2 mt-3">Projects</h2>
          </div>
          <p className="max-w-md text-sm text-white/55">
            Sebagian dari 50+ proyek yang dibangun, di-debug, dan dioptimalkan secara
            mandiri — full-device, fokus pada performa & kejernihan.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
    ref.current.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`);
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--rx', `0deg`);
    ref.current.style.setProperty('--ry', `0deg`);
  };

  const accentRgb =
    project.accent === 'violet'
      ? '167,139,250'
      : project.accent === 'mint'
        ? '94,234,212'
        : '125,211,252';

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      className="group relative isolate"
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className="glass relative h-full overflow-hidden p-6 transition-shadow duration-500 will-change-transform group-hover:shadow-glow"
        style={{
          transform:
            'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)',
          transition: 'transform 220ms ease-out',
        }}
      >
        {/* spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(${accentRgb},0.18), transparent 50%)`,
          }}
        />

        <div className="relative flex items-center justify-between">
          <span
            className="rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-widestplus"
            style={{
              borderColor: `rgba(${accentRgb}, 0.35)`,
              color: `rgba(${accentRgb}, 0.95)`,
              backgroundColor: `rgba(${accentRgb}, 0.06)`,
            }}
          >
            {project.kind}
          </span>
          <span className="font-mono text-[11px] text-white/40">
            {String(index + 1).padStart(2, '0')} · {project.year}
          </span>
        </div>

        <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-white">
          {project.title}
        </h3>
        <p className="relative mt-2 text-sm leading-relaxed text-white/60">
          {project.summary}
        </p>

        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        <div className="hairline relative mt-6 flex items-center justify-between pt-4 text-[12px] text-white/45">
          <span className="font-mono">case study</span>
          <span className="inline-flex items-center gap-1 text-white/55 transition-colors duration-300 group-hover:text-white">
            view
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
