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
        'fade-out-down': 'fadeOutDown .2s ease-in-out forwards',
        'fade-out-left': 'fadeOutLeft .2s ease-in-out forwards',
        'fade-out-right': 'fadeOutRight .2s ease-in-out forwards',
        'rotate-one': 'rotateOne 1s linear infinite',
        'rotate-two': 'rotateTwo 1s linear infinite',
        'rotate-three': 'rotateThree 1s linear infinite'
      },
      opacity: {
        15: '0.15'
      },
      colors: {
        packers: '#203731',
        accent: '#1B8A3E',
        gold: '#FFB612',
        canvas: '#F2F2F0',
        chrome: '#1E2320',
        ink: {
          DEFAULT: '#1A1A1A',
          muted: '#5C5C5C'
        }
      }
    }
  },
  plugins: []
}
