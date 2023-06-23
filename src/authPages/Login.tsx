import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom/dist'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Input } from '@mui/material'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../db'
import { Button, LocaleSwitcher } from '../UI'
import { i18n } from '../locale/locale'
import { useAppContext } from '../context/Context'
import { LocaleType } from '../types'

export const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const [user, loading, error] = useAuthState(auth)
  const { userContext, setUserContext } = useAppContext()
  const { locale } = userContext

  const loginButtonActive = emailValid && password.length > 2
  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    const locale = localStorage.getItem('locale')
    const noLocale = () => {
      localStorage.setItem('locale', 'ru')
      setUserContext({ ...userContext, locale: 'ru' })
    }
    locale ? setUserContext({ ...userContext, locale }) : noLocale() // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const checkEmailValid = /\S+@\S+\.\S+/.test(email)
    setEmailValid(checkEmailValid)
  }, [email])

  useEffect(() => {
    if (loading) return
    user && navigate('/dashboard')
    error && alert(error) // eslint-disable-next-line
  }, [user, loading, error])

  const emailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const passwordInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPassword(trimSpaces(value))
  }

  const localeChangeHandler = () => {
    const newLocale = locale === 'ru' ? 'ua' : 'ru'
    setUserContext({ ...userContext, locale: newLocale })
    localStorage.setItem('locale', newLocale)
  }

  const localeChecked = () => (locale ? locale === 'ua' : false)

  // locale
  const { buttonLoginMsg, buttonLoginGoogleMsg } = i18n(locale, 'buttons') as LocaleType
  const { registerMsg, registerIntro, forgotMsg } = i18n(locale, 'auth') as LocaleType

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <Input type={'text'} value={email} onChange={emailInputHandler} placeholder={'E-mail'} />
          <Input
            type={'password'}
            value={password}
            onChange={passwordInputHandler}
            placeholder={'Password'}
          />
          <Button
            className={'login'}
            disabled={!loginButtonActive}
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            {buttonLoginMsg}
          </Button>
          <Button className="google" onClick={signInWithGoogle}>
            {buttonLoginGoogleMsg}
          </Button>
          <div className="link-container">
            <Link to="/reset">{forgotMsg}</Link>
          </div>
          <div className="link-container">
            {registerIntro} <Link to="/register">{registerMsg}</Link>
          </div>
        </div>
        <div className="locale-div">
          <LocaleSwitcher checked={localeChecked()} onChange={localeChangeHandler} />
        </div>
      </div>
    </div>
  )
}
