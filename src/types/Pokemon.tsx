export interface Pokemon {
    name: string;
    url: string;
    moves: any;
    weight: number;
    stats: any;
    details: PokemonDetails;
}

export interface PokemonDetails {
    id: number;
    moves: any;
    stats: any;
    base_experience: any;
    height: number;
    types: PokemonType[];
    sprites: PokemonSprites;
}

export interface PokemonType {
    name: string;
    type: {
        name: string;
    };
}

export interface PokemonSprites {
    other: {
        'official-artwork': {
            front_default: string;
        };
    };
}
