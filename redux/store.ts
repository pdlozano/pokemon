import { createStore } from "redux";
import rootReducer from "./reducers";

const initialState = {
    pokemonData: {
        pokemon: [],
    },
};

const store = createStore(rootReducer, initialState);
export { store };
