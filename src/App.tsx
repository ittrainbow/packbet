import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Router } from './router/Router'
import { useAppContext } from './context/Context'
import { INIT_APP } from './redux/types'
import { auth } from './db'
import { appSlice } from './redux/slices/appSlice'

export const App = () => {
  const dispatch = useDispatch()
  const contextMethods = useAppContext()
  const { setMobile } = appSlice.actions
  const { userListContext, setUserListContext, setUserContext } = contextMethods
  const [user] = useAuthState(auth)

  useEffect(() => {
    dispatch({ type: INIT_APP, payload: contextMethods })
    dispatch(setMobile(isMobile))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (user && !userListContext[user.uid]) {
      const { email, displayName } = user
      const obj = structuredClone(userListContext)
      const newUser = {
        admin: false,
        name: displayName || '',
        email,
        locale: localStorage.getItem('locale') || 'ru'
      }
      obj[user.uid] = newUser
      setUserListContext(obj)
      setUserContext({ ...newUser, adminAsPlayer: false })
    }
    // eslint-disable-next-line
  }, [user])

  return <Router />
}
