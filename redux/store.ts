import { createStore } from "redux";
import rootReducer from "./reducers";
import data from "./initialData.json";
import { PokemonData } from "./reducers/reducers";

const initialState = {
    pokemonData: {
        pokemon: {
            0: data.pokemon["0"] as PokemonData,
            1: data.pokemon["1"] as PokemonData,
            2: data.pokemon["2"] as PokemonData,
            3: data.pokemon["3"] as PokemonData,
            4: data.pokemon["4"] as PokemonData,
            5: data.pokemon["5"] as PokemonData,
        },
    },
};

const getInitialState = () => {
    if (typeof window === "undefined" || localStorage.data === undefined) {
        return initialState;
    }

    return JSON.parse(localStorage.data);
};

const store = createStore(rootReducer, getInitialState());

store.subscribe(() => {
    window.localStorage.data = JSON.stringify(store.getState());
});

export { store };
