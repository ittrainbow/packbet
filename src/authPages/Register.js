import React, { useEffect, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../db/firebase'
import { registerWithEmailAndPassword, signInWithGoogle } from '../db/auth'
import { Button, Input, LocaleSwitcher } from '../UI'
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
  const navigate = useNavigate()

  const register = () => {
    if (!name) alert('Please enter name')
    if (!email) alert('Please enter Email')
    if (password.length < 3) alert('Please type password of 3 chars or more')
    else registerWithEmailAndPassword(name, email, password)
  }

  const locale = localStorage.getItem('locale') || 'ru'
  const { buttonRegisterMsg, buttonRegisterGoogleMsg } = i18n(locale, 'buttons')
  const { loginIntro, loginMsg, registerNameMsg } = i18n(locale, 'auth')

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard') // eslint-disable-next-line
  }, [loading, user])

  return (
    <div className="auth">
      <div className="auth__container">
        <Input
          type={'text'}
          value={name}
          onChange={(e) => dispatch({ type: 'NAME', payload: e.target.value })}
          placeholder={registerNameMsg}
        />
        <Input
          type={'email'}
          value={email}
          onChange={(e) => dispatch({ type: 'EMAIL', payload: e.target.value })}
          placeholder={'E-mail'}
        />
        <Input
          type={'password'}
          value={password}
          onChange={(e) => dispatch({ type: 'PASSWORD', payload: e.target.value })}
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
        <div className="locale-div">
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  )
}
