import { PokemonTypes } from "./PokemonTypes";

const data = {
    [PokemonTypes.Normal]: {
        invulnerable: [PokemonTypes.Ghost], // 0 Damage FROM
        vulnerable: [PokemonTypes.Fighting], // 2x Damage FROM
        strong: [], // 0.5x Damage FROM
    },
    [PokemonTypes.Fire]: {
        invulnerable: [],
        vulnerable: [
            PokemonTypes.Water,
            PokemonTypes.Ground,
            PokemonTypes.Ground,
        ],
        strong: [
            PokemonTypes.Fire,
            PokemonTypes.Grass,
            PokemonTypes.Ice,
            PokemonTypes.Bug,
            PokemonTypes.Steel,
            PokemonTypes.Fairy,
        ],
    },
    [PokemonTypes.Water]: {
        invulnerable: [],
        vulnerable: [PokemonTypes.Electric, PokemonTypes.Grass],
        strong: [
            PokemonTypes.Fire,
            PokemonTypes.Water,
            PokemonTypes.Ice,
            PokemonTypes.Steel,
        ],
    },
    [PokemonTypes.Electric]: {
        invulnerable: [],
        vulnerable: [PokemonTypes.Ground],
        strong: [
            PokemonTypes.Electric,
            PokemonTypes.Flying,
            PokemonTypes.Steel,
        ],
    },
    [PokemonTypes.Grass]: {
        invulnerable: [],
        vulnerable: [
            PokemonTypes.Fire,
            PokemonTypes.Ice,
            PokemonTypes.Poison,
            PokemonTypes.Flying,
            PokemonTypes.Bug,
        ],
        strong: [
            PokemonTypes.Water,
            PokemonTypes.Electric,
            PokemonTypes.Grass,
            PokemonTypes.Ground,
        ],
    },
    [PokemonTypes.Ice]: {
        invulnerable: [],
        vulnerable: [PokemonTypes.Ice],
        strong: [
            PokemonTypes.Fire,
            PokemonTypes.Fighting,
            PokemonTypes.Rock,
            PokemonTypes.Steel,
        ],
    },
    [PokemonTypes.Fighting]: {
        invulnerable: [],
        vulnerable: [
            PokemonTypes.Flying,
            PokemonTypes.Psychic,
            PokemonTypes.Fairy,
        ],
        strong: [PokemonTypes.Bug, PokemonTypes.Rock, PokemonTypes.Dark],
    },
    [PokemonTypes.Poison]: {
        invulnerable: [],
        vulnerable: [PokemonTypes.Ground, PokemonTypes.Psychic],
        strong: [
            PokemonTypes.Grass,
            PokemonTypes.Fighting,
            PokemonTypes.Poison,
            PokemonTypes.Bug,
            PokemonTypes.Fairy,
        ],
    },
    [PokemonTypes.Ground]: {
        invulnerable: [PokemonTypes.Electric],
        vulnerable: [PokemonTypes.Water, PokemonTypes.Grass, PokemonTypes.Ice],
        strong: [PokemonTypes.Poison, PokemonTypes.Rock],
    },
    [PokemonTypes.Flying]: {
        invulnerable: [PokemonTypes.Ground],
        vulnerable: [
            PokemonTypes.Electric,
            PokemonTypes.Ice,
            PokemonTypes.Rock,
        ],
        strong: [PokemonTypes.Grass, PokemonTypes.Fighting, PokemonTypes.Bug],
    },
    [PokemonTypes.Psychic]: {
        invulnerable: [],
        vulnerable: [PokemonTypes.Bug, PokemonTypes.Ghost, PokemonTypes.Dark],
        strong: [PokemonTypes.Fighting, PokemonTypes.Psychic],
    },
    [PokemonTypes.Bug]: {
        invulnerable: [],
        vulnerable: [PokemonTypes.Fire, PokemonTypes.Flying, PokemonTypes.Rock],
        strong: [
            PokemonTypes.Grass,
            PokemonTypes.Fighting,
            PokemonTypes.Ground,
        ],
    },
    [PokemonTypes.Rock]: {
        invulnerable: [],
        vulnerable: [
            PokemonTypes.Water,
            PokemonTypes.Grass,
            PokemonTypes.Fighting,
            PokemonTypes.Ground,
            PokemonTypes.Steel,
        ],
        strong: [
            PokemonTypes.Normal,
            PokemonTypes.Fire,
            PokemonTypes.Poison,
            PokemonTypes.Flying,
        ],
    },
    [PokemonTypes.Ghost]: {
        invulnerable: [PokemonTypes.Normal, PokemonTypes.Fighting],
        vulnerable: [PokemonTypes.Ghost, PokemonTypes.Dark],
        strong: [PokemonTypes.Poison, PokemonTypes.Bug],
    },
    [PokemonTypes.Dragon]: {
        invulnerable: [],
        vulnerable: [PokemonTypes.Dragon, PokemonTypes.Ice, PokemonTypes.Fairy],
        strong: [
            PokemonTypes.Fire,
            PokemonTypes.Water,
            PokemonTypes.Electric,
            PokemonTypes.Grass,
        ],
    },
    [PokemonTypes.Dark]: {
        invulnerable: [PokemonTypes.Psychic],
        vulnerable: [
            PokemonTypes.Fighting,
            PokemonTypes.Bug,
            PokemonTypes.Fairy,
        ],
        strong: [PokemonTypes.Ghost, PokemonTypes.Dark],
    },
    [PokemonTypes.Steel]: {
        invulnerable: [PokemonTypes.Poison],
        vulnerable: [
            PokemonTypes.Fire,
            PokemonTypes.Fighting,
            PokemonTypes.Ground,
        ],
        strong: [
            PokemonTypes.Normal,
            PokemonTypes.Grass,
            PokemonTypes.Ice,
            PokemonTypes.Flying,
            PokemonTypes.Psychic,
            PokemonTypes.Bug,
            PokemonTypes.Rock,
            PokemonTypes.Dragon,
            PokemonTypes.Steel,
            PokemonTypes.Fairy,
        ],
    },
    [PokemonTypes.Fairy]: {
        invulnerable: [PokemonTypes.Dragon],
        vulnerable: [PokemonTypes.Steel, PokemonTypes.Poison],
        strong: [PokemonTypes.Fighting, PokemonTypes.Bug, PokemonTypes.Dark],
    },
};

function getWeaknesses(
    types: Readonly<Array<PokemonTypes>>
): Array<PokemonTypes> {
    /*
     * NOTE: Input either the type or dual typing of Pokemon. This
     * module will make sense of the actual weaknesses of each
     * Pokemon. The output is the weaknesses or vulnerabilites of the pokemon.
     */
    // invulnerable; // 0 Damage FROM
    // vulnerable; // 2x Damage FROM
    // strong; // 0.5x Damage FROM

    if (types.length === 1) {
        return data[types[0]].vulnerable;
    }

    const vulnerable = new Set<PokemonTypes>([
        ...data[types[0]].vulnerable,
        ...data[types[1]].vulnerable,
    ]);
    const invulnerableAndStrong = new Set<PokemonTypes>([
        ...data[types[0]].invulnerable,
        ...data[types[0]].strong,
        ...data[types[1]].invulnerable,
        ...data[types[1]].strong,
    ]);

    invulnerableAndStrong.forEach((item) => vulnerable.delete(item));

    return Array.from(vulnerable);
}

export default getWeaknesses;
