import React from 'react';
import classNames from 'classnames';
import { Pokemon } from "../types/Pokemon";

type Props = {
    pokemon: Pokemon;
    setIsShown: (arg0: boolean)=>void;
};

export const PokemonCard: React.FC<Props> = ({ pokemon, setIsShown}) => {
    return (
        <>
            <div className="pokemon-card" onClick={()=> setIsShown(false)}>
                <div className="pokemon-card__image-container">
                    <img
                        className="pokemon-card__image"
                        src={pokemon.details.sprites.other['official-artwork'].front_default}
                        alt={pokemon.name}
                    />
                </div>

                <div className="pokemon-card__header">
                <div className="pokemon-card__name">{pokemon.name}</div>
                <div key={pokemon.details.id} className="pokemon-card__number">
                    #{pokemon.details.id}
                </div>
                </div>

                <div className="pokemon-card__types">
                    {pokemon.details.types.map((type: { type: { name: string } }) => (
                        <div key={type.type.name} className={classNames('pokemon-card__type', `${type.type.name}`)}>
                            {type.type.name}
                        </div>
                    ))}
                </div>

                <table className="pokemon-card__table">
                    <tbody>
                    {pokemon.details.stats.map((stat: { base_stat: number; stat: { name: string } }) => (
                        <tr key={stat.stat.name}>
                            <td>{stat.stat.name[0].toUpperCase() + stat.stat.name.slice(1)}</td>
                            <td>{stat.base_stat}</td>
                        </tr>
                    ))}
                    <tr>
                        <td>Weight</td>
                        <td>{pokemon.details.height}</td>
                    </tr>
                    <tr>
                        <td>Total Moves</td>
                        <td>{pokemon.details.moves.length}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};
