import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-6 pb-12 pt-8 sm:px-10">
      <div className="hairline pt-8" />
      <div className="flex flex-col items-start justify-between gap-3 text-[12px] text-white/40 sm:flex-row sm:items-center">
        <div>
          © {new Date().getFullYear()} {profile.name}. Crafted device-only with quiet care.
        </div>
        <div className="flex items-center gap-2 font-mono">
          <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
          built with React · TypeScript · Tailwind
        </div>
      </div>
    </footer>
  );
}
