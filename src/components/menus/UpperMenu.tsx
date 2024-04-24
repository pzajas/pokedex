import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import MenuIcon from 'react-native-vector-icons/Feather'
import BackIcon from 'react-native-vector-icons/AntDesign'
import { theme } from '../../styles/theme'
import { useSelector } from 'react-redux'

interface IProps {
  offline?: boolean
}

export const UpperMenu = ({ offline }: IProps) => {
  const navigation = useNavigation<any>()
  const loginState = useSelector((state: any) => state?.loginData?.isUserLoggedIn)

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  const navigateToScreen = (screenName: string, type?: string) => () => {
    navigation.navigate(screenName as never, type)
  }

  const navigateBack = () => navigation.goBack()

  return (
    <>
      <Appbar.Header>
        <View style={styles.upperMenu}>
          <TouchableOpacity onPress={navigateToScreen(offline ? 'OfflineScreen' : 'OnlineScreen')}></TouchableOpacity>
          <View style={styles.menuIconLeft}>
            <TouchableOpacity onPress={navigateBack}>
              <BackIcon name="left" size={24} padding={15} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          {loginState && (
            <View style={styles.menuIconRight}>
              <TouchableOpacity onPress={openDrawer}>
                <MenuIcon name="menu" size={24} padding={20} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Appbar.Header>
    </>
  )
}

const styles = StyleSheet.create({
  upperMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#FFFF',
    padding: 35,
  },
  imageIcon: {
    width: 104,
    height: 59,
  },
  menuIconRight: {
    position: 'absolute',
    right: 0,
  },
  menuIconLeft: {
    position: 'absolute',
    left: 0,
  },
})
