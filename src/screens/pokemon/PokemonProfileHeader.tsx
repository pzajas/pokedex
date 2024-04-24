import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getBackgroundColoryBypokemonType } from '../../utils/getters/getBackgroundColoryBypokemonType'
import { getCapitalizedString } from '../../utils/getters/getCapitalizedString'
import Color from 'color'
import { IPokemon } from '../../types/types'

export const Header = ({ pokemon }: { pokemon: IPokemon }) => {
  const backgroundColor = getBackgroundColoryBypokemonType(pokemon.types)
  const adjustedBackgroundColor = Color(backgroundColor).lighten(0.2).hex()
  const id: string = pokemon?.id?.toString().padStart(3, '0')

  return (
    <View style={styles.topContainer}>
      <Text style={styles.pokemonId}>#{id}</Text>
      <Text style={styles.pokemonName}>{getCapitalizedString(pokemon)}</Text>
      <View style={styles.typesContainer}>
        {pokemon.types.map((type, index) => (
          <TouchableOpacity key={index} style={[styles.typeButton, { backgroundColor: adjustedBackgroundColor }]}>
            <Text style={styles.typeText}>{type.type.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    height: '20%',
    marginTop: 20,
    paddingHorizontal: 32,
    gap: 10,
  },
  pokemonId: {
    color: 'white',
  },
  pokemonName: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
  },
  typesContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 16,
  },
  typeText: {
    color: 'white',
  },
})
