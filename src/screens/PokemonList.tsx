import { filterPokemon } from '../utils/filters/filterPokemon'
import { fetchPokemonData } from '../../api/fetchPokemonData'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import { theme } from '../styles/theme'
import { RenderPokemon } from './RenderPokemon'
import { SearchInput } from './SearchInput'
import { IPokemon } from '../types/types'

export const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState<IPokemon[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    let isMounted = true

    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchPokemonData()
        if (isMounted) {
          setPokemonData(data)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    void fetchDataAndSetState()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <SafeAreaView style={styles.screenContainer}>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={filterPokemon(pokemonData, searchQuery)}
          renderItem={({ item }) => <RenderPokemon item={item} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
