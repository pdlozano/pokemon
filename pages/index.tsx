import Pokemon from "../components/Pokemon";
import MoveSet from "../components/MoveSet";
import { useSelector } from "react-redux";
import { PokemonClient } from "pokenode-ts";
import AddPokemon from "../components/AddPokemon";
import { State } from "../redux/reducers/reducers";
import Weaknesses from "../components/Weaknesses";

const api = new PokemonClient();

function PokemonPage(): JSX.Element {
    const state = useSelector(
        (state: { pokemonData: State }) => state.pokemonData
    );

    return (
        <div>
            <AddPokemon api={api} />
            {Object.entries(state.pokemon).map((data) => {
                const [key, pokemon] = data;

                if (pokemon === null) {
                    return <div>No Pokemon</div>;
                }

                return (
                    <Pokemon data={pokemon.pokemon} key={key}>
                        <MoveSet data={pokemon.pokemon} item={key} />
                    </Pokemon>
                );
            })}
            <Weaknesses />
        </div>
    );
}

export default PokemonPage;
