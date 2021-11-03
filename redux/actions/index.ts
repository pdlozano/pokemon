import { Pokemon, Move } from "pokenode-ts";
import { Action } from "./actions";

type ActionCreator = {
    type: Action;
    payload: {
        item: number;
        moveItem?: number;
        data?: Move | Pokemon;
    };
};

function addPokemon(item: number, pokemon: Pokemon): ActionCreator {
    return {
        type: Action.ADD_POKEMON,
        payload: {
            item,
            data: {
                pokemon,
                moves: {
                    0: null,
                    1: null,
                    2: null,
                    3: null,
                },
            },
        },
    };
}

function changePokemon(item: number, pokemon: Pokemon): ActionCreator {
    return {
        type: Action.CHANGE_POKEMON,
        payload: {
            item,
            data: {
                pokemon,
                moves: {
                    0: null,
                    1: null,
                    2: null,
                    3: null,
                },
            },
        },
    };
}

function removePokemon(item: number): ActionCreator {
    return {
        type: Action.REMOVE_POKEMON,
        payload: {
            item,
        },
    };
}

function addPokemonMove(
    item: number,
    moveItem: number,
    move: Move
): ActionCreator {
    return {
        type: Action.ADD_POKEMON_MOVE,
        payload: {
            item,
            moveItem,
            data: move,
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
