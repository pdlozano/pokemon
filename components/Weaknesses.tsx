import { useSelector } from "react-redux";
import getWeaknesses from "../modules/weaknesses";
import { PokemonTypes, TextToPokemonType } from "../modules/pokemonTypes";
import Type from "./Type";

function Weaknesses(): JSX.Element {
    const state = useSelector((state) => state.pokemonData.pokemon);
    const pokemonTypes = Object.values(state)
        .filter((item) => item !== null)
        .map((data) => {
            const types = data.pokemon.types.map((type) =>
                TextToPokemonType(type.type.name)
            );
            return getWeaknesses(types);
        })
        .flat();
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
