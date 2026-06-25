import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#72dcc9',
          DEFAULT: '#4cbfa6',
          dark: '#3aa088',
          bg: '#f0fdfa',
        },
        dark: {
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#4a4a4a',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 10px 40px -10px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
};
export default config;