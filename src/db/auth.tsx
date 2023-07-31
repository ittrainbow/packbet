import { useContext, createContext, ReactNode } from 'react'
import { getDoc, setDoc, doc } from 'firebase/firestore'
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
import { IUser, LocaleType } from '../types'
import { i18n } from '../locale/locale'
import { appActions } from '../redux/slices/appSlice'

const season = 2023

const googleProvider = new GoogleAuthProvider()

const { setLoading } = appActions

export const signInWithGoogle = async () => {
  try {
    setLoading(true)
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
      setLoading(false)
      return { user, uid }
    }
  } catch (error) {
    if (error instanceof Error) console.error(error)
  }
}

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const responseLogin: UserCredential = await signInWithEmailAndPassword(auth, email, password)
    setLoading(true)
    const { uid } = responseLogin.user
    const responseUser = await getDoc(doc(db, 'users', uid))
    const user = responseUser.data() as IUser
    setLoading(false)
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
  const locale = localStorage.getItem('locale') || 'ru'
  try {
    const response: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
    setLoading(true)
    const { uid } = response.user
    const data: IUser = { name, email, locale, admin: false }
    await setDoc(doc(db, 'users', uid), data)
    setLoading(false)
    return { uid, locale }
  } catch (error) {
    if (error instanceof Error) {
      const { emailExistsMsg } = i18n(locale, 'auth') as LocaleType
      if (error.message.includes('email-already-in-use')) alert(emailExistsMsg)
      console.error(error)
    }
  }
}

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return alert('Password reset link sent!')
  } catch (error) {
    if (error instanceof Error) console.error(error)
  }
}

export const logout = () => {
  setLoading(true)
  signOut(auth)
  return setLoading(false)
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
