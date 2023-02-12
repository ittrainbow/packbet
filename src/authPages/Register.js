import React, { useEffect, useReducer, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import { Context } from '../App'

import { auth } from '../db/firebase'
import { registerWithEmailAndPassword, signInWithGoogle } from '../db/auth'
import { Button, LocaleSwitcher } from '../UI'
import { Input } from '@mui/material'
import { i18n } from '../locale/locale'

const initialState = {
  email: '',
  password: '',
  name: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL':
      return { ...state, email: action.payload }
    case 'PASSWORD':
      return { ...state, password: action.payload }
    case 'NAME':
      return { ...state, name: action.payload }
    default:
      return state
  }
}

export const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { email, password, name } = state
  const [user, loading] = useAuthState(auth)
  const { userContext, setUserContext } = useContext(Context)
  const navigate = useNavigate()

  const trimSpaces = (value) => value.replace(/\s/g, '')

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
  }, [loading, user, navigate])

  useEffect(() => {
    const browserLocale = localStorage.getItem('locale')
    if (browserLocale) {
      setUserContext({ ...userContext, locale: browserLocale })
    } else {
      localStorage.setItem('locale', 'ru')
      setUserContext({ ...userContext, locale: 'ru' })
    } // eslint-disable-next-line
  }, [])

  const register = () => {
    if (!name) alert(registerNameAlert)
    if (!email) alert(registerEmailAlert)
    if (password.length < 3) alert(registerPasswordAlert)
    else registerWithEmailAndPassword(name, email, password)
  }

  const emailInputHandler = ({ value }) => {
    dispatch({ type: 'EMAIL', payload: trimSpaces(value) })
  }

  const passwordInputHandler = ({ value }) => {
    dispatch({ type: 'PASSWORD', payload: trimSpaces(value) })
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
  const locale = localStorage.getItem('locale') || 'ru'
  const { buttonRegisterMsg, buttonRegisterGoogleMsg } = i18n(locale, 'buttons')
  const { loginIntro, loginMsg, registerNameMsg } = i18n(locale, 'auth')
  const { registerNameAlert, registerEmailAlert, registerPasswordAlert } = i18n(locale, 'auth')

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <Input
            type={'text'}
            value={name}
            onChange={(e) => dispatch({ type: 'NAME', payload: e.target.value })}
            placeholder={registerNameMsg}
          />
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
          <Button className="login" onClick={register}>
            {buttonRegisterMsg}
          </Button>
          <Button className="google" onClick={signInWithGoogle}>
            {buttonRegisterGoogleMsg}
          </Button>
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
