/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: '#0A2540',
          darkBlue: '#0F2F57',
          blue: '#2563EB',
          sky: '#0284C7',
          amber: '#D97706',
          surface: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          darkText: '#0B192C'
        }
      }
    },
  },
  plugins: [],
}
