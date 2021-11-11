import { Meter } from "./Meter";
import { usePokemonData } from "../redux/usePokemonData";

type StatsData = {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
};

function AverageStats(): JSX.Element {
    const { state } = usePokemonData();

    if (state === null) {
        return <div>{""}</div>;
    }
    const stats = Object.values(state).reduce(
        (prev: Array<StatsData>, next): Array<StatsData> => {
            // Filter - Remove all null values
            if (next === null) {
                return prev;
            }

            // Map - Process Data
            const pokemonType = next.pokemon.types.map(
                (type) => type.type.name
            );
            const statsData: StatsData = next.pokemon.stats.reduce(
                (prev, next) => ({
                    ...prev,
                    [next.stat.name]: next.base_stat,
                }),
                {
                    hp: 0,
                    attack: 0,
                    defense: 0,
                    "special-attack": 0,
                    "special-defense": 0,
                    speed: 0,
                }
            );

            const effectiveAttack = Object.values(next.moves).reduce(
                (prevVal: Array<number>, nextAttack): Array<number> => {
                    // Filter - Ignore status moves
                    if (
                        nextAttack === null ||
                        nextAttack?.damage_class.name === "status"
                    ) {
                        return prevVal;
                    }

                    const stab =
                        pokemonType.indexOf(nextAttack.type.name) !== -1
                            ? 1.5
                            : 1;
                    const accuracy = nextAttack.accuracy / 100 || 1;
                    const movePower =
                        nextAttack.power === null ? 1 : nextAttack.power / 100;
                    const attackPower =
                        nextAttack.damage_class.name === "special"
                            ? statsData["special-attack"]
                            : statsData.attack;

                    return prevVal.concat([
                        stab * accuracy * movePower * attackPower,
                    ]);
                },
                []
            );
            const averageEffectiveAttack =
                effectiveAttack.reduce((prev, next) => prev + next, 0) /
                effectiveAttack.length;

            const {
                hp,
                defense,
                ["special-defense"]: specialDefense,
                speed,
            } = statsData;

            return prev.concat([
                {
                    hp: hp,
                    attack: isNaN(averageEffectiveAttack)
                        ? 0
                        : averageEffectiveAttack,
                    defense: defense,
                    "special-attack": 0,
                    "special-defense": specialDefense,
                    speed: speed,
                },
            ]);
        },
        []
    );
    const averageStats: StatsData = stats.reduce(
        (prev: StatsData, next: StatsData): StatsData => {
            return {
                ...prev,
                hp: prev.hp + next.hp / stats.length,
                attack: prev.attack + next.attack / stats.length,
                defense: prev.defense + next.defense / stats.length,
                "special-defense":
                    prev["special-defense"] +
                    next["special-defense"] / stats.length,
                speed: prev.speed + next.speed / stats.length,
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
    const total: number = Object.values(averageStats).reduce(
        (prev, next) => prev + next,
        0
    );

    return (
        <div>
            <h2>Average Stats</h2>
            <p>
                Looks at the average stats of your team. Calculation is as
                follows:
            </p>
            <ol className="list-decimal my-4">
                <li>
                    The average of HP, Defense, Special Defense, and Speed are
                    taken as is
                </li>
                <li>
                    The effective attack of each pokemon is computed by: (Move
                    Power) * (Physical Attack/Special Attack) * (STAB) *
                    (Accuracy). Stab is 1.5 if the move type is the same as the
                    pokemon typing and 1 otherwise.
                </li>
                <li>The effective attacks are then averaged</li>
            </ol>
            <table className="w-full">
                <tbody>
                    {Object.entries(averageStats).map((item) => {
                        const [key, value] = item;
                        const val = Math.floor(value * 100) / 100;
                        const name =
                            key === "hp"
                                ? "HP"
                                : key === "attack"
                                ? "Effective Attack"
                                : key === "defense"
                                ? "Defense"
                                : key === "special-defense"
                                ? "Special Defense"
                                : key === "speed"
                                ? "Speed"
                                : "";

                        return (
                            <tr key={key}>
                                <td className="w-5/12 text-right">{name}</td>
                                <td className="w-2/12 text-right">{val}</td>
                                <td className="w-5/12">
                                    <Meter val={val} />
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td className="w-5/12 text-right font-bold">Total</td>
                        <td className="w-2/12 text-right font-bold">
                            {Math.floor(total * 100) / 100}
                        </td>
                        <td className="w-5/12">{""}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AverageStats;
