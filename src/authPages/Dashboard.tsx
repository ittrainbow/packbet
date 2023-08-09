import { useSelector, useDispatch } from 'react-redux'
import { useRef, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

import { answersActions, compareActions, userActions } from '../redux/slices'
import { selectApp, selectUser } from '../redux/selectors'
import { LocaleType } from '../types'
import { fadeOut } from '../helpers'
import { Button } from '../UI'
import { logout } from '../db/auth'
import { auth } from '../db'
import { i18n } from '../locale'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const { tabActive } = useSelector(selectApp)
  const authRef = useRef<HTMLDivElement>(null)
  const { name, admin, locale } = useSelector(selectUser)

  // container fade animations

  useEffect(() => {
    tabActive !== 1 && fadeOut(authRef, 'dashboard')
  }, [tabActive])

  // click action handlers

  const handleLogout = () => {
    dispatch(userActions.clearUser())
    dispatch(answersActions.clearAnswers())
    dispatch(compareActions.clearCompare())
    logout()
    navigate('/userpage')
  }

  const handleNavigate = () => {
    fadeOut(authRef, 'dashboard')
    setTimeout(() => navigate('/profile'), 200)
  }

  // render styles and locales

  const { dashboardEnterMsg, dashboardAdminMsg } = i18n(locale, 'auth') as LocaleType
  const { buttonProfileMsg, buttonLogoutMsg } = i18n(locale, 'buttons') as LocaleType

  return (
    <div className="auth animate-fade-in-up" ref={authRef}>
      <div className="auth__container">
        <div className="auth__data">
          <div className="text-container bold">{dashboardEnterMsg}</div>
          <div>{name ? name : '...loading'}</div>
          <div>{user ? user.email : '...loading'}</div>
          <div>{admin ? <div>{dashboardAdminMsg}</div> : null}</div>
        </div>
        <Button onClick={handleNavigate}>{buttonProfileMsg}</Button>
        <Button onClick={handleLogout}>{buttonLogoutMsg}</Button>
      </div>
    </div>
  )
}
