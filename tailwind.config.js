/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/screens/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // paleta de cores seguindo monocromatico da #FFA73B para o tailwind
        'primary-50': '#fff7e6',
        'primary-100': '#ffebcc',
        'primary-200': '#ffd999',
        'primary-300': '#ffcc66',
        'primary-400': '#ffb933',
        'primary-500': '#ffa73b',
        'primary-600': '#ff9933',
        'primary-700': '#ff8a2b',
        'primary-800': '#ff7c24',
        'primary-900': '#ff6e1c',
        'primary-1000': '#ff6014',
        'primary-dark-1000': '#e65c13',
        'primary-dark-900': '#d95612',
        'primary-dark-800': '#c64f11',
        'primary-dark-700': '#b34910',
        'primary-dark-600': '#a0430f',
        'primary-dark-500': '#8e3d0e',
        'primary-dark-400': '#7c370d',
        'primary-dark-300': '#6a310c',
        'primary-dark-200': '#582b0b',
        'primary-dark-100': '#46250a',
        'primary-dark-50': '#341f09',
      },
    },
  },
  plugins: [],
};
