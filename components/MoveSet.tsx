import type { Pokemon } from "../modules/pokemonData";
import { actions } from "../redux/actions";
import MoveComponent from "./MoveComponent";
import Change from "./Change";
import { textToPokemonMove } from "../modules/textToPokemon";
import { usePokemonData } from "../redux/usePokemonData";

type MoveSetData = {
    data: Pokemon | undefined;
    item: string;
};

function MoveSet(props: MoveSetData): JSX.Element {
    const { state: data, dispatch } = usePokemonData();
    const state = data[parseInt(props.item)];

    if (state === null || props.data === undefined) {
        return <div>{""}</div>;
    }

    const moveSet = Object.entries(state.moves).map((item, index) => {
        const [key, val] = item;

        if (val !== null) {
            return (
                <MoveComponent
                    key={key}
                    data={val}
                    item={parseInt(props.item)}
                    index={index}
                />
            );
        }

        return (
            <Change
                key={key}
                move={true}
                func={(text) => {
                    const move = text.replaceAll(" ", "-");
                    if (state.pokemon.availableMoves.indexOf(move) !== -1) {
                        textToPokemonMove(move).then((res) => {
                            if (res) {
                                dispatch(
                                    actions.move.add(
                                        parseInt(props.item),
                                        index,
                                        res
                                    )
                                );
                            }
                        });
                    } else {
                        alert("Move not available");
                    }
                }}
                list={"moves-" + state.pokemon.name}
            >
                Change Move
            </Change>
        );
    });

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {moveSet}

            <datalist id={"moves-" + state.pokemon.name}>
                {state.pokemon.availableMoves.map((text) => {
                    const data = text.replaceAll("-", " ");
                    return <option key={text}>{data}</option>;
                })}
            </datalist>
        </div>
    );
}

export default MoveSet;
