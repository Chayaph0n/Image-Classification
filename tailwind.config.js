/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors : {
        red : '#e75e8d',
        redbutton : '#FC0456',
        blue : '#4be4ec',
        purple : '#a64bec',
        purplebutton : '#512DA8',
        dark : '#1f2122',
        middark : '#2F3132',
        lightdark : '#383A3B',
        graycustom : '#27292a',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded'],
  }
}

