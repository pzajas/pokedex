import { IPokemon } from '../src/types/types'

export const fetchPokemonData = async () => {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
  const kantoPokemonNumber = 151

  try {
    const pokemonIds = Array.from({ length: kantoPokemonNumber }, (_, i) => i + 1)
    const promises = pokemonIds.map(async (id) => {
      const response = await fetch(`${baseUrl}${id}`)
      if (response.ok) {
        return await response.json()
      } else {
        console.error(`Failed to fetch data for Pokemon with ID ${id}:`, response.status)
        return null
      }
    })
    const validPokemonDetails = await Promise.all(promises)
    return validPokemonDetails.filter((pokemon: IPokemon) => pokemon !== null)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
