import { motion, useReducedMotion } from 'framer-motion';
import { stack, type Tech } from '../data/stack';
import { Reveal } from '../components/Reveal';

const rows: Tech[][] = [
  stack.slice(0, 5),
  stack.slice(5, 9),
  stack.slice(9),
];

export function Stack() {
  const reduce = useReducedMotion();

  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <Reveal>
        <span className="heading-eyebrow">Tech Stack</span>
        <h2 className="heading-2 mt-3">Tools bergerak pelan, biar lebih hidup</h2>
        <p className="muted mt-4 max-w-xl text-sm">
          3 baris teknologi dengan gerak bergantian kanan-kiri untuk memberi kesan halus,
          modern, dan tetap nyaman di mata.
        </p>
      </Reveal>

      <div className="mt-12 space-y-4">
        {rows.map((items, rowIndex) => (
          <Reveal key={`row-${rowIndex}`} delay={rowIndex * 0.06}>
            <TechRow
              items={items}
              direction={rowIndex === 0 ? 'right' : 'left'}
              reduce={Boolean(reduce)}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TechRow({
  items,
  direction,
  reduce,
}: {
  items: Tech[];
  direction: 'left' | 'right';
  reduce: boolean;
}) {
  const repeated = [...items, ...items];

  return (
    <div className="glass overflow-hidden px-3 py-3 sm:px-4">
      <motion.ul
        className={`flex min-w-max items-center gap-3 ${
          !reduce ? `marquee marquee-${direction}` : ''
        }`}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {repeated.map((tech, index) => (
          <li key={`${tech.name}-${index}`}>
            <TechChip tech={tech} />
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

function TechChip({ tech }: { tech: Tech }) {
  const { Icon, name, color } = tech;

  return (
    <div className="inline-flex h-14 items-center gap-2.5 rounded-xl border border-fg/[0.08] bg-fg/[0.03] px-4 backdrop-blur-md">
      <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color }} aria-label={name} />
      <span className="text-[11px] font-medium uppercase tracking-widestplus text-fg/70">
        {name}
      </span>
    </div>
  );
}
