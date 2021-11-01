import { PokemonTypes } from "./PokemonTypes";

function getCoverage(types: Array<PokemonTypes>): Array<PokemonTypes> {
    /*
     * NOTE: Input the types of the moves - not the type of the Pokemon.
     * Remember to also limit it to damaging moves like Ice Beam/Surf
     * and not setting up moves like Swords Dance/Dragon Dance.
     *
     * This does not take into account dual type Pokemon as that will
     * make it too complex.
     */
    const coverage = {
        [PokemonTypes.Normal]: [],
        [PokemonTypes.Fire]: [
            PokemonTypes.Grass,
            PokemonTypes.Ice,
            PokemonTypes.Bug,
            PokemonTypes.Steel,
        ],
        [PokemonTypes.Water]: [
            PokemonTypes.Fire,
            PokemonTypes.Ground,
            PokemonTypes.Rock,
        ],
        [PokemonTypes.Electric]: [PokemonTypes.Water, PokemonTypes.Flying],
        [PokemonTypes.Grass]: [
            PokemonTypes.Water,
            PokemonTypes.Ground,
            PokemonTypes.Rock,
        ],
        [PokemonTypes.Ice]: [
            PokemonTypes.Grass,
            PokemonTypes.Ground,
            PokemonTypes.Flying,
            PokemonTypes.Dragon,
        ],
        [PokemonTypes.Fighting]: [
            PokemonTypes.Normal,
            PokemonTypes.Ice,
            PokemonTypes.Rock,
            PokemonTypes.Dark,
            PokemonTypes.Steel,
        ],
        [PokemonTypes.Poison]: [PokemonTypes.Grass, PokemonTypes.Fairy],
        [PokemonTypes.Ground]: [
            PokemonTypes.Fire,
            PokemonTypes.Electric,
            PokemonTypes.Poison,
            PokemonTypes.Rock,
            PokemonTypes.Steel,
        ],
        [PokemonTypes.Flying]: [
            PokemonTypes.Grass,
            PokemonTypes.Fighting,
            PokemonTypes.Bug,
        ],
        [PokemonTypes.Psychic]: [PokemonTypes.Fighting, PokemonTypes.Poison],
        [PokemonTypes.Bug]: [
            PokemonTypes.Grass,
            PokemonTypes.Psychic,
            PokemonTypes.Dark,
        ],
        [PokemonTypes.Rock]: [
            PokemonTypes.Fire,
            PokemonTypes.Ice,
            PokemonTypes.Flying,
            PokemonTypes.Bug,
        ],
        [PokemonTypes.Ghost]: [PokemonTypes.Psychic, PokemonTypes.Ghost],
        [PokemonTypes.Dragon]: [PokemonTypes.Dragon],
        [PokemonTypes.Dark]: [PokemonTypes.Psychic, PokemonTypes.Ghost],
        [PokemonTypes.Steel]: [
            PokemonTypes.Ice,
            PokemonTypes.Rock,
            PokemonTypes.Fairy,
        ],
        [PokemonTypes.Fairy]: [
            PokemonTypes.Fighting,
            PokemonTypes.Dragon,
            PokemonTypes.Dark,
        ],
    };

    const typeSet = new Set(types);
    const moveCoverage = new Set(
        Array.from(typeSet)
            .map((item) => {
                return coverage[item];
            })
            .flat()
    );

    return Array.from(moveCoverage);
}

export default getCoverage;
