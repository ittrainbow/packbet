import { db, auth } from './firebase'
import React, { useContext } from 'react'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification
} from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider)
    const { email, displayName, uid } = response.user
    const docs = await getDoc(doc(db, 'users', uid))
    if (docs.data() === undefined) {
      const data = { name: displayName, year: 2022, dpi: false, email }
      await setDoc(doc(db, 'users', uid), data)
    }
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = response.user
    const data = { name, email, dpi: false, year: 2022 }
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
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

export const verifyEmail = async () => {
  sendEmailVerification(auth.currentUser)
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
