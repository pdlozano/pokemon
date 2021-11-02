import { Pokemon, PokemonMove } from "pokenode-ts";
import { Action } from "./actions";

type ActionCreator = {
    type: Action;
    payload: any;
};

function addPokemon(pokemon: Pokemon): ActionCreator {
    return {
        type: Action.ADD_POKEMON,
        payload: pokemon,
    };
}

function changePokemon(oldPokemon: Pokemon, pokemon: Pokemon): ActionCreator {
    return {
        type: Action.CHANGE_POKEMON,
        payload: {
            old: oldPokemon,
            new: pokemon,
        },
    };
}

function removePokemon(pokemon: Pokemon): ActionCreator {
    return {
        type: Action.REMOVE_POKEMON,
        payload: pokemon,
    };
}

function addPokemonMove(pokemon: Pokemon, move: PokemonMove): ActionCreator {
    return {
        type: Action.ADD_POKEMON_MOVE,
        payload: {
            pokemon,
            move,
        },
    };
}

const actions = {
    pokemon: {
        add: addPokemon,
        change: changePokemon,
        remove: removePokemon,
    },
    move: {
        add: addPokemonMove,
    },
};

export { actions };
export type { ActionCreator };
