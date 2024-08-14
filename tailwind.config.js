/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0.1, transform: 'translate(0px, 25px)' },
          '100%': { opacity: 1, transform: 'translate(0px, 0px)' }
        },
        fadeDown: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0.1 }
        },
        fadeIn: {
          '0%': { opacity: 0.1 },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        'fade-up': 'fadeUp .7s ease-in-out',
        'fade-down': 'fadeDown .4s ease-in-out',
        'fade-in': 'fadeIn .7s ease-in-out'
      },
      backgroundImage: {
        carbon: "url('./assets/carbon.jpg')"
      }
    }
  },
  plugins: []
}
