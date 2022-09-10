import React from 'react'
import firebase from 'firebase/compat/app'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import Loader from '../../UI/Loader/Loader'
import './ForgotPassword.css'
import { actionSetEmail } from '../../redux/actions/authActions'
import { actionSetMessage, actionSwitchLoading } from '../../redux/actions/loadingActions'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const ForgotPassword = (props) => {
  const navigate = useNavigate()

  function tierline(message) {
    props.setMessage(message)
    props.setEmail('')
    props.switchLoading(false)
    setTimeout(() => props.setMessage(''), 3000)
  }

  async function recoverPassword() {
    props.switchLoading(true)

    try {
      firebase
        .auth()
        .sendPasswordResetEmail(props.email)
        .then(() => tierline('Проверьте почтовый ящик'))
    } catch (error) {
      tierline('Проверьте правильность ввода Email')
    }
  }

  function changeHandler(event) {
    const email = event.target.value
    props.setEmail(email)
  }

  function returnHandler() {
    navigate('/profile')
  }

  return (
    <div>
      <div className={'ForgotPassword'}>
        <Input value={props.email} onChange={(event) => changeHandler(event)} />
      </div>

      { !props.loading
        ? <div>
            <div style={{ marginTop: '20px' }}>
              <Button text="Выслать пароль" onClick={() => recoverPassword()} />
            </div>
            <div style={{ fontSize: '14px', marginTop: '10px', color: 'red' }}>{props.message}</div>
            <div style={{ marginTop: '15px' }}>
              <Button text="Вход" onClick={() => returnHandler()} />
            </div>
          </div>
        : <Loader /> }        
    </div>
  )
}

function mapStateToProps(state) {
  return {
    email: state.auth.email,
    message: state.loading.message,
    loading: state.loading.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setEmail: (email) => dispatch(actionSetEmail(email)),
    setMessage: (message) => dispatch(actionSetMessage(message)),
    switchLoading: (boolean) => dispatch(actionSwitchLoading(boolean))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
