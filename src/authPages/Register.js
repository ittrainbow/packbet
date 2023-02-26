import React, { useEffect, useReducer, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import { useAppContext } from '../context/Context'
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
    case 'PWD':
      return { ...state, password: action.payload }
    case 'NAME':
      return { ...state, name: action.payload }
    default:
      return state
  }
}

export const Register = () => {
  const inputRef = useRef()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [user, loading] = useAuthState(auth)
  const { email, password, name } = state
  const { userContext, setUserContext } = useAppContext()
  const navigate = useNavigate()

  const trimSpaces = (value) => value.replace(/\s/g, '')

  useEffect(() => {
    if (loading) return
    user && navigate('/dashboard') // eslint-disable-next-line
  }, [loading, user])

  useEffect(() => {
    const browserLocale = localStorage.getItem('locale')
    inputRef.current.focus()
    const noLocale = () => {
      localStorage.setItem('locale', 'ru')
      setUserContext({ ...userContext, locale: 'ru' })
    }
    browserLocale ? setUserContext({ ...userContext, locale: browserLocale }) : noLocale() // eslint-disable-next-line
  }, [])

  const register = () => {
    !name && alert(registerNameAlert)
    !email && alert(registerEmailAlert)
    password.length < 3 && alert(registerPasswordAlert)
    name && email && password.length > 2 && registerWithEmailAndPassword(name, email, password)
  }

  const emailInputHandler = ({ value }) => dispatch({ type: 'EMAIL', payload: trimSpaces(value) })
  const passwordInputHandler = ({ value }) => dispatch({ type: 'PWD', payload: trimSpaces(value) })

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
            inputRef={inputRef}
            onChange={(e) => dispatch({ type: 'NAME', payload: e.target.value })}
            placeholder={registerNameMsg}
          />
          <Input
            type={'email'}
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
