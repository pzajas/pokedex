import { useState } from 'react'
import { Text, StyleSheet, TextInput, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { FIREBASE_AUTH } from '../../Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { PrimaryButton } from '../../src/components/buttons/PrimaryButton'
import { useDispatch } from 'react-redux'
import { setIsEmailVerified } from '../redux/features/loginSlice'
import { collection, setDoc, doc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import uuid from 'react-native-uuid'
interface IAutenticationForm {
  isLoginPanelVisible: boolean
}

export const AuthenticationForm = ({ isLoginPanelVisible }: IAutenticationForm) => {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('zajas.piotr@gmail.com')
  const [password, setPassword] = useState('ppp123')
  const dispatch = useDispatch()

  const auth = FIREBASE_AUTH

  const addUserToFirestore = async (user, data) => {
    const firestore = getFirestore()

    try {
      const usersCollection = collection(firestore, 'users')
      const userId = String(uuid.v4())

      await setDoc(doc(usersCollection, userId), {
        email: data.email,
        uid: userId,
      })

      console.log('User added to Firestore successfully')
    } catch (error) {
      console.error('Error adding user to Firestore:', error)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)

    try {
      let response

      if (data.action === 'login') {
        response = await signInWithEmailAndPassword(auth, data.email, data.password)

        if (response?.user?.emailVerified) {
          dispatch(setIsEmailVerified(response?.user?.emailVerified))
        }
      } else if (data.action === 'register') {
        response = await createUserWithEmailAndPassword(auth, data.email, data.password)

        if (response?.user?.emailVerified) {
          dispatch(setIsEmailVerified(response?.user?.emailVerified))
        }
        await addUserToFirestore(response.user, data)
        await sendVerificationEmail(response.user)
      }
    } catch (error) {
      console.error(error)

      setError('password', { type: 'manual', message: error.message })
    } finally {
      setLoading(false)
      reset()
    }
  }

  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user)
      console.log('Verification email sent successfully')
    } catch (error) {
      console.error('Error sending verification email:', error)
    }
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={!isLoginPanelVisible ? 'Provide register email' : 'Provide login email'}
              value={'zajas.piotr@gmail.com'}
              onChangeText={(text) => {
                setEmail(text)
                onChange(text)
              }}
            />
          )}
          name="email"
          rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
          defaultValue="zajas.piotr@gmail.com"
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={!isLoginPanelVisible ? 'Provide register password' : 'Provide login password'}
              secureTextEntry={true}
              value={value}
              onChangeText={(text) => {
                setPassword(text)
                onChange(text)
              }}
            />
          )}
          name="password"
          rules={{ required: 'Password is required' }}
          defaultValue="ppp123"
        />

        {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

        {isLoginPanelVisible ? (
          <PrimaryButton text="Login" onPress={handleSubmit(() => onSubmit({ action: 'login', email, password }))} />
        ) : (
          <PrimaryButton
            text="Register"
            onPress={handleSubmit(() => onSubmit({ action: 'register', email, password }))}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 30,
    paddingVertical: 15,
    borderRadius: 24,
  },
  image: {
    width: 300,
    height: 300,
  },
  startButtonContainer: {
    borderRadius: 8,
    justifyContent: 'flex-end',
    marginTop: 100,
  },
})
