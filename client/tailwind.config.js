module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0F0F0F",
        graphite: "#1C1C1C",
        "electric-blue": "#2E8BFF",
        "neon-purple": "#8A2BE2",
        success: "#00E0A4",
        warning: "#FFB020",
        danger: "#FF5A5F"
      },
      keyframes: {
        "toast-in": {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "toast-in": "toast-in 0.25s ease-out",
        "fade-up": "fade-up 0.3s ease-out"
      }
    }
  },
  plugins: []
};
