/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#bcddff',
          300: '#8ec8ff',
          400: '#59a8ff',
          500: '#2f86f6',
          600: '#1868ec',
          700: '#1453d0',
          800: '#1645a8',
          900: '#173d84',
          950: '#0f2547',
        },
      },
    },
  },
  plugins: [],
};
