import type { Pokemon as PokemonType } from "pokenode-ts";
import { TextToPokemonType } from "../modules/PokemonTypes";

type PokemonData = {
    data: PokemonType | undefined;
    children?: Array<JSX.Element> | JSX.Element;
};

function Pokemon(props: PokemonData): JSX.Element {
    if (props.data === undefined) {
        return <p>No Data</p>;
    }

    const name = props.data.name.toPascalCase();

    return (
        <div>
            <img src={props.data.sprites.front_default} alt={props.data.name} />
            <h1>{name}</h1>

            <div>
                {props.data.types.map((type) => {
                    const typeName = type.type.name;

                    return (
                        <p
                            key={typeName}
                            style={{
                                backgroundColor: TextToPokemonType(typeName),
                            }}
                        >
                            {typeName.toPascalCase()}
                        </p>
                    );
                })}
            </div>

            {props.children}
        </div>
    );
}

export default Pokemon;
