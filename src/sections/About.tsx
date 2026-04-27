import { profile } from '../data/profile';
import { Reveal } from '../components/Reveal';

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <Reveal>
        <span className="heading-eyebrow">About</span>
        <h2 className="heading-2 mt-3 max-w-3xl">
          Membangun web yang <span className="text-accent">tenang</span>, ringan, dan{' '}
          <span className="text-accent-violet">tepat guna</span>.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2" delay={0.05}>
          <article className="glass relative overflow-hidden p-7 sm:p-9">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgb(var(--aurora-cyan) / 0.18) 0%, transparent 70%)',
              }}
            />
            <div className="relative space-y-5 text-[15px] leading-relaxed text-fg/70">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="hairline mt-8 pt-7">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {profile.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-semibold tracking-tight text-fg">
                      {s.value}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-widestplus text-fg/45">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="grid gap-6">
            <Card title="Cara kerja" items={profile.workStyle} accent="cyan" />
            <Card title="Minat" items={profile.interests} accent="violet" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Card({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: 'cyan' | 'violet';
}) {
  const dot =
    accent === 'cyan'
      ? 'bg-accent shadow-[0_0_10px_rgb(var(--accent-rgb)/0.7)]'
      : 'bg-accent-violet shadow-[0_0_10px_rgb(var(--accent-violet-rgb)/0.7)]';
  return (
    <div className="glass p-6">
      <div className="text-[11px] uppercase tracking-widestplus text-fg/45">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5 text-sm text-fg/75">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3">
            <span className={`mt-1.5 inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
