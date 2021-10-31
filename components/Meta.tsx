import type { Pokemon as PokemonType } from "pokenode-ts";
import { TextToPokemonType } from "../modules/PokemonTypes";

type MetaData = {
    data: PokemonType;
};

function Meta(props: MetaData): JSX.Element {
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
        </div>
    );
}

export default Meta;