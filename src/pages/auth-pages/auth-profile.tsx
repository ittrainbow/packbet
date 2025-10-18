import { User } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Input } from '@mui/material'
import clsx from 'clsx'
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
  const { duration, appNaviEvent } = useSelector(selectApp)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>()
  const [tempName, setTempName] = useState(name)
  const [tempLocale, setTempLocale] = useState<'ua' | 'ru'>(locale)

  const { triggerFade } = useFade(containerRef)

  useEffect(() => {
    inputRef.current?.focus()
    setTempLocale(locale)
    // eslint-disable-next-line
  }, [])

  const noChanges = name === tempName && locale === tempLocale

  const handleSubmit = async () => {
    const { uid } = user as User
    const payload = { uid, name: tempName, locale: tempLocale }
    localStorage.setItem('packContestLocale', tempLocale)

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

  const handleChange = () => setTempLocale((prev) => (prev === 'ru' ? 'ua' : 'ru'))

  const { profileHeaderMsg, profileNameMsg, profileLangMsg } = i18n(locale, 'auth') as Locale
  const { buttonChangesMsg, buttonCancelMsg, buttonSaveMsg } = i18n(locale, 'buttons') as Locale

  return (
    <div
      className={clsx(
        'flex flex-col p-4 max-w-[32rem] gap-1 box-border h-full items-center',
        appNaviEvent && ' animate-fade-in-up'
      )}
      ref={containerRef}
      id="container"
    >
      <div className="w-56 pt-20 flex flex-col justify-center items-center gap-6">
        <span className="font-bold text-md">{profileHeaderMsg}</span>
        <div className="flex flex-col items-center gap-2">
          <span>{profileLangMsg}</span>
          <Switch locale checked={tempLocale === 'ua'} onChange={handleChange} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>{profileNameMsg}</span>
          <Input type="text" inputRef={inputRef} onChange={(e) => setTempName(e.target.value)} value={tempName} />
        </div>
        <div className="flex w-full flex-col items-center gap-1">
          <Button
            className="w-44"
            disabled={noChanges}
            onClick={handleSubmit}
            text={noChanges ? buttonChangesMsg : buttonSaveMsg}
          />
          <Button className="w-44" onClick={handleDiscard} text={buttonCancelMsg} />
        </div>
      </div>
    </div>
  )
}
