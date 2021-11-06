import { useSelector } from "react-redux";
import {State} from "../redux/reducers/reducers";

type StatsData = {
    hp: number,
    attack: number,
    defense: number,
    'special-attack': number,
    'special-defense': number,
    speed: number,
}

function AverageStats(): JSX.Element {
    const state = useSelector((state: { pokemonData: State }) => state.pokemonData.pokemon);
    const stats = Object.values(state).map((item) => {
        if (item === null) {
            throw new Error("State is null");
        }

        const pokemonType = item.pokemon.types.map((type) => type.type.name);
        const data: StatsData = item.pokemon.stats.reduce((prev, next) => {
            return {
                ...prev,
                [next.stat.name]: next.base_stat,
            }
        }, {});
        const specialAttack = data['special-attack'];
        const attack = data.attack;

        const effectiveAttack = Object.values(item.moves)
            .filter((move) => move?.damage_class.name !== "status")
            .map((move) => {
                if (move === null) {
                    throw new Error("Move data is null");
                }

                const stab =
                    pokemonType.indexOf(move.type.name) !== -1 ? 1.5 : 1;
                const accuracy = move.accuracy / 100 || 1;
                const movePower = move.power === null ? 1 : move.power / 100;
                const attackPower =
                    move.damage_class.name === "special" ? specialAttack : attack;

                return stab * accuracy * movePower * attackPower;
            });
        const averageEffectiveAttack = effectiveAttack.reduce((prev, next) => prev + next, 0) / effectiveAttack.length;

        return {
            hp: data.hp,
            attack: averageEffectiveAttack,
            defense: data.defense,
            specialDefense: data['special-defense'],
            speed: data.speed,
        };
    });
    const averageStats: StatsData = stats.reduce((prev: StatsData, next: StatsData) => {
        return {
            hp: prev.hp + next.hp / stats.length,
            attack: prev.attack + next.attack / stats.length,
            defense: prev.defense + next.defense / stats.length,
            specialDefense: prev.specialDefense + next.specialDefense / stats.length,
            speed: prev.speed + next.speed / stats.length,
        }
    }, {
        hp: 0,
        attack: 0,
        defense: 0,
        specialDefense: 0,
        speed: 0,
    });
    console.log(averageStats);

    return (
        <div>
            <h2>Average Stats</h2>
            <p>
                Looks at the average stats of your team. Calculation is as
                follows:
            </p>
            <ol>
                <li>
                    The average of HP, Defense, Special Defense, and Speed are
                    taken as is
                </li>
                <li>
                    The effective attack of each pokemon is computed by: (Move
                    Power) * (Physical Attack/Special Attack) * (STAB) *
                    (Accuracy). Stab is 1.5 if the move type is the same as the
                    pokemon typing and 1 otherwise.
                </li>
                <li>The effective attacks are then averaged</li>
                <table>
                    <tbody>
                        {Object.entries(averageStats).map((item) => {
                            const [key, value] = item;
                            return (<tr key={key}>
                                <td>{key}</td>
                                <td>{Math.floor(value * 100) / 100}</td>
                            </tr>);
                        })}
                    <tr>
                        <td>Total</td>
                        <td>{Object.values(averageStats).reduce((prev, next) => prev + next, 0)}</td>
                    </tr>
                    </tbody>
                </table>
            </ol>
        </div>
    );
}

export default AverageStats;
