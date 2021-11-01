import Pokemon from "../components/Pokemon";
import MoveSet from "../components/MoveSet";
import { PokemonClient } from "pokenode-ts";
import { useState, useEffect } from "react";
import type { Pokemon as PokemonType, PokemonMove } from "pokenode-ts";

const api = new PokemonClient();

function PokemonPage(): JSX.Element {
    const [text, setText] = useState<string>("gengar");
    const [active, setActive] = useState<string>("gengar");
    const [data, setData] = useState<PokemonType>();
    const [moves, setMoves] = useState<Array<PokemonMove>>([]);

    useEffect(
        function () {
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

            <Pokemon data={data}>
                <MoveSet
                    moves={moves || []}
                    setMoves={() => {
                        const randomMove =
                            data?.moves[
                                Math.floor(Math.random() * data?.moves.length)
                            ];

                        if (randomMove !== undefined) {
                            setMoves(moves?.concat([randomMove]));
                        }
                    }}
                />
            </Pokemon>
        </div>
    );
}

export default PokemonPage;
