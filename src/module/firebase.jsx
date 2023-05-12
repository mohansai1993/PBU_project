import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBhITz4_WKlVKnPuNyI8FbwJQgZiIkme8Q',
  authDomain: 'chat-99a52.firebaseapp.com',
  projectId: 'chat-99a52',
  storageBucket: 'chat-99a52.appspot.com',
  messagingSenderId: '117938608303',
  appId: '1:117938608303:web:0efc35ce89780fb37adc5a',
  measurementId: 'G-BS93GP1SZN',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
