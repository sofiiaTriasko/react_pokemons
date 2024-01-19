/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable */
import React, { useState, useEffect, ChangeEvent } from 'react';
import classNames from 'classnames';
import {getPokemonDetails, getPokemons} from './api/pokemons';
import { PokemonsList } from './components/PokemonsList';
import { PokemonCard } from './components/PokemonCard';
import {Pokemon} from "./types/Pokemon";
import { Error} from "./utils/Error";
import "./styles/app.scss"
import {PokemonTypeFilter} from "./components/PokemonTypeFilter";
import {FilterValue} from "./utils/FilterValue";

export const App: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [errorMessage, setErrorMessage] = useState<Error>(Error.NoError);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [isShownCard, setIsShownCard] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>();
    const [filterValue, setFilterValue] = useState(FilterValue.All);

    const offset = (page - 1) * 9;
    console.log(offset)
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=9&offset=${offset}`;

    const fetchPokemons = async () => {
            try {

                setIsLoading(true);
                const data = await getPokemons(url);

                    const detailedPokemons = await Promise.all(
                        data.results.map(async (pokemon: any) => {
                            const detailsResponse = await getPokemonDetails(pokemon.url);
                            return {...pokemon, details: detailsResponse};
                        })
                    );


                    setPokemons((prevPokemons) => (page === 1 ? detailedPokemons : [...prevPokemons, ...detailedPokemons]));
                    console.log(detailedPokemons)

            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
            finally{
                setIsLoading(false)
            }
        }

    useEffect(() => {
        fetchPokemons();
    }, []);


    useEffect(() => {
        fetchPokemons();
    }, [page]);


    const handleClick = () => {
        setPage((prevPage) => prevPage + 1);
    };


    const showPokemonDetails = (pokemon: Pokemon) => {
        setIsShownCard(!isShownCard);
        setSelectedPokemon(pokemon);
        console.log('clicked')
    };

    // const pokemonTypes = Array.from(
    //     new Set(pokemons.flatMap((pokemon) => pokemon.details.types.map(typeData => typeData.type.name)))
    // );
    //
    // console.log('uniwur', pokemonTypes)

    const getFilteringPokemons = () => {
        const typeMappings = [FilterValue.Water, FilterValue.Electric,
            FilterValue.Fire, FilterValue.Bug, FilterValue.Ground, FilterValue.Normal,
            FilterValue.Flying, FilterValue.Grass, FilterValue.Poison];

        const typeName = typeMappings.includes(filterValue) ? filterValue : null;

        if (typeName) {
            return pokemons.filter((pokemon) =>
                pokemon.details.types.some((typeData) => typeData.type.name === typeName)
            );
        } else {
            return [...pokemons];
        }
    };

    return (
        <div className="app">
            <div className="app__header" >
            <a href='/' className="app__logo"></a>
                <PokemonTypeFilter setFilterValue={setFilterValue} filterValue={filterValue}/>
            </div>
            <div className="app__content">
                {isLoading ? (<div className="app__loader"></div>) :(
                    <>
            <PokemonsList
                pokemons={getFilteringPokemons()}
                showPokemonDetails={showPokemonDetails}
                isShownCard={isShownCard}
            />
                {isShownCard && selectedPokemon &&
                    <PokemonCard
                        pokemon={selectedPokemon}
                        setIsShown={setIsShownCard}
                    />
                }
                </>
            )}

            </div>
            <button onClick={handleClick} className="app__button-load">Load more</button>
            <a href="#" className="app__button-home">Home</a>
        </div>
    );
};
