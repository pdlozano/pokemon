import Pokemon from "../components/Pokemon";
import MoveSet from "../components/MoveSet";
import { useSelector } from "react-redux";
import { PokemonClient } from "pokenode-ts";
import { State } from "../redux/reducers/reducers";
import Weaknesses from "../components/Weaknesses";
import Coverage from "../components/Coverage";

const api = new PokemonClient();

function PokemonPage(): JSX.Element {
    const state = useSelector(
        (state: { pokemonData: State }) => state.pokemonData
    );

    return (
        <div>
            <main className="w-11/12 md:w-10/12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Coverage />
                    <Weaknesses />
                </div>
            </main>
        </div>
    );
}

export default PokemonPage;
