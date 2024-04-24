import { theme } from '../../../src/styles/theme'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import FacebookIcon from 'react-native-vector-icons/Entypo'
import GoogleIcon from 'react-native-vector-icons/AntDesign'
import AppleIcon from 'react-native-vector-icons/AntDesign'
import { useState } from 'react'
import { AuthenticationForm } from '../../../src/forms/AuthenticationForm'

export const RegisterScreen = () => {
  const [isLoginPanelVisible, setIsLoginPanelVisible] = useState<boolean>(false)

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  const handleLoginPanelVisibility = () => {
    setIsLoginPanelVisible(!isLoginPanelVisible)
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <View style={styles.viewWrapper}>
        <Text style={styles.textWrapper}>
          By using your social log in, your personal details are safe. We do not gain access to your password or private
          information.
        </Text>

        <View style={styles.pressableWrapper}>
          <Pressable style={styles.pressableContainer}>
            <View style={styles.rowContainer}>
              <AppleIcon name="apple-o" size={24} color={theme.colors.black} style={{ width: 50 }} />
              <Text style={styles.pressableText}>Sign in with Apple</Text>
            </View>
          </Pressable>
          <Pressable style={styles.pressableContainer}>
            <View style={styles.rowContainer}>
              <GoogleIcon name="google" size={24} color={theme.colors.black} style={{ width: 50 }} />
              <Text style={styles.pressableText}>Sign in with Google</Text>
            </View>
          </Pressable>
          <Pressable style={styles.pressableContainer}>
            <View style={styles.rowContainer}>
              <FacebookIcon name="facebook-with-circle" size={24} color={theme.colors.black} style={{ width: 50 }} />
              <Text style={styles.pressableText}>Sign in with Facebook</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.container}>
          <View style={styles.horizontalLine}></View>
          <Text style={styles.orText}>or</Text>
          <View style={styles.horizontalLine}></View>
        </View>

        <View style={{ width: '100%' }}>
          <KeyboardAvoidingView behavior="padding">
            <AuthenticationForm isLoginPanelVisible={isLoginPanelVisible} />
          </KeyboardAvoidingView>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity onPress={handleLoginPanelVisibility}>
            {!isLoginPanelVisible ? (
              <Text>
                Already have an account? <Text style={{ color: 'blue' }}>Log in.</Text>
              </Text>
            ) : (
              <Text>
                You do not have an account? <Text style={{ color: 'blue' }}>Create now.</Text>
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    textAlign: 'justify',
    marginBottom: 40,
  },
  pressableWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  pressableContainer: {
    backgroundColor: theme.colors.white,
    padding: 15,
    borderRadius: 24,
    width: '100%',
    borderWidth: 1,
    marginBottom: 15,
  },
  pressableText: {
    fontSize: 16,
    color: theme.colors.primary,
    width: 200,
  },
  createAccountButtonContainer: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 24,
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
  },
  createAccountText: {
    fontSize: 16,
    color: theme.colors.white,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginBottom: 30,
  },
  horizontalLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
    marginHorizontal: 5,
  },
  orText: {
    marginHorizontal: 10,
  },
})
