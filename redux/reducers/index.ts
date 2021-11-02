import { combineReducers } from "redux";
import { pokemonReducer } from "./reducers";

export default combineReducers({
    pokemonData: pokemonReducer,
});
