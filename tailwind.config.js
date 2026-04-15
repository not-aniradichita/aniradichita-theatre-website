export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7f2',
          100: '#ffe3d1',
          200: '#f9b388',
          300: '#f07149',
          400: '#e85b2b',
          500: '#dc4a19',
          600: '#bc3714',
          700: '#8f2d12',
          800: '#71220f',
          900: '#541a0d'
        }
      },
      boxShadow: {
        glow: '0 15px 40px rgba(232,101,58,0.18)',
      },
      animation: {
        marquee: 'marquee 24s linear infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    }
  },
  plugins: []
};
