import type { Pokemon as PokemonType, PokemonMove } from "pokenode-ts";
import Meta from "./Meta";
import Stats from "./Stats";
import MoveSet from "./MoveSet";
import { useState } from "react";

type PokemonData = {
    data: PokemonType | undefined;
    children?: Array<JSX.Element> | JSX.Element;
};

function Pokemon(props: PokemonData): JSX.Element {
    const [moves, setMoves] = useState<Array<PokemonMove>>([]);

    if (props.data === undefined) {
        return <p>No Data</p>;
    }

    return (
        <details>
            <summary>
                <Meta data={props.data} />
            </summary>

            <Stats data={props.data} />

            <MoveSet
                moves={moves || []}
                setMoves={() => {
                    const randomMove =
                        props.data?.moves[
                            Math.floor(Math.random() * props.data?.moves.length)
                        ];

                    if (randomMove !== undefined) {
                        setMoves(moves?.concat([randomMove]));
                    }
                }}
            />

            {props.children}
        </details>
    );
}

export default Pokemon;
