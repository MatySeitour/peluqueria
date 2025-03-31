/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        "200%": "200%",
      },
      backgroundPosition: {
        "right-bottom": "right bottom",
      },
    },
    plugins: [
      plugin(function ({ addComponents }) {
        addComponents({
          ".btn-gradient": {
            position: "relative",
            overflow: "hidden",
            backgroundImage:
              "linear-gradient(to bottom right, #64748b, #1e293b)",
            backgroundSize: "200%",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundPosition: "right bottom",
            },
          },
        });
      }),
    ],
  },
  darkMode: "class",
};
