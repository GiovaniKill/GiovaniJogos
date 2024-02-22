/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: [],
  theme: {
    extend: {
      fontSize: {
        '2.1xl': '1.6rem',
      },
    },
  },
  plugins: [],
};

