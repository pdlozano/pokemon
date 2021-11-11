import type { Move } from "../modules/pokemonData";
import { AttackType } from "../modules/pokemonData";
import { PokemonTypeToText } from "../modules/pokemonTypes";
import { actions } from "../redux/actions";
import { usePokemonData } from "../redux/usePokemonData";
import React from "react";

type MoveData = {
    data: Move;
    item: number;
    index: number;
};

function MoveComponent(props: MoveData): JSX.Element {
    const { name: tempName, accuracy, damage_class, type, power } = props.data;
    const name = tempName
        .split("-")
        .map((string) => string[0].toUpperCase() + string.slice(1))
        .join(" ");
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
        damage_class !== AttackType.status
            ? `Power: ${power} / Accuracy: ${accuracy}`
            : "Status Move";

    return (
        <div
            tabIndex={0}
            className="border-4 p-2 rounded-lg focus:outline-none focus:bg-pokemonlight hover:bg-pokemonlight border-pokemon"
            style={
                {
                    "--color": type,
                    "--color-light": type + "44",
                } as React.CSSProperties
            }
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
                {PokemonTypeToText(type)}
            </p>
            <p className="text-center font-bold text-lg sm:text-xl">{name}</p>
            <p className="text-center text-sm">{statusOrNot}</p>
        </div>
    );
}

export default MoveComponent;
