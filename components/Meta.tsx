import type { Pokemon as PokemonType } from "pokenode-ts";
import { TextToPokemonType } from "../modules/pokemonTypes";
import Type from "./Type";

type MetaData = {
    data: PokemonType;
};

function Meta(props: MetaData): JSX.Element {
    const name = props.data.name.toPascalCase();

    return (
        <div className="flex">
            <img src={props.data.sprites.front_default} alt={props.data.name} />

            <div>
                <h2>{name}</h2>

                <div className="flex">
                    {props.data.types.map((type, index) => {
                        const typeName = TextToPokemonType(type.type.name);
                        return <Type data={typeName} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Meta;
