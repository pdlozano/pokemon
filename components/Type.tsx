import { PokemonTypes, PokemonTypeToText } from "../modules/PokemonTypes";

type TypeData = {
    data: PokemonTypes;
};

function Type(props: TypeData): JSX.Element {
    const typeName = PokemonTypeToText(props.data);

    return (
        <div
            style={{
                borderColor: props.data,
                color: props.data,
            }}
            className="px-2 py-1 mx-0.5 my-2 uppercase text-sm rounded border-2 font-bold bg-white"
        >
            <p>{typeName.toPascalCase()}</p>
        </div>
    );
}

export default Type;
