import { Pokemon } from '../types/Pokemon';
import { client } from '../utils/fetchClient';

type Response = {
    results: Pokemon[];
}

export const getPokemons = (url: string) => {
    return client.get<Response>(url);
};
export const getPokemonDetails = (url: string) => {
    return client.get(`${url}`);
};

