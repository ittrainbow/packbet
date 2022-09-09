import React, { Component } from 'react'

import classes from './Auth.module.scss'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import './Auth.module.scss'
import { validateEmail } from '../../frame/validateEmail'
import { connect } from 'react-redux'
import {
  actionAuth,
  actionSetAuthPage
} from '../../redux/actions/authActions'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'
import axios from '../../axios/axios'
import { findName } from '../../frame/findUser'
import Loader from '../../UI/Loader/Loader'

class Auth extends Component {
  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email'
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль'
      }
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

      this.setState(
        {
          formControls,
          isFormValid: true
        },
        function () {
          this.validation()
        }
      )
    }
  }

  tierline(message) {
    setTimeout(() => {
      this.setState({
        tierline: message
      })
    })

    setTimeout(() => {
      this.setState({
        tierline: ''
      })
    }, 3000)
  }

  onChangeHandler = (event, controlName) => {
    const formControls = JSON.parse(JSON.stringify(this.state.formControls))
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    formControls[controlName] = control

    this.setState(
      {
        formControls: formControls
      },
      function () {
        this.validation()
      }
    )
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
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

    if (this.state.isFormValid) {
      try {
        await this.props.auth(
          this.state.formControls.email.value,
          this.state.formControls.password.value,
          true
        )
      } catch (error) {
        this.tierline('Проверьте email и пароль')
      }
    } else {
      this.tierline('Неверный Email')
    }

    this.props.switchLoading(false)
  }

  registerHandler = async () => {
    this.props.switchLoading(true)

    const email = this.state.formControls.email.value
    const name = this.state.formControls.name.value
    const password = this.state.formControls.password.value
    const pwdValid = password.length > 5 && password === this.state.formControls.confirm.value
    const pwdMatch = password === this.state.formControls.confirm.value

    const registeredUsers = await axios.get('pack/users.json')
    const nameExists = registeredUsers.data ? findName(registeredUsers.data, name).length : false

    if (!nameExists && name.length > 2 && validateEmail(email) && pwdValid && pwdMatch) {
      this.tierline('')
      this.props.auth(email, password, false, name)
    }
    if (!validateEmail(email)) {
      this.tierline('Используйте валидный Email')
      this.props.switchLoading(false)
    }
    if (!pwdMatch) {
      this.tierline('Пароли не совпадают')
      this.props.switchLoading(false)
    }
    if (nameExists) {
      this.tierline('Используйте другое имя пользователя')
      this.props.switchLoading(false)
    }
    if (password.length < 6) {
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
    const name = this.state.authPage ? true : this.state.formControls.name.value.length > 2

    this.setState({
      isFormValid: email && password && name
    })
  }

  authRegHandler() {
    const formControls = { ...this.state.formControls }

    if (!formControls.name) {
      formControls.confirm = {
        value: '',
        type: 'password',
        label: 'Повторите пароль'
      }
      formControls.name = {
        value: '',
        type: 'name',
        label: 'Имя (не менее 3 символов)'
      }
      formControls.password.label = 'Пароль (не менее 6 символов)'
    } else {
      delete formControls.name
      delete formControls.confirm
      formControls.password.label = 'Пароль'
    }

    this.props.setAuthPage(!this.state.authPage)

    this.setState(
      {
        formControls: formControls,
        authPage: !this.state.authPage
      },
      function () {
        this.validation()
      }
    )
  }

  renderForm() {
    return this.props.loading ? (
      <Loader />
    ) : (
      <form onSubmit={this.submitHandler} className={classes.AuthForm}>

        {this.renderInputs()}
        <div className={classes.message}>
          {this.props.message}
        </div>
        <div className={classes.tierline}>{this.state.tierline}</div>
        <div style={{ marginBottom: '6px' }}>
          <Button
            text={this.state.authPage ? 'Войти' : 'Регистрация'}
            onClick={this.state.authPage ? this.loginHandler : this.registerHandler}
            disabled={!this.state.isFormValid}
          />
        </div>
        <hr style={{ marginBottom: '10px' }} />
        <div>
          <Button
            text={this.state.authPage ? 'Регистрация' : 'Войти'}
            onClick={this.authRegHandler.bind(this)}
          />
        </div>
      </form>
    )
  }

  render() {
    return <div className={classes.Auth}>{this.renderForm()}</div>
  }
}

function mapStateToProps(state) {
  return {
    localId: state.auth.localId,
    loading: state.loading.loading,
    message: state.loading.message
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin, name) => dispatch(actionAuth(email, password, isLogin, name)),
    setAuthPage: (boolean) => dispatch(actionSetAuthPage(boolean)),
    switchLoading: (boolean) => dispatch(actionSwitchLoading(boolean))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
