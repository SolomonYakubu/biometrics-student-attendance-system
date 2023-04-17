/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/js/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#61dafb",

        bg1: "#0d0d0d",
        bg2: "#111111",
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(["disabled"]),
  },
  plugins: [],
};
