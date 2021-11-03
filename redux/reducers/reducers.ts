import { Pokemon, Move } from "pokenode-ts";
import { Action } from "../actions/actions";
import type { ActionCreator } from "../actions";

type PokemonData = {
    pokemon: Pokemon;
    moves: {
        1: Move | null;
        2: Move | null;
        3: Move | null;
        4: Move | null;
    };
};

type State = {
    pokemon: {
        1: PokemonData | null;
        2: PokemonData | null;
        3: PokemonData | null;
        4: PokemonData | null;
        5: PokemonData | null;
        6: PokemonData | null;
    };
};

const initialState: State = {
    pokemon: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
    },
};

function pokemonReducer(
    state: Readonly<State> = initialState,
    action: ActionCreator
): State {
    if (action.type === Action.ADD_POKEMON) {
        return {
            ...state,
            pokemon: {
                ...state.pokemon,
                [action.payload.item]: action.payload.data,
            },
        };
    } else if (action.type === Action.CHANGE_POKEMON) {
        return {
            ...state,
            pokemon: {
                ...state.pokemon,
                [action.payload.item]: action.payload.data,
            },
        };
    } else if (action.type === Action.REMOVE_POKEMON) {
        return {
            ...state,
            pokemon: {
                ...state.pokemon,
                [action.payload.item]: null,
            },
        };
    } else if (action.type === Action.ADD_POKEMON_MOVE) {
        return {
            ...state,
            pokemon: {
                ...state.pokemon,
                [action.payload.item]: {
                    ...state.pokemon[action.payload.item || 0],
                    [action.payload.moveItem || 0]: action.payload.data,
                },
            },
        };
    } else {
        return state;
    }
}

export { pokemonReducer };
