import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#635BFF',
          50: '#F0EFFF',
          100: '#E1DFFF',
          200: '#C3BFFF',
          300: '#A59FFF',
          400: '#877FFF',
          500: '#635BFF',
          600: '#4F47CC',
          700: '#3B3399',
          800: '#271F66',
          900: '#130B33',
        },
      },
      borderRadius: { 
        '2xl': '1rem' 
      },
      boxShadow: { 
        'soft': '0 8px 24px rgba(0,0,0,0.08)' 
      },
    },
  },
  plugins: [],
};

export default config;




