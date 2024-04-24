import { IPokemon } from '../types/types'
import { PokemonButton } from '../components/buttons/PokemonButton'
import { StackNavigationProp } from '@react-navigation/stack'

interface RenderItemProps {
  item: IPokemon
  navigation: StackNavigationProp<RootStackParamList>
}

export type RootStackParamList = {
  Stats: { pokemon: IPokemon }
}

export const RenderItem = ({ item, navigation }: RenderItemProps) => {
  if (!item || !item.id) {
    return null
  }

  const pokemon = item
  const id: string = pokemon?.id?.toString().padStart(3, '0')

  const baseUrl = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/'
  const imageUrl = `${baseUrl}${id}.png`

  return <PokemonButton navigation={navigation} imageUrl={imageUrl} pokemon={item} id={id} />
}
