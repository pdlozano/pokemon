import { Meter } from "./Meter";
import { usePokemonData } from "../redux/usePokemonData";
import { getTeamStats } from "../modules/stats";
import { PokemonData } from "../redux/reducers/reducers";

const statsNames: any = {
    hp: "HP",
    attack: "Attack",
    specialAtt: "Special Attack",
    defense: "Defense",
    specialDef: "Special Defense",
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
                {props.total ? "" : <Meter val={props.val} max={800} />}
            </td>
        </tr>
    );
}

function TeamStats(): JSX.Element {
    const { state } = usePokemonData();
    const data: PokemonData[] = Object.values(state).filter(
        (item): item is PokemonData => item !== null
    );
    const teamStats = getTeamStats(data).reduce(
        (prev, next) => {
            return {
                ...prev,
                hp: prev.hp + next.hp,
                attack: prev.attack + next.attack,
                specialAtt: prev.specialAtt + next.specialAtt,
                defense: prev.defense + next.defense,
                specialDef: prev.specialDef + next.specialDef,
                speed: prev.speed + next.speed,
                total: prev.total + next.total,
            };
        },
        {
            name: "",
            hp: 0,
            attack: 0,
            specialAtt: 0,
            defense: 0,
            specialDef: 0,
            speed: 0,
            total: 0,
        }
    );

    if (state === null) {
        return <div>{""}</div>;
    }

    return (
        <div>
            <h2>Team Stats</h2>
            <p>
                Figure out which ones are the defenders, the glass cannons, etc.
            </p>
            <table className="w-full">
                <tbody>
                    {Object.entries(teamStats).map((item) => {
                        const [key, value] = item;

                        if (typeof value === "string") {
                            return <></>;
                        }

                        return (
                            <Stat
                                name={statsNames[key]}
                                val={value}
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

export default TeamStats;
