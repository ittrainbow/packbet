import { User } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Input } from '@mui/material'
import { auth } from '../../db'
import { useFade } from '../../hooks'
import { Locale, i18n } from '../../locale'
import { selectApp, selectUser } from '../../redux/selectors'
import { userActions } from '../../redux/slices'
import { UPDATE_PROFILE } from '../../redux/storetypes'
import { Button, Switch } from '../../ui'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const { name, locale } = useSelector(selectUser)
  const { tabActive, duration } = useSelector(selectApp)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>()
  const [tempName, setTempName] = useState(name)
  const [tempLocale, setTempLocale] = useState<'ua' | 'ru'>(locale)

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
    const payload = { uid, name: tempName, locale: tempLocale }

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

  const { profileHeaderMsg, profileNameMsg, profileLangMsg } = i18n(locale, 'auth') as Locale
  const { buttonChangesMsg, buttonCancelMsg, buttonSaveMsg } = i18n(locale, 'buttons') as Locale

  return (
    <div className="p-4 justify-center items-center flex flex-col gap-4 animate-fade-in-up" ref={containerRef}>
      <span className="font-bold text-lg pb-8">{profileHeaderMsg}</span>
      <span>{profileLangMsg}</span>

      <Switch
        checked={tempLocale === 'ua'}
        onChange={() => setTempLocale((prev) => (prev === 'ru' ? 'ua' : 'ru'))}
        locale
      />

      <span>{profileNameMsg}</span>
      <Input type="text" inputRef={inputRef} onChange={(e) => setTempName(e.target.value)} value={tempName} />
      <Button className="max-w-40" disabled={noChanges} onClick={handleSubmit}>
        {noChanges ? buttonChangesMsg : buttonSaveMsg}
      </Button>
      <Button className="max-w-40" onClick={handleDiscard}>
        {buttonCancelMsg}
      </Button>
    </div>
  )
}
