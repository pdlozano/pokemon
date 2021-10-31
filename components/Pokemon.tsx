import type { Pokemon as PokemonType } from "pokenode-ts";
import Meta from "./Meta";
import Stats from "./Stats";

type PokemonData = {
    data: PokemonType | undefined;
    children?: Array<JSX.Element> | JSX.Element;
};

function Pokemon(props: PokemonData): JSX.Element {
    if (props.data === undefined) {
        return <p>No Data</p>;
    }

    return (
        <details>
            <summary>
                <Meta data={props.data} />
            </summary>
            
            <Stats data={props.data} />

            {props.children}
        </details>
    );
}

export default Pokemon;
