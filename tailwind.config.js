/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: {
          light: '#A3B18A',
          DEFAULT: '#588157',
          dark: '#3A5A40',
        },
        primaryBrown: {
          light: '#DDA15E',
          DEFAULT: '#BC6C25',
          dark: '#8C4A1A',
        }
      }
    },
  },
  plugins: [],
}
