import { useEffect, useState, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input } from '@mui/material'

import { ChangeInputType, LocaleType } from '../types'
import { Button, LocaleSwitcher } from '../UI'
import { selectApp, selectUser } from '../redux/selectors'
import { sendPasswordReset } from '../db/auth'
import { animateFadeOut } from '../helpers'
import { auth } from '../db/firebase'
import { i18n } from '../locale'

export const Reset = () => {
  const navigate = useNavigate()
  const [user, loading] = useAuthState(auth)
  const { tabActive, duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>()
  const [email, setEmail] = useState('')

  // container fade animations

  useEffect(() => {
    tabActive !== 1 && animateFadeOut(containerRef)
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

  // action handlers

  const handleEmailInput = (e: ChangeInputType) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const handleToRegister = () => {
    animateFadeOut(containerRef)
    setTimeout(() => navigate('/register'), duration)
  }

  const handleToLogin = () => {
    animateFadeOut(containerRef)
    setTimeout(() => navigate('/login'), duration)
  }

  // render styles and locales

  const { buttonRecoverMsg } = i18n(locale, 'buttons') as LocaleType
  const { loginMsg, loginIntro, regMsg, regIntro } = i18n(locale, 'auth') as LocaleType

  return (
    <div className="container auth animate-fade-in-up" ref={containerRef}>
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
  )
}
