import { PokemonClient } from "pokenode-ts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/actions";
import type { State } from "../redux/reducers/reducers";

type AddPokemonData = {
    api: PokemonClient;
};

function AddPokemon(props: AddPokemonData): JSX.Element {
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
                        .getPokemonByName(text)
                        .then((data) => {
                            if (state[1] === null) {
                                dispatch(actions.pokemon.add(1, data));
                            } else if (state[2] === null) {
                                dispatch(actions.pokemon.add(2, data));
                            } else if (state[3] === null) {
                                dispatch(actions.pokemon.add(3, data));
                            } else if (state[4] === null) {
                                dispatch(actions.pokemon.add(4, data));
                            } else if (state[5] === null) {
                                dispatch(actions.pokemon.add(5, data));
                            } else if (state[6] === null) {
                                dispatch(actions.pokemon.add(6, data));
                            } else {
                                alert("Cannot add more than 6 pokemon");
                            }
                        })
                        .catch((error) => console.error(error));
                }}
            >
                Add Pokemon
            </button>
        </div>
    );
}

export default AddPokemon;
