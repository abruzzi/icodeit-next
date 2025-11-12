const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        brand: "#e23e57",
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#e23e57",
              foreground: "#ffffff",
            },
            focus: "#e23e57",
          }
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#e23e57",
              foreground: "#000000",
            },
            focus: "#e23e57",
          },
        },
      },
    }),
    require("@tailwindcss/typography"),
  ],
};
