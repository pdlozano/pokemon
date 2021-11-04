import type { Move } from "pokenode-ts";
import { TextToPokemonType } from "../modules/PokemonTypes";

type MoveData = {
    data: Move;
};

function Move(props: MoveData): JSX.Element {
    const { names, pp, accuracy, damage_class, type } = props.data;
    const { name } = names.filter((item) => item.language.name === "en")[0];

    return (
        <div
            className="btn-move"
            style={{
                background: TextToPokemonType(type.name),
            }}
        >
            <p>{name}</p>
            <p>{pp}</p>
            <p>{accuracy}</p>
            <p>{damage_class.name}</p>
        </div>
    );
}

export default Move;
