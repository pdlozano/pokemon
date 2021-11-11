import type { Pokemon as PokemonType } from "../modules/pokemonData";
import Meta from "./Meta";
import Stats from "./Stats";
import Change from "./Change";
import { actions } from "../redux/actions";
import { textToPokemon } from "../modules/textToPokemon";
import { usePokemonData } from "../redux/usePokemonData";

type PokemonData = {
    data: PokemonType | undefined;
    item: number;
    children?: Array<JSX.Element> | JSX.Element;
};

function Pokemon(props: PokemonData): JSX.Element {
    const { dispatch } = usePokemonData();

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
                list="pokemon-list"
            >
                Add Pokemon
            </Change>
        );
    }

    return (
        <details className="w-full border-2">
            <summary className="focus:outline-none focus:bg-gray-200 hover:bg-gray-200 px-4 py-2">
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        dispatch(actions.pokemon.remove(props.item));
                    }}
                    className="float-right mt-1 uppercase text-xs text-red-800 rounded font-bold p-2 focus:outline-none focus:bg-gray-400 hover:bg-gray-400"
                >
                    X
                </button>
                <Meta data={props.data} />
            </summary>

            <div className="px-4 py-2">
                <Stats data={props.data} />

                {props.children}
            </div>
        </details>
    );
}

export default Pokemon;
