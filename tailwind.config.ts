import React from "react";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["selector"],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        slideIn: {
          "0%": {
            transform: "translateY(-10%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        firstScrollHeader: {
          "0%": {
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
          },
          "100%": {
            borderBottomLeftRadius: "50px",
            borderBottomRightRadius: "50px",
          },
        },
        firstScrollHeaderReverse: {
          "0%": {
            borderBottomLeftRadius: "50px",
            borderBottomRightRadius: "50px",
          },
          "100%": {
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
          },
        },
      },
      animation: {
        scroll: "scroll 20s linear infinite",
        "slide-in": "slideIn 150ms ease-in-out",
        "first-scroll-header": "firstScrollHeader 800ms ease-in-out forwards",
        "first-scroll-header-reverse":
          "firstScrollHeaderReverse 800ms ease-in-out forwards",
      },
      backgroundImage: {
        "gym-background": "url('/images/Gym Background.jpg')",
        "workout-bg": "url('/images/Workout Background.jpg')",
        gemini: "url('/images/Gemini.jpg')",
        aurora: "url('/images/Aurora.webp')",
        "chatbot-background": "url('/images/Chatbot Background.jpg')",
        disabled: "url('/images/Disabled.jpg')",
      },
      colors: {
        "dark-header": "rgb(17, 14, 14)",
        "header-hover-dark": "#232323",
        "header-green": "#276749",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      transitionProperty: {
        "header-hover-transition": "background-color 0.5s",
      },
      minHeight: {
        wrapper: "calc(100vh - 110px)",
      },
      maxHeight: {
        "40vh": "40vh",
      },
      height: {
        "120": "500px",
        "150": "650px",
        "60vh": "60vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "100vh": "100vh",
      },
      width: {
        "info-board-hover-width": "550px",
        "60wv": "60vw",
        "95%": "95%",
        "150": "1200px",
      },
      scale: {
        "1.02": "1.02",
      },
      borderRadius: {
        "50": "50px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "small-black-shadow": "0 4px 6px rgba(0, 0, 0, 0.1);",
      },
      transitionDelay: {
        "0.3": "0.03s",
      },
      transitionDuration: {
        "1500": "1500ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
