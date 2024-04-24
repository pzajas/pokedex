import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Alert } from 'react-native'
import { Route } from '@react-navigation/native'
import { getBackgroundColoryBypokemonType } from '../../utils/getters/getBackgroundColoryBypokemonType'
import { GoBackButton } from '../../components/buttons/GoBackButton'
import { Header } from './PokemonProfileHeader'
import { ImageContainer } from './PokemonProfileImage'
import { TabContent } from './PokemonProifileTabContent'
import { TabContainer } from './PokemonProfileTabContainer'
import { getAdjustedColor } from '../../utils/getters/getAdjustedColor'
import { IPokemon } from '../../types/types'
import { basePokedexUrl } from '../../dictionary/urls'

export const PokemonProfile = ({ route }: { route: Route<string, { pokemon: IPokemon }> }) => {
  const { pokemon } = route.params
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Stats')
  const backgroundColor = getBackgroundColoryBypokemonType(pokemon.types)
  const id: string = pokemon?.id?.toString().padStart(3, '0')
  const imageUrl = `${basePokedexUrl}${id}.png`

  useEffect(() => {
    setIsLoading(true)
    if (imageUrl) {
      Image.getSize(
        imageUrl,
        () => {
          setIsLoading(false)
        },
        () => {
          setIsLoading(false)
          Alert.alert('Error', 'Failed to load Pokémon image.')
        }
      )
    } else {
      setIsLoading(false)
    }
  }, [imageUrl])

  const statsObject: { [key: string]: number } = pokemon?.stats.reduce(
    (acc: { [key: string]: number }, stat: { stat: { name: string }; base_stat: number }) => {
      acc[stat.stat.name] = stat.base_stat
      return acc
    },
    {}
  )

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <GoBackButton />
      <Header pokemon={pokemon} />
      <View style={styles.screenContainer}>
        <ImageContainer imageUrl={imageUrl} isLoading={isLoading} />
        <TabContainer setActiveTab={setActiveTab} />
        <TabContent
          activeTab={activeTab}
          statsObject={statsObject}
          adjustedBackgroundColor={getAdjustedColor(backgroundColor)}
          pokemon={pokemon}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screenContainer: {
    position: 'relative',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
})
