/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                textCol: "var(--text-color)",
                bgCol: "var(--bg-col)",
                lightbg: "var(--lightBg)",
                darkbg: "var(--darkBg)",
                darklightbg: "var(--darklightBg)",
                darkest: "var(--darkest)",
                darker: "var(--darker)",
            },
        },
    },
    plugins: [],
};
