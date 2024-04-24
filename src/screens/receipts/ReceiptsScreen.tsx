import { StyleSheet, Text, View } from 'react-native'

export const ReceiptsScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Receipts</Text>
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
