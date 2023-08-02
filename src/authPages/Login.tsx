import { useEffect, useState, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Input } from '@mui/material'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../db'
import { Button, LocaleSwitcher } from '../UI'
import { i18n } from '../locale/locale'
import { LocaleType } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../redux/slices'
import { selectUser } from '../redux/selectors'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const [user, loading, error] = useAuthState(auth)
  const { locale } = useSelector(selectUser)

  const loginButtonActive = emailValid && password.length > 2
  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    const locale = localStorage.getItem('locale')
    const noLocale = () => {
      localStorage.setItem('locale', 'ru')
      dispatch(userActions.setLocale('ru'))
    }
    locale ? dispatch(userActions.setLocale(locale)) : noLocale()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const checkEmailValid = /\S+@\S+\.\S+/.test(email)
    setEmailValid(checkEmailValid)
  }, [email])

  useEffect(() => {
    if (loading) return
    user && navigate('/dashboard')
    error && alert(error)
    // eslint-disable-next-line
  }, [user, loading, error])

  const emailInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const passwordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPassword(trimSpaces(value))
  }

  const googleClickHandler = async () => await signInWithGoogle()

  const emailLogInHandler = async () => await logInWithEmailAndPassword(email, password)

  const { buttonLoginMsg, buttonLoginGoogleMsg } = i18n(locale, 'buttons') as LocaleType
  const { regMsg, regIntro, forgotMsg, emailMsg, passwordMsg } = i18n(locale, 'auth') as LocaleType

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <Input type="text" value={email} onChange={emailInputHandler} placeholder={emailMsg} />
          <Input type="password" value={password} onChange={passwordInputHandler} placeholder={passwordMsg} />
          <Button className="login" disabled={!loginButtonActive} onClick={emailLogInHandler}>
            {buttonLoginMsg}
          </Button>
          <Button className="google" onClick={googleClickHandler}>
            {buttonLoginGoogleMsg}
          </Button>
          <div className="link-container">
            <Link to="/reset">{forgotMsg}</Link>
          </div>
          <div className="link-container">
            {regIntro} <Link to="/register">{regMsg}</Link>
          </div>
        </div>
        <div className="locale-div">
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  )
}
