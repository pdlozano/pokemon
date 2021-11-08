import { Pokemon, PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

async function textToPokemon(name: string): Promise<Pokemon | void> {
    return api.getPokemonByName(name).catch((err) => console.error(err));
}

export default textToPokemon;
