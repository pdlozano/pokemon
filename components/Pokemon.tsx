import type { Pokemon as PokemonType } from "pokenode-ts";
import Meta from "./Meta";
import Stats from "./Stats";
import Change from "./Change";
import { useDispatch } from "react-redux";
import { actions } from "../redux/actions";
import textToPokemon from "../modules/textToPokemon";

type PokemonData = {
    data: PokemonType | undefined;
    item: number;
    children?: Array<JSX.Element> | JSX.Element;
};

function Pokemon(props: PokemonData): JSX.Element {
    const dispatch = useDispatch();

    if (props.data === undefined) {
        return (
            <Change
                func={(text) => {
                    textToPokemon(text).then((res) => {
                        if (res) {
                            dispatch(actions.pokemon.add(props.item, res));
                        }
                    });
                }}
            >
                Add Pokemon
            </Change>
        );
    }

    return (
        <details className="w-full border-2 px-4 py-2">
            <summary>
                <Meta data={props.data} />
                <Change
                    func={(text) => {
                        textToPokemon(text).then((res) => {
                            if (res) {
                                dispatch(
                                    actions.pokemon.change(props.item, res)
                                );
                            }
                        });
                    }}
                >
                    Change
                </Change>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        dispatch(actions.pokemon.remove(props.item));
                    }}
                >
                    Remove
                </button>
            </summary>

            <Stats data={props.data} />

            {props.children}
        </details>
    );
}

export default Pokemon;
