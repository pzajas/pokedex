import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { formatStatName } from '../../utils/formatters/formatStatName'

interface IStatItem {
  statName: string
  baseStat: string | number
  backgroundColor: string
}

export const StatItem = ({ statName, baseStat, backgroundColor }: IStatItem) => (
  <TouchableOpacity style={[styles.statItem, { backgroundColor }]}>
    <View style={{ flexDirection: 'row' }}>
      <Text style={[styles.statText, { width: 120 }]}>{formatStatName(statName)}</Text>
      <Text style={styles.statText}>{baseStat}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  statItem: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 16,
    justifyContent: 'center',
  },
  statText: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 8,
    textTransform: 'capitalize',
  },
})
