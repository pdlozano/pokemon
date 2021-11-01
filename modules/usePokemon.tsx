import { useState } from "react";

type PokemonTeam = {
    [1]: string;
    [2]: string;
    [3]: string;
    [4]: string;
    [5]: string;
    [6]: string;
};

function usePokemon() {
    const [data, setData] = useState<PokemonTeam>({
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
    });

    const setFunction = (number: number, pokemon: string) => {
        setData({
            ...data,
            [number]: pokemon,
        });
    };

    return [data, setFunction];
}

export default usePokemon;
