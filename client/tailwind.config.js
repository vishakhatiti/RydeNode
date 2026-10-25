const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        base: withAlpha("--c-base"),
        surface: withAlpha("--c-surface"),
        "surface-2": withAlpha("--c-surface-2"),
        line: withAlpha("--c-line"),
        fg: withAlpha("--c-fg"),
        muted: withAlpha("--c-muted"),
        subtle: withAlpha("--c-subtle"),
        brand: withAlpha("--c-brand"),
        accent: withAlpha("--c-accent"),
        sun: withAlpha("--c-sun"),
        success: withAlpha("--c-success"),
        warning: withAlpha("--c-warning"),
        danger: withAlpha("--c-danger")
      },
      boxShadow: {
        card: "0 1px 2px rgb(0 0 0 / 0.06), 0 12px 32px -12px rgb(var(--c-brand) / 0.25)",
        glow: "0 8px 24px -6px rgb(var(--c-brand) / 0.55)"
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
