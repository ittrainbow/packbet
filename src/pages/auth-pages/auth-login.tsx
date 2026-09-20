import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '@/db'
import { useFade } from '@/hooks'
import { i18n, Locale } from '@/locale'
import { selectApp, selectUser } from '@/redux/selectors'
import { userActions } from '@/redux/slices'
import { Button, Input } from '@/ui'
import { getLocale } from '@/utils'
import { AuthGoogleMark, AuthShell } from './auth-shell'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, loading, error] = useAuthState(auth)
  const { duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const [password, setPassword] = useState<string>(localStorage.getItem('packContestPassword') || '')
  const [email, setEmail] = useState<string>(localStorage.getItem('packContestEmail') || '')
  const [emailValid, setEmailValid] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { triggerFade } = useFade(containerRef)

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

  return (
    <AuthShell containerRef={containerRef}>
      <Input
        type="email"
        value={email}
        onChange={handleEmailInput}
        placeholder={emailMsg}
        autoComplete="email"
      />
      <Input
        type="password"
        value={password}
        onChange={handlePasswordInput}
        placeholder={passwordMsg}
        autoComplete="current-password"
      />
      <Button
        className="bg-chrome text-white border-chrome hover:bg-chrome disabled:text-white/50"
        disabled={!loginButtonActive}
        onClick={handleEmailLogin}
        text={buttonLoginMsg}
      />
      <Button
        className="bg-white text-ink border-ink/20 hover:bg-white"
        onClick={handleGoogleClick}
        text={buttonLoginGoogleMsg}
        icon={<AuthGoogleMark />}
      />
      <button className="flex justify-center py-2 flex-row pointer underline text-accent" onClick={handleToReset}>
        {forgotMsg}
      </button>
      <button className="flex justify-center py-2 flex-row gap-1" onClick={handleToRegister}>
        {regIntro} <span className="pointer underline text-accent">{regMsg}</span>
      </button>
    </AuthShell>
  )
}
