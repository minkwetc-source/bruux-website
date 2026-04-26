import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0A0A",
          surface: "#141414",
          elevated: "#1A1A1A",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.06)",
          medium: "rgba(255, 255, 255, 0.12)",
          strong: "#1E1E1E",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#888888",
          tertiary: "#555555",
          muted: "#333333",
        },
        accent: {
          DEFAULT: "#C4A35A",
          hover: "#D4B86A",
          subtle: "rgba(196, 163, 90, 0.12)",
          border: "rgba(196, 163, 90, 0.3)",
        },
        bsp: {
          brown: "#8B6914",
          green: "#1a3a2a",
          slate: "#4a5568",
        },
      },
      fontFamily: {
        heading: ["var(--font-bebas-neue)", "Impact", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        ui: ["var(--font-dm-sans)", "sans-serif"],
      },
      fontSize: {
        "hero-mobile": ["48px", { lineHeight: "1", letterSpacing: "0.04em" }],
        "hero": ["120px", { lineHeight: "1", letterSpacing: "0.06em" }],
        "section": ["64px", { lineHeight: "1", letterSpacing: "0.04em" }],
        "section-mobile": ["36px", { lineHeight: "1", letterSpacing: "0.03em" }],
        "card-title": ["32px", { lineHeight: "1.1", letterSpacing: "0.02em" }],
      },
      letterSpacing: {
        label: "0.2em",
        button: "0.15em",
        nav: "0.15em",
      },
      spacing: {
        "4xl": "80px",
        "5xl": "120px",
      },
      maxWidth: {
        container: "1280px",
      },
      backgroundImage: {
        "gold-fade":
          "linear-gradient(90deg, #0a0a0a, #c4a35a, #0a0a0a)",
        "hero-glow":
          "radial-gradient(circle, rgba(196,163,90,0.08) 0%, transparent 70%)",
        "card-hover":
          "linear-gradient(135deg, #141414, #1a1a1a)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-cubic": "cubic-bezier(0.33, 1, 0.68, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      animation: {
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(196, 163, 90, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(196, 163, 90, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
