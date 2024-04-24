import { View, Text, StyleSheet } from 'react-native'
import { getCapitalizedString } from '../../../utils/getters/getCapitalizedString'
import { IPokemon } from '../../../types/types'

interface IPokemonTabAbout {
  pokemon: IPokemon
}

export const PokemonTabAbout = ({ pokemon }: IPokemonTabAbout) => {
  return (
    <View style={styles.centeredContent}>
      <Text style={styles.aboutText}>
        This is {getCapitalizedString(pokemon)}. A very nasty individual. Despite that we all love pokemons. Our little
        pocket monsters!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  aboutText: {
    marginTop: 32,
    marginHorizontal: 16,
  },
})
