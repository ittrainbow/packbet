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
  const { name, tempName, locale, tempLocale } = userContext

  useEffect(() => {
    setUserContext({ ...userContext, tempName: name, tempLocale: locale }) // eslint-disable-next-line
  }, [])

  const { profHeaderMsg, profNameMsg, profLangMsg } = i18n(locale, 'auth')
  const { buttonChangesMsg, buttonCancelMsg, buttonSaveMsg } = i18n(locale, 'buttons')

  const submitHandler = async () => {
    dispatch(setLoading(true))
    try {
      const { uid } = auth.currentUser
      setUserContext({ ...userContext, locale: tempLocale, name: tempName })
      const response = await getDoc(doc(db, 'users', uid))
      const data = { ...response.data(), locale: tempLocale, name: tempName }
      await setDoc(doc(db, 'users', uid), data)
    } catch (error) {
      console.error(error)
    }
    dispatch(setLoading(false))
    navigate(-1)
  }

  const noChanges = () => tempName === name && tempLocale === locale

  return (
    <div className="container">
      <div className="auth">
        <div className="auth__container">
          <div className="text-container">{profHeaderMsg}</div>
          <div className="text-container">{profNameMsg}</div>
          <Input
            type={'text'}
            onChange={(e) => setUserContext({ ...userContext, tempName: e.target.value })}
            value={tempName ? tempName : ''}
          />

          <div className="text-container">{profLangMsg}</div>
          <LocaleSwitcher />
          <Button disabled={noChanges()} onClick={submitHandler}>
            {noChanges() ? buttonChangesMsg : buttonSaveMsg}
          </Button>
          <Button onClick={() => navigate(-1)}>{buttonCancelMsg}</Button>
        </div>
      </div>
    </div>
  )
}
