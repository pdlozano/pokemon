import { Pokemon } from "pokenode-ts";
import { Action } from "./actions";

type ActionCreator = {
    action: Action;
    payload: any;
};

function addPokemon(pokemon: Pokemon): ActionCreator {
    return {
        action: Action.ADD_POKEMON,
        payload: pokemon,
    };
}

function changePokemon(oldPokemon: Pokemon, pokemon: Pokemon): ActionCreator {
    return {
        action: Action.CHANGE_POKEMON,
        payload: {
            old: oldPokemon,
            new: pokemon,
        },
    };
}

function removePokemon(pokemon: Pokemon): ActionCreator {
    return {
        action: Action.REMOVE_POKEMON,
        payload: pokemon,
    };
}

export { addPokemon, changePokemon, removePokemon };
