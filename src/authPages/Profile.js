import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import { Input } from '@mui/material'

import './auth.scss'

import { auth, db } from '../db'
import { Button, LocaleSwitcher } from '../UI'
import { useAppContext } from '../context/Context'
import { setLoading } from '../redux/actions'
import { i18n } from '../locale/locale'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const inputRef = useRef()
  const { userContext, setUserContext } = useAppContext()
  const { name, locale } = userContext
  const [tempName, setTempName] = useState(name)
  const [tempLocale, setTempLocale] = useState(locale)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const submitHandler = async () => {
    dispatch(setLoading(true))
    try {
      const { uid } = user
      const name = tempName
      const locale = tempLocale
      localStorage.getItem('locale') !== tempLocale && localStorage.setItem('locale', tempLocale)
      setUserContext({ ...userContext, locale, name })
      const response = await getDoc(doc(db, 'users', uid))
      const data = { ...response.data(), locale, name }
      await setDoc(doc(db, 'users', uid), data)
    } catch (error) {
      console.error(error)
    }
    dispatch(setLoading(false))
    navigate(-1)
  }

  const noSaveHandler = () => navigate(-1)
  const noChanges = () => name === tempName && locale === tempLocale
  const onChangeLocaleHandler = () => setTempLocale(tempLocale === 'ua' ? 'ru' : 'ua')
  const checked = () => tempLocale === 'ua'

  // locale
  const { profileHeaderMsg, profileNameMsg, profileLangMsg } = i18n(locale, 'auth')
  const { buttonChangesMsg, buttonCancelMsg, buttonSaveMsg } = i18n(locale, 'buttons')

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
