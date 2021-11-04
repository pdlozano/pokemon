import { createStore } from "redux";
import rootReducer from "./reducers";
import initialData from "./initialData.json";

const initialState = {
    pokemonData: initialData,
};

const store = createStore(rootReducer, initialState);
export { store };
