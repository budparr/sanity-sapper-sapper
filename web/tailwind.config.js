const {
  colors: { teal, orange, pink, ...colors }
} = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    container: {
      center: true,
      padding: "2rem"
    },
    colors: colors,
    extend: {
      fontSize: {        
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem"
      },
      colors: {
        linen: {
          100: "#f9f0eb"
        },
        salmon: {
          100: "#FDF4F3",
          200: "#F9E5E1",
          300: "#F5D5CF",
          400: "#EEB5AA",
          500: "#E79586",
          600: "#D08679",
          700: "#8B5950",
          800: "#68433C",
          900: "#452D28"
        },
        primary: {
          100: "#F0ECEB",
          200: "#DACFCD",
          300: "#C3B2AF",
          400: "#977873",
          500: "#6A3E37",
          600: "#5F3832",
          700: "#402521",
          800: "#301C19",
          900: "#201311"
        }
      }
    }
  },
  variants: {},
  plugins: []
};
