import { createStore } from "redux";
import rootReducer from "./reducers";

const initialState = {
    pokemonData: {
        pokemon: {
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
        },
    },
};

const store = createStore(rootReducer, initialState);
export { store };
