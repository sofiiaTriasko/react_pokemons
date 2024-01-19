import * as React from 'react';
import { Pokemon } from '../types/Pokemon';
import '../styles/PokemonList.scss';
import {PokemonItem} from "./PokemonItem";


type Props = {
    pokemons: Pokemon[];
    showPokemonDetails: (pokemon: Pokemon) => void;
    isShownCard: boolean;
};

export const PokemonsList: React.FC<Props> = ({pokemons, showPokemonDetails, isShownCard}) => {
    console.log(isShownCard)

    return (
        <>
            <div className={`pokemons ${isShownCard ? 'pokemons--mobile-hidden' : ''}`}>
                <PokemonItem
                    pokemons={pokemons}
                    showPokemonDetails={showPokemonDetails}
                />
            </div>
        </>
    );
};
