import Pokemon from "../components/Pokemon";
import MoveSet from "../components/MoveSet";
import Weaknesses from "../components/Weaknesses";
import Coverage from "../components/Coverage";
import TeamStats from "../components/TeamStats";
import Header from "../components/Header";
import data from "../redux/initialData.json";
import { Footer } from "../components/Footer";
import Head from "next/head";
import { usePokemonData } from "../redux/usePokemonData";

function PokemonPage(): JSX.Element {
    const { state } = usePokemonData();

    return (
        <div>
            <Head>
                <title>Pokemon Team Coverage and Weakness Checker</title>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Tool to check for coverage and weaknesses of your Pokemon team"
                />
            </Head>

            <Header />

            <main className="w-11/12 md:w-10/12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(state).map((data, index) => {
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

                <TeamStats />
            </main>

            <Footer />

            <datalist id="pokemon-list">
                {data.allPokemon.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </datalist>
        </div>
    );
}

export default PokemonPage;
