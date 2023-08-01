import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Router } from './router/Router'
import { useAppContext } from './context/Context'
import { INIT_APP, USER_LOGIN } from './redux/storetypes'
import { auth } from './db'
import { appSlice } from './redux/slices/appSlice'
import { userActions } from './redux/slices/userSlice'
import { initialUser } from './helpers/initials'

export const App = () => {
  const dispatch = useDispatch()
  const contextMethods = useAppContext()
  const { setMobile } = appSlice.actions
  const [user] = useAuthState(auth)

  useEffect(() => {
    dispatch({ type: INIT_APP, payload: contextMethods })
    dispatch(setMobile(isMobile)) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (user) {
      const { uid } = user
      dispatch({ type: USER_LOGIN, payload: uid })
    }
    if (user) {
      const { displayName } = user
      const newUser = { ...initialUser, name: displayName || '' }

      dispatch(userActions.setUser(newUser))
    } // eslint-disable-next-line
  }, [user])

  return <Router />
}
