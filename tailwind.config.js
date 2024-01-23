/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "786px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      // Add your custom styles or configurations here
    },
  },
  plugins: [],
};
