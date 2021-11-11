import { createStore } from "redux";
import rootReducer from "./reducers";
import { pokemon } from "./initialData.json";
import { PokemonData } from "./reducers/reducers";

const initialState = {
    pokemonData: {
        pokemon: {
            0: pokemon["0"] as PokemonData,
            1: pokemon["1"] as PokemonData,
            2: pokemon["2"] as PokemonData,
            3: pokemon["3"] as PokemonData,
            4: pokemon["4"] as PokemonData,
            5: pokemon["5"] as PokemonData,
        },
    },
};

const store = createStore(rootReducer, initialState);
export { store };
