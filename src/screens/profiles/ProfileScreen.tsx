import { View, Text, StyleSheet } from 'react-native'
import { FIREBASE_AUTH } from '../../../Firebase'
import { useDispatch } from 'react-redux'
import { setIsEmailVerified } from '../../redux/features/loginSlice'
import { TouchableOpacity } from 'react-native'
import { updatePassword } from 'firebase/auth'
import { resetRedux } from '../../redux/features/resetSlice'

export const ProfileScreen = () => {
  const dispatch = useDispatch()
  const handleLogoutUser = async () => {
    try {
      await FIREBASE_AUTH.signOut()
      dispatch(setIsEmailVerified(false))
      console.log('User logged out successfully')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleUpdatePassword = async () => {
    const user: any = FIREBASE_AUTH.currentUser
    const newPassword = 'abc123'

    try {
      await updatePassword(user, newPassword)
      console.log('Password updated successfully')
    } catch (error) {
      console.error('Error updating password:', error)
    }
  }

  const handleResetRedux = () => {
    dispatch(resetRedux())
  }
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={handleLogoutUser} style={styles.button}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUpdatePassword} style={styles.button}>
        <Text>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleResetRedux} style={styles.button}>
        <Text>Reset Redux</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBlockColor: 'black',
    borderWidth: 1,
    marginBottom: 4,
    marginHorizontal: 16,
  },
})
