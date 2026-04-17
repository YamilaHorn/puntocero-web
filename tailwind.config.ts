import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        volt:     '#D1FF00',
        obsidian: '#0A0A0A',
        carbon:   '#1A1A1A',
        titanium: '#F5F5F5',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        mono:    ['ui-monospace', 'monospace'],
      },
      keyframes: {
        'scroll-left': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'scroll-left': 'scroll-left 30s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;