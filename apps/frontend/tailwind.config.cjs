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
  },
  corePlugins: {
    preflight: false,
  },
  important: '#root',
  plugins: [],
}
