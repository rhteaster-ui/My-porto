import { motion, useReducedMotion } from 'framer-motion';
import { stack, type Tech } from '../data/stack';
import { Reveal } from '../components/Reveal';

const groups: Array<{ title: string; key: Tech['group'] }> = [
  { title: 'Frontend', key: 'Frontend' },
  { title: 'Backend & Data', key: 'Backend' },
  { title: 'Deploy', key: 'Deploy' },
  { title: 'Tooling', key: 'Tooling' },
];

export function Stack() {
  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <Reveal>
        <span className="heading-eyebrow">Tech Stack</span>
        <h2 className="heading-2 mt-3">Toolkit yang dipakai sehari-hari</h2>
        <p className="muted mt-4 max-w-xl text-sm">
          Pilihan tools yang telah teruji untuk membangun antarmuka yang ringan, web app
          yang stabil, dan PWA yang siap dipasang di perangkat.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
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
      </div>
    </section>
  );
}

function TechTile({ tech, index }: { tech: Tech; index: number }) {
  const reduce = useReducedMotion();
  const { Icon, name, color } = tech;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex aspect-square items-center justify-center rounded-xl border border-fg/[0.07] bg-fg/[0.02] backdrop-blur-md"
      style={{ perspective: '600px' }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}55, transparent 70%)` }}
      />
      <motion.div
        className="relative"
        animate={
          reduce
            ? undefined
            : {
                rotateY: [0, 14, 0, -14, 0],
                rotateX: [0, -8, 0, 8, 0],
                y: [0, -2, 0],
              }
        }
        transition={{ duration: 8 + (index % 5), repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Icon
          className="h-7 w-7 sm:h-8 sm:w-8"
          style={{ color, filter: `drop-shadow(0 4px 14px ${color}55)` }}
          aria-label={name}
        />
      </motion.div>
      <span className="absolute inset-x-0 -bottom-6 text-center text-[10px] uppercase tracking-widestplus text-fg/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {name}
      </span>
    </motion.div>
  );
}
