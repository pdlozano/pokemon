import type { Pokemon } from "pokenode-ts";
import { MoveClient } from "pokenode-ts";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/actions";
import Move from "./Move";
import type { State } from "../redux/reducers/reducers";
import Change from "./Change";
import { textToPokemonMove } from "../modules/textToPokemon";

const api = new MoveClient();
type MoveSetData = {
    data: Pokemon | undefined;
    item: string;
};

function MoveSet(props: MoveSetData): JSX.Element {
    if (props.data === undefined) {
        return <div></div>;
    }

    const state = useSelector((state: { pokemonData: State }) => {
        return state.pokemonData.pokemon[parseInt(props.item)];
    });
    const dispatch = useDispatch();
    if (state === null) {
        return <div></div>;
    }

    const availableMoves = state.pokemon.moves.map((move) => move.move.name);
    const moveSet = Object.entries(state.moves).map((item, index) => {
        const [key, val] = item;

        if (val !== null) {
            return <Move key={key} data={val} />;
        }

        return (
            <Change
                func={(text) => {
                    const move = text.replaceAll(" ", "-");
                    if (availableMoves.indexOf(move) !== -1) {
                        textToPokemonMove(move).then((res) => {
                            if (res) {
                                dispatch(
                                    actions.move.add(
                                        parseInt(props.item),
                                        index,
                                        res
                                    )
                                );
                            }
                        });
                    } else {
                        alert("Move not available");
                    }
                }}
                available={availableMoves.map((text) => {
                    return text.replaceAll("-", " ");
                })}
            >
                Change Move
            </Change>
        );
    });

    return <div className="grid grid-cols-2 grid-rows-2 gap-2">{moveSet}</div>;
}

export default MoveSet;
