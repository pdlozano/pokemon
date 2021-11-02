import { Pokemon } from "pokenode-ts";
import { Action } from "../actions/actions";
import type { ActionCreator } from "../actions";

type State = {
    pokemon: Array<Pokemon>;
};

const initialState: State = {
    pokemon: [],
};

function pokemonReducer(
    state: Readonly<State> = initialState,
    action: ActionCreator
): State {
    if (action.action === Action.ADD_POKEMON) {
        if (state.pokemon.length === 6) {
            throw new Error("Cannot have more than 6 pokemon in a team");
        }

        return {
            ...state,
            pokemon: state.pokemon.concat(action.payload),
        };
    } else if (action.action === Action.CHANGE_POKEMON) {
        const index = state.pokemon.indexOf(action.payload.old);
        const newPokemon = state.pokemon
            .slice(0, index)
            .concat([action.payload.new])
            .concat(state.pokemon.slice(index + 1, 6));

        return {
            ...state,
            pokemon: newPokemon,
        };
    } else if (action.action === Action.REMOVE_POKEMON) {
        const index = state.pokemon.indexOf(action.payload);
        const newPokemon = state.pokemon
            .slice(0, index)
            .concat(state.pokemon.slice(index + 1, 6));

        return {
            ...state,
            pokemon: newPokemon,
        };
    } else {
        return state;
    }
}

export { pokemonReducer };
