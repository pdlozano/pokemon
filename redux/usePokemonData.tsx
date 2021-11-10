import { useDispatch, useSelector } from "react-redux";
import { State } from "./reducers/reducers";

function usePokemonData() {
    const state = useSelector(
        (state: { pokemonData: State }) => state.pokemonData.pokemon
    );
    const dispatch = useDispatch();

    return { state, dispatch };
}

export { usePokemonData };
