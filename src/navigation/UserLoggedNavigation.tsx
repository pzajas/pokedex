import 'react-native-gesture-handler'
import { PokemonList } from '../screens/PokemonList'
import { PokemonProfile } from '../screens/pokemon/PokemonProfile'
import { ProfileScreen } from '../screens/profiles/ProfileScreen'
import { ReceiptsScreen } from '../screens/receipts/ReceiptsScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { InstagramIcon } from '../assets/icons/InstagramIcon'
import { theme } from '../styles/theme'
import { Dimensions, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PlusIcon from 'react-native-vector-icons/AntDesign'

const devWidth = Dimensions.get('window').width

export const UserLoggedNavigation = () => {
  const Tab = createBottomTabNavigator()
  const ReceiptIcon = Ionicons
  const HomeIcon = Ionicons
  const PersonIcon = Ionicons
  const StatsIcon = Ionicons

  return (
    <Tab.Navigator
      initialRouteName="WelcomeScreen"
      backBehavior="history"
      screenOptions={{
        tabBarStyle: {
          width: '0%',
          height: '0%',
        },
        tabBarShowLabel: false,
        header: () => <></>,
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={PokemonList}
        options={{
          tabBarIcon: () => (
            <View style={[styles.tabIcon, { zIndex: -2 }]}>
              <HomeIcon name="home-outline" size={30} color={theme.colors.primary} />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Receipt"
        component={ReceiptsScreen}
        options={{
          tabBarIcon: () => (
            <View style={[styles.tabIcon, { zIndex: -2 }]}>
              <ReceiptIcon name="receipt-outline" size={30} color={theme.colors.primary} />
            </View>
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Add"
        component={StatsScreen}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity onPress={() => console.log('pp')} style={styles.timerTab}>
              <View style={styles.timerTabContent}>
                <PlusIcon name="plus" size={30} color={theme.colors.white} />
              </View>
            </TouchableOpacity>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Stats"
        component={PokemonProfile}
        options={{
          tabBarIcon: () => (
            <View style={[styles.tabIcon, { zIndex: -2 }]}>
              <StatsIcon name="stats-chart-outline" size={30} color={theme.colors.primary} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <View style={[styles.tabIcon, { zIndex: -2 }]}>
              <PersonIcon name="person-outline" size={30} color={theme.colors.primary} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabIcon: {
    width: devWidth / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerTab: {
    width: (devWidth / 3) * 0.4,
    height: (devWidth / 3) * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -(((devWidth / 3) * 0.4) / 2),
    backgroundColor: theme.colors.primary,
    borderRadius: ((devWidth / 3) * 0.4) / 2,
  },
  timerTabContent: {
    backgroundColor: theme.colors.primary,
    width: (devWidth / 3) * 0.4 - 20,
    height: (devWidth / 3) * 0.4 - 20,
    borderRadius: ((devWidth / 3) * 0.4 - 20) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
