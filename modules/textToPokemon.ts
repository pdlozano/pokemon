import { Pokemon, MainClient, Move } from "pokenode-ts";

const api = new MainClient();

async function textToPokemon(name: string): Promise<Pokemon | void> {
    return api.pokemon
        .getPokemonByName(name)
        .catch((err) => console.error(err));
}

async function textToPokemonMove(name: string): Promise<Move | void> {
    return api.move.getMoveByName(name).catch((err) => console.error(err));
}

export { textToPokemon, textToPokemonMove };
