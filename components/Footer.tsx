function Footer(): JSX.Element {
    const year = new Date().getFullYear();
    return (
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-2 px-4 py-2 mt-2 bg-gray-200 dark:bg-gray-900">
            <div className="col-span-2">
                <h2>About</h2>
                <p>
                    This app is made by{" "}
                    <a href="https://davidlozano.me">David Lozano</a> as a fun
                    side project.
                </p>
                <p>Copyright &copy; {year} | All Rights Reserved</p>
            </div>

            <div>
                <p>
                    Data taken from <a href="https://pokeapi.co/">PokéAPI</a>
                </p>
                <p>
                    Pokémon and Pokémon character names are trademarks of
                    Nintendo
                </p>
            </div>
        </footer>
    );
}

export { Footer };
