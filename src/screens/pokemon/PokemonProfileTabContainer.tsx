import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TabButton } from './TabButton'

export const TabContainer = ({ setActiveTab }: { setActiveTab: (tabName: string) => void }) => {
  const [activeTab, setActiveTabState] = useState('About')

  const handleSetActiveTab = (tabName: string) => {
    setActiveTabState(tabName)
    setActiveTab(tabName)
  }

  return (
    <View style={styles.tabContainer}>
      <TabButton label="About" setActiveTab={handleSetActiveTab} active={activeTab === 'About'} />
      <TabButton label="Stats" setActiveTab={handleSetActiveTab} active={activeTab === 'Stats'} />
      <TabButton label="Evolutions" setActiveTab={handleSetActiveTab} active={activeTab === 'Evolutions'} />
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
})
