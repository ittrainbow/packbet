import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { auth, sendPasswordReset } from '@/db'
import { useFade } from '@/hooks'
import { i18n } from '@/locale'
import { selectApp, selectUser } from '@/redux/selectors'
import { Button, Input } from '@/ui'
import { AuthShell } from './auth-shell'

export function Reset() {
  const navigate = useNavigate()
  const [user, loading] = useAuthState(auth)
  const { duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState('')

  const { triggerFade } = useFade(containerRef)

  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (loading) return
    user && navigate('/')
    // eslint-disable-next-line
  }, [user, loading])

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const { buttonRecoverMsg } = i18n(locale, 'buttons')
  const { loginMsg, loginIntro, regMsg, regIntro, emailMsg } = i18n(locale, 'auth')

  return (
    <AuthShell containerRef={containerRef}>
      <Input
        type="email"
        value={email}
        inputRef={inputRef}
        onChange={handleEmailInput}
        placeholder={emailMsg}
        autoComplete="email"
      />
      <Button
        className="bg-chrome text-white border-chrome hover:bg-chrome disabled:text-white/50"
        onClick={() => sendPasswordReset(email)}
        text={buttonRecoverMsg}
      />
      <button className="flex justify-center py-2 flex-row gap-1" onClick={handleToRegister}>
        {regIntro} <span className="pointer underline text-accent">{regMsg}</span>
      </button>
      <button className="flex justify-center py-2 flex-row gap-1" onClick={handleToLogin}>
        {loginIntro} <span className="pointer underline text-accent">{loginMsg}</span>
      </button>
    </AuthShell>
  )
}
