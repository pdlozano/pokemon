type MeterData = {
    val: number;
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
                <div
                    className="h-full rounded-full"
                    style={{
                        width: width + "%",
                        background: color,
                    }}
                ></div>
            </div>
        </div>
    );
}

export { Meter };
