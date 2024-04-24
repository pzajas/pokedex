import { theme } from '../../../src/styles/theme'
import { View, Text, Pressable, StyleSheet, ViewStyle, DimensionValue } from 'react-native'
interface IPrimaryButton {
  text: string
  width?: DimensionValue
  onPress?: () => void
}

export const PrimaryButton = ({ text, width, onPress }: IPrimaryButton) => {
  const containerStyle: ViewStyle = {
    width: width,
  }

  return (
    <View style={[styles.pressableContainer, containerStyle]}>
      <Pressable onPress={onPress}>
        <Text style={styles.pressableText}>{text}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  pressableContainer: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 24,
  },
  pressableText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
})
