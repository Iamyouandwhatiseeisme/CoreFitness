/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "dark-header": "rgb(17, 14, 14)",
        "header-hover-dark": "rgba(255, 255, 255, 0.2)",
      },
      transitionProperty: {
        "header-hover-transition": "background-color 0.5s",
      },
    },
  },
  plugins: [],
};
