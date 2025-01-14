/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'reapeat(auto-fill, minmax(200px, 1fr))'
      },
      colors: {
        'primary': '#4A6582',
      }
    },
  },
  plugins: [],
}