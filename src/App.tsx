import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Router } from './router/Router'
import { useAppContext } from './context/Context'
import { INIT_APP, USER_LOGIN } from './redux/types'
import { auth } from './db'
import { appSlice } from './redux/slices/appSlice'
import { userActions } from './redux/slices/userSlice'
import { initialUser } from './context/initialContexts'
// import { playersActions } from './redux/slices'
import { selectPlayers } from './redux/selectors'

export const App = () => {
  const dispatch = useDispatch()
  const contextMethods = useAppContext()
  const { setMobile } = appSlice.actions
  const players = useSelector(selectPlayers)
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

    // if (user && !players[user.uid]) {
    if (user) {
      // const { uid } = user
      const { displayName } = user
      const newUser = { ...initialUser, name: displayName || '' }

      // dispatch(playersActions.addPlayer({ uid, newUser }))
      dispatch(userActions.setUser(newUser))
    } // eslint-disable-next-line
  }, [user])

  // useEffect(() => {
  //   if (user && players[user.uid]) {
  //     dispatch(
  //       userActions.setUser({ ...players[user.uid], adminAsPlayer: true })
  //     )
  //   } // eslint-disable-next-line
  // }, [players])

  return <Router />
}
