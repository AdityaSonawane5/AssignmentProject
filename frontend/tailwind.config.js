/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F5F6F3',
          dim: '#ECEEEA',
          card: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#1E2421',
          soft: '#4A524D',
          faint: '#8A928C',
        },
        pine: {
          DEFAULT: '#2F4B3C',
          light: '#3F6552',
          dark: '#1F3329',
        },
        status: {
          want: '#5B7C99',
          reading: '#C68D2E',
          completed: '#3F7D5C',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      boxShadow: {
        shelf: '0 1px 2px rgba(30, 36, 33, 0.06), 0 4px 12px rgba(30, 36, 33, 0.05)',
      },
      borderRadius: {
        sm2: '6px',
      },
    },
  },
  plugins: [],
};
