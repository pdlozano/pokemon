module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "media",
    theme: {
        extend: {
            colors: {
                pokemon: "var(--color)",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
