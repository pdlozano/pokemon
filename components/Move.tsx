import type { Move } from "pokenode-ts";
import { TextToPokemonType } from "../modules/PokemonTypes";

type MoveData = {
    data: Move;
};

function Move(props: MoveData): JSX.Element {
    const { names, pp, accuracy, type } = props.data;
    const { name } = names.filter((item) => item.language.name === "en")[0];

    const accuracyOrStatus = accuracy ? `Accuracy: ${accuracy}` : "Status Move";

    return (
        <div
            className="border-4 p-2 rounded-lg"
            style={{
                borderColor: TextToPokemonType(type.name),
            }}
        >
            <p
                className="text-center text-xs uppercase font-bold"
                style={{
                    color: TextToPokemonType(type.name),
                }}
            >
                {type.name}
            </p>
            <p className="text-center font-bold text-lg sm:text-xl">{name}</p>
            <p className="text-center text-sm">
                PP: {pp} / {accuracyOrStatus}
            </p>
        </div>
    );
}

export default Move;
