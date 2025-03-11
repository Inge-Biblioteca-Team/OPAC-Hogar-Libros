/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        Bottoms: {
          light: "#",
          DEFAULT: "#1a53d9", //Cuerpo del boton
          dark: "#142c6c", //Hover del boton
        },
        Text: {
          light: "#",
          DEFAULT: "#FFFFFF", //Blanco
          dark: "#00000", //Negro
        },
        Body: {
          light: "#557EE9", //Color viejo
          DEFAULT: "#1a53d9", //Color Nuevo
          dark: "#111827", //Color del footer el mas obscuro
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
