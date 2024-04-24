import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from '../../../assets/icons/ChevronLeftIcon'
import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import { debounce } from 'lodash'

export const GoBackButton = () => {
  const navigation = useNavigation<any>()
  const navigateBack = () => navigation.goBack()
  const debouncedBack = debounce(navigateBack, 300)
  return <IconButton icon={ChevronLeftIcon} onPress={debouncedBack} style={styles.chevronContainer} />
}

const styles = StyleSheet.create({
  chevronContainer: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
})
