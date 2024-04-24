import React from 'react'
import { View, Text, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { FIREBASE_AUTH } from '../../../Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { Button } from 'react-native-paper'

export const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const auth = FIREBASE_AUTH

  const sendEmailVerification = async (user) => {
    try {
      await sendEmailVerification(user)
      console.log('Verification email sent successfully')
    } catch (error) {
      console.error('Error sending verification email:', error)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)

    try {
      if (data.action === 'login') {
        await signInWithEmailAndPassword(auth, data.email, data.password)
      } else if (data.action === 'register') {
        const response = await createUserWithEmailAndPassword(auth, data.email, data.password)

        await sendEmailVerification(response.user)
      }
    } catch (error) {
      setError('password', { type: 'manual', message: 'Invalid email or password' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <KeyboardAvoidingView behavior="padding">
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={value}
                onChangeText={(text) => {
                  setEmail(text)
                  onChange(text)
                }}
              />
            )}
            name="email"
            rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
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
            defaultValue=""
          />

          {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

          {loading ? (
            <ActivityIndicator size={'large'} color={'steelblue'} />
          ) : (
            <>
              <Button title="Login" onPress={handleSubmit(() => onSubmit({ action: 'login', email, password }))} />
              <Button
                title="Register"
                onPress={handleSubmit(() => onSubmit({ action: 'register', email, password }))}
              />
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
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
