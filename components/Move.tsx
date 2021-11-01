import type { PokemonMove, Move, MoveClient } from "pokenode-ts";
import { PokemonTypes, TextToPokemonType } from "../modules/PokemonTypes";
import { useState, useEffect } from "react";

type MoveData = {
    data: PokemonMove;
    api: MoveClient;
};

type Data = {
    name: string;
    pp: number;
    accuracy: number;
    damage_class: string;
    type: PokemonTypes;
};

function Move(props: MoveData): JSX.Element {
    const [move, setMove] = useState<Move>();
    const [data, setData] = useState<Data>();

    useEffect(() => {
        props.api
            .getMoveByName(props.data.move.name)
            .then((res) => setMove(res))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (move === undefined) {
            return;
        }

        const name = move.names.filter(
            (item) => item.language.name === "en"
        )[0];
        const pp = move.pp;
        const accuracy = move.accuracy;
        const damage_class = move.damage_class.name;
        const type = TextToPokemonType(move.type.name);

        setData({
            name: name.name,
            pp,
            accuracy,
            damage_class,
            type,
        });
    }, [move]);

    if (data === undefined) {
        return <></>;
    }

    return (
        <div
            className="btn-move"
            style={{
                background: data.type,
            }}
        >
            <p>{data.name}</p>
            <p>{data.pp}</p>
            <p>{data.accuracy}</p>
            <p>{data.damage_class}</p>
        </div>
    );
}

export default Move;
