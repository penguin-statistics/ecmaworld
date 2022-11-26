/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: '150ms',
      },
    },
    screens: {
      sm: '320px',
      md: '672px',
      lg: '1056px',
      xl: '1312px',
      '2xl': '1584px',
    },
  },
  plugins: [],
}
