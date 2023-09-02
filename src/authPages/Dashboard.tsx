import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

import { answersActions, compareActions, userActions } from '../redux/slices'
import { selectApp, selectUser } from '../redux/selectors'
import { i18n, LocaleType } from '../locale'
import { logout } from '../db/auth'
import { useFade } from '../hooks'
import { Button } from '../UI'
import { auth } from '../db'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const { tabActive, duration } = useSelector(selectApp)
  const { name, admin, locale } = useSelector(selectUser)
  const containerRef = useRef<HTMLDivElement>(null)

  // container fade animations

  const triggerFade = useFade(containerRef)

  useEffect(() => {
    tabActive !== 1 && triggerFade()
  }, [tabActive, triggerFade])

  // action handlers

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

  // render styles and locales

  const { dashboardEnterMsg, dashboardAdminMsg } = i18n(locale, 'auth') as LocaleType
  const { buttonProfileMsg, buttonLogoutMsg } = i18n(locale, 'buttons') as LocaleType

  return (
    <div className="container auth flexcol5 animate-fade-in-up" ref={containerRef}>
      <div className="auth__data flexcol5">
        <div className="auth__text flexcol5">
          <div className="bold auth__text-margin">{dashboardEnterMsg}</div>
          <div>{name ? name : '...loading'}</div>
          <div>{user ? user.email : '...loading'}</div>
          {admin ? <div>{dashboardAdminMsg}</div> : null}
        </div>
        <Button onClick={handleNavigate}>{buttonProfileMsg}</Button>
        <Button onClick={handleLogout}>{buttonLogoutMsg}</Button>
      </div>
    </div>
  )
}
