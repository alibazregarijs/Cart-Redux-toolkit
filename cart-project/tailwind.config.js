const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        mainColor: "#FBF8F9",
        secondaryColor: "#F0F0F0",
        blackOverlay: "rgba(0, 0 ,0 ,0.8)",
        blackOverlaySection: "rgba(0, 0 ,0 ,0.6)",
        blackOverlayBackground: "rgba(0, 0 ,0 ,0.3)",
      },
      colors:{
        mainColor: "#000000",
        secondaryColor: "#FF6500",
      }
    },
  },
  plugins: [nextui()],
};