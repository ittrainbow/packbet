import { useNavigate } from 'react-router-dom'

import { logout } from '../db/auth'
import { LocaleType } from '../types'
import { Button } from '../UI'
import { i18n } from '../locale/locale'
import { useAppContext } from '../context/Context'

export const Dashboard = () => {
  const { userContext, clearUserContext } = useAppContext()
  const { name, email, admin, locale } = userContext
  const navigate = useNavigate()

  const logoutHandler = () => {
    clearUserContext(localStorage.getItem('locale') || 'ru')
    logout()
    navigate('/userpage')
  }

  const navigateHandler = () => {
    navigate('/profile')
  }

  // locale
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
