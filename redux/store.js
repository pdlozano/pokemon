import { createStore } from "redux";
import rootReducer from "./reducers";
import { pokemon } from "./initialData.json";

const initialState = {
    pokemonData: {
        pokemon,
    },
};

const store = createStore(rootReducer, initialState);
export { store };
