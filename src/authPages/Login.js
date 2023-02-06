import React, { useEffect, useReducer, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../db'
import { Button, Input, LocaleSwitcher } from '../UI'
import { i18n } from '../locale/locale'
import { Context } from '../App'

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
  const [state, dispatch] = useReducer(reducer, initialState)
  const { userContext, setUserContext } = useContext(Context)
  const { locale } = userContext
  const { email, emailValid, password } = state
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  const loginButtonActive = emailValid && password.length > 2

  useEffect(() => {
    const locale = localStorage.getItem('locale')
    if (locale) setUserContext({ ...userContext, locale })
    else {
      localStorage.setItem('locale', 'ru')
      setUserContext({ ...userContext, locale: 'ru' })
    } // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
    if (error) alert(error)
  }, [user, loading, error, navigate])

  const emailInputHandler = (email) => {
    const checkEmailValid = /\S+@\S+\.\S+/.test(email)

    dispatch({ type: 'EMAIL', payload: email })
    dispatch({ type: 'EMAIL_VALID', payload: checkEmailValid })
  }

  const onChange = () => {
    setUserContext({ ...userContext, locale: locale === 'ru' ? 'ua' : 'ru' })
  }

  const checked = () => {
    return locale ? locale === 'ua' : false
  }

  // locale
  const { buttonLoginMsg, buttonLoginGoogleMsg } = i18n(locale, 'buttons')
  const { registerMsg, registerIntro, forgotMsg } = i18n(locale, 'auth')

  return (
    <div className="auth">
      <div className="auth__container">
        <Input
          type={'text'}
          value={email}
          onChange={(e) => emailInputHandler(e.target.value)}
          placeholder={'E-mail'}
        />
        <Input
          type={'password'}
          value={password}
          onChange={(e) => dispatch({ type: 'PASSWORD', payload: e.target.value })}
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
        <div className="locale-div">
          <LocaleSwitcher checked={checked()} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}
