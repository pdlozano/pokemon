import Pokemon from "../components/Pokemon";
import MoveSet from "../components/MoveSet";
import { useSelector, useDispatch } from "react-redux";
import { PokemonClient } from "pokenode-ts";
import { useState, useEffect } from "react";
import { actions } from "../redux/actions";

const api = new PokemonClient();

function PokemonPage(): JSX.Element {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [text, setText] = useState<string>("gengar");
    const [active, setActive] = useState<string>("gengar");

    useEffect(() => {
        api.getPokemonByName(active)
            .then((data) => {
                dispatch(actions.pokemon.add(data));
            })
            .catch((error) => console.error(error));
    }, [active]);

    return (
        <div>
            <input
                type="text"
                onChange={(event) => {
                    event.preventDefault();
                    setText(event.target.value);
                }}
                value={text}
            />
            <button
                onClick={(event) => {
                    event.preventDefault();
                    setActive(text.toLowerCase());
                }}
            >
                Search
            </button>

            {state.pokemonData.pokemon.map((pokemon: any) => {
                return (
                    <Pokemon data={pokemon.pokemon}>
                        <MoveSet
                            moves={pokemon.moves || []}
                            setMoves={() => {}}
                        />
                    </Pokemon>
                );
            })}

            <div></div>
        </div>
    );
}

export default PokemonPage;
