import React from 'react'
import { useNavigate } from 'react-router-dom'

import { logout } from '../db/auth'
import { Button } from '../UI'
import { i18n } from '../locale/locale'
import { useAppContext } from '../context/Context'

export const Dashboard = () => {
  const { userContext, clearUserContext } = useAppContext()
  const { name, email, admin, locale } = userContext
  const navigate = useNavigate()

  const logoutHandler = () => {
    clearUserContext(localStorage.getItem('locale'))
    logout()
    navigate('/userpage')
  }

  // locale
  const { dashboardEnterMsg, dashboardAdminMsg } = i18n(locale, 'auth')
  const { buttonProfileMsg, buttonLogoutMsg } = i18n(locale, 'buttons')

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <div className="bold">{dashboardEnterMsg}</div>
          <div>{name ? name : '...loading'}</div>
          <div>{email ? email : '...loading'}</div>
          <div>{admin ? <div>{dashboardAdminMsg}</div> : null}</div>
        </div>
        <Button onClick={() => navigate('/profile')}>{buttonProfileMsg}</Button>
        <Button onClick={logoutHandler}>{buttonLogoutMsg}</Button>
      </div>
    </div>
  )
}
