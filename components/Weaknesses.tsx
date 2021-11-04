// This is a Weaknesses component
// 1. Looks at all type weaknesses of Pokemon
// 2. Removes all type weaknesses that are covered by a Pokemon move
import { useSelector } from "react-redux";
import getWeaknesses from "../modules/Weaknesses";
import { TextToPokemonType, PokemonTypeToText } from "../modules/PokemonTypes";

function Weaknesses(): JSX.Element {
    const state = useSelector((state) => state.pokemonData.pokemon);
    const pokemonTypes = Object.values(state)
        .map((data) => {
            const types = data.pokemon.types.map((type) =>
                TextToPokemonType(type.type.name)
            );
            return getWeaknesses(types);
        })
        .flat();
    const moves = Object.values(state)
        .map((data) => {
            const items = Object.values(data.moves);
            return items.reduce((prev, item) => {
                const typeName = TextToPokemonType(item.type.name);
                const damaging = item.accuracy !== null;

                if (!damaging) {
                    return prev.concat([]);
                }

                return prev.concat([typeName]);
            }, []);
        })
        .flat();

    const moveCoverage = new Set(moves);
    const pokemonWeaknesses = Array.from(new Set(pokemonTypes)).filter(
        (item) => {
            return !moveCoverage.has(item);
        }
    );

    return (
        <div>
            <h2>Weaknesses</h2>
            {pokemonWeaknesses.map((weakness) => (
                <div
                    style={{
                        background: weakness,
                    }}
                >
                    {PokemonTypeToText(weakness)}
                </div>
            ))}
        </div>
    );
}

export default Weaknesses;
