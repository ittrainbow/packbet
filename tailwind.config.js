/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        fadeOutDown: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        fadeOutRight: {
          '0%': { opacity: 1, transform: 'translateX(0)' },
          '100%': { opacity: 0, transform: 'translateX(30px)' }
        },
        fadeOutLeft: {
          '0%': { opacity: 1, transform: 'translateX(0)' },
          '100%': { opacity: 0, transform: 'translateX(-30px)' }
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-10px)' }
        },
        bgPulse: {
          '0%': { backgroundColor: '#e5e5e5', backgroundOpacity: 1 },
          '50%': { backgroundColor: '#ffffff', backgroundOpacity: 0.75 },
          '100%': { backgroundColor: '#e5e5e5', backgroundOpacity: 1 }
        },
        rotateOne: {
          '0%': {
            transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(0deg)'
          },
          '100%': {
            transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(360deg)'
          }
        },
        rotateTwo: {
          '0%': {
            transform: 'rotateX(50deg) rotateY(10deg) rotateZ(0deg)'
          },
          '100%': {
            transform: 'rotateX(50deg) rotateY(10deg) rotateZ(360deg)'
          }
        },
        rotateThree: {
          '0%': {
            transform: 'rotateX(35deg) rotateY(55deg) rotateZ(0deg)'
          },
          '100%': {
            transform: 'rotateX(35deg) rotateY(55deg) rotateZ(360deg)'
          }
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp .2s ease-in-out',
        'fade-out-down': 'fadeOutDown .2s ease-in-out',
        'fade-out-right': 'fadeOutRight .2s ease-in-out',
        'fade-out-left': 'fadeOutLeft .2s ease-in-out',
        'bg-pulse': 'bgPulse 3s ease-in-out infinite',
        'rotate-one': 'rotateOne 1s linear infinite',
        'rotate-two': 'rotateTwo 1s linear infinite',
        'rotate-three': 'rotateThree 1s linear infinite'
      },
      colors: {
        'gray-250': '#d7d9db' // Example hex code for a shade between 200 and 300
      }
    }
  },
  plugins: []
}
