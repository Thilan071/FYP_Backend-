/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      colors: {
        'dark-purple': '#081A51',
        'light-white': 'rgba(255,255,255,0.17)',
      },
      fontFamily: {
        mainTextStyle: ['Manrope'],
        testText: ['Caveat'],
      },
      fontSize: {
        custom: '13px',
      },
      fontWeight: {
        custom: 700,
      },
      lineHeight: {
        custom: '16px',
      },
      letterSpacing: {
        custom: '0px',
      },

      backgroundImage: {
        'bg-image': "url('/BlackBg.svg')",
      },
    },
  },
  plugins: [],
};