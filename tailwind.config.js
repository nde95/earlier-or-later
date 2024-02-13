/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      Sora: ["Sora", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
      Nunito: ["Nunito Sans", "sans-serif"],
    },
    plugins: [],
  },
};
