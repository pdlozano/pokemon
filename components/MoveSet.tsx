import type { Pokemon } from "pokenode-ts";
import { MoveClient } from "pokenode-ts";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/actions";
import type { State } from "../redux/reducers/reducers";
import Move from "./Move";

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

    const availableMoves = state.pokemon.moves;
    console.log(state.moves, props.item);
    const moveSet = Object.entries(state.moves).map((item) => {
        const [key, val] = item;

        if (val === null) {
            return <p key={key}>Empty</p>;
        }

        return <Move item={val} key={key} />;
    });

    return <div>{moveSet}</div>;
}

export default MoveSet;
