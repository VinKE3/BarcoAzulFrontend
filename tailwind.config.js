/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        m: "700px",
      },
      fontSize: {
        md: "0.875rem",
        m: "0.87rem",
        sm: "0.75rem",
        xs: "0.69rem",
        mini: "0.63rem",
        minixs: "0.58rem",
      },
      fontWeight: {
        extrabold: 900,
        bold: 700,
        semibold: 500,
        medium: 400,
        normal: 300,
        thin: 100,
      },
      colors: {
        primary: {
          50: "#EAF7FF",
          100: "#DDF1FE",
          200: "#B0E3FD",
          300: "#7BD3FC",
          400: "#38BDF8",
          500: "#11A5EA",
          600: "#0586C9",
          700: "#046BA4",
          800: "#085A86",
          900: "#0C4A6F",
          950: "#09314D",
          dark: "#0586C9",
        },
        secondary: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          950: "#022C22",
          dark: "#059669",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
};
