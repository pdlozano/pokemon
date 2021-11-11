import getCoverage from "../modules/coverage";
import { PokemonTypes, TextToPokemonType } from "../modules/pokemonTypes";
import Type from "./Type";
import { usePokemonData } from "../redux/usePokemonData";

function Coverage(): JSX.Element {
    const { state: data } = usePokemonData();
    const items = Object.values(data).reduce(
        (prev: Array<PokemonTypes>, next): Array<PokemonTypes> => {
            // Filter - Remove null values
            if (next === null) {
                return prev;
            }

            const result = Object.values(next.moves).reduce(
                (
                    prevVal: Array<PokemonTypes>,
                    nextVal
                ): Array<PokemonTypes> => {
                    if (
                        nextVal === null ||
                        nextVal.damage_class.name === "status"
                    ) {
                        return prevVal;
                    }

                    return prevVal.concat([
                        TextToPokemonType(nextVal.type.name),
                    ]);
                },
                []
            );

            return prev.concat(result);
        },
        []
    );
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
