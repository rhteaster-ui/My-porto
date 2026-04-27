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
        accent: {
          DEFAULT: '#7dd3fc',
          glow: '#67e8f9',
          violet: '#a78bfa',
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
        glass: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 8px 32px -12px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(167,139,250,0.18), 0 0 40px -10px rgba(125,211,252,0.35)',
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
