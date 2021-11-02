import { Pokemon } from "pokenode-ts";
import { ADD_POKEMON, CHANGE_POKEMON, REMOVE_POKEMON } from "./actions";

type Action = {
    action: string;
    payload: any;
};

function addPokemon(pokemon: Pokemon): Action {
    return {
        action: ADD_POKEMON,
        payload: pokemon,
    };
}

function changePokemon(oldPokemon: Pokemon, pokemon: Pokemon): Action {
    return {
        action: CHANGE_POKEMON,
        payload: {
            old: oldPokemon,
            new: pokemon,
        },
    };
}

function removePokemon(pokemon: Pokemon): Action {
    return {
        action: REMOVE_POKEMON,
        payload: pokemon,
    };
}

export { addPokemon, changePokemon, removePokemon };
