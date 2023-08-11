import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

import { answersActions, compareActions, userActions } from '../redux/slices'
import { selectApp, selectLocation, selectUser } from '../redux/selectors'
import { i18n, LocaleType } from '../locale'
import { animateFadeOut } from '../helpers'
import { logout } from '../db/auth'
import { Button } from '../UI'
import { auth } from '../db'
import { useFade } from '../hooks/useFade'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const { tabActive, duration } = useSelector(selectApp)
  const { name, admin, locale } = useSelector(selectUser)
  const { pathname } = useSelector(selectLocation)
  const containerRef = useRef<HTMLDivElement>(null)

  // container fade animations

  useFade({ ref: containerRef, condition: tabActive !== 1 })

  // action handlers

  const handleLogout = () => {
    dispatch(userActions.clearUser())
    dispatch(answersActions.clearAnswers())
    dispatch(compareActions.clearCompare())
    logout()
    navigate('/userpage')
  }

  const handleNavigate = () => {
    animateFadeOut(containerRef)
    setTimeout(() => navigate('/profile'), duration)
  }

  // render styles and locales

  const { dashboardEnterMsg, dashboardAdminMsg } = i18n(locale, 'auth') as LocaleType
  const { buttonProfileMsg, buttonLogoutMsg } = i18n(locale, 'buttons') as LocaleType

  return (
    <div className="container auth animate-fade-in-up" ref={containerRef}>
      <div className="auth__data">
        <div className="text-container bold">{dashboardEnterMsg}</div>
        <div>{name ? name : '...loading'}</div>
        <div>{user ? user.email : '...loading'}</div>
        {admin ? <div className="text-container">{dashboardAdminMsg}</div> : null}
        <Button onClick={handleNavigate}>{buttonProfileMsg}</Button>
        <Button onClick={handleLogout}>{buttonLogoutMsg}</Button>
      </div>
    </div>
  )
}
