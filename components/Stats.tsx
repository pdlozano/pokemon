import type { Pokemon as PokemonType } from "../modules/pokemonData";
import { Meter } from "./Meter";

const statsNames: any = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Special Attack",
    "special-defense": "Special Defense",
    speed: "Speed",
    total: "Total",
};

type StatsData = {
    data: PokemonType;
    keyHelper: number;
};

type StatData = {
    name: string;
    val: number;
    total: boolean;
};

function Stat(props: StatData): JSX.Element {
    const className = "text-right " + (props.total ? "font-bold" : "");
    return (
        <tr>
            <td className={className + "w-40"}>{props.name}</td>
            <td className={className + "pl-2 w-14"}>{props.val}</td>
            <td>{props.total ? "" : <Meter val={props.val} />}</td>
        </tr>
    );
}

function Stats(props: StatsData): JSX.Element {
    const stats = props.data.stats;

    return (
        <table className="w-full">
            <tbody>
                {Object.entries(stats).map((stat) => {
                    const [key, val] = stat;

                    return (
                        <Stat
                            name={statsNames[key]}
                            val={val}
                            total={key === "total"}
                            key={key}
                        />
                    );
                })}
            </tbody>
        </table>
    );
}

export default Stats;
