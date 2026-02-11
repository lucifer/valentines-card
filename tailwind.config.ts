import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      // Customize pink/rose palette here
      colors: {
        valentine: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(100vh) translateX(0) rotate(0deg)', opacity: '0.3' },
          '10%': { opacity: '0.4' },
          '90%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-20vh) translateX(20px) rotate(20deg)', opacity: '0' },
        },
        burstUp: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-120px) scale(1.2)', opacity: '0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        floatUp: 'floatUp 20s ease-in-out infinite',
        burstUp: 'burstUp 1.8s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
