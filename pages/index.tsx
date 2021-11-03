import Pokemon from "../components/Pokemon";
import MoveSet from "../components/MoveSet";
import { useSelector, useDispatch } from "react-redux";
import { PokemonClient } from "pokenode-ts";
import { useState, useEffect } from "react";
import { actions } from "../redux/actions";
import AddPokemon from "../components/AddPokemon";
import { State } from "../redux/reducers/reducers";

const api = new PokemonClient();

function PokemonPage(): JSX.Element {
    const state = useSelector(
        (state: { pokemonData: State }) => state.pokemonData
    );

    return (
        <div>
            <AddPokemon api={api} />
            {Object.entries(state.pokemon).map((data) => {
                const [key, pokemon] = data;

                if (pokemon === null) {
                    return <div>No Pokemon</div>;
                }

                return (
                    <Pokemon data={pokemon.pokemon} key={key}>
                        {/* <MoveSet pokemon={pokemon.pokemon} item={key} /> */}
                    </Pokemon>
                );
            })}

            <div></div>
        </div>
    );
}

export default PokemonPage;
