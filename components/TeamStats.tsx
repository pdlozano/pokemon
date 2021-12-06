import { MultipleMeter, TeamColors } from "./Meter";
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
    val: number[];
    total: boolean;
};

type TeamStatsData = {
    hp: number[];
    attack: number[];
    specialAtt: number[];
    defense: number[];
    specialDef: number[];
    speed: number[];
    total: number;
};

function Stat(props: StatData): JSX.Element {
    const className = "text-right" + (props.total ? " font-bold" : "");
    const val = props.val.reduce((a, b) => a + b, 0);

    return (
        <tr>
            <td className={"w-4/12 " + className}>{props.name}</td>
            <td className={"w-2/12 md:w-1/12 " + className}>{val}</td>
            <td className="w-6/12 md:w-7/12">
                {props.total ? "" : <MultipleMeter val={props.val} max={800} />}
            </td>
        </tr>
    );
}

function TeamStats(): JSX.Element {
    const { state } = usePokemonData();
    const data: PokemonData[] = Object.values(state).filter(
        (item): item is PokemonData => item !== null
    );
    const pokemon = getTeamStats(data).map((item) => item.name);
    const teamStats = getTeamStats(data).reduce(
        (prev: TeamStatsData, next): TeamStatsData => {
            return {
                hp: [...prev.hp, next.hp],
                attack: [...prev.attack, next.attack],
                specialAtt: [...prev.specialAtt, next.specialAtt],
                defense: [...prev.defense, next.defense],
                specialDef: [...prev.specialDef, next.specialDef],
                speed: [...prev.speed, next.speed],
                total: prev.total + next.total,
            };
        },
        {
            hp: [],
            attack: [],
            specialAtt: [],
            defense: [],
            specialDef: [],
            speed: [],
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
            <div className="flex flex-wrap">
                {pokemon.map((name, index) => {
                    const val = name.toUpperCase();

                    return (
                        <div
                            className="px-2 font-bold text-white"
                            style={{
                                backgroundColor:
                                    TeamColors[
                                        (index + 1) as keyof typeof TeamColors
                                    ] || "rgb(255, 255, 255)",
                            }}
                            key={"val" + index}
                        >
                            {val}
                        </div>
                    );
                })}
            </div>
            <table className="w-full">
                <tbody>
                    {Object.entries(teamStats).map((item) => {
                        const [key, value] = item;

                        return (
                            <Stat
                                name={statsNames[key]}
                                val={
                                    typeof value === "number" ? [value] : value
                                }
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
