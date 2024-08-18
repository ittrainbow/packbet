import { useEffect } from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './index.css'

import { auth } from './db'
import { useSwipe } from './hooks'
import { Header } from './pages'
import { selectApp } from './redux/selectors'
import { appActions, userActions } from './redux/slices'
import { INIT_APP, USER_LOGIN } from './redux/storetypes'

export const App = () => {
  const initialRedirects = ['/', '/userpage', '/week', 'season', '/standings', '/calendar', '/editor']
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { emailReg } = useSelector(selectApp)
  const [user] = useAuthState(auth)

  useSwipe()

  useEffect(() => {
    dispatch({ type: INIT_APP })
    navigate('/login')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(userActions.setUid(user.uid))
      dispatch({ type: USER_LOGIN, payload: { user, emailReg } })

      const lastTab = Number(localStorage.getItem('packContestLastTab') || 1)
      navigate(initialRedirects[lastTab])
      dispatch(appActions.setTabActive(lastTab))
      lastTab === 5 && dispatch(appActions.setEditor(true))
    }
    // eslint-disable-next-line
  }, [user])

  return <Header />
}
