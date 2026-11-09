import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        agency: {
          dark: "#08080A",
          darker: "#030304",
          card: "#121217",
          cardBorder: "#23232D",
          orange: "#FF5E1E",
          orangeHover: "#FF753E",
          orangeGlow: "rgba(255, 94, 30, 0.25)",
          purple: "#8B5CF6",
          purpleHover: "#A78BFA",
          purpleGlow: "rgba(139, 92, 246, 0.25)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "agency-gradient": "linear-gradient(135deg, #FF5E1E 0%, #8B5CF6 100%)",
        "agency-gradient-subtle": "linear-gradient(135deg, rgba(255,94,30,0.12) 0%, rgba(139,92,246,0.12) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

