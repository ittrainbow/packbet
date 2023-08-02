import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Router } from './router/Router'
import { useAppContext } from './context/Context'
import { INIT_APP, USER_LOGIN } from './redux/storetypes'
import { auth } from './db'
import { appActions } from './redux/slices'

export const App = () => {
  const dispatch = useDispatch()
  const contextMethods = useAppContext()
  const { setMobile } = appActions
  const [user] = useAuthState(auth)

  useEffect(() => {
    dispatch({ type: INIT_APP, payload: contextMethods })
    dispatch(setMobile(isMobile)) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (user) {
      dispatch({
        type: USER_LOGIN,
        payload: user
      })
    } // eslint-disable-next-line
  }, [user])

  return <Router />
}
