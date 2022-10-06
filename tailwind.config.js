/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '8rem',
        lg: '13rem',
        xl: '15rem',
        '2xl': '16rem',
      },
    },
    gridTemplateRows: {},
    extend: {},
  },
  plugins: [],
}
