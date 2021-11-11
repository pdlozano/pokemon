import getCoverage from "../modules/coverage";
import { PokemonTypes } from "../modules/pokemonTypes";
import Type from "./Type";
import { usePokemonData } from "../redux/usePokemonData";
import { AttackType } from "../modules/pokemonData";

function Coverage(): JSX.Element {
    const { state } = usePokemonData();

    const items = Object.values(state).reduce(
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
                        nextVal.damage_class === AttackType.status
                    ) {
                        return prevVal;
                    }

                    return prevVal.concat([nextVal.type]);
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
