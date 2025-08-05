// services/pokeApi.js
const API_BASE = "https://pokeapi.co/api/v2";

export const fetchPokemonPage = async (page = 1, limit = 15) => {
  const offset = (page - 1) * limit;
  const res = await fetch(`${API_BASE}/pokemon?offset=${offset}&limit=${limit}`);
  const data = await res.json();
  return data.results; // [{ name, url }]
};

export const fetchPokemonDetails = async (pokemonList) => {
  const detailedPokemons = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const detail = await res.json();

      const speciesRes = await fetch(detail.species.url);
      const speciesData = await speciesRes.json();
      const habitat = speciesData.habitat?.name || "Unknown";

      let evolutions = [];
      if (speciesData.evolution_chain?.url) {
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        async function getAllEvolutions(chain) {
          const evoName = chain.species.name;
          const evoDetailRes = await fetch(`${API_BASE}/pokemon/${evoName}`);
          const evoDetail = await evoDetailRes.json();
          evolutions.push({
            name: evoDetail.name,
            image: evoDetail.sprites.other["official-artwork"].front_default,
          });
          for (const next of chain.evolves_to) {
            await getAllEvolutions(next);
          }
        }

        await getAllEvolutions(evoData.chain);
      }

      return {
        id: detail.id,
        name: detail.name,
        height: detail.height,
        weight: detail.weight,
        types: detail.types.map((t) => t.type.name),
        stats: detail.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
        front_default: detail.sprites.front_default,
        image: detail.sprites.other["official-artwork"].front_default,
        habitat,
        evolutions,
      };
    })
  );

  return detailedPokemons;
};

export const fetchPokemonByName = async (name) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) throw new Error("No encontrado");
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
};
