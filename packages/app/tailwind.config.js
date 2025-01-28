/** @type {import('tailwindcss').Config} */
export default {
  presets: [require("@mystuff/tailwind-preset")],
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../common/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
