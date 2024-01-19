import React from 'react';
import classNames from 'classnames';
import '../styles/PokemonItem.scss';
import {Pokemon} from "../types/Pokemon";

type Props = {
    pokemons: Pokemon[];
    showPokemonDetails: (pokemon: Pokemon) => void,
};

export const PokemonItem: React.FC<Props> = ({pokemons, showPokemonDetails}) => {
    return (
        <>
            {pokemons.map((pokemon) => (
                <div
                    className="pokemon-item"
                    onClick={() => showPokemonDetails(pokemon)}
                >
                    <div className="pokemon-item__image-container">
                        <img
                            className="pokemon-item__image"
                            src={pokemon.details.sprites.other['official-artwork'].front_default}
                            alt={pokemon.name}
                        />
                    </div>

                    <h1 className="pokemon-item__name">{pokemon.name}</h1>
                    <div className="pokemon-item__types">
                        {pokemon.details.types.map((type: { type: { name: string } }) => (
                            <div key={type.type.name} className={classNames('pokemon-item__type', `${type.type.name}`)}>
                                {type.type.name}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};
