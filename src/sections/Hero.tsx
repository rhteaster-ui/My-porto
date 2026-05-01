import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import { SocialIcon } from '../icons/SocialIcon';

const introLines = [
  'Lightweight web apps and PWA engineering.',
  'Focused on performance, stability, and quiet UI polish.',
  'Built to stay smooth even on low-end devices.',
];

export function Hero() {
  const reduce = useReducedMotion();
  const typedName = 'Rhhmat';
  const [typed, setTyped] = useState('');
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (reduce) {
      setTyped(typedName);
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(typedName.slice(0, index));
      if (index >= typedName.length) {
        window.clearInterval(timer);
      }
    }, 95);

    return () => window.clearInterval(timer);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;

    const interval = window.setInterval(() => {
      setLineIndex((prev) => (prev + 1) % introLines.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, [reduce]);

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-start justify-center px-6 pt-32 pb-20 sm:px-10"
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="heading-eyebrow mb-6"
      >
        Portfolio · {new Date().getFullYear()}
      </motion.span>

      <div className="flex w-full flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="order-2 flex-1 lg:order-1 lg:pr-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="heading-1"
          >
            <span className="block text-fg/70">Hi, I&apos;m</span>
            <span className="mt-2 block">
              <span className="shimmer-text">{typed || (reduce ? typedName : '')}</span>
              {!reduce && typed.length < typedName.length ? (
                <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse bg-fg/80 align-[-0.1em]" />
              ) : null}
            </span>
          </motion.h1>

          <motion.p
            key={lineIndex}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-fg/70 sm:text-lg"
          >
            {introLines[lineIndex]}
          </motion.p>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg/55 sm:text-base">
            Self-taught web developer from <span className="text-fg/80">{profile.location}</span> —
            focused on PWA, performance, and calm user experience.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a className="btn-primary" href="#projects">
              <span>See Projects</span>
              <ArrowRight />
            </a>
            <a className="btn-ghost" href="#contact">
              <span>Contact Me</span>
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-2"
          >
            {(['github', 'instagram', 'tiktok', 'telegram', 'whatsapp'] as const).map((k) => (
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
            ))}
          </motion.ul>
        </div>

        <Avatar reduce={Boolean(reduce)} />
      </div>

      <ScrollHint />
    </section>
  );
}

function Avatar({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="order-1 relative shrink-0 self-end lg:order-2 lg:ml-auto lg:self-center"
    >
      <div className="relative overflow-hidden rounded-[26px] border border-fg/10 bg-fg/[0.04] p-1 shadow-glass">
        <div className="overflow-hidden rounded-[22px] bg-gradient-to-br from-fg/[0.06] to-fg/[0.01]">
          <motion.img
            src="https://j.top4top.io/p_376952pby0.png"
            alt={`Foto profil ${profile.name}`}
            loading="eager"
            className="block h-[260px] w-[220px] object-cover sm:h-[320px] sm:w-[280px]"
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={reduce ? undefined : { duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
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
      transition={{ delay: 1, duration: 0.8 }}
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
