/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        todo: "rgba(58, 58, 67, 0.98)",
        bodyBg: "rgb(32, 32, 42)",
      },

      spacing: {
        "2rem": "2rem",
        "3rem": "3rem",
      },

      fontSize: {
        2: "2rem",
      },
    },
  },
  plugins: [],
};
