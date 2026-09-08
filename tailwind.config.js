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
          navy: '#030816',
          darkBlue: '#0A152E',
          card: '#0F1E3D',
          steel: '#22355D',
          orange: '#FF5722',
          orangeHover: '#EA430D',
          amber: '#F59E0B',
          surface: '#F8FAFC',
          border: '#1E293B'
        }
      }
    },
  },
  plugins: [],
}
