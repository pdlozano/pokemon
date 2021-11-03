import { Move, MoveClient } from "pokenode-ts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/actions";
import type { State } from "../redux/reducers/reducers";

type AddMoveData = {
    api: MoveClient;
    availableMoves: Readonly<Array<Move>>;
    item: number;
};

function AddMove(props: AddMoveData): JSX.Element {
    const [text, setText] = useState<string>("gengar");
    const state = useSelector(
        (state: { pokemonData: State }) => state.pokemonData.pokemon
    );
    const dispatch = useDispatch();

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(event) => {
                    event.preventDefault();
                    setText(event.target.value);
                }}
            />

            <button
                onClick={(event) => {
                    event.preventDefault();
                    props.api
                        .getMoveByName(text)
                        .then((data) => {
                            if (state[1] === null) {
                                dispatch(actions.move.add(props.item, 1, data));
                            } else if (state[2] === null) {
                                dispatch(actions.move.add(props.item, 2, data));
                            } else if (state[3] === null) {
                                dispatch(actions.move.add(props.item, 3, data));
                            } else if (state[4] === null) {
                                dispatch(actions.move.add(props.item, 4, data));
                            } else {
                                alert("Cannot add more than 4 moves");
                            }
                        })
                        .catch((error) => console.error(error));
                }}
            >
                Add Move
            </button>
        </div>
    );
}

export default AddMove;
