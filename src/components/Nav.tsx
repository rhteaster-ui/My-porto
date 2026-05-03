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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener('resize', closeOnResize, { passive: true });
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex justify-center px-3 transition-all duration-300 sm:px-4 ${
        scrolled ? 'pt-2 sm:pt-3' : 'pt-3 sm:pt-5'
      }`}
    >
      <nav
        className={`relative flex w-full max-w-5xl items-center justify-between gap-3 rounded-2xl border border-fg/[0.08] px-3 py-2 backdrop-blur-md transition-all duration-300 sm:px-4 ${
          scrolled ? 'bg-surface/55 shadow-glass' : 'bg-fg/[0.03]'
        }`}
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border border-fg/10 bg-fg/[0.04]">
            <img src={profile.avatar} alt="" loading="eager" className="h-full w-full object-cover" />
          </span>
          <span className="text-sm font-medium tracking-tight text-fg">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-xl px-3 py-1.5 text-[13px] text-fg/65 transition-colors duration-300 hover:bg-fg/[0.05] hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-xl border border-fg/15 bg-fg/[0.04] px-3.5 py-1.5 text-[12px] text-fg/85 transition-all duration-300 hover:border-accent/40 hover:shadow-glow sm:inline-flex"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-accent/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for work
          </a>

          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-fg/15 bg-fg/[0.04] text-fg/85"
            >
              <span className="sr-only">Open menu</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
        </div>

        {menuOpen ? (
          <div
            id="mobile-menu"
            className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-2xl border border-fg/10 bg-surface/95 p-2 shadow-glass sm:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-fg/80 transition-colors hover:bg-fg/[0.05] hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
