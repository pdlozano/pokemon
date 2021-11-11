import getWeaknesses from "../modules/weaknesses";
import { PokemonTypes } from "../modules/pokemonTypes";
import Type from "./Type";
import { usePokemonData } from "../redux/usePokemonData";

function Weaknesses(): JSX.Element {
    const { state } = usePokemonData();
    const pokemonTypes = Object.values(state).reduce(
        (prev: Array<PokemonTypes>, next): Array<PokemonTypes> => {
            // Filter - Remove if item is null
            if (next === null) {
                return prev;
            }

            // Mapping - Turn it into a PokemonType
            const weaknesses: Array<PokemonTypes> = getWeaknesses(
                next.pokemon.types
            );

            // Flat - Get only one array
            return prev.concat(weaknesses);
        },
        []
    );
    const data = new Set(pokemonTypes);

    const types = Object.values(PokemonTypes).map((type) => (
        <Type data={type} key={type} disabled={!data.has(type)} />
    ));

    return (
        <div>
            <h2>Weaknesses</h2>
            <p>
                Lists all pokemon types where at least one of your members has a
                weakness to
            </p>
            <div className="flex flex-wrap">{types}</div>
        </div>
    );
}

export default Weaknesses;
