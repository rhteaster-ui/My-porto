import { motion, useReducedMotion } from 'framer-motion';
import { stack, type Tech } from '../data/stack';
import { Reveal } from '../components/Reveal';

const ROWS: Tech[][] = [stack.slice(0, 5), stack.slice(5, 9), stack.slice(9)];

export function Stack() {
  const reduce = useReducedMotion();

  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <Reveal>
        <span className="heading-eyebrow">Tech Stack</span>
        <h2 className="heading-2 mt-3">Toolkit yang dipakai sehari-hari</h2>
        <p className="muted mt-4 max-w-xl text-sm">
          Disusun untuk performa: animasi berjalan pelan, ringan, dan tetap nyaman di device low-end.
        </p>
      </Reveal>

      <div className="mt-12 space-y-4">
        {ROWS.map((row, index) => (
          <MarqueeRow
            key={`row-${index}`}
            items={row.length > 0 ? row : stack}
            direction={index === 0 ? 1 : -1}
            duration={index === 0 ? 34 : index === 1 ? 42 : 38}
            reduce={!!reduce}
          />
        ))}
      </div>
    </section>
  );
}

function MarqueeRow({ items, direction, duration, reduce }: { items: Tech[]; direction: 1 | -1; duration: number; reduce: boolean }) {
  const safeItems = items.length > 0 ? items : stack;
  const loopItems = [...safeItems, ...safeItems];

  if (reduce) {
    return (
      <div className="glass-strong p-3">
        <div className="flex flex-wrap gap-2">{safeItems.map((tech) => <TechPill key={tech.name} tech={tech} />)}</div>
      </div>
    );
  }

  return (
    <div className="glass-strong overflow-hidden p-3">
      <motion.div
        className="flex w-max gap-2"
        animate={{ x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {loopItems.map((tech, idx) => (
          <TechPill key={`${tech.name}-${idx}`} tech={tech} />
        ))}
      </motion.div>
    </div>
  );
}

function TechPill({ tech }: { tech: Tech }) {
  const { Icon, name, color } = tech;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.03] px-3 py-2 text-xs text-fg/80">
      <Icon className="h-4 w-4" style={{ color }} aria-hidden />
      <span>{name}</span>
    </span>
  );
}
