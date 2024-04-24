import { StyleSheet, Text, View } from 'react-native'

export const PolicyScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Policy Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
