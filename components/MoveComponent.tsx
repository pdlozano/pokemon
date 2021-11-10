import type { Move } from "pokenode-ts";
import { TextToPokemonType } from "../modules/pokemonTypes";
import { actions } from "../redux/actions";
import { usePokemonData } from "../redux/usePokemonData";
import React from "react";

type MoveData = {
    data: Move;
    item: number;
    index: number;
};

function MoveComponent(props: MoveData): JSX.Element {
    const { names, accuracy, damage_class, type, power } = props.data;
    const { name } = names.filter((item) => item.language.name === "en")[0];
    const { dispatch } = usePokemonData();
    const action = (
        event:
            | React.KeyboardEvent<HTMLDivElement>
            | React.MouseEvent<HTMLDivElement>
    ) => {
        event.preventDefault();
        dispatch(actions.move.remove(props.item, props.index));
    };

    const statusOrNot =
        damage_class.name !== "status"
            ? `Power: ${power || 100} / Accuracy: ${accuracy || 100}`
            : "Status Move";

    return (
        <div
            tabIndex={0}
            className="border-4 p-2 rounded-lg hover:bg-pokemon hover:bg-opacity-30 border-pokemon"
            style={{
                "--color": TextToPokemonType(type.name),
            }}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    action(event);
                }
            }}
            onClick={(event) => {
                action(event);
            }}
        >
            <p className="text-center text-xs uppercase font-bold text-pokemon">
                {type.name}
            </p>
            <p className="text-center font-bold text-lg sm:text-xl">{name}</p>
            <p className="text-center text-sm">{statusOrNot}</p>
        </div>
    );
}

export default MoveComponent;
