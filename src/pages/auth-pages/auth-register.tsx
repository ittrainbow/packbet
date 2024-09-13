import { Input } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../../db'
import { useFade } from '../../hooks'
import { Locale, i18n } from '../../locale'
import { selectApp, selectUser } from '../../redux/selectors'
import { appActions, userActions } from '../../redux/slices'
import { User } from '../../types'
import { Button, Switch } from '../../ui'

export const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, loading] = useAuthState(auth)
  const { tabActive, duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

  const triggerFade = useFade(containerRef)

  useEffect(() => {
    tabActive !== 1 && triggerFade()
  }, [tabActive, triggerFade])

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

  const { buttonRegisterMsg, buttonRegisterGoogleMsg } = i18n(locale, 'buttons') as Locale
  const { loginIntro, loginMsg, regNameMsg, regNameAlert, regEmailAlert, regPasswordAlert, emailMsg, passwordMsg } =
    i18n(locale, 'auth') as Locale

  const handleToLogin = () => {
    triggerFade()
    setTimeout(() => navigate('/login'), duration)
  }

  const handleLocaleChange = () => dispatch(userActions.setLocale(locale === 'ru' ? 'ua' : 'ru'))

  return (
    <div
      className="flex flex-col p-4 max-w-[32rem] gap-4 box-border h-full items-center animate-fade-in-up"
      ref={containerRef}
    >
      <div className="w-56 pt-20 flex flex-col justify-center gap-3">
        <Input type="text" value={name} ref={inputRef} onChange={handleNameInput} placeholder={regNameMsg} />
        <Input type="email" value={email} onChange={handleEmailInput} placeholder={emailMsg} />
        <Input type="password" value={password} onChange={handlePasswordInput} placeholder={passwordMsg} />
        <Button className="bg-black bg-opacity-80 text-white" onClick={register} text={buttonRegisterMsg} />
        <Button className="bg-blue-500 text-white" onClick={handleGoogleClick} text={buttonRegisterGoogleMsg} />
        <button className="flex justify-center py-2 flex-row gap-1" onClick={handleToLogin}>
          {loginIntro} <span className="pointer underline text-blue-600">{loginMsg}</span>
        </button>
      </div>

      <Switch locale onChange={handleLocaleChange} checked={locale === 'ua'} />
    </div>
  )
}
