import { IPokemon } from '@/types/types'

export const filterPokemon = (pokemonData: IPokemon[], query: string) => {
  if (!query || !Array.isArray(pokemonData)) {
    return pokemonData
  }

  const matchesQuery = (query: string) => (pokemon: IPokemon) =>
    pokemon?.name?.toLowerCase().includes(query) ||
    pokemon?.types?.some((type) => type.type.name.toLowerCase().includes(query))

  const lowerCaseQuery = query.toLowerCase()

  return pokemonData.filter(matchesQuery(lowerCaseQuery))
}
