import React, { Component } from 'react'
import Button from '../../UI/Button/Button'
import classes from './Userpage.module.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { connect } from 'react-redux/es/exports'
import { actionLogout } from '../../redux/actions/authActions'
import { actionCleanOtherUser, actionSwitchYourself } from '../../redux/actions/othersActions'

class Userpage extends Component {
  state = {
    showPassword: false
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

    return this.state.showPassword
      ? password
      : stars
  }

  stateHandler() {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  logoutHandler() {
    this.props.logout()
  }

  render() {
    return (
      <div className={classes.Userpage}>
        <div style={{marginBottom: '20px'}}>
          Имя: { this.props.userName }
        </div>        
        <div style={{marginBottom: '20px'}}>
          Пароль: <i className='fa fa-eye' onClick={() => this.stateHandler()} style={{cursor: 'pointer'}}/>
          {' '}
          { this.passwordHandler() }
        </div>
        <div>
          <Button 
            text='Logout'
            onClick={this.logoutHandler.bind(this)}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userName: state.auth.userName,
    isItYou: state.others.isItYou
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
