/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 2px 5px -0 rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
