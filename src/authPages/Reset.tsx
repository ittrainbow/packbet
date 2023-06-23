import { useEffect, useState, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Input } from '@mui/material'

import { auth } from '../db/firebase'
import { i18n } from '../locale/locale'
import { sendPasswordReset } from '../db/auth'
import { Button, LocaleSwitcher } from '../UI'
import { useAppContext } from '../context/Context'
import { LocaleType } from '../types'

export const Reset = () => {
  const [email, setEmail] = useState('')
  const inputRef = useRef<HTMLInputElement>()
  const [user, loading] = useAuthState(auth)
  const { userContext, setUserContext } = useAppContext()
  const { locale } = userContext
  const navigate = useNavigate()

  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (loading) return
    user && navigate('/') // eslint-disable-next-line
  }, [user, loading])

  const emailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }
  const localeChecked = () => (locale ? locale === 'ua' : false)

  const localeChangeHandler = () => {
    const newLocale = locale === 'ru' ? 'ua' : 'ru'
    setUserContext({ ...userContext, locale: newLocale })
    localStorage.setItem('locale', newLocale)
  }

  // locale
  const { buttonRecoverMsg } = i18n(locale, 'buttons') as LocaleType
  const { loginMsg, loginIntro, registerMsg, registerIntro } = i18n(locale, 'auth') as LocaleType

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <Input
            type={'text'}
            value={email}
            ref={inputRef}
            onChange={emailInputHandler}
            placeholder={'E-mail'}
          />
          <Button className="login" onClick={() => sendPasswordReset(email)}>
            {buttonRecoverMsg}
          </Button>
          <div className="link-container">
            {registerIntro} <Link to="/register">{registerMsg}</Link>
          </div>
          <div className="link-container">
            {loginIntro} <Link to="/login">{loginMsg}</Link>
          </div>
        </div>
        <div className="locale-div">
          <LocaleSwitcher checked={localeChecked()} onChange={localeChangeHandler} />
        </div>
      </div>
    </div>
  )
}
