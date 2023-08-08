import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Input } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { auth } from '../db/firebase'
import { i18n } from '../locale'
import { sendPasswordReset } from '../db/auth'
import { Button, LocaleSwitcher } from '../UI'
import { LocaleType } from '../types'
import { selectApp, selectUser } from '../redux/selectors'
import { fadeInOut } from '../helpers'
import { appActions } from '../redux/slices'

export const Reset = () => {
  const dispatch = useDispatch()
  const { tabActive } = useSelector(selectApp)
  const [user, loading] = useAuthState(auth)
  const [email, setEmail] = useState('')
  const authRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>()
  const { locale } = useSelector(selectUser)
  const navigate = useNavigate()

  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    tabActive !== 1 && fadeInOut(authRef)
  }, [tabActive])

  useEffect(() => {
    dispatch(appActions.setRef(authRef))
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

  const toRegisterHandler = () => {
    fadeInOut(authRef)
    setTimeout(() => navigate('/register'), 200)
  }

  const toLoginHandler = () => {
    fadeInOut(authRef)
    setTimeout(() => navigate('/login'), 200)
  }

  const { buttonRecoverMsg } = i18n(locale, 'buttons') as LocaleType
  const { loginMsg, loginIntro, regMsg, regIntro } = i18n(locale, 'auth') as LocaleType

  return (
    <div className="auth animate-fade-in-up" ref={authRef}>
      <div className="auth__container">
        <div className="auth__data">
          <Input type="text" value={email} ref={inputRef} onChange={emailInputHandler} placeholder={'E-mail'} />
          <Button className="login" onClick={() => sendPasswordReset(email)}>
            {buttonRecoverMsg}
          </Button>
          <div className="link-container" onClick={toRegisterHandler}>
            {regIntro} <div className="link-container__inner">{regMsg}</div>
          </div>
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
