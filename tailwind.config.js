import { screens as _screens } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",

  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const darkMode = "class";
export const theme = {
  keyframes: {
    slideUp: {
      "0%": {
        //  transform: "translateY(35%)",
        opacity: 0,
      },
      "100%": {
        // transform: "translateY(0)",
        opacity: 1,
      },
    },
  },
  animation: {
    slideUp: "slideUp 0.5s ease-out",
  },
  container: {
    center: true,
  },
  screens: {
    "2xs": "375px",
    xs: "550px",
    "3xl": "1880px",
    ..._screens,
  },
  nightwind: {
    transitionDuration: "0ms", // default '300ms'
  },
};
export const plugins = [require("nightwind")];
