import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useRef, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { logout } from '../db/auth'
import { auth } from '../db'
import { LocaleType } from '../types'
import { Button } from '../UI'
import { i18n } from '../locale'
import { selectApp, selectUser } from '../redux/selectors'
import { answersActions, compareActions, userActions } from '../redux/slices'
import { fadeInOut } from '../helpers'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const { tabActive } = useSelector(selectApp)
  const authRef = useRef<HTMLDivElement>(null)
  const { name, admin, locale } = useSelector(selectUser)

  useEffect(() => {
    tabActive !== 1 && fadeInOut(authRef)
  }, [tabActive])

  const logoutHandler = () => {
    dispatch(userActions.clearUser())
    dispatch(answersActions.clearAnswers())
    dispatch(compareActions.clearCompare())
    logout()
    navigate('/userpage')
  }

  const navigateHandler = () => {
    fadeInOut(authRef)
    setTimeout(() => navigate('/profile'), 200)
  }

  const { dashboardEnterMsg, dashboardAdminMsg } = i18n(locale, 'auth') as LocaleType
  const { buttonProfileMsg, buttonLogoutMsg } = i18n(locale, 'buttons') as LocaleType

  return (
    <div className="auth animate-fade-in-up" ref={authRef}>
      <div className="auth__container">
        <div className="auth__data">
          <div className="bold">{dashboardEnterMsg}</div>
          <div>{name ? name : '...loading'}</div>
          <div>{user ? user.email : '...loading'}</div>
          <div>{admin ? <div>{dashboardAdminMsg}</div> : null}</div>
        </div>
        <Button onClick={navigateHandler}>{buttonProfileMsg}</Button>
        <Button onClick={logoutHandler}>{buttonLogoutMsg}</Button>
      </div>
    </div>
  )
}
