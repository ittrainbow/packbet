import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import './auth.scss'

import { auth } from '../db'
import { logout } from '../db/auth'
import { Context } from '../App'

export const Dashboard = () => {
  const { userContext } = useContext(Context)
  const { name, email } = userContext
  const navigate = useNavigate()

  const logoutHandler = () => {
    logout()
    navigate('/userpage')
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data-div">
          Logged in as
          <div>{name ? name : '...loading'}</div>
          <div>{email ? email : '...loading'}</div>
        </div>
        <button
          className="auth__dashboard"
          disabled={!auth.currentUser}
          onClick={() => navigate('/profile')}
        >
          Edit Profile
        </button>

        <button className="auth__dashboard" onClick={() => logoutHandler()}>
          Logout
        </button>
      </div>
    </div>
  )
}
