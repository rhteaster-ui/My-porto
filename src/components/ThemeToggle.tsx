import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

/**
 * Small sun/moon toggle that lives in the Nav.
 * - SVG icons (no emoji)
 * - cross-fade + soft rotate when switching
 * - respects prefers-reduced-motion
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const reduce = useReducedMotion();
  const isLight = theme === 'light';
  const label = isLight ? 'Switch to dark theme' : 'Switch to light theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      aria-pressed={isLight}
      className={
        'relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.04] text-fg/75 transition-all duration-300 hover:border-accent/40 hover:text-fg hover:shadow-glow ' +
        className
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.span
            key="sun"
            initial={reduce ? false : { opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="inline-flex"
          >
            <SunIcon />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={reduce ? false : { opacity: 0, rotate: 45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: -45, scale: 0.7 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="inline-flex"
          >
            <MoonIcon />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2" />
      <path d="M12 19v2" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
      <path d="M5.6 5.6l1.4 1.4" />
      <path d="M17 17l1.4 1.4" />
      <path d="M5.6 18.4l1.4-1.4" />
      <path d="M17 7l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
