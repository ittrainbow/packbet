import React, { useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Input } from '@mui/material'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../db'
import { Button, LocaleSwitcher } from '../UI'
import { i18n } from '../locale/locale'
import { useAppContext } from '../context/Context'

const initialState = {
  email: '',
  emailValid: false,
  password: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL':
      return { ...state, email: action.payload }
    case 'EMAIL_VALID':
      return { ...state, emailValid: action.payload }
    case 'PASSWORD':
      return { ...state, password: action.payload }
    default:
      return state
  }
}

export const Login = () => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [user, loading, error] = useAuthState(auth)
  const { userContext, setUserContext } = useAppContext()
  const { locale } = userContext
  const { email, emailValid, password } = state

  const loginButtonActive = emailValid && password.length > 2
  const trimSpaces = (value) => value.replace(/\s/g, '')

  useEffect(() => {
    const locale = localStorage.getItem('locale')
    const noLocale = () => {
      localStorage.setItem('locale', 'ru')
      setUserContext({ ...userContext, locale: 'ru' })
    }
    locale ? setUserContext({ ...userContext, locale }) : noLocale() // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (loading) return
    user && navigate('/dashboard')
    error && alert(error) // eslint-disable-next-line
  }, [user, loading, error])

  const emailInputHandler = ({ value }) => {
    const checkEmailValid = /\S+@\S+\.\S+/.test(value)
    dispatch({ type: 'EMAIL', payload: trimSpaces(value) })
    dispatch({ type: 'EMAIL_VALID', payload: checkEmailValid })
  }

  const passwordInputHandler = ({ value }) => {
    dispatch({ type: 'PASSWORD', payload: trimSpaces(value) })
  }

  const localeChangeHandler = () => {
    const newLocale = locale === 'ru' ? 'ua' : 'ru'
    setUserContext({ ...userContext, locale: newLocale })
    localStorage.setItem('locale', newLocale)
  }

  const localeChecked = () => (locale ? locale === 'ua' : false)

  // locale
  const { buttonLoginMsg, buttonLoginGoogleMsg } = i18n(locale, 'buttons')
  const { registerMsg, registerIntro, forgotMsg } = i18n(locale, 'auth')

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <Input
            type={'text'}
            value={email}
            onChange={(e) => emailInputHandler(e.target)}
            placeholder={'E-mail'}
          />
          <Input
            type={'password'}
            value={password}
            onChange={(e) => passwordInputHandler(e.target)}
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
