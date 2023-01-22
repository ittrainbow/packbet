import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import firebase from 'firebase/compat/app'
import { useNavigate } from 'react-router-dom'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import classes from '../../App.module.scss'
import { Input, Button, Loader } from '../../UI'
import './ForgotPassword.scss'
import { actionSetEmail } from '../../redux/actions/authActions'
import { actionSetMessage, actionSwitchLoading } from '../../redux/actions/loadingActions'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const ForgotPassword = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { email } = useSelector((state) => state.auth)
  const { message, loading } = useSelector((state) => state.loading)

  const tierline = () => {
    dispatch(actionSetMessage(message))
    dispatch(actionSetEmail(''))
    dispatch(actionSwitchLoading(false))

    const timeout = setTimeout(() => dispatch(actionSetMessage('')), 3000)
    clearInterval(timeout)
  }

  async function recoverPassword() {
    dispatch(actionSwitchLoading(true))

    try {
      firebase
        .auth()
        .sendPasswordResetEmail(props.email)
        .then(() => tierline('Проверьте почтовый ящик'))
    } catch (error) {
      tierline('Проверьте правильность ввода Email')
    }

    dispatch(actionSwitchLoading(false))
  }

  const changeHandler = (e) => {
    const { value } = e.target
    dispatch(actionSetEmail(value))
  }

  return (
    <div>
      <div className={'ForgotPassword'}>
        <Input className={classes.InputWide} value={email} onChange={(e) => changeHandler(e)} />
      </div>

      {!loading ? (
        <div>
          <Button text="Выслать пароль" onClick={() => recoverPassword()} />
          <div className={classes.DivContainerRed}>{message}</div>
          <Button text="Вход" onClick={() => navigate('/profile')} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default ForgotPassword
