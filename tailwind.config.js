/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 0 3.2rem rgba(0, 0, 0, 0.2)",
      },
      colors: {
        // main
        main: "#1c1c3c",

        sectionbg: "#333350",
        main50: "#001831",
        subheading: "#191936",
        heading: "#333333",
        altheading: "#e6e6e6",
        altsubheading: "#b3b3b3",
        btn: "#0076f5",

        // colors
        paragraph: "#444",
        white5: "#fdf2e9",
        white16: "#eee",
        white48: "#ccc",
        white64: "#ddd",

        // other
        icons: "rgba(76, 161, 255, 0.86)",
      },
      letterSpacing: {
        mini: "1.05",
      },
      transitionDuration: {
        short: "0.3s",
      },
      translate: {
        default: "-50%, -50%",
      },
    },
  },

  plugins: [],
}
