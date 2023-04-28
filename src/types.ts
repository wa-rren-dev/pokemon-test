export interface PokemonSpecies {
  url: string;
  name: string;
}

export interface EvolutionChainUrl {
  evolution_chain: {
    url: string;
  };
}

export interface PokemonDetails {
  species: PokemonSpecies;
}

export interface Evolution {
  species: PokemonSpecies;
  evolves_to: Array<Evolution>;
  evolution_details: any;
}

export interface EvolutionChain {
  chain: Evolution;
  evolution_details: Array<any>;
}

export interface FormattedPokemon {
  name: string;
  variations: FormattedPokemon | Array<FormattedPokemon> | Array<string>;
}
