import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { User } from 'firebase/auth'
import { Input } from '@mui/material'

import { UPDATE_PROFILE } from '../redux/types'
import { auth } from '../db'
import { LocaleType } from '../types'
import { Button, LocaleSwitcher } from '../UI'
import { i18n } from '../locale/locale'
import { userActions } from '../redux/slices/userSlice'
import { selectUser } from '../redux/selectors'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const inputRef = useRef<HTMLInputElement>()
  const { name, locale } = useSelector(selectUser)
  const [tempName, setTempName] = useState(name)
  const [tempLocale, setTempLocale] = useState('')

  useEffect(() => {
    inputRef.current?.focus()
    setTempLocale(locale) // eslint-disable-next-line
  }, [])

  const submitHandler = async () => {
    const { uid } = user as User
    
    dispatch({ type: UPDATE_PROFILE, payload: { uid, name: tempName, locale } })
    dispatch(userActions.updateUser({ name, locale }))
    navigate(-1)
  }

  const noSaveHandler = () => {
    localStorage.setItem('locale', tempLocale)
    dispatch(userActions.setLocale(tempLocale))
    navigate(-1)
  }

  const noChanges = name === tempName && locale === tempLocale

  const { profileHeaderMsg, profileNameMsg, profileLangMsg } = i18n(locale, 'auth') as LocaleType
  const { buttonChangesMsg, buttonCancelMsg, buttonSaveMsg } = i18n(locale, 'buttons') as LocaleType

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <div className="text-container bold">{profileHeaderMsg}</div>
          <div className="text-container">{profileLangMsg}</div>
          <LocaleSwitcher />
          <div className="text-container">{profileNameMsg}</div>
          <Input
            type="text"
            inputRef={inputRef}
            onChange={(e) => setTempName(e.target.value)}
            value={tempName}
          />
          <Button disabled={noChanges} onClick={submitHandler}>
            {noChanges ? buttonChangesMsg : buttonSaveMsg}
          </Button>
          <Button onClick={noSaveHandler}>{buttonCancelMsg}</Button>
        </div>
      </div>
    </div>
  )
}
