/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#059669',
        accent: '#10b981',
        surface: '#0a0f0d',
        'surface-light': '#111a16',
        'surface-lighter': '#1a2a22',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
