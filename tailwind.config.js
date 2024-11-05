/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "gym-background": "url('/images/Gym Background.jpg')",
      },
      colors: {
        "dark-header": "rgb(17, 14, 14)",
        // "header-hover-dark": "rgba(255, 255, 255, 0.2)",
        "header-hover-dark": "#232323",
      },
      transitionProperty: {
        "header-hover-transition": "background-color 0.5s",
      },
      minHeight: {
        wrapper: "calc(100vh - 110px)",
      },
      height: {
        "80vh": "80vh",
      },

      width: {
        "60wv": "60vw",
      },
      scale: {
        1.02: "1.02",
      },
      borderRadius: {
        50: "50px",
      },
      boxShadow: {
        "small-black-shadow": "0 4px 6px rgba(0, 0, 0, 0.1);",
      },
      transitionDelay: {
        0.3: "0.03s",
      },
    },
  },
  plugins: [],
};
