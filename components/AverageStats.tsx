import { Meter } from "./Meter";
import { usePokemonData } from "../redux/usePokemonData";
import { getAverageStats } from "../modules/stats";
import { PokemonData } from "../redux/reducers/reducers";

const statsNames: any = {
    hp: "HP",
    attack: "Effective Attack",
    defense: "Defense",
    "special-defense": "Special Defense",
    speed: "Speed",
    total: "Total",
};

type StatData = {
    name: string;
    val: number;
    total: boolean;
};

function Stat(props: StatData): JSX.Element {
    const className = "text-right" + (props.total ? " font-bold" : "");
    return (
        <tr>
            <td className={"w-4/12 " + className}>{props.name}</td>
            <td className={"w-2/12 " + className}>{props.val}</td>
            <td className="w-6/12">
                {props.total ? "" : <Meter val={props.val} />}
            </td>
        </tr>
    );
}

function AverageStats(): JSX.Element {
    const { state } = usePokemonData();
    const data: PokemonData[] = Object.values(state).filter(
        (item): item is PokemonData => item !== null
    );
    const averageStats = getAverageStats(data);

    if (state === null) {
        return <div>{""}</div>;
    }

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
                            <Stat
                                name={statsNames[key]}
                                val={val}
                                key={key}
                                total={key === "total"}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AverageStats;
