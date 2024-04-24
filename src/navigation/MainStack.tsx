import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserNotLoggedInNavigation } from './UserNotLoggedInNavigation'
import { UserLoggedNavigation } from './UserLoggedNavigation'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import { FIREBASE_AUTH } from '../../Firebase'
import { PokemonList } from '../screens/PokemonList'

const LoadingScreen = () => {
  return <ActivityIndicator />
}

export const MainStack = () => {
  const Stack = createNativeStackNavigator()
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<any>(null)
  const isUserEmailVerified = useSelector((state) => state?.authData?.isEmailVerified)

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       let user = FIREBASE_AUTH.currentUser

  //       while (!user) {
  //         await new Promise((resolve) => setTimeout(resolve, 1000)) // Adjust the delay as needed
  //         user = FIREBASE_AUTH.currentUser
  //       }
  //     } catch (error) {
  //       console.error('Error checking login status:', error)
  //     }
  //   }

  //   void checkLoginStatus()
  // }, [])

  // useEffect(() => {
  //   const getUserByEmail = async (email) => {
  //     const usersCollection = collection(FIREBASE_DB, 'users')

  //     // Query for the user with a specific email
  //     const emailQuery = query(usersCollection, where('email', '==', email))

  //     try {
  //       const querySnapshot = await getDocs(emailQuery)

  //       if (!querySnapshot.empty) {
  //         // Assuming there is at least one document with the specified email
  //         const userDocument = querySnapshot.docs[0]
  //         const docId = userDocument.id
  //         const userData = userDocument.data()  //
  //       } else {
  //         console.log('User with email not found')
  //       }
  //     } catch (error) {
  //       console.error('Error getting user by email:', error)
  //     }
  //   }

  //   // Call the function with the specific email
  //   void getUserByEmail('zajas.piotr@gmail.com')
  // }, [])

  // useEffect(() => {
  //   const getUserWithWorkers = async (userId) => {
  //     const userDocRef = doc(FIREBASE_DB, 'users', userId)
  //     const workersCollectionRef = collection(userDocRef, 'workers')

  //     try {
  //       // Fetch user document
  //       const userDocSnapshot = await getDoc(userDocRef)

  //       if (userDocSnapshot.exists()) {
  //         const userData = userDocSnapshot.data()
  //         console.log('User Document Data:', userData)

  //         // Fetch workers subcollection
  //         const workersQuerySnapshot = await getDocs(workersCollectionRef)
  //         const workersData = workersQuerySnapshot.docs.map((doc) => doc.data())
  //         console.log('Workers Data:', workersData)
  //       } else {
  //         console.log('User document not found')
  //       }
  //     } catch (error) {
  //       console.error('Error getting user document:', error)
  //     }
  //   }

  //   // Call the function with the specific user document ID
  //   void getUserWithWorkers('QvVJjFqy0MuhroMMoRrD')
  // }, [])

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      setUser(user)

      if (initializing) {
        setInitializing(false)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [initializing])

  if (initializing) {
    return <LoadingScreen />
  }

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: false,
      })}
    >
      {user && isUserEmailVerified ? (
        <Stack.Screen name="UserLoggedStack" component={UserLoggedNavigation} />
      ) : (
        <Stack.Screen name="UserNotLoggedStack" component={UserNotLoggedInNavigation} />
      )}
    </Stack.Navigator>
  )
}
