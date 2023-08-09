import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input } from '@mui/material'

import { Button, LocaleSwitcher } from '../UI'
import { selectApp, selectUser } from '../redux/selectors'
import { sendPasswordReset } from '../db/auth'
import { LocaleType } from '../types'
import { fadeOut } from '../helpers'
import { auth } from '../db/firebase'
import { i18n } from '../locale'

export const Reset = () => {
  const { tabActive } = useSelector(selectApp)
  const [user, loading] = useAuthState(auth)
  const [email, setEmail] = useState('')
  const authRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>()
  const { locale } = useSelector(selectUser)
  const navigate = useNavigate()

  // container fade animations

  useEffect(() => {
    tabActive !== 1 && fadeOut(authRef, 'reset')
  }, [tabActive])

  // helpers

  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (loading) return
    user && navigate('/')
    // eslint-disable-next-line
  }, [user, loading])

  // click action handlers

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const handleToRegister = () => {
    fadeOut(authRef, 'reset')
    setTimeout(() => navigate('/register'), 200)
  }

  const handleToLogin = () => {
    fadeOut(authRef, 'reset')
    setTimeout(() => navigate('/login'), 200)
  }

  // render styles and locales

  const { buttonRecoverMsg } = i18n(locale, 'buttons') as LocaleType
  const { loginMsg, loginIntro, regMsg, regIntro } = i18n(locale, 'auth') as LocaleType

  // render

  return (
    <div className="auth animate-fade-in-up" ref={authRef}>
      <div className="auth__container">
        <div className="auth__data">
          <Input type="text" value={email} ref={inputRef} onChange={handleEmailInput} placeholder={'E-mail'} />
          <Button className="login" onClick={() => sendPasswordReset(email)}>
            {buttonRecoverMsg}
          </Button>
          <div className="link-container" onClick={handleToRegister}>
            {regIntro} <div className="link-container__inner">{regMsg}</div>
          </div>
          <div className="link-container" onClick={handleToLogin}>
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
