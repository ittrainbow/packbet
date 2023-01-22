import React, { Component } from 'react'

import classes from './Auth.module.scss'
import { Button, Input, Loader } from '../../UI'
import { validateEmail } from '../../frame/validateEmail'
import { connect } from 'react-redux'
import { actionAuth, actionSetAuthPage } from '../../redux/actions/authActions'
import { actionSwitchLoading, actionSetMessage } from '../../redux/actions/loadingActions'
import axios from '../../axios/axios'
import { findName } from '../../frame/findUser'

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
        label: 'Пароль',
        placeholder: 'Не менее 6 символов'
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
    this.props.setMessage(message)
    this.props.switchLoading(false)
    setTimeout(() => this.props.setMessage(''), 3000)
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
          placeholder={control.placeholder}
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
      this.props.setMessage('')
      this.props.auth(email, password, false, name)
    }
    if (!validateEmail(email)) this.tierline('Используйте валидный Email')
    if (!pwdMatch) this.tierline('Пароли не совпадают')
    if (nameExists) this.tierline('Используйте другое имя пользователя')
    if (password.length < 6) this.tierline('Используйте пароль не менее 6 символов')
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
        label: 'Повторите пароль',
        placeholder: 'Не менее 6 символов'
      }
      formControls.name = {
        value: '',
        type: 'name',
        label: 'Имя пользователя',
        placeholder: 'Не менее 3 символов'
      }
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
      <form
        onSubmit={this.submitHandler}
        className={this.props.mobile ? classes.AuthFormMobile : classes.AuthForm}
      >
        {this.renderInputs()}
        <div className={classes.message}>{this.props.message}</div>
        <div className={classes.tierline}>{this.state.tierline}</div>
        <Button
          text={this.state.authPage ? 'Войти' : 'Регистрация'}
          onClick={this.state.authPage ? this.loginHandler : this.registerHandler}
          disabled={!this.state.isFormValid}
        />
        <Button
          text={this.state.authPage ? 'Регистрация' : 'Войти'}
          onClick={this.authRegHandler.bind(this)}
        />
      </form>
    )
  }

  render() {
    return <div className={classes.Auth}> {this.renderForm()} </div>
  }
}

function mapStateToProps(state) {
  return {
    localId: state.auth.localId,
    loading: state.loading.loading,
    message: state.loading.message,
    mobile: state.view.mobile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin, name) => dispatch(actionAuth(email, password, isLogin, name)),
    setAuthPage: (boolean) => dispatch(actionSetAuthPage(boolean)),
    switchLoading: (boolean) => dispatch(actionSwitchLoading(boolean)),
    setMessage: (text) => dispatch(actionSetMessage(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
