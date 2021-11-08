import { useSelector } from "react-redux";
import getCoverage from "../modules/coverage";
import { PokemonTypes, TextToPokemonType } from "../modules/pokemonTypes";
import Type from "./Type";

function Coverage(): JSX.Element {
    const data = useSelector((state) => state.pokemonData.pokemon);
    const items = Object.values(data)
        .filter((item) => item !== null)
        .map((item) => {
            return Object.values(item.moves).reduce((prev, next) => {
                if (next === null) {
                    return prev;
                }

                if (next.damage_class.name === "status") {
                    return prev.concat([]);
                }

                return prev.concat([TextToPokemonType(next.type.name)]);
            }, []);
        })
        .flat();
    const coverage = new Set(getCoverage(items));

    const types = Object.values(PokemonTypes).map((type) => (
        <Type data={type} key={type} disabled={!coverage.has(type)} />
    ));

    return (
        <div>
            <h2>Coverage</h2>
            <p>
                Shows pokemon types that you can counter with a super effective
                move from your team
            </p>
            <div className="flex flex-wrap">{types}</div>
        </div>
    );
}

export default Coverage;
