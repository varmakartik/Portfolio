/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00F5FF',
        secondary: '#7C3AED',
        accent: '#22D3EE',
        background: '#030712',
        surface: '#111827',
        'surface-2': '#1F2937',
        'text-primary': '#FFFFFF',
        'text-secondary': '#9CA3AF',
        'text-muted': '#6B7280',
        border: '#1F2937',
        glow: 'rgba(0, 245, 255, 0.15)',
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'gradient-y': 'gradient-y 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
        'blob': 'blob 10s infinite',
        'aurora': 'aurora 15s ease infinite',
        'border-spin': 'border-spin 3s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0, 245, 255, 0.8)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee2': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'blob': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'aurora': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'border-spin': {
          '0%': { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
      },
      backgroundSize: {
        '200': '200% 200%',
        '300': '300% 300%',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: '475px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}
