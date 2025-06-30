/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        azulOscuro: '#395886',
        azulFuerte: '#638ECB',
        azulClaro: '#D5DEEF',
        rojoFuerte: '#B21613',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'], // Poppins como fuente principal
      },
    },
  },
  plugins: [],
};
