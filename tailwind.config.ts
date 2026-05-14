import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Urbanist",
          "Freesentation",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontWeight: {
        Thin: "100",
        ExtraLight: "200",
        Light: "300",
        Regular: "400",
        Medium: "500",
        SemiBold: "600",
        Bold: "700",
        ExtraBold: "800",
        Black: "900",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: {
          1: "var(--secondary-1)",
          2: "var(--secondary-2)",
        },
        main: {
          1: "var(--main-1)",
          2: "var(--main-2)",
          3: "var(--main-3)",
          4: "var(--main-4)",
        },
        sub: {
          1: "var(--sub-1)",
          2: "var(--sub-2)",
          3: "var(--sub-3)",
          4: "var(--sub-4)",
        },
        text: {
          main: "var(--text-main)",
          sub: "var(--text-sub)",
          up: "var(--text-up)",
          down: "var(--text-down)",
        },
        default: "var(--default)",
        active: "var(--active)",
        inactive: "var(--inactive)",
        field: {
          it: "var(--field-it)",
          mobility: "var(--field-mobility)",
          finance: "var(--field-finance)",
          bio: "var(--field-bio)",
          steal: "var(--field-steal)",
          energy: "var(--field-energy)",
          communication: "var(--field-communication)",
          staples: "var(--field-staples)",
          mechanic: "var(--field-mechanic)",
          utility: "var(--field-utility)",
        },
      },
    },
  },
} satisfies Config;

export default config;
