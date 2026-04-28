import { Reveal } from '../components/Reveal';
import { socials } from '../data/profile';
import { SocialIcon } from '../icons/SocialIcon';

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <Reveal>
        <span className="heading-eyebrow">Contact</span>
        <h2 className="heading-2 mt-3 max-w-3xl">
          Punya ide, brief, atau kolaborasi? <br className="hidden sm:block" />
          Mari bicara <span className="text-accent">santai</span>.
        </h2>
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <div className="glass-strong relative overflow-hidden p-7 sm:p-10">
          <div
            className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgb(var(--aurora-cyan) / 0.14) 0%, transparent 70%)',
            }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="max-w-md text-[15px] leading-relaxed text-fg/70">
                Saya membuka diskusi seputar web app, PWA, integrasi API, dan tooling AI.
                Silakan pilih kanal yang paling nyaman — saya merespons dengan tenang dan
                bertanggung jawab.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a className="btn-primary" href="https://t.me/rAi_engine" target="_blank" rel="noreferrer">
                  <SocialIcon name="telegram" className="h-4 w-4" />
                  Chat via Telegram
                </a>
                <a
                  className="btn-ghost"
                  href="https://whatsapp.com/channel/0029VbBjyjlJ93wa6hwSWa0p"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon name="whatsapp" className="h-4 w-4" />
                  WhatsApp Channel
                </a>
              </div>
            </div>

            <ul className="grid gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-xl border border-fg/[0.07] bg-fg/[0.02] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-fg/[0.05] hover:shadow-glow"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-fg/[0.07] bg-fg/[0.03] text-fg/75 transition-colors duration-300 group-hover:text-fg">
                        <SocialIcon name={s.iconKey} className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-fg">{s.label}</span>
                        <span className="block text-[12px] text-fg/45">{s.handle}</span>
                      </span>
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-fg/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-fg/80"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
