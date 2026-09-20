import clsx from 'clsx'
import { useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth, logout } from '@/db'
import { useFade, usePageFadeClass } from '@/hooks'
import { Locale, i18n } from '@/locale'
import { selectApp, selectUser } from '@/redux/selectors'
import { answersActions, compareActions, userActions } from '@/redux/slices'
import { Button } from '@/ui'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const fadeClass = usePageFadeClass()
  const { duration } = useSelector(selectApp)
  const { name, admin, locale } = useSelector(selectUser)
  const containerRef = useRef<HTMLDivElement>(null)

  const { triggerFade } = useFade(containerRef)

  const handleLogout = () => {
    dispatch(userActions.clearUser())
    dispatch(answersActions.clearAnswers())
    dispatch(compareActions.clearCompare())
    logout()
    navigate('/userpage')
  }

  const handleNavigate = () => {
    triggerFade()
    setTimeout(() => navigate('/profile'), duration)
  }

  const { dashboardEnterMsg, dashboardAdminMsg } = i18n(locale, 'auth') as Locale
  const { buttonProfileMsg, buttonLogoutMsg } = i18n(locale, 'buttons') as Locale

  return (
    <div
      className={clsx(
        'flex flex-col px-4 py-5 max-w-[32rem] gap-3 box-border',
        fadeClass
      )}
      ref={containerRef}
      id="container"
    >
      <div className="flex items-center h-6">
        <span className="font-bold text-base leading-6">{dashboardEnterMsg}</span>
      </div>
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col items-center gap-1 w-full max-w-[16rem]">
          <span className="text-center">{name ? name : '...loading'}</span>
          <span className="text-center">{user ? user.email : '...loading'}</span>
          {admin ? <span className="text-center">{dashboardAdminMsg}</span> : null}
        </div>
        <div className="flex w-48 flex-col gap-1">
          <Button onClick={handleNavigate} text={buttonProfileMsg} />
          <Button onClick={handleLogout} text={buttonLogoutMsg} />
        </div>
      </div>
    </div>
  )
}
