// TabButton.tsx
import { theme } from '../../styles/theme'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

interface TabButtonProps {
  label: string
  setActiveTab: (tabName: string) => void
  active: boolean
}

export const TabButton = ({ label, setActiveTab, active }: TabButtonProps) => {
  const setCurrentTab = () => {
    setActiveTab(label)
  }

  return (
    <TouchableOpacity onPress={setCurrentTab} style={[styles.button, active && styles.activeButton]}>
      <Text>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    marginHorizontal: 8,
  },
  activeButton: {
    borderBottomColor: theme.colors.defaultBackground,
    borderBottomWidth: 5,
  },
})
