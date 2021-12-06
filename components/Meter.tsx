type MeterData = {
    val: number;
    id?: string;
    max?: number;
};

type MultipleMeterData = {
    val: number[];
    id?: string;
    max?: number;
};

function Meter(props: MeterData): JSX.Element {
    const max = props.max || 255;
    const width = (props.val / max) * 100;
    const color =
        width < 25
            ? "var(--red)"
            : width < 35
            ? "var(--yellow)"
            : width < 50
            ? "var(--lightgreen)"
            : "var(--green)";

    return (
        <div>
            <div className="w-full h-2">
                <p className="sr-only" id={props.id}>
                    {props.id}
                </p>
                <div
                    className="h-full rounded-full"
                    style={{
                        width: width + "%",
                        background: color,
                    }}
                    role="meter"
                    aria-valuenow={props.val}
                    aria-valuemin={0}
                    aria-valuemax={max}
                >
                    {""}
                </div>
            </div>
        </div>
    );
}

const TeamColors = {
    1: "rgb(0, 0, 0)",
    2: "rgb(230, 159, 0)",
    3: "rgb(88, 180, 233)",
    4: "rgb(0, 158, 115)",
    5: "rgb(204, 121, 167)",
    6: "rgb(213, 94, 0)",
} as const;

type TeamColors = typeof TeamColors[keyof typeof TeamColors];

function MultipleMeter(props: MultipleMeterData): JSX.Element {
    const max = props.max || 255;

    return (
        <div>
            <div className="w-full h-2">
                <p className="sr-only" id={props.id}>
                    {props.id}
                </p>

                <div className="flex h-full">
                    {props.val.map((value, key) => {
                        const width = (value / max) * 100;
                        const color =
                            TeamColors[(key + 1) as keyof typeof TeamColors] ||
                            "rgb(255, 255, 255)";

                        return (
                            <div
                                className="h-full"
                                key={key}
                                style={{
                                    width: width + "%",
                                    background: color,
                                }}
                                role="meter"
                                aria-valuenow={value}
                                aria-valuemin={0}
                                aria-valuemax={max}
                            >
                                {""}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export { Meter, MultipleMeter, TeamColors };
