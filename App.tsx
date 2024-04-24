import { NavigationContainer } from '@react-navigation/native'
import { MainStack } from './src/navigation/MainStack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { navigationTheme } from './src/styles/theme'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store/store'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer theme={navigationTheme}>
            <MainStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
