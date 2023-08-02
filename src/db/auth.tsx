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
import { appActions } from '../redux/slices'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    appActions.setLoading(true)
    const response: UserCredential = await signInWithPopup(auth, googleProvider)
    if (response) {
      const { email, uid } = response.user
      const name = response.user.displayName || 'username'
      const docs = await getDoc(doc(db, 'users', uid))
      const googleAuth = async () => {
        const locale = localStorage.getItem('locale') || 'ru'
        const user = { name, locale, admin: false }
        await setDoc(doc(db, 'users', uid), { ...user, email })
        await setDoc(doc(db, `answers2023`, uid), {})
      }
      docs.data() === undefined && googleAuth()
      const user = docs.data() as IUser
      appActions.setLoading(false)
      return { user, uid }
    }
  } catch (error) {
    if (error instanceof Error) console.error(error)
  }
}

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    appActions.setLoading(true)
    const responseLogin: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const { uid } = responseLogin.user
    const responseUser = await getDoc(doc(db, 'users', uid))
    const user = responseUser.data() as IUser
    appActions.setLoading(false)
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
    appActions.setLoading(true)
    const response: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const { uid } = response.user
    const data: IUser = { name, locale, admin: false }
    await setDoc(doc(db, 'users', uid), data)
    appActions.setLoading(false)
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
  appActions.setLoading(true)
  signOut(auth)
  return appActions.setLoading(false)
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
