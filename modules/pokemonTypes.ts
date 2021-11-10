enum PokemonTypes {
    /*
     * The values stored here are the hex values of the
     * color for the type
     */
    Normal = "#aaaa99",
    Fire = "#ff4422",
    Water = "#3399ff",
    Electric = "#ffcc33",
    Grass = "#77cc55",
    Ice = "#66ccff",
    Fighting = "#bb5544",
    Poison = "#aa5599",
    Ground = "#ddbb55",
    Flying = "#8899ff",
    Psychic = "#ff5599",
    Bug = "#aabb22",
    Rock = "#bbaa66",
    Ghost = "#6666bb",
    Dragon = "#7766ee",
    Dark = "#775544",
    Steel = "#aaaabb",
    Fairy = "#ee99ee",
}

function TextToPokemonType(value: string): PokemonTypes {
    switch (value.toLowerCase()) {
        case "normal":
            return PokemonTypes.Normal;
        case "fire":
            return PokemonTypes.Fire;
        case "water":
            return PokemonTypes.Water;
        case "electric":
            return PokemonTypes.Electric;
        case "grass":
            return PokemonTypes.Grass;
        case "ice":
            return PokemonTypes.Ice;
        case "fighting":
            return PokemonTypes.Fighting;
        case "poison":
            return PokemonTypes.Poison;
        case "ground":
            return PokemonTypes.Ground;
        case "flying":
            return PokemonTypes.Flying;
        case "psychic":
            return PokemonTypes.Psychic;
        case "bug":
            return PokemonTypes.Bug;
        case "rock":
            return PokemonTypes.Rock;
        case "ghost":
            return PokemonTypes.Ghost;
        case "dragon":
            return PokemonTypes.Dragon;
        case "dark":
            return PokemonTypes.Dark;
        case "steel":
            return PokemonTypes.Steel;
        case "fairy":
            return PokemonTypes.Fairy;
        default:
            throw new Error("Not a Pokemon Type");
    }
}

function PokemonTypeToText(type: PokemonTypes): string {
    switch (type) {
        case PokemonTypes.Normal:
            return "normal";
        case PokemonTypes.Fire:
            return "fire";
        case PokemonTypes.Water:
            return "water";
        case PokemonTypes.Electric:
            return "electric";
        case PokemonTypes.Grass:
            return "grass";
        case PokemonTypes.Ice:
            return "ice";
        case PokemonTypes.Fighting:
            return "fighting";
        case PokemonTypes.Poison:
            return "poison";
        case PokemonTypes.Ground:
            return "ground";
        case PokemonTypes.Flying:
            return "flying";
        case PokemonTypes.Psychic:
            return "psychic";
        case PokemonTypes.Bug:
            return "bug";
        case PokemonTypes.Rock:
            return "rock";
        case PokemonTypes.Ghost:
            return "ghost";
        case PokemonTypes.Dragon:
            return "dragon";
        case PokemonTypes.Dark:
            return "dark";
        case PokemonTypes.Steel:
            return "steel";
        case PokemonTypes.Fairy:
            return "fairy";
        default:
            throw new Error("Not a Pokemon Type");
    }
}

export { TextToPokemonType, PokemonTypeToText };
export { PokemonTypes };
