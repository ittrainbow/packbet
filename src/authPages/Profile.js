import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDoc, setDoc, doc } from 'firebase/firestore'

import './auth.scss'

import { auth, db } from '../db'
import { Button, Input, LocaleSwitcher } from '../UI'
import { Context } from '../App'
import { setLoading } from '../redux/actions'
import { i18n } from '../locale/locale'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userContext, setUserContext } = useContext(Context)
  const { name, locale, tempName, tempLocale } = userContext

  const { profileHeaderMsg, profileNameMsg, profileLangMsg } = i18n(locale, 'auth')
  const { buttonChangesMsg, buttonCancelMsg, buttonSaveMsg } = i18n(locale, 'buttons')

  useEffect(() => {
    setUserContext({ ...userContext, tempLocale: locale, tempName: name }) // eslint-disable-next-line
  }, [])

  const submitHandler = async () => {
    dispatch(setLoading(true))
    try {
      const { uid } = auth.currentUser
      setUserContext({ ...userContext, locale, name, tempLocale: locale, tempName: name })
      const response = await getDoc(doc(db, 'users', uid))
      const data = { ...response.data(), locale, name }
      await setDoc(doc(db, 'users', uid), data)
    } catch (error) {
      console.error(error)
    }
    dispatch(setLoading(false))
    navigate(-1)
  }

  const noChanges = () => name === tempName && locale === tempLocale

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="text-container bold">{profileHeaderMsg}</div>
        <div className="text-container">{profileLangMsg}</div>
        <LocaleSwitcher />
        <div className="text-container">{profileNameMsg}</div>
        <Input
          type={'text'}
          onChange={(e) => setUserContext({ ...userContext, name: e.target.value })}
          value={name}
        />
        <Button disabled={noChanges()} onClick={submitHandler}>
          {noChanges() ? buttonChangesMsg : buttonSaveMsg}
        </Button>
        <Button onClick={() => navigate(-1)}>{buttonCancelMsg}</Button>
      </div>
    </div>
  )
}
