import { Input } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { auth, sendPasswordReset } from '../../db'
import { useFade } from '../../hooks'
import { Locale, i18n } from '../../locale'
import { selectApp, selectUser } from '../../redux/selectors'
import { userActions } from '../../redux/slices'
import { ChangeInput } from '../../types'
import { Button, LocaleSwitcher } from '../../ui'

export const Reset = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, loading] = useAuthState(auth)
  const { tabActive, duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>()
  const [email, setEmail] = useState('')

  const triggerFade = useFade(containerRef)

  useEffect(() => {
    tabActive !== 1 && triggerFade()
  }, [tabActive, triggerFade])

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

  const handleEmailInput = (e: ChangeInput) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const handleToRegister = () => {
    triggerFade()
    setTimeout(() => navigate('/register'), duration)
  }

  const handleToLogin = () => {
    triggerFade()
    setTimeout(() => navigate('/login'), duration)
  }

  // render styles and locales

  const { buttonRecoverMsg } = i18n(locale, 'buttons') as Locale
  const { loginMsg, loginIntro, regMsg, regIntro } = i18n(locale, 'auth') as Locale

  const handleLocaleChange = () => {
    const newLocale = locale === 'ru' ? 'ua' : 'ru'
    dispatch(userActions.setLocale(newLocale))
  }

  return (
    <div className="container auth flexcol5 animate-fade-in-up" ref={containerRef}>
      <div className="auth__data flexcol5">
        <Input type="text" value={email} ref={inputRef} onChange={handleEmailInput} placeholder={'E-mail'} />
        <Button className="login" onClick={() => sendPasswordReset(email)}>
          {buttonRecoverMsg}
        </Button>
        <div className="link-container flexrow5" onClick={handleToRegister}>
          {regIntro} <div className="link-container__inner">{regMsg}</div>
        </div>
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
