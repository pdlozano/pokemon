import getWeaknesses from "../modules/weaknesses";
import { PokemonTypes } from "../modules/pokemonTypes";

describe("Pokemon Weaknesses Tests", () => {
    test("Normal types are weak to fighting types", () => {
        expect(getWeaknesses([PokemonTypes.Normal])).toEqual([
            PokemonTypes.Fighting,
        ]);
    });
});
