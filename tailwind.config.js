// filepath: /tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Oceanic Teal / Dark Petrol Teal Resmi (#012E34)
        oceanic: {
          DEFAULT: '#012E34',
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#012E34',
          700: '#01282D',
          800: '#012227',
          900: '#011C20',
          950: '#011417',
        },
        blue: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#012E34',
          700: '#01282D',
          800: '#012227',
          900: '#011C20',
          950: '#011417',
        },
        cyan: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
          950: '#083344',
        }
      }
    },
  },
  plugins: [],
};
