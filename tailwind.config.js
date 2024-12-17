/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#202c37',
        'dark-element': '#2b3945',
        'light-text': '#111517',
        'light-bg': '#fafafa',
        'light-element': '#ffffff',
      }
    },
  },
  plugins: [],
}