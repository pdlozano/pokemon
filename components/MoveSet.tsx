import type { PokemonMove } from "pokenode-ts";
import { MoveClient } from "pokenode-ts";
import Move from "./Move";

const api = new MoveClient();

type MoveSetData = {
    moves: Readonly<Array<PokemonMove>>;
    setMoves: () => void;
};

function MoveSet(props: MoveSetData): JSX.Element {
    if (props.moves.length > 4) {
        throw new Error("Moves cannot be more than 4");
    }
    const moves = props.moves.map((move) => {
        return <Move data={move} api={api} key={move.move.name} />;
    });
    const missing = new Array(4 - moves.length).fill(0).map((_, i) => {
        return (
            <button
                key={i}
                onClick={(e) => {
                    e.preventDefault();
                    props.setMoves();
                }}
                className="btn-move"
            >
                {i}
            </button>
        );
    });
    const moveSet = moves.concat(missing);

    return (
        <>
            <h2>Moves</h2>
            <div className="w-full flex flex-wrap">{moveSet}</div>
        </>
    );
}

export default MoveSet;
