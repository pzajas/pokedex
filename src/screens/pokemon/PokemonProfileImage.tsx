import { theme } from '../../styles/theme'
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native'

export const ImageContainer = ({ imageUrl, isLoading }: { imageUrl: string; isLoading: boolean }) => (
  <View style={styles.imageContainer}>
    {isLoading ? (
      <ActivityIndicator style={styles.activityIndicator} size="large" color={theme.colors.white} />
    ) : imageUrl ? (
      <Image source={{ uri: imageUrl }} style={styles.pokemonImage} resizeMode="contain" />
    ) : (
      <View style={styles.pokemonImage} />
    )}
  </View>
)

const styles = StyleSheet.create({
  pokemonImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
    zIndex: 999,
    position: 'absolute',
    top: -120,
    right: 40,
  },
  activityIndicator: {
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
})
