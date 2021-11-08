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
                background: props.disabled ? "white" : props.data,
                color: props.disabled ? "gray" : "white",
            }}
            className="px-2 py-1 mx-0.5 my-2 uppercase text-sm rounded border-2 font-bold"
        >
            <p>{typeName}</p>
        </div>
    );
}

export default Type;
