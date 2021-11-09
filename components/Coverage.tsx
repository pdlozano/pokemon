import { useSelector } from "react-redux";
import getCoverage from "../modules/coverage";
import { PokemonTypes, TextToPokemonType } from "../modules/pokemonTypes";
import Type from "./Type";
import { State } from "../redux/reducers/reducers";

function Coverage(): JSX.Element {
    const data = useSelector(
        (state: { pokemonData: State }) => state.pokemonData.pokemon
    );
    const items = Object.values(data).reduce((prev, next) => {
        // Filter - Remove null values
        if (next === null) {
            return prev;
        }

        const result = Object.values(next.moves).reduce((prevVal, nextVal) => {
            if (nextVal === null || nextVal.damage_class.name === "status") {
                return prevVal;
            }

            return prevVal.concat([TextToPokemonType(nextVal.type.name)]);
        }, []);

        return prev.concat(result);
    }, []);
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
