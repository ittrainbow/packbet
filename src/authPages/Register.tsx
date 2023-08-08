import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from '../db/firebase'
import { registerWithEmailAndPassword, signInWithGoogle } from '../db/auth'
import { Button, LocaleSwitcher } from '../UI'
import { Input } from '@mui/material'
import { i18n } from '../locale'
import { IUser, LocaleType } from '../types'
import { selectApp, selectUser } from '../redux/selectors'
import { appActions, userActions } from '../redux/slices'
import { fadeInOut } from '../helpers'

export const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { tabActive } = useSelector(selectApp)
  const [user, loading] = useAuthState(auth)
  const authRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>()
  const { locale } = useSelector(selectUser)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

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
    tabActive !== 1 && fadeInOut(authRef)
  }, [tabActive])

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

  const nameInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setName(value)
  }

  const emailInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const passwordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPassword(trimSpaces(value))
  }

  const googleClickHandler = async () => await signInWithGoogle()

  const { buttonRegisterMsg, buttonRegisterGoogleMsg } = i18n(locale, 'buttons') as LocaleType
  const { loginIntro, loginMsg, regNameMsg, regNameAlert, regEmailAlert, regPasswordAlert, emailMsg, passwordMsg } =
    i18n(locale, 'auth') as LocaleType

  const toLoginHandler = () => {
    fadeInOut(authRef)
    setTimeout(() => navigate('/reset'), 200)
  }

  return (
    <div className="auth animate-fade-in-up" ref={authRef}>
      <div className="auth__container">
        <div className="auth__data">
          <Input type="text" value={name} ref={inputRef} onChange={nameInputHandler} placeholder={regNameMsg} />
          <Input type="email" value={email} onChange={emailInputHandler} placeholder={emailMsg} />
          <Input type="password" value={password} onChange={passwordInputHandler} placeholder={passwordMsg} />
          <Button className="login" onClick={register}>
            {buttonRegisterMsg}
          </Button>
          <Button className="google" onClick={googleClickHandler}>
            {buttonRegisterGoogleMsg}
          </Button>
          <div className="link-container" onClick={toLoginHandler}>
            {loginIntro} <div className="link-container__inner">{loginMsg}</div>
          </div>
        </div>
        <div className="locale-div">
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  )
}
