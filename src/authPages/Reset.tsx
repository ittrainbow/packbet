import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Input } from '@mui/material'
import { useSelector } from 'react-redux'

import { auth } from '../db/firebase'
import { i18n } from '../locale/locale'
import { sendPasswordReset } from '../db/auth'
import { Button, LocaleSwitcher } from '../UI'
import { LocaleType } from '../types'
import { selectUser } from '../redux/selectors'

export const Reset = () => {
  const [email, setEmail] = useState('')
  const inputRef = useRef<HTMLInputElement>()
  const [user, loading] = useAuthState(auth)
  const { locale } = useSelector(selectUser)
  const navigate = useNavigate()

  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (loading) return
    user && navigate('/')
    // eslint-disable-next-line
  }, [user, loading])

  const emailInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const { buttonRecoverMsg } = i18n(locale, 'buttons') as LocaleType
  const { loginMsg, loginIntro, regMsg, regIntro } = i18n(locale, 'auth') as LocaleType

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <Input
            type="text"
            value={email}
            ref={inputRef}
            onChange={emailInputHandler}
            placeholder={'E-mail'}
          />
          <Button className="login" onClick={() => sendPasswordReset(email)}>
            {buttonRecoverMsg}
          </Button>
          <div className="link-container">
            {regIntro} <Link to="/register">{regMsg}</Link>
          </div>
          <div className="link-container">
            {loginIntro} <Link to="/login">{loginMsg}</Link>
          </div>
        </div>
        <div className="locale-div">
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  )
}
