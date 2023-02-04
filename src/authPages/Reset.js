import React, { useEffect, useState, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import './auth.scss'

import { auth } from '../db/firebase'
import { i18n } from '../locale/locale'
import { sendPasswordReset } from '../db/auth'
import { Button, Input, LocaleSwitcher } from '../UI'
import { Context } from '../App'

export const Reset = () => {
  const [email, setEmail] = useState('')
  const [user, loading] = useAuthState(auth)
  const { userContext } = useContext(Context)
  const { locale } = userContext
  const navigate = useNavigate()

  const { buttonRecoverMsg } = i18n(locale, 'buttons')
  const { loginMsg, loginIntro, registerMsg, registerIntro } = i18n(locale, 'auth')

  useEffect(() => {
    if (loading) return
    if (user) navigate('/') // eslint-disable-next-line
  }, [user, loading])

  return (
    <div className="auth">
      <div className="auth__container">
        <Input
          type={'email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={'E-mail'}
        />
        <Button className="login" onClick={() => sendPasswordReset(email)}>
          {buttonRecoverMsg}
        </Button>
        <div className="link-container">
          {registerIntro} <Link to="/register">{registerMsg}</Link>
        </div>
        <div className="link-container">
          {loginIntro} <Link to="/login">{loginMsg}</Link>
        </div>
        <div className="locale-div">
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  )
}
