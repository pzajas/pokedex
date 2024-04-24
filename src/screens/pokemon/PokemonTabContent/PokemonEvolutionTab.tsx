import { basePokedexUrl } from '../../../dictionary/urls'
import { View, Text, StyleSheet, Image } from 'react-native'

interface IPokemonEvolutionTab {
  id: string
  name: string
}

export const PokemonEvolutionTab = ({ id, name }: IPokemonEvolutionTab) => {
  return (
    <View style={styles.evolutionItem}>
      <Image
        style={styles.pokemonImage}
        source={{
          uri: `${basePokedexUrl}${id}.png`,
        }}
      />
      <Text>#{id}</Text>
      <Text style={styles.pokemonName}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  evolutionItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 5,
  },
  pokemonName: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
})
