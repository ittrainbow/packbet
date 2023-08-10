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
import { i18n } from '../locale'
import { appActions } from '../redux/slices'
import { getLocale } from '../helpers'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    appActions.setLoading(true)
    const response: UserCredential = await signInWithPopup(auth, googleProvider)
    if (response) {
      const { uid } = response.user
      const name = response.user.displayName || 'username'
      const docs = await getDoc(doc(db, 'users', uid))
      const googleAuth = async () => {
        const locale = getLocale()
        const user = { name, locale, admin: false, buddies: [uid] }
        await setDoc(doc(db, 'users', uid), user)
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

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    appActions.setLoading(true)
    const responseLogin: UserCredential = await signInWithEmailAndPassword(auth, email, password)
    const { uid } = responseLogin.user
    const responseUser = await getDoc(doc(db, 'users', uid))
    const user = responseUser.data() as IUser
    appActions.setLoading(false)
    return { user, uid }
  } catch (error) {
    if (error instanceof Error) {
      const locale = getLocale()
      const { emailWrongMsg, passwordWrongMsg } = i18n(locale, 'auth') as LocaleType
      if (error.message.includes('user-not-found')) {
        alert(emailWrongMsg)
      } else if (error.message.includes('wrong-password')) {
        alert(passwordWrongMsg)
      }
      console.error(error.message)
    }
  }
}

export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  const locale = getLocale()
  try {
    appActions.setLoading(true)
    const response: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = response.user
    const data: IUser = { name, locale, admin: false, buddies: [uid] }
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
