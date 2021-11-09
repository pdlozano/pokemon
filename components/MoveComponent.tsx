import type { Move } from "pokenode-ts";
import { TextToPokemonType } from "../modules/pokemonTypes";
import { useDispatch } from "react-redux";
import { actions } from "../redux/actions";

type MoveData = {
    data: Move;
    item: number;
    index: number;
};

function MoveComponent(props: MoveData): JSX.Element {
    const { names, accuracy, damage_class, type, power } = props.data;
    const { name } = names.filter((item) => item.language.name === "en")[0];
    const dispatch = useDispatch();

    const statusOrNot =
        damage_class.name !== "status"
            ? `Power: ${power || 100} / Accuracy: ${accuracy || 100}`
            : "Status Move";

    return (
        <div
            className="border-4 p-2 rounded-lg"
            style={{
                borderColor: TextToPokemonType(type.name),
            }}
            onClick={(event) => {
                event.preventDefault();
                dispatch(actions.move.remove(props.item, props.index));
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
            <p className="text-center text-sm">{statusOrNot}</p>
        </div>
    );
}

export default MoveComponent;
