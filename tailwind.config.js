/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#06070b',
          900: '#0a0c12',
          800: '#101320',
          700: '#161a2a',
        },
        // Theme-aware tokens (see src/index.css for the variable definitions).
        // `fg` is the dominant text/icon color (white in dark, deep ink in light).
        // `surface` is the canvas-matching color (black in dark, white in light) —
        // used for translucent overlays like the nav scrim or badge backgrounds.
        fg: 'rgb(var(--fg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        canvas: 'rgb(var(--canvas-rgb) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
          glow: 'rgb(var(--accent-glow-rgb) / <alpha-value>)',
          violet: 'rgb(var(--accent-violet-rgb) / <alpha-value>)',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
        widestplus: '0.22em',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: 'var(--shadow-glass)',
        glow: 'var(--shadow-glow)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'spin-slow': 'spinSlow 22s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-glow': 'pulseGlow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
