module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "media",
    theme: {
        fontFamily: {
            header: ["'Readex Pro'", "sans-serif"],
            body: ["'Montserrat'", "sans-serif"],
        },
        extend: {
            colors: {
                pokemon: "var(--color)",
                pokemonlight: "var(--color-light)",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
