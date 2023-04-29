const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",

    "./node_modules/tailwind-datepicker-react/dist/**/*.js", // <--- Add this line
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    screens: {
      "2xs": "375px",
      xs: "550px",
      "3xl": "1880px",
      ...defaultTheme.screens,
    },
    nightwind: {
      transitionDuration: "0ms", // default '300ms'
    },
  },
  plugins: [require("nightwind")],
};
