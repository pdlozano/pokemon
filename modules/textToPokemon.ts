import { MainClient } from "pokenode-ts";
import { simplifyOutput } from "./pokemonData";
import type { Pokemon, Move } from "../modules/pokemonData";

const api = new MainClient();

async function textToPokemon(name: string): Promise<Pokemon | void> {
    return api.pokemon
        .getPokemonByName(name)
        .then((res) => simplifyOutput.pokemon(res))
        .catch((err) => console.error(err));
}

async function textToPokemonMove(name: string): Promise<Move | void> {
    return api.move
        .getMoveByName(name)
        .then((res) => simplifyOutput.moves(res))
        .catch((err) => console.error(err));
}

export { textToPokemon, textToPokemonMove };
