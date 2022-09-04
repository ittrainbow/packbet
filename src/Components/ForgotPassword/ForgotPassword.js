import React from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import './ForgotPassword.css'
import { actionSetEmail } from '../../redux/actions/authActions'
import { actionSetMessage } from '../../redux/actions/loadingActions'
import axios from '../../axios/axios'
import { findUser } from '../../frame/findUser'

const firebaseConfig = {
  apiKey: 'AIzaSyC34nFbBcejRwO5_dY6kcUsRHlTuy9AHOI'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const ForgotPassword = (props) => {
  const navigate = useNavigate()

  async function recoverPassword() {
    const response = await axios.get('pack/users.json')
    const emailValid = findUser(response.data, props.email).length

    if (emailValid) {
      firebase
        .auth()
        .sendPasswordResetEmail(props.email)
        .then(() => {
          props.setMessage('Проверьте почтовый ящик')
          setTimeout(() => {
            props.setMessage('')
            props.setEmail('')
            navigate('/profile')
          }, 3000)
        })
    } else {
      props.setMessage('Пользователь не найден')        
      setTimeout(() => {
        props.setMessage('')
      }, 3000)
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
        <Input 
          value={props.email}
          onChange={(event) => changeHandler(event)}
        />
      </div>

      <div style={{marginTop: '20px'}}>
        <Button 
          text='Выслать пароль'
          onClick={() => recoverPassword()}
        />
      </div>      
      <div style={{fontSize: '14px', marginTop: '10px'}}>
        {props.message}
      </div>
      <hr style={{marginTop: '12px', width: '250px'}}/>
      <div style={{marginTop: '15px'}}>
        <Button 
          text='Вход'
          onClick={() => returnHandler()}
        />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    email: state.auth.email,
    message: state.loading.message
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setEmail: (email) => dispatch(actionSetEmail(email)),
    setMessage: (message) => dispatch(actionSetMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)