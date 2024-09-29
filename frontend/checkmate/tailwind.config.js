/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'courier-new': ['Courier New', 'monospace'],
      },
      cursor: {
        'highlighter': "url(/cursor.png), crosshair",
      }
    },
  },
  plugins: [],
}