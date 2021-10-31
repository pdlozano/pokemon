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
        <ol>
            {stats.map((stat) => {
                const name = stat.stat.name;

                return (
                    <li key={name}>
                        {name}: {stat.base_stat}{" "}
                        <StatMeter name={name} value={stat.base_stat} />
                    </li>
                );
            })}
        </ol>
    );
}

export default Stats;
