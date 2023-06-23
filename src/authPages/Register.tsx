import React, { useEffect, useReducer, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import { useAppContext } from '../context/Context'
import { auth } from '../db/firebase'
import { registerWithEmailAndPassword, signInWithGoogle } from '../db/auth'
import { Button, LocaleSwitcher } from '../UI'
import { Input } from '@mui/material'
import { i18n } from '../locale/locale'
import { LocaleType } from '../types'

type RegisterStateType = {
  email: string
  password: string
  name: string
}

const initialState = {
  email: '',
  password: '',
  name: ''
}

const reducer = (state: RegisterStateType, action: any) => {
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
  const inputRef = useRef<HTMLInputElement>()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [user, loading] = useAuthState(auth)
  const { email, password, name } = state
  const { userContext, setUserContext } = useAppContext()
  const navigate = useNavigate()

  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    if (loading) return
    user && navigate('/dashboard') // eslint-disable-next-line
  }, [loading, user])

  useEffect(() => {
    const locale = localStorage.getItem('locale')
    inputRef.current?.focus()
    const noLocale = () => {
      localStorage.setItem('locale', 'ru')
      setUserContext({ ...userContext, locale: 'ru' })
    }
    locale ? setUserContext({ ...userContext, locale }) : noLocale() // eslint-disable-next-line
  }, [])

  const register = () => {
    !name && alert(registerNameAlert)
    !email && alert(registerEmailAlert)
    password.length < 3 && alert(registerPasswordAlert)
    name && email && password.length > 2 && registerWithEmailAndPassword(name, email, password)
  }

  const nameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch({ type: 'NAME', payload: value })
  }

  const emailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch({ type: 'EMAIL', payload: trimSpaces(value) })
  }
  const passwordInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch({ type: 'PWD', payload: trimSpaces(value) })
  }

  const localeChangeHandler = () => {
    const newLocale = locale === 'ru' ? 'ua' : 'ru'
    setUserContext({ ...userContext, locale: newLocale })
    localStorage.setItem('locale', newLocale)
  }

  const checked = () => (locale ? locale === 'ua' : false)

  // locale
  const locale = localStorage.getItem('locale') || 'ru'
  const { buttonRegisterMsg, buttonRegisterGoogleMsg } = i18n(locale, 'buttons') as LocaleType
  const {
    loginIntro,
    loginMsg,
    registerNameMsg,
    registerNameAlert,
    registerEmailAlert,
    registerPasswordAlert
  } = i18n(locale, 'auth') as LocaleType

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <Input
            type={'text'}
            value={name}
            ref={inputRef}
            onChange={nameInputHandler}
            placeholder={registerNameMsg}
          />
          <Input type={'email'} value={email} onChange={emailInputHandler} placeholder={'E-mail'} />
          <Input
            type={'password'}
            value={password}
            onChange={passwordInputHandler}
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
