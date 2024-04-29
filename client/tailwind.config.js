/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: "#88AB8E",
        secondary: "#AFC8AD",
        tertiary: "#EEE7DA",
        quaternary: "#F2F1EB",
      },
    },
  },
  plugins: [],
};
