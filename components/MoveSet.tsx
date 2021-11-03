import type { Pokemon, PokemonMove } from "pokenode-ts";
import { MoveClient } from "pokenode-ts";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/actions";
import Move from "./Move";

const api = new MoveClient();

type MoveSetData = {
    pokemon: Pokemon;
    item: number | string;
};

function MoveSet(props: MoveSetData): JSX.Element {
    const state = useSelector((state) => state.pokemonData);
    const dispatch = useDispatch();
    const availableMoves: Array<PokemonMove> =
        state.pokemon[props.item].pokemon.moves;
    const moves = state.pokemon[props.item].moves;
    const moveSet = Object.values(moves).map((move, index) => {
        if (move === null) {
            return (
                <button
                    key={index}
                    onClick={(e) => {
                        e.preventDefault();
                        const move =
                            availableMoves[
                                Math.floor(
                                    Math.random() * availableMoves.length
                                )
                            ].move.name;
                        const randomMove = api.getMoveByName(move);

                        randomMove.then((res) => {
                            const item =
                                typeof props.item === "string"
                                    ? parseInt(props.item)
                                    : props.item;

                            dispatch(actions.move.add(item, index, res));
                        });
                    }}
                    className="btn-move"
                >
                    {index}
                </button>
            );
        } else {
            return <Move api={api} data={move} key={index} />;
        }
    });
    console.log(moveSet);

    return (
        <>
            <h2>Moves</h2>
            <div className="w-full flex flex-wrap">{moveSet}</div>
        </>
    );
}

export default MoveSet;
