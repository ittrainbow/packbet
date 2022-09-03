import React, { Component } from 'react'
import { connect } from 'react-redux/es/exports'
import Auth from '../Components/Auth/Auth'
import Userpage from '../Components/Userpage/Userpage'
import classes from './Pages.module.scss'

class Profile extends Component {

  renderPage() {
    if (this.props.isAuthenticated) {
      return (
        <Userpage />
      )
    } else {
      return (
        <Auth />
      )
    }
  }

  renderHeader() {
    if (this.props.isAuthenticated) {
      return 'Профиль'
    } else if (this.props.authPage) {
      return 'Войти'
    } else {
      return 'Регистрация'
    }
  }

  render() {
    return (
      <div className={classes.Container}>
        <h3>{ this.renderHeader() }</h3>
        { this.renderPage() }  
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token,
    authPage: state.auth.authPage
  }
}

export default connect(mapStateToProps, null)(Profile)