import type { Pokemon as PokemonType } from "pokenode-ts";
import Meta from "./Meta";

type PokemonData = {
    data: PokemonType | undefined;
    children?: Array<JSX.Element> | JSX.Element;
};

function Pokemon(props: PokemonData): JSX.Element {
    if (props.data === undefined) {
        return <p>No Data</p>;
    }

    return (
        <div>
            <Meta data={props.data} />

            {props.children}
        </div>
    );
}

export default Pokemon;
