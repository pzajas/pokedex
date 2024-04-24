import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { PokemonTabStats } from './PokemonTabContent/PokemonTabStats'
import { IPokemon } from '../../types/types'
import { PokemonTabAbout } from './PokemonTabContent/PokemonTabAbout'
import { PokemonEvolutionTab } from './PokemonTabContent/PokemonEvolutionTab'
interface IStatsObject {
  [statName: string]: number
}
interface ITabContent {
  activeTab: string
  statsObject: IStatsObject
  adjustedBackgroundColor: string
  pokemon: IPokemon
}
interface IEvolutionData {
  name: string
  urlId: string
}

export const TabContent = ({ activeTab, statsObject, adjustedBackgroundColor, pokemon }: ITabContent) => {
  const [evolutionChain, setEvolutionChain] = useState<IEvolutionData[]>([])

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon species data')
        }
        const speciesData = await response.json()
        const evolutionChainUrl = speciesData.evolution_chain.url

        const evolutionChainResponse = await fetch(evolutionChainUrl)
        if (!evolutionChainResponse.ok) {
          throw new Error('Failed to fetch evolution chain data')
        }
        const evolutionChainData = await evolutionChainResponse.json()

        const extractedData = extractEvolutionData(evolutionChainData.chain)

        setEvolutionChain(extractedData)
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    const extractEvolutionData = (chain: IEvolutionData): IEvolutionData[] => {
      const evolutionData: IEvolutionData[] = []

      const traverseChain = (evolution: any) => {
        if (evolution && evolution.species) {
          const name = evolution.species.name
          const urlId = evolution.species.url.split('/').slice(-2)[0]
          evolutionData.push({ name, urlId })

          if (evolution.evolves_to && evolution.evolves_to.length > 0) {
            evolution.evolves_to.forEach((nextEvolution: IEvolutionData) => traverseChain(nextEvolution))
          }
        }
      }

      traverseChain(chain)
      return evolutionData
    }

    void fetchEvolutionChain()
  }, [pokemon])

  return (
    <>
      {activeTab === 'Stats' && (
        <>
          <Text style={styles.sectionTitle}>Base Stats</Text>
          <FlatList
            style={styles.flatListContainer}
            data={Object.entries(statsObject)}
            keyExtractor={(item) => item[0]}
            renderItem={({ item }) => (
              <PokemonTabStats statName={item[0]} baseStat={item[1]} backgroundColor={adjustedBackgroundColor} />
            )}
            contentContainerStyle={styles.contentContainer}
          />
        </>
      )}
      {activeTab === 'About' && <PokemonTabAbout pokemon={pokemon} />}
      {activeTab === 'Evolutions' && (
        <FlatList
          style={styles.evolutionContainer}
          data={evolutionChain}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => {
            if (index % 2 === 0) {
              const nextItem = evolutionChain[index + 1]
              return (
                <View style={styles.evolutionRow}>
                  <PokemonEvolutionTab id={item.urlId.toString().padStart(3, '0')} name={item.name} />
                  {nextItem && (
                    <PokemonEvolutionTab id={nextItem.urlId.toString().padStart(3, '0')} name={nextItem.name} />
                  )}
                </View>
              )
            } else {
              return null
            }
          }}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    marginTop: 40,
  },
  contentContainer: {
    marginHorizontal: 16,
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  sectionTitle: {
    marginTop: 50,
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  aboutText: {
    marginHorizontal: 16,
  },
  evolutionContainer: {
    marginTop: 32,
  },
  evolutionItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  rowSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
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
  evolutionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
})
