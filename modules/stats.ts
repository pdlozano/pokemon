import { PokemonData } from "../redux/reducers/reducers";

type StatsData = {
    name: string;
    hp: number;
    attack: number;
    specialAtt: number;
    defense: number;
    specialDef: number;
    speed: number;
    total: number;
};

function getTeamStats(data: Array<PokemonData>): StatsData[] {
    return data.map((item) => {
        const { name } = item.pokemon;
        const {
            hp,
            attack,
            ["special-attack"]: specialAtt,
            defense,
            ["special-defense"]: specialDef,
            speed,
        } = item.pokemon.stats;

        return {
            name,
            hp,
            attack,
            specialAtt,
            defense,
            specialDef,
            speed,
            total: hp + attack + specialAtt + defense + specialDef + speed,
        };
    });
}

export type { StatsData };
export { getTeamStats };
