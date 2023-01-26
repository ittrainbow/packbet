import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import './auth.scss'

import { auth } from '../db'
import { logout, verifyEmail } from '../db/auth'
import { Context } from '../App'
import { Button } from '../UI'

export const Dashboard = () => {
  const { userContext } = useContext(Context)
  const { name, email } = userContext
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data-div">
          Logged in as
          <div>{name ? name : '...loading'}</div>
          <div>{email ? email : '...loading'}</div>
        </div>
        <Button
          className="buttonBig"
          disabled={!auth.currentUser}
          onClick={() => {
            navigate('/profile')
          }}
        >
          Edit Profile
        </Button>

        <Button className="buttonBig" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  )
}
