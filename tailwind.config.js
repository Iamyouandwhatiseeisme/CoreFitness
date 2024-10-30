/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "dark-header": "rgb(17, 14, 14)",
      },
    },
  },
  plugins: [],
};
