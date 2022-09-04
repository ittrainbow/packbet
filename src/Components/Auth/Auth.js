import React, { Component } from 'react'

import classes from './Auth.module.scss'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import './Auth.module.scss'
import { validateEmail } from '../../frame/validateEmail'
import { connect } from 'react-redux'
import { actionAuth, actionSetCurrentUser, actionSetAuthPage } from '../../redux/actions/authActions'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'
import axios from '../../axios/axios'
import { findUser, findName } from '../../frame/findUser'
import Loader from '../../UI/Loader/Loader'

class Auth extends Component {
  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
      },
    },      
    tierline: null,
    isFormValid: false,
    authPage: true
  }

  componentDidMount() {
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')

    if (email && password) {
      const formControls = JSON.parse(JSON.stringify(this.state.formControls))
      formControls.email.value = email
      formControls.password.value = password
  
      this.setState({
        formControls,
        isFormValid: true
      }, function () {      
        this.validation()
      })
    }
  }
  
  tierline(message) {
    setTimeout(() => {
      this.setState({
        tierline: message
      });
    })

    setTimeout(() => {
      this.setState({
        tierline: ''
      });
    }, 3000)
  }

  onChangeHandler = (event, controlName) => {
    const formControls = JSON.parse(JSON.stringify(this.state.formControls))
    const control = {...formControls[controlName]}

    control.value = event.target.value
    formControls[controlName] = control

    this.setState({
      formControls: formControls
    }, function () {
      this.validation()
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls)
      .map((controlName, index) => {
        const control = this.state.formControls[controlName]

        return (
          <Input
            key={controlName + index}
            type={control.type}
            value={control.value}
            label={control.label}
            onChange={(event) => this.onChangeHandler(event, controlName)}
          />
        )
      })
  }

  loginHandler = async () => {    
    this.props.switchLoading(true)

    const email = this.state.formControls.email.value
    const registeredUsers = await axios.get('pack/users.json')
    const userExists = findUser(registeredUsers.data, email).length   

    if (userExists && this.state.isFormValid) {
      try {
        await this.props.auth(
          this.state.formControls.email.value,
          this.state.formControls.password.value,
          true
        )
      } catch (error) {
        this.tierline('Неверный пароль')
      }
    } else {
      this.tierline('Неверный Email')
    }
    
    this.props.switchLoading(false)
  }

  registerHandler = async () => {
    this.props.switchLoading(true)

    const email = this.state.formControls.email.value
    const password = this.state.formControls.password.value   
    const name = this.state.formControls.name.value
    
    const registeredUsers = await axios.get('pack/users.json')
    const userExists = findUser(registeredUsers.data, email).length 
    const nameExists = findName(registeredUsers.data, name).length
    
    if (!userExists && !nameExists && name.length > 0 && validateEmail(email) && password.length > 5) {
      this.props.auth(email, password, false)
      const weeks = ''
      await axios.post('pack/users.json', { email, name, weeks })
      const getBack = await axios.get('pack/users.json')
      this.props.setCurrentUser(Object.keys(getBack.data).slice(-1)[0], name)
    } else if (!validateEmail(email)) {      
      this.tierline('Используйте валидный Email')
      this.props.switchLoading(false) 
    } else if (userExists) {
      this.tierline('Используйте другой Email')      
      this.props.switchLoading(false) 
    } else if (nameExists) {
      this.tierline('Используйте другое имя пользователя')      
      this.props.switchLoading(false) 
    } else if (password.length < 6) {
      this.tierline('Используйте пароль не менее 6 символов')
      this.props.switchLoading(false) 
    }
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  validation() {
    const email = validateEmail(this.state.formControls.email.value)
    const password = this.state.formControls.password.value.length > 5
    const name = this.state.authPage
      ? true
      : this.state.formControls.name.value.length > 2

    this.setState({
      isFormValid: email && password && name
    })
  }

  authRegHandler() {
    const formControls = {...this.state.formControls}

    if (!formControls.name) {
      formControls.name = {
        value: '',
        type: 'name',
        label: 'Имя (не менее 3 символов)'
      }
      formControls.password.label = 'Пароль (не менее 6 символов)'
    } else {
      delete (formControls.name)
      formControls.password.label = 'Пароль'
    }

    this.props.setAuthPage(!this.state.authPage)

    this.setState({
      formControls: formControls,
      authPage: !this.state.authPage
    }, function () { 
      this.validation()
    })
  }

  renderForm() {
    return (
      this.props.loading  
        ? <Loader />
        : <form 
            onSubmit={this.submitHandler} 
            className={classes.AuthForm}
          > 
            {this.renderInputs()}
            <div className={classes.tierline }>
              {this.state.tierline}
            </div>
            <div style={{ marginBottom: '6px' }}>
              <Button 
                text={
                  this.state.authPage
                    ? 'Войти'
                    : 'Регистрация'
                }
                onClick={
                  this.state.authPage
                    ? this.loginHandler
                    : this.registerHandler
                }
                disabled={!this.state.isFormValid}
              /> 
            </div>
            <hr style={{ marginBottom: '10px' }}/>
            <div>
              <Button 
                text={this.state.authPage
                        ? 'Регистрация'
                        : 'Войти'
                }
                onClick={this.authRegHandler.bind(this)}
              />
            </div>
      </form>
    )
  }

  render() {
    return (
      <div className={classes.Auth}>
        {this.renderForm()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userID: state.auth.userID,
    loading: state.loading.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin, name) => dispatch(actionAuth(email, password, isLogin, name)),
    setCurrentUser: (id, name) => dispatch(actionSetCurrentUser(id, name)),
    setAuthPage: (boolean) => dispatch(actionSetAuthPage(boolean)),
    switchLoading: (boolean) => dispatch(actionSwitchLoading(boolean))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
