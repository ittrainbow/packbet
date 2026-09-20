import { User } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import clsx from 'clsx'
import { auth } from '@/db'
import { useFade, usePageFadeClass } from '@/hooks'
import { Locale, LocaleCode, i18n } from '@/locale'
import { selectApp, selectUser } from '@/redux/selectors'
import { userActions } from '@/redux/slices'
import { UPDATE_PROFILE } from '@/redux/storetypes'
import { Button, Input, LocaleSwitch } from '@/ui'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const { name, locale } = useSelector(selectUser)
  const fadeClass = usePageFadeClass()
  const { duration } = useSelector(selectApp)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [tempName, setTempName] = useState(name)
  const [tempLocale, setTempLocale] = useState<LocaleCode>(locale)

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

  const { profileHeaderMsg, profileNameMsg } = i18n(locale, 'auth') as Locale
  const { buttonChangesMsg, buttonCancelMsg, buttonSaveMsg } = i18n(locale, 'buttons') as Locale

  return (
    <div
      className={clsx(
        'flex flex-col p-4 max-w-[32rem] gap-3 box-border',
        fadeClass
      )}
      ref={containerRef}
      id="container"
    >
      <span className="font-bold text-base leading-none">{profileHeaderMsg}</span>
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col items-center w-full max-w-[16rem]">
          <LocaleSwitch value={tempLocale} onChange={setTempLocale} />
        </div>
        <div className="flex flex-col items-center gap-2 w-48">
          <span className="text-center">{profileNameMsg}</span>
          <Input
            type="text"
            inputRef={inputRef}
            onChange={(e) => setTempName(e.target.value)}
            value={tempName}
            autoComplete="username"
          />
        </div>
        <div className="flex w-48 flex-col gap-1">
          <Button
            disabled={noChanges}
            onClick={handleSubmit}
            text={noChanges ? buttonChangesMsg : buttonSaveMsg}
          />
          <Button onClick={handleDiscard} text={buttonCancelMsg} />
        </div>
      </div>
    </div>
  )
}
