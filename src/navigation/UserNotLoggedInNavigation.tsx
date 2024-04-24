import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { UpperMenu } from '../components/menus/UpperMenu'
import { LoginScreen } from '../screens/auth/LoginScreen'
import { WelcomeScreen } from '../screens/welcome/WelcomeScreen'
import { RegisterScreen } from '../screens/auth/RegisterScreen'
import { PolicyScreen } from '../screens/policy/PolicyScreen'

export const UserNotLoggedInNavigation = () => {
  const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator
      initialRouteName="WelcomeScreen"
      backBehavior="history"
      screenOptions={{
        drawerStyle: {
          width: 250,
        },
        drawerPosition: 'right',
        drawerType: 'front',
        header: () => <UpperMenu />,
      }}
    >
      <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
      <Drawer.Screen name="LoginScreen" component={LoginScreen} />
      <Drawer.Screen name="PolicyScreen" component={PolicyScreen} />
    </Drawer.Navigator>
  )
}
