import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './styles/index.scss'

import { initialRedirects } from './constants'
import { auth } from './db'
import { useSwipe } from './hooks'
import { Header } from './pages'
import { selectApp } from './redux/selectors'
import { appActions, userActions } from './redux/slices'
import { INIT_APP, USER_LOGIN } from './redux/storetypes'

export const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { emailReg } = useSelector(selectApp)
  const [user] = useAuthState(auth)

  useSwipe()

  useEffect(() => {
    dispatch(appActions.setMobile(isMobile))
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
