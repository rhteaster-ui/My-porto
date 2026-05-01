import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/profile';
import { SocialIcon } from '../icons/SocialIcon';

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-start justify-center px-6 pt-32 pb-20 sm:px-10"
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="heading-eyebrow mb-6"
      >
        Portfolio · {new Date().getFullYear()}
      </motion.span>

      <div className="flex w-full flex-col-reverse items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: reduce ? 'none' : 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="heading-1"
          >
            <span className="block text-fg/70">Halo, saya</span>
            <span className="shimmer-text mt-2 block">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-fg/60 sm:text-lg"
          >
            {profile.tagline} {profile.role.toLowerCase()} dari{' '}
            <span className="text-fg/80">{profile.location}</span> — fokus pada PWA,
            performa, dan pengalaman yang terasa tenang.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a className="btn-primary" href="#projects">
              <span>Lihat Projects</span>
              <ArrowRight />
            </a>
            <a className="btn-ghost" href="#contact">
              <span>Hubungi saya</span>
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-2"
          >
            {(['github', 'instagram', 'tiktok', 'telegram', 'whatsapp'] as const).map(
              (k) => (
                <li key={k}>
                  <a
                    href={
                      k === 'github'
                        ? 'https://github.com/rahmat-369'
                        : k === 'instagram'
                          ? 'https://www.instagram.com/rahmt_nhw'
                          : k === 'tiktok'
                            ? 'https://www.tiktok.com/@r_hmtofc'
                            : k === 'telegram'
                              ? 'https://t.me/rAi_engine'
                              : 'https://whatsapp.com/channel/0029VbBjyjlJ93wa6hwSWa0p'
                    }
                    target="_blank"
                    rel="noreferrer"
                    aria-label={k}
                    className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.03] text-fg/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-fg hover:shadow-glow"
                  >
                    <SocialIcon name={k} className="h-4 w-4" />
                  </a>
                </li>
              ),
            )}
          </motion.ul>
        </div>

        <Avatar />
      </div>

      <ScrollHint />
    </section>
  );
}

function Avatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, filter: 'blur(14px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="relative shrink-0 self-start ml-auto lg:ml-12 lg:self-center xl:ml-20"
    >
      {/* outer rotating conic ring */}
      <div className="absolute -inset-3 rounded-[28px] opacity-60 blur-[2px] animate-spin-slow ring-conic" />
      {/* inner static border */}
      <div className="relative overflow-hidden rounded-[26px] border border-fg/10 bg-fg/[0.04] p-1 shadow-glass">
        <div className="overflow-hidden rounded-[22px] bg-gradient-to-br from-fg/[0.06] to-fg/[0.01]">
          <motion.img
            src="https://j.top4top.io/p_376952pby0.png"
            alt={`Foto profil ${profile.name}`}
            loading="eager"
            className="block h-[260px] w-[220px] object-cover sm:h-[320px] sm:w-[280px]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        {/* corner badges */}
        <span className="absolute left-3 top-3 rounded-full border border-fg/15 bg-surface/40 px-2 py-0.5 text-[10px] tracking-widest text-fg/70 backdrop-blur">
          DEV
        </span>
        <span className="absolute right-3 bottom-3 rounded-full border border-fg/15 bg-surface/40 px-2 py-0.5 text-[10px] tracking-widest text-fg/70 backdrop-blur">
          {profile.handle}
        </span>
      </div>
    </motion.div>
  );
}

function ScrollHint() {
  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1 }}
      className="mt-16 inline-flex items-center gap-2 text-[11px] uppercase tracking-widestplus text-fg/40 hover:text-fg/70"
    >
      <span className="h-px w-10 bg-fg/20" />
      Scroll
    </motion.a>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
