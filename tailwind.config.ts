import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const extendColors = {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  chart: {
    1: "hsl(var(--chart-1))",
    2: "hsl(var(--chart-2))",
    3: "hsl(var(--chart-3))",
    4: "hsl(var(--chart-4))",
    5: "hsl(var(--chart-5))",
  },
};

const mistralExtraColors = {
  mistral: {
    beige: {
      DEFAULT: "hsl(var(--mistral-beige))",
      deep: "hsl(var(--mistral-deep-beige))",
      deeper: "hsl(var(--mistral-deeper-beige))",
    },
    red: {
      DEFAULT: "hsl(var(--mistral-red))",
    },
    orange: {
      DEFAULT: "hsl(var(--mistral-orange))",
      bright: "hsl(var(--mistral-orange-bright))",
    },
    black: {
      DEFAULT: "hsl(var(--mistral-black-matt))",
      deep: "hsl(var(--mistral-deep-black))",
      tint: "hsl(var(--mistral-black-matt-tint))",
    },
    sunshine: {
      50: "#FFF0C3",
      100: "#FFE295",
      200: "#FFDD8A",
      300: "#FFD06A",
      400: "#FFC452",
      500: "#FFB83E",
      600: "#FFAD2E",
    },
  },
};

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        ["mxl"]: "0",
      },
      screens: {
        sm: "100%",
        xl: "1248px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Arial", ...defaultTheme.fontFamily.sans],
        arial: ["var(--font-arial-c)"],
      },
      screens: {
        xl: "1248px",
        "4xl": "1440px",
      },
      fontSize: {
        "heading-0": ["72px", "72px"],
        "heading-1": ["56px", "56px"],
        "heading-2": ["40px", "42px"],
        "heading-3": ["30px", "34.5px"],
        subtitle: ["24px", "27.6px"],
        xl: ["18px", "21px"],
        "2xl": ["20px", "24px"],
        base: ["16px", "19.2px"],
        sm: ["14px", "22.4px"],
        "heading-0-md": ["103px", "97.85px"],
        "heading-1-md": ["90px", "90px"],
        "heading-2-md": ["56px", "53.2px"],
        "heading-3-md": ["48px", "45.6px"],
        "subtitle-md": ["32px", "36.8px"],
        "2xl-md": ["24px", "32px"],
      },
      spacing: {
        ["sm"]: "12px",
        ["md"]: "16px",
        ["xl"]: "24px",
        ["2xl"]: "32px",
        ["2xl-2"]: "40px",
        ["3xl"]: "48px",
        ["4xl"]: "64px",
        ["5xl"]: "96px",
        ["6xl"]: "128px",
      },
      colors: {
        ...mistralExtraColors,
        ...extendColors,
      },
      boxShadow: {
        ["deploy-logo"]:
          "-8px 16px 39px 0px rgba(127, 99, 21, 0.12), -33px 64px 72px 0px rgba(127, 99, 21, 0.10), -73px 144px 97px 0px rgba(127, 99, 21, 0.06), -130px 256px 115px 0px rgba(127, 99, 21, 0.02), -203px 400px 126px 0px rgba(127, 99, 21, 0)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(circle, hsla(45, 100%, 96%,1) 20%, hsla(45, 100%, 96%,.9) 40%, hsla(45, 100%, 96%,.1) 70%, hsla(45, 100%, 96%,0) 100%)",
        "menu-gradient":
          "linear-gradient(0deg, hsla(45, 100%, 96%, 0.6) 0%, hsla(45, 100%, 88%, 0.6) 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shine: {
          from: {
            backgroundPosition: "0 0",
            color: "transparent",
            opacity: "0.8",
          },
          to: {
            backgroundPosition: "-210% 0",
            color: "hsla(0, 0%, 12%, .6)",
            opacity: ".6",
          },
        },
        "shine-black": {
          from: {
            backgroundPosition: "0 0",
            color: "transparent",
            opacity: "0.8",
          },
          to: {
            backgroundPosition: "-210% 0",
            color: "hsla(0, 0%, 12%, 1)",
            opacity: ".8",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeInUp: "fadeInUp 0.2s ease-out forwards",
        shine: "shine 0.5s linear forwards",
        "shine-black": "shine-black 0.5s linear forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    // grid background plugin
    function ({ matchUtilities, theme, addComponents }: any) {
      const mergedColors = {
        ...colors,
        ...extendColors,
        ...mistralExtraColors,
      };

      // Handle dynamic grid sizes
      matchUtilities(
        {
          "bg-grid-size": (value: string) => {
            const [xValue, yValue] = value.split(" ");
            return {
              "--grid-size-x": xValue,
              "--grid-size-y": yValue || xValue,
            };
          },
        },
        { values: theme("gridSize", {}) },
      );

      matchUtilities(
        {
          "bg-grid-thickness": (value: string) => {
            return {
              "--grid-thickness": value,
            };
          },
        },
        { values: theme("gridSize", {}) },
      );

      // Handle dynamic grid colors
      matchUtilities(
        {
          "bg-grid": (value: string) => ({
            "--grid-color": value,
          }),
        },
        {
          values: theme("gridColor", {}),
          type: ["color", "any"],
        },
      );

      // Define static grid sizes
      const gridSizes = {
        xs: "25px",
        sm: "35px",
        md: "49.8px",
        lg: "75px",
        xl: "100px",
      };
      const gridThickness = {
        base: "1px",
        thin: "0.5px",
      };

      // Function to recursively generate color utilities
      const generateColorUtilities: any = (obj: any, prefix = "") => {
        return Object.entries(obj).reduce(
          (acc: any, [key, value]: [string, any]) => {
            const newPrefix = prefix ? `${prefix}-${key}` : key;

            if (typeof value === "object" && value !== null) {
              // Handle nested color objects
              return {
                ...acc,
                ...generateColorUtilities(value, newPrefix),
                ...(value.DEFAULT && {
                  [`.bg-grid-${newPrefix}`]: {
                    "--grid-color": value.DEFAULT,
                  },
                }),
              };
            } else {
              // Handle direct color values
              return {
                ...acc,
                [`.bg-grid-${newPrefix}`]: {
                  "--grid-color": value,
                },
              };
            }
          },
          {},
        );
      };

      // Generate all color utilities
      const colorUtilities = generateColorUtilities(mergedColors);

      // Add the base grid components
      addComponents({
        // Static size utilities
        ...Object.entries(gridSizes).reduce((acc: any, [key, value]) => {
          acc[`.bg-grid-size-${key}`] = {
            "--grid-size-x": value,
            "--grid-size-y": value,
          };
          return acc;
        }, {}),
        // Static thickness utilities
        ...Object.entries(gridThickness).reduce((acc: any, [key, value]) => {
          acc[`.bg-grid-thickness-${key}`] = {
            "--grid-thickness": value,
          };
          return acc;
        }, {}),
        // Color utilities
        ...colorUtilities,
        // Base grid class with the background pattern
        ".bg-grid-pattern": {
          "background-image": `
        linear-gradient(to right, var(--grid-color, rgba(0, 0, 0, 0.1)) var(--grid-thickness, 1px), transparent var(--grid-thickness, 1px)),
        linear-gradient(to bottom, var(--grid-color, rgba(0, 0, 0, 0.1))var(--grid-thickness, 1px), transparent var(--grid-thickness, 1px))
      `,
          "background-size":
            "var(--grid-size-x, 50.12px) var(--grid-size-y, 50.14px)",
          width: "100%",
          height: "100%",
        },
      });
    },
    // Design system typography plugin
    function ({ addComponents, theme }: any) {
      const typographyStyles = {
        ".heading-0": {
          fontSize: theme("fontSize.heading-0.0"),
          lineHeight: theme("fontSize.heading-0.1"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.heading-0-md.0"),
            lineHeight: theme("fontSize.heading-0-md.1"),
          },
        },
        ".heading-1": {
          fontSize: theme("fontSize.heading-1.0"),
          lineHeight: theme("fontSize.heading-1.1"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.heading-1-md.0"),
            lineHeight: theme("fontSize.heading-1-md.1"),
          },
        },
        ".heading-2": {
          fontSize: theme("fontSize.heading-2.0"),
          lineHeight: theme("fontSize.heading-2.1"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.heading-2-md.0"),
            lineHeight: theme("fontSize.heading-2-md.1"),
          },
        },
        ".heading-3": {
          fontSize: theme("fontSize.heading-3.0"),
          lineHeight: theme("fontSize.heading-3.1"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.heading-3-md.0"),
            lineHeight: theme("fontSize.heading-3-md.1"),
          },
        },
        ".subtitle": {
          fontSize: theme("fontSize.subtitle.0"),
          lineHeight: theme("fontSize.subtitle.1"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.subtitle-md.0"),
            lineHeight: theme("fontSize.subtitle-md.1"),
          },
        },
        ".text-2xl": {
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.2xl-md.0"),
            lineHeight: theme("fontSize.2xl-md.1"),
          },
        },
      };
      addComponents(typographyStyles);
    },
  ],
} satisfies Config;
