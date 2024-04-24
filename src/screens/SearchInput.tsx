import { View, TextInput } from 'react-native'
import { theme } from '../styles/theme'
import { StyleSheet } from 'react-native'
import SearchIcon from 'react-native-vector-icons/AntDesign'

interface ISearchInput {
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
}

export const SearchInput = ({ searchQuery, setSearchQuery }: ISearchInput) => {
  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text)
  }

  return (
    <View style={styles.container}>
      <SearchIcon name="search1" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search by name or type"
        placeholderTextColor={theme.colors.defaultBackground}
        onChangeText={handleSearchInputChange}
        value={searchQuery}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    color: theme.colors.defaultBackground,
    borderRadius: 16,
    paddingLeft: 8,
    marginHorizontal: 8,
    marginBottom: 32,
  },
  icon: {
    marginRight: 8,
    fontSize: 20,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: theme.colors.defaultBackground,
  },
})
