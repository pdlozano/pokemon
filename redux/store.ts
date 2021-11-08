import { createStore } from "redux";
import rootReducer from "./reducers";
import { pokemon } from "./initialData.json";
import { State } from "./reducers/reducers";

const initialState: {
    pokemonData: State;
} = {
    pokemonData: {
        pokemon,
    },
};

const store = createStore(rootReducer, initialState);
export { store };
