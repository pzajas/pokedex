import React from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { getCapitalizedString } from '../../utils/getters/getCapitalizedString'
import { StatItem } from './PokemonProfileStatItem'
import { IPokemon } from '../../types/types'
import { useEffect, useState } from 'react'

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

  if (activeTab === 'Stats') {
    return (
      <>
        <Text style={{ marginTop: 50, marginHorizontal: 16, fontSize: 16, fontWeight: '500' }}>Base Stats</Text>
        <FlatList
          style={styles.flatListContainer}
          data={Object.entries(statsObject)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <StatItem statName={item[0]} baseStat={item[1]} backgroundColor={adjustedBackgroundColor} />
          )}
          contentContainerStyle={styles.contentContainer}
        />
      </>
    )
  } else if (activeTab === 'About') {
    return (
      <View style={styles.centeredContent}>
        <Text style={{ marginHorizontal: 16 }}>
          This is {getCapitalizedString(pokemon)}. A very nasty individual. Despite that we all love pokemons. Our
          little pocket monsters!
        </Text>
      </View>
    )
  } else if (activeTab === 'Evolutions') {
    return (
      <View style={styles.evolutionContainer}>
        {evolutionChain.map((evo, index) => {
          const id: string = evo?.urlId?.toString().padStart(3, '0')
          return (
            <View key={evo.name} style={styles.evolutionItem}>
              <Image
                style={styles.pokemonImage}
                source={{
                  uri: `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${id}.png`,
                }}
              />
              <Text>#{id}</Text>
              <Text style={styles.pokemonName}>{evo.name}</Text>
              {(index + 1) % 2 === 0 && <View style={styles.rowSeparator} />}
            </View>
          )
        })}
      </View>
    )
  }
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
  evolutionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
})
