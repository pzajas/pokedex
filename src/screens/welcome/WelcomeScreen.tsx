import { PrimaryButton } from '../../../src/components/buttons/PrimaryButton'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'

export const WelcomeScreen = () => {
  const navigation = useNavigation<any | string>()

  const navigateToScreen = (screenName: string) => () => {
    navigation.navigate(screenName)
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.screenContainer}>
        <View style={styles.wrapperImage}>
          <Image source={require('./../../../assets/images/welcome_logo.png')} style={styles.image} />
          <Text style={styles.restaurantNametext}>Simple Pokedex</Text>
        </View>
        <View style={styles.pressableWrapper}>
          <PrimaryButton text="Start" onPress={navigateToScreen('RegisterScreen')} width={'48%'} />
          <PrimaryButton text="Policy" onPress={navigateToScreen('PolicyScreen')} width={'48%'} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  wrapperImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: 250,
  },
  restaurantNametext: {
    marginTop: 50,
    fontSize: 24,
  },
  pressableWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
  },
})
