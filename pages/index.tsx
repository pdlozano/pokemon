import Pokemon from "../components/Pokemon";
import { PokemonClient } from "pokenode-ts";
import { useState, useEffect } from "react";
import type { Pokemon as PokemonType } from "pokenode-ts";

const api = new PokemonClient();

function PokemonPage(): JSX.Element {
    const [text, setText] = useState<string>("gengar");
    const [active, setActive] = useState<string>("gengar");
    const [data, setData] = useState<PokemonType>();

    useEffect(
        function () {
            console.log(active);
            api.getPokemonByName(active)
                .then((data) => setData(data))
                .catch((error) => console.error(error));
        },
        [active]
    );

    return (
        <div>
            <input
                type="text"
                onChange={(event) => {
                    event.preventDefault();
                    setText(event.target.value);
                }}
                value={text}
            />
            <button
                onClick={(event) => {
                    event.preventDefault();
                    setActive(text.toLowerCase());
                }}
            >
                Search
            </button>

            <Pokemon data={data}></Pokemon>
        </div>
    );
}

export default PokemonPage;
