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
        'success': 'var(--success)',
        'fail': 'var(--fail)',
      }
    },
  },
  plugins: [],
};
export default config;
