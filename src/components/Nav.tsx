import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex justify-center px-4 transition-all duration-500 ${
        scrolled ? 'pt-3' : 'pt-5'
      }`}
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-fg/[0.07] px-4 py-2 backdrop-blur-xl transition-all duration-500 ${
          scrolled ? 'bg-surface/40 shadow-glass' : 'bg-fg/[0.025]'
        }`}
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border border-fg/10 bg-fg/[0.04]">
            <img
              src={profile.avatar}
              alt=""
              loading="eager"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="text-sm font-medium tracking-tight text-fg">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-[13px] text-fg/65 transition-colors duration-300 hover:bg-fg/[0.05] hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full border border-fg/15 bg-fg/[0.04] px-3.5 py-1.5 text-[12px] text-fg/85 transition-all duration-300 hover:border-accent/40 hover:shadow-glow sm:inline-flex"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-accent/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for work
          </a>

          {/* mobile available pill */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full border border-fg/15 bg-fg/[0.04] px-3 py-1.5 text-[11px] text-fg/85 sm:hidden"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-accent/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available
          </a>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
