import { MainClient } from "pokenode-ts";
import type { State } from "./reducers/reducers";
import { simplifyOutput } from "../modules/pokemonData";

async function initialize() {
    const api = new MainClient();
    const pokemon = [
        {
            name: "gengar",
            moves: ["destiny-bond", "thunderbolt", "hypnosis", "hex"],
        },
        {
            name: "lucario",
            moves: ["swords-dance", "shadow-claw", "ice-punch", "close-combat"],
        },
        {
            name: "garchomp",
            moves: ["dragon-rush", "iron-head", "earthquake", "swords-dance"],
        },
        {
            name: "incineroar",
            moves: ["bulk-up", "flare-blitz", "darkest-lariat", "earthquake"],
        },
        {
            name: "empoleon",
            moves: ["hydro-pump", "ice-beam", "steel-wing", "drill-peck"],
        },
        {
            name: "togekiss",
            moves: ["thunder-wave", "air-slash", "aura-sphere", "shadow-ball"],
        },
    ].map(async (data) => {
        const { name, moves } = data;
        const pokemonData = await api.pokemon
            .getPokemonByName(name)
            .then((res) => simplifyOutput.pokemon(res));
        const movesData = await Promise.all(
            moves.map(async (move) => {
                return api.move
                    .getMoveByName(move)
                    .then((res) => simplifyOutput.moves(res));
            })
        );

        return {
            pokemon: pokemonData,
            moves: Object.assign({}, movesData),
        };
    });

    const data = await Promise.all(pokemon);
    const pokemonData: State = {
        pokemon: Object.assign({}, data),
    };
    return JSON.stringify(pokemonData);
}

export default initialize;
