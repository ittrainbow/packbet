import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import { useAppContext } from '../context/Context'
import { auth } from '../db/firebase'
import { registerWithEmailAndPassword, signInWithGoogle } from '../db/auth'
import { Button, LocaleSwitcher } from '../UI'
import { Input } from '@mui/material'
import { i18n } from '../locale/locale'
import { LocaleType } from '../types'
import { userListHelper } from '../helpers'

export const Register = () => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>()
  const [user, loading] = useAuthState(auth)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const { userContext, setUserContext, userListContext, setUserListContext } = useAppContext()

  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    if (loading) return
    user && navigate('/dashboard')
    // eslint-disable-next-line
  }, [loading, user])

  useEffect(() => {
    const locale = localStorage.getItem('locale')
    inputRef.current?.focus()
    const noLocale = () => {
      localStorage.setItem('locale', 'ru')
      setUserContext({ ...userContext, locale: 'ru' })
    }
    locale ? setUserContext({ ...userContext, locale }) : noLocale()
    // eslint-disable-next-line
  }, [])

  const register = async () => {
    !name && alert(regNameAlert)
    !email && alert(regEmailAlert)
    password.length < 6 && alert(regPasswordAlert)
    if (name && email && password.length > 5) {
      const response = await registerWithEmailAndPassword(name, email, password)
      if (response) {
        const data = {
          user: { admin: false, locale: userContext.locale, name, email },
          uid: response.uid
        }
        setUserListContext(userListHelper(data, userListContext))
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

  const localeChangeHandler = () => {
    const newLocale = locale === 'ru' ? 'ua' : 'ru'
    setUserContext({ ...userContext, locale: newLocale })
    localStorage.setItem('locale', newLocale)
  }

  const googleClickHandler = async () => {
    const response = await signInWithGoogle()
    response && setUserListContext(userListHelper(response, userListContext))
  }

  const checked = () => (locale ? locale === 'ua' : false)

  const locale = localStorage.getItem('locale') || 'ru'
  const { buttonRegisterMsg, buttonRegisterGoogleMsg } = i18n(locale, 'buttons') as LocaleType
  const {
    loginIntro,
    loginMsg,
    regNameMsg,
    regNameAlert,
    regEmailAlert,
    regPasswordAlert,
    emailMsg,
    passwordMsg
  } = i18n(locale, 'auth') as LocaleType

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <Input
            type="text"
            value={name}
            ref={inputRef}
            onChange={nameInputHandler}
            placeholder={regNameMsg}
          />
          <Input type="email" value={email} onChange={emailInputHandler} placeholder={emailMsg} />
          <Input
            type="password"
            value={password}
            onChange={passwordInputHandler}
            placeholder={passwordMsg}
          />
          <Button className="login" onClick={register}>
            {buttonRegisterMsg}
          </Button>
          <Button className="google" onClick={googleClickHandler}>
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