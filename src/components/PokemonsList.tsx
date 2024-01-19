import * as React from 'react';
import { Pokemon } from '../types/Pokemon';
import '../styles/PokemonList.scss';
import {PokemonItem} from "./PokemonItem";


type Props = {
    pokemons: Pokemon[];
    showPokemonDetails: (pokemon: Pokemon) => void;
};

export const PokemonsList: React.FC<Props> = ({pokemons, showPokemonDetails}) => {
    return (
        <>
            <div className="pokemons">
                <PokemonItem pokemons={pokemons} showPokemonDetails={showPokemonDetails}/>
            </div>
        </>
    );
};
