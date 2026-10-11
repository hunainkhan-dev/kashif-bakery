/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF4E6',
        paper: '#ffffff',
        ink: '#2A1A2E',
        pink: { DEFAULT: '#FF2E74', dark: '#e01a5e' },
        mustard: '#FFB703',
        mint: '#2EC4B6',
        grape: '#8B5CF6',
      },
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        pop: '4px 4px 0 #2A1A2E',
        'pop-lg': '8px 8px 0 #2A1A2E',
        'pop-sm': '2px 2px 0 #2A1A2E',
      },
      keyframes: {
        bob: { '50%': { transform: 'translateY(-16px) rotate(-8deg)' } },
        spin360: { to: { transform: 'rotate(360deg)' } },
        scrollx: { to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        bob: 'bob 3s ease-in-out infinite',
        spin360: 'spin360 14s linear infinite',
        scrollx: 'scrollx 22s linear infinite',
      },
    },
  },
  plugins: [],
};
