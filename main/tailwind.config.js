/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
      colors: {
        shine: {
          100: '#0369a1', // Dark Blue
          200: '#1e1b4b', // Deep Purple
          300: '#4c1d95', // Vibrant Purple
          // Add more custom shades as needed
        },
      },
      backgroundImage: {
        'gradient-shine': 'linear-gradient(to right, #0f172a, #1e1b4b, #4c1d95)', // Custom gradient
      },
    },
  },
  plugins: [],
}

