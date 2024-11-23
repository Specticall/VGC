/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#131313",
        secondary: "#1E1F21",
        border: "#2A2B35",
        accent: "#CA4141",
        light: "#BFC2E4",
        background: "#0D0D0F",
        gray: "#656998",
      },
    },
    screens: {
      "2xl": { max: "1440px" },
      xl: { max: "1200px" },
      lg: { max: "900px" },
      md: { max: "768px" },
      sm: { max: "600px" },
      xs: { max: "450px" },
    },
  },
  plugins: [],
};
