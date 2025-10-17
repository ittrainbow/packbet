import { Input } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import clsx from 'clsx'
import { auth, sendPasswordReset } from '../../db'
import { useFade } from '../../hooks'
import { Locale, i18n } from '../../locale'
import { selectApp, selectUser } from '../../redux/selectors'
import { userActions } from '../../redux/slices'
import { Button, Switch } from '../../ui'

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

  const { buttonRecoverMsg } = i18n(locale, 'buttons') as Locale
  const { loginMsg, loginIntro, regMsg, regIntro } = i18n(locale, 'auth') as Locale

  const handleLocaleChange = () => dispatch(userActions.setLocale(locale === 'ru' ? 'ua' : 'ru'))

  return (
    <div
      className={clsx(
        'flex flex-col p-4 max-w-[32rem] gap-4 box-border h-full items-center'
        // appNaviEvent && 'animate-fade-in-up'
      )}
      ref={containerRef}
    >
      <div className="w-56 pt-20 flex flex-col justify-center gap-1">
        <Input type="text" value={email} ref={inputRef} onChange={handleEmailInput} placeholder={'E-mail'} />
        <Button
          className="bg-black bg-opacity-80 text-white my-2"
          onClick={() => sendPasswordReset(email)}
          text={buttonRecoverMsg}
        />
        <button className="flex justify-center py-2 flex-row gap-1" onClick={handleToRegister}>
          {regIntro} <span className="pointer underline text-blue-600">{regMsg}</span>
        </button>
        <button className="flex justify-center py-2 flex-row gap-1" onClick={handleToLogin}>
          {loginIntro} <span className="pointer underline text-blue-600">{loginMsg}</span>
        </button>
      </div>

      <Switch locale onChange={handleLocaleChange} checked={locale === 'ua'} />
    </div>
  )
}
