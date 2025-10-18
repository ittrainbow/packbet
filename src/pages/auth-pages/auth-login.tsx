import { Input } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import clsx from 'clsx'
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../db'
import { useFade } from '../../hooks'
import { i18n, Locale } from '../../locale'
import { selectApp, selectUser } from '../../redux/selectors'
import { userActions } from '../../redux/slices'
import { Button, Switch } from '../../ui'
import { getLocale } from '../../utils'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, loading, error] = useAuthState(auth)
  const { tabActive, duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const [password, setPassword] = useState<string>(localStorage.getItem('packContestPassword') || '')
  const [email, setEmail] = useState<string>(localStorage.getItem('packContestEmail') || '')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { triggerFade } = useFade(containerRef)

  useEffect(() => {
    tabActive !== 1 && triggerFade()
  }, [tabActive, triggerFade])

  const loginButtonActive = emailValid && password.length > 2
  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    const { setLocale } = userActions
    const locale = getLocale()
    dispatch(setLocale(locale))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const checkEmailValid = /\S+@\S+\.\S+/.test(email)
    setEmailValid(checkEmailValid)
  }, [email])

  useEffect(() => {
    if (loading) return
    user && navigate('/dashboard')
    error && alert(error)
    // eslint-disable-next-line
  }, [user, loading, error])

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPassword(trimSpaces(value))
  }

  const handleGoogleClick = async () => {
    await signInWithGoogle()
  }

  const handleEmailLogin = async () => {
    localStorage.setItem('packContestEmail', email)
    localStorage.setItem('packContestPassword', password)
    await logInWithEmailAndPassword(email, password)
  }

  const handleToRegister = () => {
    triggerFade()
    setTimeout(() => navigate('/register'), duration)
  }

  const handleToReset = () => {
    triggerFade()
    setTimeout(() => navigate('/reset'), duration)
  }

  const { buttonLoginMsg, buttonLoginGoogleMsg } = i18n(locale, 'buttons') as Locale
  const { regMsg, regIntro, forgotMsg, emailMsg, passwordMsg } = i18n(locale, 'auth') as Locale

  const handleLocaleChange = () => dispatch(userActions.setLocale(locale === 'ru' ? 'ua' : 'ru'))

  return (
    <div
      className={clsx(
        'flex flex-col p-4 max-w-[32rem] gap-1 box-border h-full items-center'
        // appNaviEvent && 'animate-fade-in-up'
      )}
      ref={containerRef}
    >
      <div className="w-56 pt-20 flex flex-col justify-center gap-3">
        <Input type="text" value={email} onChange={handleEmailInput} placeholder={emailMsg} />
        <Input type="password" value={password} onChange={handlePasswordInput} placeholder={passwordMsg} />
        <Button
          className="bg-black bg-opacity-80 text-white"
          disabled={!loginButtonActive}
          onClick={handleEmailLogin}
          text={buttonLoginMsg}
        />
        <Button className="bg-blue-500 text-white" onClick={handleGoogleClick} text={buttonLoginGoogleMsg} />
        <button className="flex justify-center py-2 flex-row pointer underline text-blue-600" onClick={handleToReset}>
          {forgotMsg}
        </button>
        <button className="flex justify-center py-2 flex-row gap-1" onClick={handleToRegister}>
          {regIntro} <span className="pointer underline text-blue-600">{regMsg}</span>
        </button>
        <Switch locale onChange={handleLocaleChange} checked={locale === 'ua'} />
      </div>
    </div>
  )
}
