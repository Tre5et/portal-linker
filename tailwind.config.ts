import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'background': 'var(--background)',
        'text': 'var(--text)',
        'hint': 'var(--hint)',
        'card': 'var(--card)',
        'card-hover': 'var(--card-hover)',
        'success': 'var(--success)',
        'fail': 'var(--fail)',
        'error': 'var(--error)',
      },
      width: {
        'card': '75rem'
      }
    },
  },
  plugins: [],
};
export default config;
