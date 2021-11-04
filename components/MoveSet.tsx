import type { Pokemon } from "pokenode-ts";
import { MoveClient } from "pokenode-ts";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/actions";
import Move from "./Move";
import type { State } from "../redux/reducers/reducers";

const api = new MoveClient();

type MoveSetData = {
    data: Pokemon;
    item: string;
};

function MoveSet(props: MoveSetData): JSX.Element {
    const state = useSelector((state: { pokemonData: State }) => {
        return state.pokemonData.pokemon[parseInt(props.item)];
    });
    const dispatch = useDispatch();
    if (state === null) {
        return <div></div>;
    }

    const availableMoves = state.pokemon.moves.map((move) => move.move.name);
    const moveSet = Object.entries(state.moves).map((item) => {
        const [key, val] = item;

        if (val !== null) {
            return <Move key={key} data={val} />;
        }

        return (
            <p
                key={key}
                onClick={(event) => {
                    event.preventDefault();
                    const randomMove =
                        availableMoves[
                            Math.floor(Math.random() * availableMoves.length)
                        ];
                    api.getMoveByName(randomMove).then((res) => {
                        dispatch(
                            actions.move.add(
                                parseInt(props.item),
                                parseInt(key),
                                res
                            )
                        );
                    });
                }}
            >
                Empty
            </p>
        );
    });

    return <div className="grid grid-cols-2 grid-rows-2 gap-2">{moveSet}</div>;
}

export default MoveSet;
