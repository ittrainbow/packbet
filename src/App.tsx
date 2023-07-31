import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Router } from './router/Router'
import { useAppContext } from './context/Context'
import { INIT_APP } from './redux/types'
import { auth } from './db'
import { appSlice } from './redux/slices/appSlice'
import { userActions } from './redux/slices/userSlice'
import { initialUser } from './context/initialContexts'

export const App = () => {
  const dispatch = useDispatch()
  const contextMethods = useAppContext()
  const { setMobile } = appSlice.actions
  const { userListContext, setUserListContext } = contextMethods
  const [user] = useAuthState(auth)

  useEffect(() => {
    dispatch({ type: INIT_APP, payload: contextMethods })
    dispatch(setMobile(isMobile))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (user && !userListContext[user.uid]) {
      const { displayName } = user
      const newUser = { ...initialUser, name: displayName || '' }
      const obj = structuredClone(userListContext)
      obj[user.uid] = newUser
      setUserListContext(obj)

      dispatch(userActions.setUser(newUser))
    }
    // eslint-disable-next-line
  }, [user])

  return <Router />
}
