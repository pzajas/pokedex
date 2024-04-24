import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA-KuWpBXlsmCT_Js-zwN9zQoKoZPIqCns',
  authDomain: 'react-native-template-ap-a4271.firebaseapp.com',
  projectId: 'react-native-template-ap-a4271',
  storageBucket: 'react-native-template-ap-a4271.appspot.com',
  messagingSenderId: '631041491255',
  appId: '1:631041491255:web:558a371743bb2d914d5ab2',
  measurementId: 'G-GS8W4G02HN',
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
})
