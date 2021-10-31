import type { Pokemon as PokemonType } from "pokenode-ts";

type StatMeterData = {
    name: string;
    value: number;
};

function StatMeter(props: StatMeterData): JSX.Element {
    return (
        <meter id={props.name} min="0" max="255" value={props.value}>
            Base Stat is {props.value}
        </meter>
    );
}

type StatsData = {
    data: PokemonType;
};

function Stats(props: StatsData): JSX.Element {
    const stats = props.data.stats;

    return (
        <table>
            {stats.map((stat) => {
                const name = stat.stat.name;

                return (
                    <tr key={name}>
                        <td>{name}</td>
                        <td>{stat.base_stat}</td>
                        <td>
                            <StatMeter name={name} value={stat.base_stat} />
                        </td>
                    </tr>
                );
            })}
        </table>
    );
}

export default Stats;
