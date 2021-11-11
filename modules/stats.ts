import { PokemonData } from "../redux/reducers/reducers";
import { AttackType } from "./pokemonData";

type StatsData = {
    hp: number;
    attack: number;
    defense: number;
    "special-defense": number;
    speed: number;
    total: number;
};

function getAverageStats(data: Array<PokemonData>): StatsData {
    return data.reduce(
        (prev: StatsData, next): StatsData => {
            const {
                hp,
                defense,
                ["special-defense"]: specialDef,
                speed,
            } = next.pokemon.stats;
            const effAttack = getEffectiveAttack(next);
            const effTotal = hp + effAttack + defense + specialDef + speed;
            return {
                hp: prev.hp + hp / data.length,
                attack: prev.attack + effAttack / data.length,
                defense: prev.defense + defense / data.length,
                "special-defense":
                    prev["special-defense"] + specialDef / data.length,
                speed: prev.speed + speed / data.length,
                total: prev.total + effTotal / data.length,
            };
        },
        {
            hp: 0,
            attack: 0,
            defense: 0,
            "special-defense": 0,
            speed: 0,
            total: 0,
        }
    );
}

function getEffectiveAttack(data: PokemonData): number {
    const vals = Object.values(data.moves).reduce(
        (prev: Array<number>, next): Array<number> => {
            if (next === null || next.damage_class === AttackType.status) {
                return prev;
            }
            const stab = data.pokemon.types.includes(next.type) ? 1.5 : 1;
            const attackPower =
                next.damage_class === AttackType.special
                    ? data.pokemon.stats["special-attack"]
                    : data.pokemon.stats.attack;
            const { accuracy, power } = next;

            return prev.concat([
                ((((stab * accuracy) / 100) * power) / 100) * attackPower,
            ]);
        },
        []
    );
    const sum = vals.reduce((prev, next) => prev + next, 0);
    return sum / vals.length || 0;
}

export type { StatsData };
export { getAverageStats };
