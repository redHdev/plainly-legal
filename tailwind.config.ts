import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["src/**/*.{ts,tsx}", "components/ui/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      orange: "#F88379",
      salmon: "#F88379",
      red: "#FF3E3E",
      yellow: "#FEA935",
      // blue: "#59CBE8",
      green: "#66BB6A",
      blue: {
        50: "#F2FCFF",
        100: "#E1F7FC",
        200: "#D0F1FA",
        300: "#BFECF7",
        400: "#AEE6F5",
        500: "#9DE1F2",
        600: "#8CDBF0",
        700: "#7BD6ED",
        800: "#6AD0EB",
        900: "#59CBE8",
        DEFAULT: "#59CBE8",
      },
      alt_blue: {
        50: "#F2F9FF",
        100: "#E1F0FF",
        200: "#D0E6FF",
        300: "#BFDDFF",
        400: "#c6e0f5",
        500: "#9fc5e8",
        600: "#6fa8dc",
        700: "#4b8ac9",
        800: "#2a6cb3",
        900: "#1d4f8c",
        DEFAULT: "#1d4f8c",
      },
      purple: {
        50: "#F6F5FD",
        100: "#DDDCE7",
        200: "#C4C3D0",
        300: "#ABAABA",
        400: "#9291A4",
        500: "#7A798D",
        600: "#616077",
        700: "#484761",
        800: "#2F2E4A",
        900: "#161534",
        DEFAULT: "#161534",
      },
      light_purple: {
        50: "#EDECFE",
        100: "#E2E0FD",
        200: "#D7D4FD",
        300: "#CCC8FC",
        400: "#C1BCFC",
        500: "#B7B0FB",
        600: "#ACA4FB",
        700: "#A198FA",
        800: "#968CFA",
        900: "#8B80F9",
        DEFAULT: "#8B80F9",
      },
      gray: colors.gray, // "#CCCCCC"
      black: colors.black, // "#161534"
      white: colors.white, // "#FFFFFF"
    },
    extend: {
      transitionDuration: {
        "400": "400ms",
      },
      screens: {
        xs: "460px",
        header: "980px",
      },
      fontFamily: {
        lato: ["Lato", ...fontFamily.sans],
        sans: ['"Open Sans"', ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        bg_pulse: {
          "0%, 100%": { background: colors.purple[50] },
          "50%": { background: colors.gray[100] },
        },
        opacity_pulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        fadeInUp_50: {
          from: {
            opacity: "0",
            transform: "translateY(50px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      /* Syntax:: duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name */
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        bg_pulse: "bg_pulse 1s linear infinite",
        opacity_pulse: "opacity_pulse 1.5s ease-out infinite",
        fadeInUp_50: "0.3s ease-out 0s 1 forwards fadeInUp_50",
        fadeInUp_delayed: "0.3s ease-out 0.35s 1 forwards fadeInUp_50",
        "spin-fast": "spin .5s linear infinite",
        spin: "spin 1s linear infinite",
        "spin-slow": "spin 2s linear infinite",
      },
      margin: {
        "10vh": "10vh",
      },
      minHeight: {
        "645": "645px",
      },
      maxHeight: {
        dialog: "calc(100svh - 200px)",
      },
      width: {
        "dialog-xs": "min(460px, calc(100% - 2rem))",
        "dialog-sm": "min(767px, calc(100% - 2rem))",
        "dialog-md": "min(990px, calc(100% - 2rem))",
        "dialog-lg": "min(1280px, calc(100% - 2rem))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
