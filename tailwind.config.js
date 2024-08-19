/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: "#161925",
      "primary-light": "#23395b",
      secondary: "#8ea8c3",
      "secondary-light": "#cbf7ed",
    },
    extend: {},
  },
  plugins: [],
};
