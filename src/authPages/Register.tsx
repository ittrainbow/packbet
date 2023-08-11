import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

import { registerWithEmailAndPassword, signInWithGoogle } from '../db/auth'
import { ChangeInputType, IUser, LocaleType } from '../types'
import { appActions, userActions } from '../redux/slices'
import { Button, LocaleSwitcher } from '../UI'
import { selectApp, selectUser } from '../redux/selectors'
import { animateFadeOut } from '../helpers'
import { Input } from '@mui/material'
import { auth } from '../db/firebase'
import { i18n } from '../locale'

export const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, loading] = useAuthState(auth)
  const { tabActive, duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

  // container fade animations

  useEffect(() => {
    tabActive !== 1 && animateFadeOut(containerRef)
  }, [tabActive])

  // helpers

  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    if (loading) return
    user && navigate('/dashboard')
    // eslint-disable-next-line
  }, [loading, user])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const setEmailReg = (value: boolean) => {
      dispatch(appActions.setEmailReg(value))
    }

    setEmailReg(true)
    return () => setEmailReg(false)
    // eslint-disable-next-line
  }, [])

  const register = async () => {
    !name && alert(regNameAlert)
    !email && alert(regEmailAlert)
    password.length < 6 && alert(regPasswordAlert)
    if (name && email && password.length > 5) {
      const response = await registerWithEmailAndPassword(name, email, password)
      if (response) {
        const user: IUser = { admin: false, locale, name, buddies: [response.uid] }
        dispatch(userActions.setUser(user))
      }
    }
  }

  // action handlers

  const handleNameInput = (e: ChangeInputType) => {
    const { value } = e.target
    setName(value)
  }

  const handleEmailInput = (e: ChangeInputType) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const handlePasswordInput = (e: ChangeInputType) => {
    const { value } = e.target
    setPassword(trimSpaces(value))
  }

  const handleGoogleClick = async () => await signInWithGoogle()

  // render styles and locales

  const { buttonRegisterMsg, buttonRegisterGoogleMsg } = i18n(locale, 'buttons') as LocaleType
  const { loginIntro, loginMsg, regNameMsg, regNameAlert, regEmailAlert, regPasswordAlert, emailMsg, passwordMsg } =
    i18n(locale, 'auth') as LocaleType

  const handleToLogin = () => {
    animateFadeOut(containerRef)
    setTimeout(() => navigate('/reset'), duration)
  }

  return (
    <div className="container auth animate-fade-in-up" ref={containerRef}>
      <div className="auth__data">
        <Input type="text" value={name} ref={inputRef} onChange={handleNameInput} placeholder={regNameMsg} />
        <Input type="email" value={email} onChange={handleEmailInput} placeholder={emailMsg} />
        <Input type="password" value={password} onChange={handlePasswordInput} placeholder={passwordMsg} />
        <Button className="login" onClick={register}>
          {buttonRegisterMsg}
        </Button>
        <Button className="google" onClick={handleGoogleClick}>
          {buttonRegisterGoogleMsg}
        </Button>
        <div className="link-container" onClick={handleToLogin}>
          {loginIntro} <div className="link-container__inner">{loginMsg}</div>
        </div>
      </div>
      <div className="locale-div">
        <LocaleSwitcher />
      </div>
    </div>
  )
}
