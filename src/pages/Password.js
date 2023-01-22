import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import classes from './Pages.module.scss'
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword'
import { actionSetHeight } from '../redux/actions/viewActions'

const Password = () => {
  const { mobile } = useSelector((state) => state.view)
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
  }, [])

  return (
    <div id="container" className={this.props.mobile ? classes.ContainerMobile : classes.Container}>
      <h3>Восстановление пароля</h3>
      <ForgotPassword />
    </div>
  )
}

export default Password
