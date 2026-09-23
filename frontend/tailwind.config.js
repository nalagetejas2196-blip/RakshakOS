/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#050811',
          900: '#090e1d',
          850: '#0e162d',
          800: '#14203e',
          700: '#1c2d54',
          cyan: '#00f0ff',
          neon: '#10b981',
          amber: '#f59e0b',
          rose: '#ef4444',
          indigo: '#6366f1',
          sky: '#38bdf8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'wave-bar': 'waveBar 1s ease-in-out infinite alternate',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.98)' }
        },
        waveBar: {
          '0%': { height: '15%' },
          '100%': { height: '95%' }
        }
      }
    },
  },
  plugins: [],
}
