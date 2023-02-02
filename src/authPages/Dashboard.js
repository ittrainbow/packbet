import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import './auth.scss'

import { logout } from '../db/auth'
import { Context } from '../App'
import { Button } from '../UI'

export const Dashboard = () => {
  const { userContext } = useContext(Context)
  const { name, email, admin } = userContext
  const navigate = useNavigate()

  const logoutHandler = () => {
    logout()
    navigate('/userpage')
  }

  return (
    <div className="container">
      <div className="auth">
        <div className="auth__container">
          <div className="text-container">
            Вы вошли как
            <div>{name ? name : '...loading'}</div>
            <div>{email ? email : '...loading'}</div>
            {admin ? <div>Вы - админ</div> : null}
          </div>
          <Button onClick={() => navigate('/profile')}>Изменить профиль</Button>
          <Button onClick={() => logoutHandler()}>Выйти</Button>
        </div>
      </div>
    </div>
  )
}
