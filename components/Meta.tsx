import type { Pokemon as PokemonType } from "pokenode-ts";
import { TextToPokemonType } from "../modules/pokemonTypes";
import Type from "./Type";
import Image from "next/image";

type MetaData = {
    data: PokemonType;
};

function Meta(props: MetaData): JSX.Element {
    const name = props.data.name.toPascalCase();

    return (
        <div className="flex">
            <Image
                src={props.data.sprites.front_default}
                alt={props.data.name}
                width="96px"
                height="96px"
            />

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
