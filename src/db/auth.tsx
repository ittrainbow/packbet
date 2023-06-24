import { useContext, createContext, ReactNode } from 'react'
import { getDoc, setDoc, doc, DocumentSnapshot, DocumentData } from 'firebase/firestore'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential
} from 'firebase/auth'

import { db, auth } from './firebase'
import { initialAppContext } from '../context/initialContexts'
import { IUser } from '../types'

const { season } = initialAppContext

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const response: UserCredential = await signInWithPopup(auth, googleProvider)
    if (response) {
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
      const user = docs.data() as IUser
      return { user, uid }
    }
  } catch (error) {
    if (error instanceof Error) console.error(error)
  }
}

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const responseLogin: UserCredential = await signInWithEmailAndPassword(auth, email, password)
    const { uid } = responseLogin.user
    const responseUser = await getDoc(doc(db, 'users', uid))
    const user = responseUser.data() as IUser
    return { user, uid }
  } catch (error) {
    if (error instanceof Error) console.error(error)
  }
}

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = response.user
    const locale = localStorage.getItem('locale') || 'ru'
    const data: IUser = { name, email, locale, admin: false }
    await setDoc(doc(db, 'users', uid), data)
    return { uid, locale }
  } catch (error) {
    if (error instanceof Error) console.error(error)
  }
}

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert('Password reset link sent!')
  } catch (error) {
    if (error instanceof Error) console.error(error)
  }
}

export const logout = () => {
  signOut(auth)
}

export function useAuthValue() {
  return useContext(AuthContext)
}

const AuthContext = createContext({})

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
