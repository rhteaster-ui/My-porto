import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { stack, type Tech } from '../data/stack';
import { Reveal } from '../components/Reveal';

const groups: Array<{ title: string; key: Tech['group'] }> = [
  { title: 'Frontend', key: 'Frontend' },
  { title: 'Backend & Data', key: 'Backend' },
  { title: 'Deploy', key: 'Deploy' },
  { title: 'Tooling', key: 'Tooling' },
];

export function Stack() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // small parallax on the whole grid as the section scrolls past
  const driftY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id="stack" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <Reveal>
        <span className="heading-eyebrow">Tech Stack</span>
        <h2 className="heading-2 mt-3">Toolkit yang dipakai sehari-hari</h2>
        <p className="muted mt-4 max-w-xl text-sm">
          Pilihan tools yang telah teruji untuk membangun antarmuka yang ringan, web app
          yang stabil, dan PWA yang siap dipasang di perangkat.
        </p>
      </Reveal>

      <motion.div style={{ y: driftY }} className="mt-12 grid gap-5 lg:grid-cols-2">
        {groups.map((g, gi) => {
          const items = stack.filter((t) => t.group === g.key);
          if (items.length === 0) return null;
          return (
            <Reveal key={g.key} delay={gi * 0.05}>
              <div className="glass p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-widestplus text-fg/45">
                    {g.title}
                  </span>
                  <span className="font-mono text-[11px] text-fg/30">
                    {items.length.toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {items.map((t, i) => (
                    <TechTile key={t.name} tech={t} index={i} />
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </motion.div>
    </section>
  );
}

/**
 * Floating tile: icon drifts with a slow elliptical orbit (different phase per
 * index) so the grid feels like a constellation breathing — not a wobble.
 * On hover, the tile lifts and the halo blooms.
 */
function TechTile({ tech, index }: { tech: Tech; index: number }) {
  const reduce = useReducedMotion();
  const { Icon, name, color } = tech;

  // give every tile a different orbital path/phase so the grid never lines up
  const dur = 9 + ((index * 1.7) % 5);
  const phase = (index * 0.37) % 1;
  const r = 4 + ((index * 1.3) % 3); // orbital radius in px

  const orbit = reduce
    ? undefined
    : {
        x: [0, r, 0, -r, 0],
        y: [0, -r * 1.2, 0, r * 0.8, 0],
        rotate: [0, 1.5, 0, -1.5, 0],
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex aspect-square items-center justify-center rounded-xl border border-fg/[0.07] bg-fg/[0.02] backdrop-blur-md"
    >
      {/* halo */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}55, transparent 70%)` }}
      />
      {/* faint shadow on the tile floor so the icon really feels lifted */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute bottom-2 left-1/2 h-1.5 w-6 -translate-x-1/2 rounded-full bg-black/30 blur-[3px]"
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.25, 0.45, 0.25],
                scaleX: [1, 0.85, 1],
              }
        }
        transition={{ duration: dur, delay: phase * dur, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="relative"
        animate={orbit}
        transition={{ duration: dur, delay: phase * dur, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={reduce ? undefined : { scale: 1.08 }}
      >
        <Icon
          className="h-7 w-7 sm:h-8 sm:w-8"
          style={{ color, filter: `drop-shadow(0 6px 14px ${color}55)` }}
          aria-label={name}
        />
      </motion.div>
      <span className="absolute inset-x-0 -bottom-6 text-center text-[10px] uppercase tracking-widestplus text-fg/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {name}
      </span>
    </motion.div>
  );
}
