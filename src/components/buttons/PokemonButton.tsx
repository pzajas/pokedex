import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getBackgroundColoryBypokemonType } from '../../utils/getters/getBackgroundColoryBypokemonType'
import { theme } from '../../styles/theme'
import { Image } from 'react-native'
import { IPokemon } from '../../types/types'
import { StackNavigationProp } from '@react-navigation/stack'
import Color from 'color'

export type RootStackParamList = {
  Stats: { pokemon: IPokemon }
}

interface IPokemonButton {
  pokemon: IPokemon
  navigation: StackNavigationProp<RootStackParamList>
  imageUrl?: string
  id: string
}

interface IPokemonType {
  type: {
    name: string
  }
}

export const PokemonButton = ({ pokemon, navigation, imageUrl, id }: IPokemonButton) => {
  const navigateToPokemon: () => void = () => {
    navigation.navigate('Stats', { pokemon: pokemon })
  }
  const backgroundColor: string = getBackgroundColoryBypokemonType(pokemon?.types)
  const capitalizedPokemonName: string = pokemon?.name
    ? String(`${pokemon?.name.charAt(0).toUpperCase()}${pokemon?.name.slice(1)}`)
    : ''

  const adjustedBackgroundColor = Color(backgroundColor).lighten(0.2).hex()
  return (
    <View>
      <TouchableOpacity style={[styles.itemContainer, { backgroundColor }]} onPress={navigateToPokemon}>
        <View style={styles.textContainer}>
          <Text style={styles.idText}>#{id}</Text>
          <Text style={styles.nameText}>{capitalizedPokemonName}</Text>
          <View style={styles.typesContainer}>
            {pokemon.types.map((type: IPokemonType, index: number) => (
              <TouchableOpacity key={index} style={[styles.typeButton, { backgroundColor: adjustedBackgroundColor }]}>
                <Text style={styles.typeButtonText}>{type.type.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: theme.colors.defaultBackground,
    marginBottom: 10,
    marginHorizontal: 8,
    borderRadius: 12,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  idText: {
    color: theme.colors.white,
  },
  nameText: {
    color: theme.colors.white,
  },
  typesContainer: {
    flexDirection: 'row',
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 16,
  },
  typeButtonText: {
    color: theme.colors.white,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
})
