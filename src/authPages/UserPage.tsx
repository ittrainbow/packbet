import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectApp, selectUser } from '../redux/selectors'
import { userActions } from '../redux/slices'
import { Login, Dashboard } from '.'
import { Loader } from '../UI'
import { auth } from '../db/firebase'

export const UserPage = () => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const { loading } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)

  useEffect(() => {
    if (!locale) {
      let storedLocale = localStorage.getItem('locale')

      if (!storedLocale) {
        localStorage.setItem('locale', 'ru')
        storedLocale = 'ru'
      }

      dispatch(userActions.setLocale(storedLocale))
    } 
    // eslint-disable-next-line
  }, [])

  return loading ? <Loader /> : user ? <Dashboard /> : <Login />
}
