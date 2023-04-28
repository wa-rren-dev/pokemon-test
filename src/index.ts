import prompt from "prompt";

const API_BASE = "https://pokeapi.co/api/v2/pokemon/";

import {
  EvolutionChainUrl,
  PokemonDetails,
  Evolution,
  EvolutionChain,
  FormattedPokemon,
} from "./types";

export async function evolutionChain(pokemonName: string): Promise<string> {
  if (!pokemonName) throw new Error("No name supplied");

  const detailsResponse: Response = await fetch(`${API_BASE}${pokemonName}`);
  if (detailsResponse.status === 404) {
    throw new Error("No pokemon found with the name " + pokemonName);
  }

  const speciesUrl = await detailsResponse
    .json()
    .then((details: PokemonDetails) => details.species.url);

  const speciesResponse: Response = await fetch(speciesUrl);

  const evolutionChainUrl = await speciesResponse
    .json()
    .then((species: EvolutionChainUrl) => species.evolution_chain.url);

  const evolutionChainResponse: Response = await fetch(evolutionChainUrl);
  const evolutionChain = await evolutionChainResponse.json();
  return formatEvolutionChain(evolutionChain);
}

function formatEvolutionChain(evolutionChain: EvolutionChain): string {
  const chain: Evolution = evolutionChain.chain;
  return JSON.stringify(responseItem(chain));
}

function responseItem(evolution: Evolution): Array<FormattedPokemon> | FormattedPokemon {
  const {
    species: { name },
    evolves_to,
  } = evolution;
  const variations = evolves_to.length ? responseItem(evolves_to[0]) : [];
  // if there are no evolution_details then we're at the top level
  if (!evolution.evolution_details?.length) {
    return {
      name,
      variations,
    };
  }
  return [
    {
      name,
      variations,
    },
  ];
}

const promptSchema = {
  properties: {
    pokemon: {
      description: "Enter a pokemon name",
      type: "string",
      required: true,
    },
  },
};

if (process.env.CLI) {
  (async function print() {
    prompt.start();
    prompt.get(promptSchema, async (err: any, input: any): Promise<void> => {
      const result: string = await evolutionChain(input.pokemon.toLowerCase());
      console.log(result);
    });
  })();
}
