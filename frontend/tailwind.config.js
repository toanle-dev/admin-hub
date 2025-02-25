/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      {
        customTheme: {
          // Ok
          primary: "#4CAF50",
          "primary-content": "#FFFFFF",
          secondary: "#424242",
          success: "#FFEB3B",
          warning: "#F44336",

          // TODO
          accent: "#9C27B0",
          info: "#42A5F5",
          neutral: "#2A2E37",
          "base-100": "#FFFFFF",
          error: "#FF5724",
        },
      },
    ],
  },
};
