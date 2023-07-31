import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { logout } from '../db/auth'
import { LocaleType } from '../types'
import { Button } from '../UI'
import { i18n } from '../locale/locale'
import { selectUser } from '../redux/selectors'

export const Dashboard = () => {
  const { name, email, admin, locale } = useSelector(selectUser)
  const navigate = useNavigate()

  const logoutHandler = () => {
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
          <div>{email ? email : '...loading'}</div>
          <div>{admin ? <div>{dashboardAdminMsg}</div> : null}</div>
        </div>
        <Button onClick={navigateHandler}>{buttonProfileMsg}</Button>
        <Button onClick={logoutHandler}>{buttonLogoutMsg}</Button>
      </div>
    </div>
  )
}
