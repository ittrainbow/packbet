import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import { INIT_APP, USER_LOGIN } from './redux/storetypes'
import { appActions, userActions } from './redux/slices'
import { selectApp } from './redux/selectors'
import { initialRedirects } from './helpers'
import { useSwipe } from './hooks'
import { Header } from './pages'
import { auth } from './db'

export const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { emailReg } = useSelector(selectApp)
  const [user] = useAuthState(auth)

  useSwipe()

  useEffect(() => {
    const lastTab = Number(localStorage.getItem('packContestLastTab') || 1)
    dispatch({ type: INIT_APP })
    dispatch(appActions.setMobile(isMobile))
    dispatch(appActions.setTabActive(lastTab))
    navigate('/login')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(userActions.setUid(user.uid))
      dispatch({
        type: USER_LOGIN,
        payload: { user, emailReg }
      })

      const lastTab = Number(localStorage.getItem('packContestLastTab'))
      navigate(initialRedirects[lastTab])
      dispatch(appActions.setTabActive(lastTab))
      lastTab === 5 && dispatch(appActions.setEditor(true))
    }
    // eslint-disable-next-line
  }, [user])

  return <Header />
}
