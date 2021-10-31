import type { PokemonTypes } from "../modules/PokemonTypes";

type MoveData = {
    name: string;
    accuracy: number;
    pp: number;
    damage: number;
    type: PokemonTypes;
};

function Move(props: MoveData): JSX.Element {
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.accuracy}</p>
            <p>{props.pp}</p>
            <p>{props.damage}</p>
            <p>{props.type}</p>
        </div>
    );
}

export default Move;
