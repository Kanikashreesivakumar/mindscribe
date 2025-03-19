import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cyberpunk theme colors
        cyberpunk: {
          "deep-blue": "#0a1128",
          "neon-purple": "#9d4edd",
          "neon-blue": "#3a86ff",
          "dark-purple": "#240046",
          "glow-purple": "#c77dff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            filter: "brightness(1) blur(5px)",
          },
          "50%": {
            opacity: "0.6",
            filter: "brightness(1.8) blur(12px)",
          },
        },
        "text-appear": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "brain-pulse": {
          "0%": {
            boxShadow: "0 0 5px 2px rgba(157, 78, 221, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 25px 8px rgba(157, 78, 221, 0.9)",
          },
          "100%": {
            boxShadow: "0 0 5px 2px rgba(157, 78, 221, 0.5)",
          },
        },
        "upload-pulse": {
          "0%": {
            borderColor: "rgba(157, 78, 221, 0.3)",
          },
          "50%": {
            borderColor: "rgba(157, 78, 221, 0.8)",
          },
          "100%": {
            borderColor: "rgba(157, 78, 221, 0.3)",
          },
        },
        "thought-wave": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0.7",
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0.95)",
            opacity: "0.7",
          },
        },
        "neural-scan": {
          "0%": {
            backgroundPosition: "0% 0%",
          },
          "100%": {
            backgroundPosition: "100% 100%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 3s infinite ease-in-out",
        "text-appear": "text-appear 0.5s ease-out forwards",
        float: "float 6s infinite ease-in-out",
        "brain-pulse": "brain-pulse 3s infinite ease-in-out",
        "upload-pulse": "upload-pulse 2s infinite ease-in-out",
        "thought-wave": "thought-wave 4s infinite ease-in-out",
        "neural-scan": "neural-scan 3s linear infinite alternate",
      },
      backgroundImage: {
        "cyberpunk-grid":
          "linear-gradient(rgba(157, 78, 221, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(157, 78, 221, 0.1) 1px, transparent 1px)",
        "cyberpunk-gradient": "linear-gradient(to right, #0a1128, #240046)",
        "neural-pattern":
          "linear-gradient(45deg, rgba(157, 78, 221, 0.1) 25%, transparent 25%, transparent 50%, rgba(157, 78, 221, 0.1) 50%, rgba(157, 78, 221, 0.1) 75%, transparent 75%, transparent)",
      },
      boxShadow: {
        "neon-glow":
          "0 0 10px rgba(157, 78, 221, 0.7), 0 0 20px rgba(157, 78, 221, 0.5), 0 0 30px rgba(157, 78, 221, 0.3)",
        "neon-blue-glow":
          "0 0 10px rgba(58, 134, 255, 0.7), 0 0 20px rgba(58, 134, 255, 0.5), 0 0 30px rgba(58, 134, 255, 0.3)",
        "intense-neon-glow":
          "0 0 15px rgba(157, 78, 221, 0.8), 0 0 30px rgba(157, 78, 221, 0.6), 0 0 45px rgba(157, 78, 221, 0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

