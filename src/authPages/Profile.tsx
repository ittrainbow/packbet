import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Input } from '@mui/material'
import { User } from 'firebase/auth'

import { Button, LocaleSwitcher } from '../UI'
import { selectApp, selectUser } from '../redux/selectors'
import { UPDATE_PROFILE } from '../redux/storetypes'
import { animateFadeOut } from '../helpers'
import { userActions } from '../redux/slices'
import { LocaleType } from '../types'
import { auth } from '../db'
import { i18n } from '../locale'

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

  // container fade animations

  useEffect(() => {
    tabActive !== 1 && animateFadeOut(containerRef)
  }, [tabActive])

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
    animateFadeOut(containerRef)
    setTimeout(() => {
      dispatch(userActions.setLocale(tempLocale))
      navigate(-1)
    }, duration)
  }

  // render styles and locales

  const { profileHeaderMsg, profileNameMsg, profileLangMsg } = i18n(locale, 'auth') as LocaleType
  const { buttonChangesMsg, buttonCancelMsg, buttonSaveMsg } = i18n(locale, 'buttons') as LocaleType

  return (
    <div className="container auth animate-fade-in-up" ref={containerRef}>
      <div className="auth__data">
        <div className="text-container bold">{profileHeaderMsg}</div>
        <div className="text-container">{profileLangMsg}</div>
        <LocaleSwitcher />
        <div className="text-container">{profileNameMsg}</div>
        <Input type="text" inputRef={inputRef} onChange={(e) => setTempName(e.target.value)} value={tempName} />
        <Button disabled={noChanges} onClick={handleSubmit}>
          {noChanges ? buttonChangesMsg : buttonSaveMsg}
        </Button>
        <Button onClick={handleDiscard}>{buttonCancelMsg}</Button>
      </div>
    </div>
  )
}
