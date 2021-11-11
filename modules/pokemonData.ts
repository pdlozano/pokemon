// Seeks to simplify the data taken from the API
import { Pokemon as PokenodePokemon, Move as PokenodeMove } from "pokenode-ts";
import { PokemonTypes, TextToPokemonType } from "./pokemonTypes";

enum AttackType {
    status,
    special,
    physical,
}

type Stats = {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
};

type Pokemon = {
    name: string;
    types: Array<PokemonTypes>;
    image: string;
    availableMoves: Array<string>;
    stats: Stats;
};

type Move = {
    name: string;
    damage_class: AttackType;
    type: PokemonTypes;
    power: number;
    accuracy: number;
};

function pokemon(item: PokenodePokemon): Pokemon {
    const { name, moves, sprites, stats, types } = item;
    const typesOutput = types.map((type) => TextToPokemonType(type.type.name));
    const image = sprites.front_default;
    const availableMoves = moves.map((move) => move.move.name);
    const statsData = stats.reduce(
        (prev: Stats, next): Stats => {
            return {
                ...prev,
                [next.stat.name]: next.base_stat,
            };
        },
        {
            hp: 0,
            attack: 0,
            defense: 0,
            "special-attack": 0,
            "special-defense": 0,
            speed: 0,
        }
    );

    return {
        name,
        types: typesOutput,
        image,
        availableMoves,
        stats: statsData,
    };
}

function moves(data: PokenodeMove): Move {
    const { name, power, accuracy, type, damage_class } = data;
    const damage =
        damage_class.name === "status"
            ? AttackType.status
            : damage_class.name === "physical"
            ? AttackType.physical
            : AttackType.special;

    return {
        name: name,
        damage_class: damage,
        type: TextToPokemonType(type.name),
        power: power || 100,
        accuracy: accuracy || 100,
    };
}

const simplifyOutput = {
    pokemon,
    moves,
};

export type { Pokemon, Move, Stats };
export { simplifyOutput, AttackType };
