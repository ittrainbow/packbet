import { db, auth } from './firebase'
import React, { useContext } from 'react'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth'

import { initialAppContext } from '../context/initialContexts'

const { season } = initialAppContext

const googleProvider = new GoogleAuthProvider()
export const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider)
    const { email, displayName: name, uid } = response.user
    const docs = await getDoc(doc(db, 'users', uid))
    const googleAuth = async () => {
      const locale = localStorage.getItem('locale')
      const user = { email, name, locale, admin: false }
      const answers = {}
      await setDoc(doc(db, 'users', uid), user)
      await setDoc(doc(db, `answers${season}`, uid), answers)
    }
    docs.data() === undefined && googleAuth()
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
}

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
}

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = response.user
    const locale = localStorage.getItem('locale')
    const data = { name, email, locale, admin: false }
    await setDoc(doc(db, 'users', uid), data)
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
}

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert('Password reset link sent!')
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
}

export const logout = () => {
  signOut(auth)
}

export function useAuthValue() {
  return useContext(AuthContext)
}

const AuthContext = React.createContext()

export function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
