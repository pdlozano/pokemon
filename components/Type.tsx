import { PokemonTypes, PokemonTypeToText } from "../modules/pokemonTypes";

type TypeData = {
    data: PokemonTypes;
    disabled?: boolean;
};

function Type(props: TypeData): JSX.Element {
    const typeName = PokemonTypeToText(props.data);

    return (
        <div
            style={{
                borderColor: props.disabled ? "gray" : props.data,
                color: props.disabled ? "gray" : props.data,
            }}
            className="px-2 py-1 mx-0.5 my-2 uppercase text-sm rounded border-2 font-bold bg-white"
        >
            <p>{typeName.toPascalCase()}</p>
        </div>
    );
}

export default Type;
