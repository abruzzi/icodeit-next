const { heroui } = require("@heroui/react");
const plugin = require("tailwindcss/plugin");

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
        brandSecondary: "#C084FC",
        brandDanger: "#b91c1c",
        "palette-magenta": "#ff0855",
        "palette-azure": "#0090ff",
        "palette-tangerine": "#ff8000",
        "palette-gold": "#f4c70f",
        "palette-jade": "#00b209",
        slate: {
          150: "#e8edf3",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: [
          "var(--font-heading)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "monospace",
        ],
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
    plugin(({ addBase }) => {
      addBase({
        ":root": {
          "--palette-magenta": "#ff0855",
          "--palette-azure": "#0090ff",
          "--palette-tangerine": "#ff8000",
          "--palette-gold": "#f4c70f",
          "--palette-jade": "#00b209",
        },
      });
    }),
  ],
};
