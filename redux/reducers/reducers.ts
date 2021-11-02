import { Pokemon, PokemonMove } from "pokenode-ts";
import { Action } from "../actions/actions";
import type { ActionCreator } from "../actions";

type PokemonData = {
    pokemon: Pokemon;
    moves: {
        1: PokemonMove | null;
        2: PokemonMove | null;
        3: PokemonMove | null;
        4: PokemonMove | null;
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
        if (state.pokemon.length === 6) {
            throw new Error("Cannot have more than 6 pokemon in a team");
        }

        return {
            ...state,
            pokemon: state.pokemon.concat([
                { pokemon: action.payload, moves: [] },
            ]),
        };
    } else if (action.type === Action.CHANGE_POKEMON) {
        return {
            ...state,
            pokemon: state.pokemon.map((pokemon) => {
                if (pokemon.pokemon !== action.payload.old) {
                    return pokemon;
                } else {
                    return {
                        pokemon: action.payload.new,
                        moves: [],
                    };
                }
            }),
        };
    } else if (action.type === Action.REMOVE_POKEMON) {
        return {
            ...state,
            pokemon: state.pokemon.filter((pokemon) => {
                return pokemon.pokemon !== action.payload;
            }),
        };
    } else if (action.type === Action.ADD_POKEMON_MOVE) {
        return {
            ...state,
            pokemon: state.pokemon.map((pokemon) => {
                if (pokemon.pokemon !== action.payload.pokemon) {
                    return pokemon;
                }

                if (pokemon.moves.length >= 4) {
                    throw new Error(
                        "Maximum number of moves for a pokemon is 4"
                    );
                }

                return {
                    ...pokemon,
                    moves: pokemon.moves.concat([action.payload.move]),
                };
            }),
        };
    } else {
        return state;
    }
}

export { pokemonReducer };
