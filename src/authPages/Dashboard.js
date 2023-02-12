import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import './auth.scss'

import { logout } from '../db/auth'
import { Context } from '../App'
import { Button } from '../UI'
import { i18n } from '../locale/locale'

export const Dashboard = () => {
  const { userContext, clearUserContext } = useContext(Context)
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
