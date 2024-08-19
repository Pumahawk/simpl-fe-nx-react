/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: colors.sky,
      secondary: colors.slate,
    },
    extend: {},
  },
  plugins: [],
};
