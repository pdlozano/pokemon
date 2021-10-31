import type { PokemonMove } from "pokenode-ts";
import { useState } from "react";

type MoveSetData = {
    available: Readonly<Array<PokemonMove>>;
};

function MoveSet(props: MoveSetData): JSX.Element {
    const [moves, setMoves] = useState<Array<PokemonMove>>([]);

    return (
        <>
            <h2>Moves</h2>
            <div className="w-full flex flex-wrap">
                <button className="btn-move">1</button>
                <button className="btn-move">2</button>
                <button className="btn-move">3</button>
                <button className="btn-move">4</button>
            </div>
        </>
    );
}

export default MoveSet;
