import { IPokemon } from '../types/types'
import { PokemonButton } from '../components/buttons/PokemonButton'
import { StackNavigationProp } from '@react-navigation/stack'
import { basePokedexUrl } from '../dictionary/urls'

interface RenderPokemonProps {
  item: IPokemon
  navigation: StackNavigationProp<RootStackParamList>
}

export type RootStackParamList = {
  Stats: { pokemon: IPokemon }
}

export const RenderPokemon = ({ item, navigation }: RenderPokemonProps) => {
  if (!item || !item.id) {
    return null
  }

  const pokemon = item
  const id: string = pokemon?.id?.toString().padStart(3, '0')

  const imageUrl = `${basePokedexUrl}${id}.png`

  return <PokemonButton navigation={navigation} imageUrl={imageUrl} pokemon={item} id={id} />
}
