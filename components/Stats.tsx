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

type StatMeterData = {
    name: string;
    value: number;
};

function StatMeter(props: StatMeterData): JSX.Element {
    const min = 0;
    const max = 180;

    return (
        <meter
            id={props.name}
            min={min}
            max={max}
            low={0}
            optimum={max * 0.5}
            high={max * 0.7}
            value={props.value}
            className="w-full h-5"
        >
            Base Stat is {props.value}
        </meter>
    );
}

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
export { StatMeter };
