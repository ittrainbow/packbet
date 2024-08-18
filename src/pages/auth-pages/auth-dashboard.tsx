import { useEffect, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth, logout } from '../../db'
import { useFade } from '../../hooks'
import { Locale, i18n } from '../../locale'
import { selectApp, selectUser } from '../../redux/selectors'
import { answersActions, compareActions, userActions } from '../../redux/slices'
import { Button } from '../../ui-elements'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const { tabActive, durationShort } = useSelector(selectApp)
  const { name, admin, locale } = useSelector(selectUser)
  const containerRef = useRef<HTMLDivElement>(null)

  const triggerFade = useFade(containerRef)

  useEffect(() => {
    tabActive !== 1 && triggerFade()
  }, [tabActive, triggerFade])

  const handleLogout = () => {
    dispatch(userActions.clearUser())
    dispatch(answersActions.clearAnswers())
    dispatch(compareActions.clearCompare())
    logout()
    navigate('/userpage')
  }

  const handleNavigate = () => {
    triggerFade()
    setTimeout(() => navigate('/profile'), durationShort)
  }

  const { dashboardEnterMsg, dashboardAdminMsg } = i18n(locale, 'auth') as Locale
  const { buttonProfileMsg, buttonLogoutMsg } = i18n(locale, 'buttons') as Locale

  return (
    <div
      className="p-4 max-w-[32rem] flex flex-col gap-1 justify-center items-center animate-fade-in-up"
      ref={containerRef}
    >
      <div className="w-56 pt-20 flex flex-col justify-center items-center gap-3">
        <span className="font-bold">{dashboardEnterMsg}</span>
        <span>{name ? name : '...loading'}</span>
        <span>{user ? user.email : '...loading'}</span>
        {admin ? <span>{dashboardAdminMsg}</span> : null}
        <div className="flex w-full flex-col items-center gap-1">
          <Button className="w-44" onClick={handleNavigate} text={buttonProfileMsg} />
          <Button className="w-44" onClick={handleLogout} text={buttonLogoutMsg} />
        </div>
      </div>
    </div>
  )
}
