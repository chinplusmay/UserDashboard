module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0a0a',
          50: '#1a1a1a',
          100: '#111111',
          200: '#1f1f1f',
          300: '#2a2a2a',
          400: '#3a3a3a',
        },
        accent: {
          cyan: '#06b6d4',
          teal: '#22d3ee',
          light: '#67e8f9',
          glow: 'rgba(6, 182, 212, 0.4)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(135deg, #06b6d4, #22d3ee, #67e8f9)',
        'gradient-dark': 'linear-gradient(to bottom, #0a0a0a, #111111)',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(6, 182, 212, 0.5)',
        'glow-lg': '0 0 30px -5px rgba(6, 182, 212, 0.7)',
        'glow-xl': '0 0 40px -5px rgba(6, 182, 212, 0.8)',
        'card': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px -5px rgba(6, 182, 212, 0.5)' },
          '50%': { boxShadow: '0 0 30px -5px rgba(6, 182, 212, 0.7)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
