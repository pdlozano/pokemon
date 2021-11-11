import type { Pokemon as PokemonType } from "../modules/pokemonData";
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
                src={props.data.image}
                alt={props.data.name}
                width="96px"
                height="96px"
            />

            <div>
                <h2>{name}</h2>

                <div className="flex">
                    {props.data.types.map((type, index) => {
                        return <Type data={type} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Meta;
