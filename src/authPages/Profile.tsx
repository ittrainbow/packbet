import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Input } from '@mui/material'
import { User } from 'firebase/auth'

import { selectApp, selectUser } from '../redux/selectors'
import { UPDATE_PROFILE } from '../redux/storetypes'
import { Button, LocaleSwitcher } from '../UI'
import { userActions } from '../redux/slices'
import { i18n, LocaleType } from '../locale'
import { useFade } from '../hooks'
import { auth } from '../db'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const { name, locale } = useSelector(selectUser)
  const { tabActive, duration } = useSelector(selectApp)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>()
  const [tempName, setTempName] = useState(name)
  const [tempLocale, setTempLocale] = useState('')

  const triggerFade = useFade(containerRef)

  useEffect(() => {
    tabActive !== 1 && triggerFade()
  }, [tabActive, triggerFade])

  // helpers

  useEffect(() => {
    inputRef.current?.focus()
    setTempLocale(locale)
    // eslint-disable-next-line
  }, [])

  const noChanges = name === tempName && locale === tempLocale

  // action handlers

  const handleSubmit = async () => {
    const { uid } = user as User
    const payload = { uid, name: tempName, locale }

    dispatch({ type: UPDATE_PROFILE, payload })
    dispatch(userActions.updateUser(payload))
    navigate(-1)
  }

  const handleDiscard = () => {
    triggerFade()
    setTimeout(() => {
      locale !== tempLocale && dispatch(userActions.setLocale(tempLocale))
      navigate(-1)
    }, duration)
  }

  // render styles and locales

  const { profileHeaderMsg, profileNameMsg, profileLangMsg } = i18n(locale, 'auth') as LocaleType
  const { buttonChangesMsg, buttonCancelMsg, buttonSaveMsg } = i18n(locale, 'buttons') as LocaleType

  return (
    <div className="container auth flexcol5 animate-fade-in-up" ref={containerRef}>
      <div className="auth__data flexcol5">
        <div className="auth__text flexcol5">
          <div className="bold auth__text-margin">{profileHeaderMsg}</div>
          <div>{profileLangMsg}</div>
          <LocaleSwitcher />
          <div>{profileNameMsg}</div>
        </div>
        <Input type="text" inputRef={inputRef} onChange={(e) => setTempName(e.target.value)} value={tempName} />
        <Button disabled={noChanges} onClick={handleSubmit}>
          {noChanges ? buttonChangesMsg : buttonSaveMsg}
        </Button>
        <Button onClick={handleDiscard}>{buttonCancelMsg}</Button>
      </div>
    </div>
  )
}
