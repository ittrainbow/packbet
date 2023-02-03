import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import './auth.scss'

import { logout } from '../db/auth'
import { Context } from '../App'
import { Button } from '../UI'
import { i18n } from '../locale/locale'

export const Dashboard = () => {
  const { userContext } = useContext(Context)
  const { name, email, admin, locale } = userContext
  const navigate = useNavigate()

  const { dbEnterMsg, dbAdminMsg } = i18n(locale, 'auth')
  const { buttonProfileMsg, buttonLogoutMsg } = i18n(locale, 'buttons')

  const logoutHandler = () => {
    logout()
    navigate('/userpage')
  }

  return (
    <div className="container">
      <div className="auth">
        <div className="auth__container">
          <div className="text-container">
            {dbEnterMsg}
            <div>{name ? name : '...loading'}</div>
            <div>{email ? email : '...loading'}</div>
            {admin ? <div>{dbAdminMsg}</div> : null}
          </div>
          <Button onClick={() => navigate('/profile')}>{buttonProfileMsg}</Button>
          <Button onClick={() => logoutHandler()}>{buttonLogoutMsg}</Button>
        </div>
      </div>
    </div>
  )
}
