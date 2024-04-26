/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f45500",
        secondary: "#FFD700",
        dark: "#151515",
        light: "#FFFFFF",
        transparent: "#00000000",
      },
      backgroundImage: {
        bggradient: "linear-gradient(91deg, #ff9232 0%, #cc3e02 100%)",
        bghover: "linear-gradient(91deg, #00F9E5 100%, #1672F3 0%)",
      },
    },
  },
  plugins: [],
};
