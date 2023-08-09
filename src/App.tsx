import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'

import { appActions, userActions } from './redux/slices'
import { INIT_APP, USER_LOGIN } from './redux/storetypes'
import { initialRedirects } from './helpers'
import { selectApp } from './redux/selectors'
import { Header } from './pages'
import { auth } from './db'

export const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { emailReg } = useSelector(selectApp)
  const { setMobile } = appActions
  const [user] = useAuthState(auth)

  useEffect(() => {
    dispatch({ type: INIT_APP })
    dispatch(setMobile(isMobile))
    dispatch(appActions.setTabActive(1))
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
