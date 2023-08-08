import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Input } from '@mui/material'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../db'
import { Button, LocaleSwitcher } from '../UI'
import { i18n } from '../locale'
import { LocaleType } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { appActions, userActions } from '../redux/slices'
import { selectApp, selectUser } from '../redux/selectors'
import { fadeInOut, getLocale } from '../helpers'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authRef = useRef<HTMLDivElement>(null)
  const { tabActive } = useSelector(selectApp)
  const [email, setEmail] = useState<string>(localStorage.getItem('packContestEmail') || '')
  const [password, setPassword] = useState<string>(localStorage.getItem('packContestPassword') || '')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const [user, loading, error] = useAuthState(auth)
  const { locale } = useSelector(selectUser)

  const loginButtonActive = emailValid && password.length > 2
  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    dispatch(appActions.setRef(authRef))
  }, [])

  useEffect(() => {
    const locale = getLocale()
    dispatch(userActions.setLocale(locale))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const checkEmailValid = /\S+@\S+\.\S+/.test(email)
    setEmailValid(checkEmailValid)
  }, [email])

  useEffect(() => {
    tabActive !== 1 && fadeInOut(authRef)
  }, [tabActive])

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

  const googleClickHandler = async () => {
    await signInWithGoogle()
  }

  const emailLogInHandler = async () => {
    localStorage.setItem('packContestEmail', email)
    localStorage.setItem('packContestPassword', password)
    await logInWithEmailAndPassword(email, password)
  }

  const toRegisterHandler = () => {
    fadeInOut(authRef)
    setTimeout(() => navigate('/register'), 200)
  }

  const toResetHandler = () => {
    fadeInOut(authRef)
    setTimeout(() => navigate('/reset'), 200)
  }

  const { buttonLoginMsg, buttonLoginGoogleMsg } = i18n(locale, 'buttons') as LocaleType
  const { regMsg, regIntro, forgotMsg, emailMsg, passwordMsg } = i18n(locale, 'auth') as LocaleType

  return (
    <div className="auth animate-fade-in-up" ref={authRef}>
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
          <div className="link-container" onClick={toResetHandler}>
            <div className="link-container__inner">{forgotMsg}</div>
          </div>
          <div className="link-container" onClick={toRegisterHandler}>
            {regIntro} <div className="link-container__inner">{regMsg}</div>
          </div>
        </div>
        <div className="locale-div">
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  )
}
