/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#131313", // Darkmode Primary
        secondary: "#1E1F21", // Darkmode Secondary
        border: "#2A2B35", // Darkmode Border
        accent: "#CA4141", // Darkmode accent
        light: "#BFC2E4", // Darkmode white
        background: "#0D0D0F", // background color belakang
        gray: "#656998", // buat placeholder (white secondary)
      },
      fontSize: {
        heading: "18px",
        largest: "36px",
        large: "32px",
        paragraph: "14px",
        title: "24px",
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
