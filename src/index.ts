const API_BASE = "https://pokeapi.co/api/v2/pokemon/";
import prompt from "prompt";

import { EvolutionChainUrl, PokemonDetails, Evolution, EvolutionChain, FormattedPokemon } from "./types";
export async function evolutionChain(pokemonName: string): Promise<string> {
  if (!pokemonName) throw new Error("No name supplied");

  const detailsResponse: Response = await fetch(`${API_BASE}${pokemonName}`);
  if (detailsResponse.status === 404) {
    throw new Error("No pokemon found with the name " + pokemonName);
  }
  const details: PokemonDetails = await detailsResponse.json();
  const speciesUrl = details.species.url;

  const speciesResponse: Response = await fetch(speciesUrl);
  const species: EvolutionChainUrl = await speciesResponse.json();
  const evolutionChainUrl: string = species["evolution_chain"].url;

  const evolutionChainResponse: Response = await fetch(evolutionChainUrl);
  const evolutionChain = await evolutionChainResponse.json();
  return formatEvolutionChain(evolutionChain);
}

function formatEvolutionChain(evolutionChain: EvolutionChain): any {
  const chain: Evolution = evolutionChain.chain;
  return JSON.stringify(responseItem({ ...chain }));
}

function responseItem(evolution: Evolution): Array<FormattedPokemon> | FormattedPokemon {
  const name = evolution.species.name;
  const variations = evolution.evolves_to.length ? responseItem(evolution["evolves_to"][0]) : [];
  // if there are no evolution_details then we're at the top level
  if (!evolution.evolution_details?.length) {
    return {
      name,
      variations,
    };
  } else {
    return [
      {
        name,
        variations,
      },
    ];
  }
}

if (process.env.CLI) {
  (async function print() {
    prompt.start();
    prompt.get(["pokemon"], async (err: any, input: any): Promise<void> => {
      const result: string = await evolutionChain(input.pokemon);
      console.log(result);
    });
  })();
}
