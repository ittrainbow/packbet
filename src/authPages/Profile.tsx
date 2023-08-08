import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { User } from 'firebase/auth'
import { Input } from '@mui/material'

import { UPDATE_PROFILE } from '../redux/storetypes'
import { auth } from '../db'
import { LocaleType } from '../types'
import { Button, LocaleSwitcher } from '../UI'
import { i18n } from '../locale'
import { appActions, userActions } from '../redux/slices'
import { selectApp, selectUser } from '../redux/selectors'
import { fadeInOut } from '../helpers'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const authRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>()
  const { name, locale } = useSelector(selectUser)
  const { tabActive } = useSelector(selectApp)
  const [tempName, setTempName] = useState(name)
  const [tempLocale, setTempLocale] = useState('')

  useEffect(() => {
    dispatch(appActions.setRef(authRef))
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
    setTempLocale(locale)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    tabActive !== 1 && fadeInOut(authRef)
  }, [tabActive])

  const submitHandler = async () => {
    const { uid } = user as User
    const payload = { uid, name: tempName, locale }

    dispatch({ type: UPDATE_PROFILE, payload })
    dispatch(userActions.updateUser(payload))
    navigate(-1)
  }

  const noSaveHandler = () => {
    dispatch(userActions.setLocale(tempLocale))
    fadeInOut(authRef)
    setTimeout(() => navigate(-1), 200)
  }

  const noChanges = name === tempName && locale === tempLocale

  const { profileHeaderMsg, profileNameMsg, profileLangMsg } = i18n(locale, 'auth') as LocaleType
  const { buttonChangesMsg, buttonCancelMsg, buttonSaveMsg } = i18n(locale, 'buttons') as LocaleType

  return (
    <div className="auth animate-fade-in-up" ref={authRef}>
      <div className="auth__container">
        <div className="auth__data">
          <div className="text-container bold">{profileHeaderMsg}</div>
          <div className="text-container">{profileLangMsg}</div>
          <LocaleSwitcher />
          <div className="text-container">{profileNameMsg}</div>
          <Input type="text" inputRef={inputRef} onChange={(e) => setTempName(e.target.value)} value={tempName} />
          <Button disabled={noChanges} onClick={submitHandler}>
            {noChanges ? buttonChangesMsg : buttonSaveMsg}
          </Button>
          <Button onClick={noSaveHandler}>{buttonCancelMsg}</Button>
        </div>
      </div>
    </div>
  )
}
