import React, { useEffect, useState, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Input } from '@mui/material'

import './auth.scss'

import { auth } from '../db/firebase'
import { i18n } from '../locale/locale'
import { sendPasswordReset } from '../db/auth'
import { Button, LocaleSwitcher } from '../UI'
import { useAppContext } from '../context/Context'

export const Reset = () => {
  const [email, setEmail] = useState('')
  const inputRef = useRef()
  const [user, loading] = useAuthState(auth)
  const { userContext, setUserContext } = useAppContext()
  const { locale } = userContext
  const navigate = useNavigate()

  const trimSpaces = (value) => value.replace(/\s/g, '')

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    if (loading) return
    if (user) navigate('/')
  }, [user, loading, navigate])

  const emailInputHandler = ({ value }) => {
    setEmail(trimSpaces(value))
  }

  const localeChangeHandler = () => {
    const setLocale = locale === 'ru' ? 'ua' : 'ru'
    setUserContext({ ...userContext, locale: setLocale })
    localStorage.setItem('locale', setLocale)
  }

  const checked = () => {
    return locale ? locale === 'ua' : false
  }

  // locale
  const { buttonRecoverMsg } = i18n(locale, 'buttons')
  const { loginMsg, loginIntro, registerMsg, registerIntro } = i18n(locale, 'auth')

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <Input
            type={'text'}
            value={email}
            inputRef={inputRef}
            onChange={(e) => emailInputHandler(e.target)}
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
        </div>
        <div className="locale-div">
          <LocaleSwitcher checked={checked()} onChange={localeChangeHandler} />
        </div>
      </div>
    </div>
  )
}
