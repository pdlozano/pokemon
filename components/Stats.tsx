import type { Pokemon as PokemonType } from "pokenode-ts";
import { Meter } from "./Meter";

const statsNames: any = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Special Attack",
    "special-defense": "Special Defense",
    speed: "Speed",
};

type StatsData = {
    data: PokemonType;
};

function Stats(props: StatsData): JSX.Element {
    const stats = props.data.stats;
    const total = stats.reduce((prev, next) => prev + next.base_stat, 0);

    return (
        <table className="w-full">
            <tbody>
                {stats.map((stat) => {
                    const name = statsNames[stat.stat.name];

                    return (
                        <tr key={name}>
                            <td className="text-right w-40">{name}</td>
                            <td className="text-right pl-2 w-14">
                                {stat.base_stat}
                            </td>
                            <td>
                                <Meter val={stat.base_stat} />
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td className="text-right w-40 font-bold">Total</td>
                    <td className="text-right pl-2 w-14 font-bold">{total}</td>
                    <td>{""}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Stats;
