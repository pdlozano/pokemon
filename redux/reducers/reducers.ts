import { Pokemon, Move } from "pokenode-ts";
import { Action } from "../actions/actions";
import type { ActionCreator } from "../actions";

type PokemonData = {
    pokemon: Pokemon;
    moves: {
        [n: number]: Move | null;
    };
};

type State = {
    pokemon: {
        [n: number]: PokemonData | null;
    };
};

const initialState: State = {
    pokemon: {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
    },
};

function pokemonReducer(
    state: Readonly<State> = initialState,
    action: ActionCreator
): State {
    switch (action.type) {
        case Action.ADD_POKEMON:
            return {
                ...state,
                pokemon: {
                    ...state.pokemon,
                    [action.payload.item]: action.payload.data as PokemonData,
                },
            };
        case Action.REMOVE_POKEMON:
            return {
                ...state,
                pokemon: {
                    ...state.pokemon,
                    [action.payload.item]: null,
                },
            };
        case Action.ADD_POKEMON_MOVE:
            if (action.payload.moveItem !== undefined) {
                const data = state.pokemon[action.payload.item];

                if (data !== null) {
                    return {
                        ...state,
                        pokemon: {
                            ...state.pokemon,
                            [action.payload.item]: {
                                ...data,
                                moves: {
                                    ...data?.moves,
                                    [action.payload.moveItem]: action.payload
                                        .data as Move,
                                },
                            },
                        },
                    };
                }
            }

            return state;
        case Action.REMOVE_POKEMON_MOVE:
            if (action.payload.moveItem !== undefined) {
                const data = state.pokemon[action.payload.item];

                if (data !== null) {
                    return {
                        ...state,
                        pokemon: {
                            ...state.pokemon,
                            [action.payload.item]: {
                                ...data,
                                moves: {
                                    ...data?.moves,
                                    [action.payload.moveItem]: null,
                                },
                            },
                        },
                    };
                }
            }

            return state;
        default:
            return state;
    }
}

export { pokemonReducer };
export type { State, PokemonData };
