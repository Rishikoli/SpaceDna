/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nebula: ["Nebula"],
        Nebula2: ["Nebula Hollow"],
        Nebula3: ["library 3 am"],
      },
      keyframes: {
        fadeInOut: {
          "0%": { opacity: "0" },
          "20%": { opacity: "0.5" },
          "50%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in-out": "fadeInOut 10s forwards",
      },
    },
  },
  plugins: [],
};
