import { useEffect, useState, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Input } from '@mui/material'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../db'
import { Button, LocaleSwitcher } from '../UI'
import { i18n } from '../locale/locale'
import { useAppContext } from '../context/Context'
import { LocaleType } from '../types'

export const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const [user, loading, error] = useAuthState(auth)
  const { userContext, setUserContext, userListContext, setUserListContext } = useAppContext()
  const { locale } = userContext

  const loginButtonActive = emailValid && password.length > 2
  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    const locale = localStorage.getItem('locale')
    const noLocale = () => {
      localStorage.setItem('locale', 'ru')
      setUserContext({ ...userContext, locale: 'ru' })
    }
    locale ? setUserContext({ ...userContext, locale }) : noLocale() // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const checkEmailValid = /\S+@\S+\.\S+/.test(email)
    setEmailValid(checkEmailValid)
  }, [email])

  useEffect(() => {
    if (loading) return
    user && navigate('/dashboard')
    error && alert(error) // eslint-disable-next-line
  }, [user, loading, error])

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

  const localeChecked = () => (locale ? locale === 'ua' : false)

  const googleHandleClick = async () => {
    const r = await signInWithGoogle()
    if (r) {
      const { uid, data } = r
      const userList = structuredClone(userListContext)
      userList[uid] = data
      setUserListContext(userList)
    }
  }

  // locale
  const { buttonLoginMsg, buttonLoginGoogleMsg } = i18n(locale, 'buttons') as LocaleType
  const { regMsg, regIntro, forgotMsg } = i18n(locale, 'auth') as LocaleType

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <Input type={'text'} value={email} onChange={emailInputHandler} placeholder={'E-mail'} />
          <Input
            type={'password'}
            value={password}
            onChange={passwordInputHandler}
            placeholder={'Password'}
          />
          <Button
            className={'login'}
            disabled={!loginButtonActive}
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            {buttonLoginMsg}
          </Button>
          <Button className="google" onClick={googleHandleClick}>
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
          <LocaleSwitcher checked={localeChecked()} onChange={localeChangeHandler} />
        </div>
      </div>
    </div>
  )
}
