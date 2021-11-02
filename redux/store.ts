import { createStore, Store } from "redux";
import { Context, createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";

const initialState = {
    pokemonData: {
        pokemon: [],
    },
};

const makeStore = (context: Context) => createStore(rootReducer, initialState);
const wrapper = createWrapper(makeStore, {
    debug: true,
});

export { wrapper };
