import React from 'react'
import classes from './Pages.module.scss'
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword'

const Password = () => {
  return (
    <div className={classes.Container}>
      <h3>Восстановление пароля</h3>
      <ForgotPassword />
    </div>
  )
}

export default Password
