/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#64a70b',
          light: '#86c42b',
          dark: '#4a7a08',
        },
      },
    },
  },
  plugins: [],
};