import { Input } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../../db'
import { useFade } from '../../hooks'
import { Locale, i18n } from '../../locale'
import { selectApp, selectUser } from '../../redux/selectors'
import { appActions, userActions } from '../../redux/slices'
import { ChangeInput, User } from '../../types'
import { Button, LocaleSwitcher } from '../../ui'

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

  const triggerFade = useFade(containerRef)

  useEffect(() => {
    tabActive !== 1 && triggerFade()
  }, [tabActive, triggerFade])

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
        const user: User = { admin: false, locale, name, buddies: [response.uid] }
        dispatch(userActions.setUser(user))
      }
    }
  }

  // action handlers

  const handleNameInput = (e: ChangeInput) => {
    const { value } = e.target
    setName(value)
  }

  const handleEmailInput = (e: ChangeInput) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const handlePasswordInput = (e: ChangeInput) => {
    const { value } = e.target
    setPassword(trimSpaces(value))
  }

  const handleGoogleClick = async () => await signInWithGoogle()

  // render styles and locales

  const { buttonRegisterMsg, buttonRegisterGoogleMsg } = i18n(locale, 'buttons') as Locale
  const { loginIntro, loginMsg, regNameMsg, regNameAlert, regEmailAlert, regPasswordAlert, emailMsg, passwordMsg } =
    i18n(locale, 'auth') as Locale

  const handleToLogin = () => {
    triggerFade()
    setTimeout(() => navigate('/reset'), duration)
  }

  const handleLocaleChange = () => {
    const newLocale = locale === 'ru' ? 'ua' : 'ru'
    dispatch(userActions.setLocale(newLocale))
  }

  return (
    <div className="container auth flexcol5 animate-fade-in-up" ref={containerRef}>
      <div className="auth__data flexcol5">
        <Input type="text" value={name} ref={inputRef} onChange={handleNameInput} placeholder={regNameMsg} />
        <Input type="email" value={email} onChange={handleEmailInput} placeholder={emailMsg} />
        <Input type="password" value={password} onChange={handlePasswordInput} placeholder={passwordMsg} />
        <Button className="login" onClick={register}>
          {buttonRegisterMsg}
        </Button>
        <Button className="google" onClick={handleGoogleClick}>
          {buttonRegisterGoogleMsg}
        </Button>
        <div className="link-container flexrow5" onClick={handleToLogin}>
          {loginIntro} <div className="link-container__inner">{loginMsg}</div>
        </div>
      </div>
      <div className="locale-div">
        <LocaleSwitcher onChange={handleLocaleChange} />
      </div>
    </div>
  )
}
