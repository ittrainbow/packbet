import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectApp } from '../redux/selectors'
import { userActions } from '../redux/slices/userSlice'
import { Login, Dashboard } from '.'
import { Loader } from '../UI'
import { auth } from '../db/firebase'

export const UserPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let locale = localStorage.getItem('locale')

    if (!locale) {
      localStorage.setItem('locale', 'ru')
      locale = 'ru'
    }

    console.log(100, locale)

    dispatch(userActions.setLocale(locale))
  }, [])

  const [user] = useAuthState(auth)
  const { loading } = useSelector(selectApp)

  return loading ? <Loader /> : user ? <Dashboard /> : <Login />
}
