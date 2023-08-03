import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import { logout } from '../db/auth'
import { auth } from '../db'
import { LocaleType } from '../types'
import { Button } from '../UI'
import { i18n } from '../locale'
import { selectUser } from '../redux/selectors'
import { answersActions, compareActions, resultsActions, userActions } from '../redux/slices'

export const Dashboard = () => {
  const [user] = useAuthState(auth)
  const dispatch = useDispatch()
  const { name, admin, locale } = useSelector(selectUser)
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(userActions.clearUser())
    dispatch(answersActions.clearAnswers())
    dispatch(resultsActions.clearResults())
    dispatch(compareActions.clearCompare())
    logout()
    navigate('/userpage')
  }

  const navigateHandler = () => {
    navigate('/profile')
  }

  const { dashboardEnterMsg, dashboardAdminMsg } = i18n(locale, 'auth') as LocaleType
  const { buttonProfileMsg, buttonLogoutMsg } = i18n(locale, 'buttons') as LocaleType

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <div className="bold">{dashboardEnterMsg}</div>
          <div>{name ? name : '...loading'}</div>
          <div>{user ? user.email : '...loading'}</div>
          <div>{admin ? <div>{dashboardAdminMsg}</div> : null}</div>
        </div>
        <Button onClick={navigateHandler}>{buttonProfileMsg}</Button>
        <Button onClick={logoutHandler}>{buttonLogoutMsg}</Button>
      </div>
    </div>
  )
}
