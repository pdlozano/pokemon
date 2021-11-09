import { useSelector } from "react-redux";
import { State } from "../redux/reducers/reducers";
import { Meter } from "./Meter";

type StatsData = {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
};

function AverageStats(): JSX.Element {
    const state = useSelector(
        (state: { pokemonData: State }) => state.pokemonData.pokemon
    );
    if (state === null) {
        return <div></div>;
    }
    const stats = Object.values(state).map((item) => {
        if (item === null) {
            return {
                hp: 0,
                attack: 0,
                defense: 0,
                specialDefense: 0,
                speed: 0,
            };
        }

        const pokemonType = item.pokemon.types.map((type) => type.type.name);
        const data: StatsData = item.pokemon.stats.reduce((prev, next) => {
            return {
                ...prev,
                [next.stat.name]: next.base_stat,
            };
        }, {});
        const specialAttack = data["special-attack"];
        const attack = data.attack;

        const effectiveAttack = Object.values(item.moves)
            .filter((move) => move?.damage_class.name !== "status")
            .map((move) => {
                if (move === null) {
                    return 0;
                }

                const stab =
                    pokemonType.indexOf(move.type.name) !== -1 ? 1.5 : 1;
                const accuracy = move.accuracy / 100 || 1;
                const movePower = move.power === null ? 1 : move.power / 100;
                const attackPower =
                    move.damage_class.name === "special"
                        ? specialAttack
                        : attack;

                return stab * accuracy * movePower * attackPower;
            });
        const averageEffectiveAttack =
            effectiveAttack.reduce((prev, next) => prev + next, 0) /
            effectiveAttack.length;

        return {
            hp: data.hp,
            attack: averageEffectiveAttack,
            defense: data.defense,
            specialDefense: data["special-defense"],
            speed: data.speed,
        };
    });
    const averageStats: StatsData = stats.reduce(
        (prev: StatsData, next: StatsData) => {
            return {
                hp: prev.hp + next.hp / stats.length,
                attack: prev.attack + next.attack / stats.length,
                defense: prev.defense + next.defense / stats.length,
                specialDefense:
                    prev.specialDefense + next.specialDefense / stats.length,
                speed: prev.speed + next.speed / stats.length,
            };
        },
        {
            hp: 0,
            attack: 0,
            defense: 0,
            specialDefense: 0,
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

                        return (
                            <tr key={key}>
                                <td className="w-5/12">{key}</td>
                                <td className="w-2/12">{val}</td>
                                <td className="w-5/12">
                                    <Meter val={val} />
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td className="w-5/12">Total</td>
                        <td className="w-2/12">
                            {Math.floor(total * 100) / 100}
                        </td>
                        <td className="w-5/12"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AverageStats;
