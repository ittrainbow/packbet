import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { NavLink } from 'react-router-dom'
import Auth from '../Components/Auth/Auth'
import Userpage from '../Components/Userpage/Userpage'
import classes from './Pages.module.scss'
import { Button } from '../UI'
import { actionSetHeight } from '../redux/actions/viewActions'

export const Profile = () => {
  const { mobile } = useSelector((state) => state.view)
  const { token, authPage } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      dispatch(actionSetHeight(height))
    }
    return
    // eslint-disable-next-line
  }, [])

  const drawRecoveryButton = () => {
    return (
      <NavLink to={'/recover'}>
        <Button text="Забыли пароль?" />
      </NavLink>
    )
  }

  return (
    <div id="container" className={mobile ? classes.ContainerMobile : classes.Container}>
      <h3>{token ? 'Профиль' : authPage ? 'Войти' : 'Регистрация'}</h3>
      {token ? <Userpage /> : <Auth />}
      {token ? null : drawRecoveryButton()}
    </div>
  )
}
