import React, { useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../db'
import { Button, Input } from '../UI'

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
  const { email, emailValid, password } = state
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  const loginButtonActive = emailValid && password.length > 2

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
    if (error) alert(error)
    return // eslint-disable-next-line
  }, [user, loading])

  const emailInputHandler = (email) => {
    const checkEmailValid = /\S+@\S+\.\S+/.test(email)

    dispatch({ type: 'EMAIL', payload: email })
    dispatch({ type: 'EMAIL_VALID', payload: checkEmailValid })
  }

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
          Войти
        </Button>
        <Button className="google" onClick={signInWithGoogle} >
          Войти через Google
        </Button>
        <div className="link-container">
          <Link to="/reset">Забыли пароль</Link>?
        </div>
        <div className="link-container">
          Нет аккаунта? <Link to="/register">Регистрация</Link>.
        </div>
      </div>
    </div>
  )
}
