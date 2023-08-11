import { useEffect, useState, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Input } from '@mui/material'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../db'
import { ChangeInputType, LocaleType } from '../types'
import { animateFadeOut, getLocale } from '../helpers'
import { useDispatch, useSelector } from 'react-redux'
import { Button, LocaleSwitcher } from '../UI'
import { selectApp, selectUser } from '../redux/selectors'
import { userActions } from '../redux/slices'
import { i18n } from '../locale'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, loading, error] = useAuthState(auth)
  const { tabActive, duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const [password, setPassword] = useState<string>(localStorage.getItem('packContestPassword') || '')
  const [email, setEmail] = useState<string>(localStorage.getItem('packContestEmail') || '')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // container fade animations

  useEffect(() => {
    tabActive !== 1 && animateFadeOut(containerRef)
  }, [tabActive])

  // helpers

  const loginButtonActive = emailValid && password.length > 2
  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    const { setLocale } = userActions
    const locale = getLocale()
    dispatch(setLocale(locale))
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

  // action handlers

  const handleEmailInput = (e: ChangeInputType) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const handlePasswordInput = (e: ChangeInputType) => {
    const { value } = e.target
    setPassword(trimSpaces(value))
  }

  const handleGoogleClick = async () => {
    await signInWithGoogle()
  }

  const handleEmailLogin = async () => {
    localStorage.setItem('packContestEmail', email)
    localStorage.setItem('packContestPassword', password)
    await logInWithEmailAndPassword(email, password)
  }

  const handleToRegister = () => {
    animateFadeOut(containerRef)
    setTimeout(() => navigate('/register'), duration)
  }

  const handleToReset = () => {
    animateFadeOut(containerRef)
    setTimeout(() => navigate('/reset'), duration)
  }

  // render styles and locales

  const { buttonLoginMsg, buttonLoginGoogleMsg } = i18n(locale, 'buttons') as LocaleType
  const { regMsg, regIntro, forgotMsg, emailMsg, passwordMsg } = i18n(locale, 'auth') as LocaleType

  return (
    <div className="container auth animate-fade-in-up" ref={containerRef}>
      <div className="auth__data">
        <Input type="text" value={email} onChange={handleEmailInput} placeholder={emailMsg} />
        <Input type="password" value={password} onChange={handlePasswordInput} placeholder={passwordMsg} />
        <Button className="login" disabled={!loginButtonActive} onClick={handleEmailLogin}>
          {buttonLoginMsg}
        </Button>
        <Button className="google" onClick={handleGoogleClick}>
          {buttonLoginGoogleMsg}
        </Button>
        <div className="link-container" onClick={handleToReset}>
          <div className="link-container__inner">{forgotMsg}</div>
        </div>
        <div className="link-container" onClick={handleToRegister}>
          {regIntro} <div className="link-container__inner">{regMsg}</div>
        </div>
        <div className="locale-div">
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  )
}
