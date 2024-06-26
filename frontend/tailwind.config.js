/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: [],
  darkMode: 'selector',
  theme: {
    extend: {
      fontSize: {
        '2.1xl': '1.6rem',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {transform: 'rotate(-1deg)'},
          '50%': {transform: 'rotate(1deg)'},
        },
      },
      animation: {
        wiggle: 'wiggle 0.1s linear infinite',
      },
      screens: {
        phone: '450px',
        fullhd: '1919px',
        twok: '2559px',
        fourk: '3839px',
      },
    },
  },
  plugins: [],
};

