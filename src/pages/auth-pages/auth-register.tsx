import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { auth, registerWithEmailAndPassword, signInWithGoogle } from '@/db'
import { useFade } from '@/hooks'
import { i18n } from '@/locale'
import { selectApp, selectUser } from '@/redux/selectors'
import { appActions, userActions } from '@/redux/slices'
import { User } from '@/types'
import { Button, Input } from '@/ui'
import { AuthGoogleMark, AuthShell } from './auth-shell'

export function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, loading] = useAuthState(auth)
  const { duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

  const { triggerFade } = useFade(containerRef)

  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    if (loading) return
    user && navigate('/dashboard')
    // eslint-disable-next-line
  }, [loading, user])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const setEmailReg = (value: boolean) => {
      dispatch(appActions.setEmailReg(value))
    }

    setEmailReg(true)
    return () => setEmailReg(false)
    // eslint-disable-next-line
  }, [])

  const register = async () => {
    !name && alert(regNameAlert)
    !email && alert(regEmailAlert)
    password.length < 6 && alert(regPasswordAlert)
    if (name && email && password.length > 5) {
      const response = await registerWithEmailAndPassword(name, email, password)
      if (response) {
        const user: User = { admin: false, locale, name, buddies: [response.uid] }
        dispatch(userActions.setUser(user))
      }
    }
  }

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setName(value)
  }

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPassword(trimSpaces(value))
  }

  const handleGoogleClick = async () => await signInWithGoogle()

  const { buttonRegisterMsg, buttonRegisterGoogleMsg } = i18n(locale, 'buttons')
  const { loginIntro, loginMsg, regNameMsg, regNameAlert, regEmailAlert, regPasswordAlert, emailMsg, passwordMsg } =
    i18n(locale, 'auth')

  const handleToLogin = () => {
    triggerFade()
    setTimeout(() => navigate('/login'), duration)
  }

  return (
    <AuthShell containerRef={containerRef}>
      <Input
        type="text"
        value={name}
        inputRef={inputRef}
        onChange={handleNameInput}
        placeholder={regNameMsg}
        autoComplete="username"
      />
      <Input type="email" value={email} onChange={handleEmailInput} placeholder={emailMsg} autoComplete="email" />
      <Input
        type="password"
        value={password}
        onChange={handlePasswordInput}
        placeholder={passwordMsg}
        autoComplete="new-password"
      />
      <Button
        className="bg-chrome text-white border-chrome hover:bg-chrome disabled:text-white/50"
        onClick={register}
        text={buttonRegisterMsg}
      />
      <Button
        className="bg-white text-ink border-ink/20 hover:bg-white"
        onClick={handleGoogleClick}
        text={buttonRegisterGoogleMsg}
        icon={<AuthGoogleMark />}
      />
      <button className="flex justify-center py-2 flex-row gap-1" onClick={handleToLogin}>
        {loginIntro} <span className="pointer underline text-accent">{loginMsg}</span>
      </button>
    </AuthShell>
  )
}
