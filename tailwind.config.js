/** @type {import('tailwindcss').Config} */
module.exports = {
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
        primary: "var(--primary)",
        darkGreen: '#0A4A1F',
        symptomButtons: "var(--symptom-buttons)",
        diagnoseButton: "var(--diagnose-button)",
        resetButton: "var(--reset-button)",
        resultsCard: "var(--results-card)",
        resultBorder: "var(--result-card-border)",
        cardText: "var(--card-text)",
        header: "var(--header)",
        blueText: "var(--blue-text)",
        sideBar: "var(--sidebar)", 
        sideBarText: "var(--sidebar-text)",
      },
    },
  },
  plugins: [],
};
