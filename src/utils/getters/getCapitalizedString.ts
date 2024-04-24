import { IPokemon } from '../../types/types'

export const getCapitalizedString = (pokemon: IPokemon) => {
  return pokemon?.name ? `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}` : ''
}
