import React, { Component } from 'react'
import Button from '../../UI/Button/Button'
import classes from './Userpage.module.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux/es/exports'
import { actionLogout } from '../../redux/actions/authActions'
import { actionCleanOtherUser, actionSwitchYourself } from '../../redux/actions/othersActions'

class Userpage extends Component {
  state = {
    showPassword: false,
    showEmail: false
  }

  componentDidMount() {
    if (!this.props.isItYou) {
      this.props.cleanOtherUser()
      this.props.switchYourself(true)
    }
  }

  passwordHandler() {
    const password = localStorage.getItem('password')
    const stars = '*'.repeat(password.length)

    return this.state.showPassword ? password : stars
  }

  emailHandler() {
    const email = localStorage.getItem('email')
    const stars = '*'.repeat(email.length)

    return this.state.showEmail ? email : stars
  }

  passwordToggleHandler() {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  emailToggleHandler() {
    this.setState({
      showEmail: !this.state.showEmail
    })
  }

  logoutHandler() {
    this.props.logout()
  }

  render() {
    return (
      <div className={classes.Userpage}>
        <div className={classes.UserDiv}>Имя: {this.props.userName}</div>
        <div className={classes.UserDiv}>
          Email:{' '}
          <i
            className="fa fa-eye"
            onClick={() => this.emailToggleHandler()}
            style={{ cursor: 'pointer' }}
          />{' '}
          {this.emailHandler()}
        </div>
        <div className={classes.UserDiv}>
          Пароль:{' '}
          <i
            className="fa fa-eye"
            onClick={() => this.passwordToggleHandler()}
            style={{ cursor: 'pointer' }}
          />{' '}
          {this.passwordHandler()}
        </div>
        <div className={classes.UserDiv}>{this.props.isAdmin ? 'Вы - администратор' : null}</div>
        <div>
          <Button text="Выйти" onClick={this.logoutHandler.bind(this)} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userName: state.auth.userName,
    isItYou: state.others.isItYou,
    isAdmin: state.auth.isAdmin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(actionLogout()),
    switchYourself: (status) => dispatch(actionSwitchYourself(status)),
    cleanOtherUser: () => dispatch(actionCleanOtherUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userpage)
