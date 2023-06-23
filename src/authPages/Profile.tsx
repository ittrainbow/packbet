import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'
import { User } from 'firebase/auth'
import { Input } from '@mui/material'

import { UPDATE_PROFILE } from '../redux/types'
import { auth } from '../db'
import { LocaleType } from '../types'
import { Button, LocaleSwitcher } from '../UI'
import { useAppContext } from '../context/Context'
import { i18n } from '../locale/locale'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const inputRef = useRef<HTMLInputElement>()
  const { userContext, setUserContext } = useAppContext()
  const { name, locale } = userContext
  const [tempName, setTempName] = useState(name)
  const [tempLocale, setTempLocale] = useState(locale)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const submitHandler = async () => {
    const { uid } = user as User
    const [name, locale] = [tempName, tempLocale]
    dispatch({ type: UPDATE_PROFILE, payload: { uid, name, locale } })
    setUserContext({ ...userContext, name, locale })
    navigate(-1)
  }

  const noSaveHandler = () => navigate(-1)
  const noChanges = () => name === tempName && locale === tempLocale
  const onChangeLocaleHandler = () => setTempLocale(tempLocale === 'ua' ? 'ru' : 'ua')
  const checked = () => tempLocale === 'ua'

  // locale
  const { profileHeaderMsg, profileNameMsg, profileLangMsg } = i18n(locale, 'auth') as LocaleType
  const { buttonChangesMsg, buttonCancelMsg, buttonSaveMsg } = i18n(locale, 'buttons') as LocaleType

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <div className="text-container bold">{profileHeaderMsg}</div>
          <div className="text-container">{profileLangMsg}</div>
          <LocaleSwitcher onChange={onChangeLocaleHandler} checked={checked()} />
          <div className="text-container">{profileNameMsg}</div>
          <Input
            type={'text'}
            inputRef={inputRef}
            onChange={(e) => setTempName(e.target.value)}
            value={tempName}
          />
          <Button disabled={noChanges()} onClick={submitHandler}>
            {noChanges() ? buttonChangesMsg : buttonSaveMsg}
          </Button>
          <Button onClick={noSaveHandler}>{buttonCancelMsg}</Button>
        </div>
      </div>
    </div>
  )
}
