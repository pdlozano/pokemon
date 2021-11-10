type MeterData = {
    val: number;
    id?: string;
};

function Meter(props: MeterData): JSX.Element {
    const width = (props.val / 255) * 100;
    const color =
        props.val < 60
            ? "var(--red)"
            : props.val < 90
            ? "var(--yellow)"
            : props.val < 120
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
                    aria-value-now={props.val}
                    aria-value-min={0}
                    aria-value-max={255}
                ></div>
            </div>
        </div>
    );
}

export { Meter };
