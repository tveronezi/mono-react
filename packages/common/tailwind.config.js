/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@mystuff/tailwind-preset")],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
