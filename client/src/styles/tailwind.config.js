module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: "480px",
      tablet: "768px",
      desktop: "1280px"
    },
    extend: {
      colors: {
        midnight: "#0F0F0F",
        graphite: "#1C1C1C",
        "electric-blue": "#2E8BFF",
        "neon-purple": "#8A2BE2"
      },
      boxShadow: {
        glow: "0 0 24px rgba(46, 139, 255, 0.4)"
      },
      backgroundImage: {
        luxury: "radial-gradient(circle at top, rgba(138,43,226,0.16), transparent 40%), radial-gradient(circle at 20% 20%, rgba(46,139,255,0.2), transparent 35%)"
      }
    }
  },
  plugins: []
};
