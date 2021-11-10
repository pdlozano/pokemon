import Pokemon from "../components/Pokemon";
import MoveSet from "../components/MoveSet";
import { useSelector } from "react-redux";
import { State } from "../redux/reducers/reducers";
import Weaknesses from "../components/Weaknesses";
import Coverage from "../components/Coverage";
import AverageStats from "../components/AverageStats";
import Header from "../components/Header";
import { allPokemon } from "../redux/initialData.json";
import { Footer } from "../components/Footer";
import { Head } from "next/document";

function PokemonPage(): JSX.Element {
    const state = useSelector(
        (state: { pokemonData: State }) => state.pokemonData
    );

    return (
        <div>
            <Head>
                <title>Pokemon Team Coverage and Weakness Checker</title>
            </Head>

            <Header />

            <main className="w-11/12 md:w-10/12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(state.pokemon).map((data, index) => {
                        const [key, pokemon] = data;

                        return (
                            <Pokemon
                                data={pokemon?.pokemon}
                                key={key}
                                item={index}
                            >
                                <MoveSet data={pokemon?.pokemon} item={key} />
                            </Pokemon>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Coverage />
                    <Weaknesses />
                </div>

                <AverageStats />
            </main>

            <Footer />

            <datalist id="pokemon-list">
                {allPokemon.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </datalist>
        </div>
    );
}

export default PokemonPage;
