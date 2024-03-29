import React, { useState, useEffect} from 'react';
import {getPokemonDetails, getPokemons} from './api/pokemons';
import { PokemonsList } from './components/PokemonsList';
import { PokemonCard } from './components/PokemonCard';
import {Pokemon} from "./types/Pokemon";
import "./styles/index.scss"
import {PokemonTypeFilter} from "./components/PokemonTypeFilter";
import { FilterValue } from "./utils/FilterValue";
import {Loading} from "./components/Loading";

export const App: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>();
    const [filterValue, setFilterValue] = useState(FilterValue.All);

    const offset = (page - 1) * 9;
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=9&offset=${offset}`;
    const isShownCard = Boolean(selectedPokemon);

    const fetchPokemons = async () => {
        try {
            setIsLoading(true);
            const data = await getPokemons(url);

            const detailedPokemons = await Promise.all(
                data.results.map(async (pokemon: any) => {
                    const detailsResponse = await getPokemonDetails(pokemon.url);
                    return { ...pokemon, details: detailsResponse };
                })
            );

            setPokemons((prevPokemons) => (page === 1 ? detailedPokemons : [...prevPokemons, ...detailedPokemons]));
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, [page]);

    const handleClick = () => {
        setPage((prevPage) => prevPage + 1);
    };
    const handleInfoClick = () => setSelectedPokemon(undefined);


    const showPokemonDetails = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
    };

    const getFilteringPokemons = () => {
        const typeMappings = [
            FilterValue.Water, FilterValue.Electric,
            FilterValue.Fire, FilterValue.Bug, FilterValue.Ground, FilterValue.Normal,
            FilterValue.Flying, FilterValue.Grass, FilterValue.Poison
        ];

        const typeName = typeMappings.includes(filterValue) ? filterValue : null;

        return typeName
            ? pokemons.filter((pokemon) => pokemon.details?.types.some((typeData) => typeData.type.name === typeName))
            : [...pokemons];
    };

    return (
        <div className="app">
            <div className="app__header">
                <a href='/' className="app__logo"></a>
                <PokemonTypeFilter setFilterValue={setFilterValue} filterValue={filterValue} />
            </div>
            <div className="app__content">
                {isLoading ? <Loading /> : (
                    <>
                        <PokemonsList
                            pokemons={getFilteringPokemons()}
                            showPokemonDetails={showPokemonDetails}
                            isShownCard={isShownCard}
                        />
                        {isShownCard && selectedPokemon &&
                            <PokemonCard
                                pokemon={selectedPokemon}
                                handleInfoClick={handleInfoClick}
                            />
                        }
                    </>
                )}
            </div>
            <button
                onClick={handleClick}
                className="app__button-load"
                disabled={isLoading}
            >
                Load more</button>
            <a href="#" className="app__button-home">Home</a>
        </div>
    );
};
