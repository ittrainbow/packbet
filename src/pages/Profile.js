import React, { Component } from 'react'
import { connect } from 'react-redux/es/exports'
import { NavLink } from 'react-router-dom'
import Auth from '../Components/Auth/Auth'
import Userpage from '../Components/Userpage/Userpage'
import classes from './Pages.module.scss'
import Button from '../UI/Button/Button'
import { actionSetHeight } from '../redux/actions/viewActions'

class Profile extends Component {
  componentDidMount() {
    if (!this.props.mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      this.props.setHeight(height)
    }
  }

  componentDidUpdate() {
    if (!this.props.mobile) {
      const height = document.documentElement.scrollHeight
      this.props.setHeight(height)
    }
  }

  renderPage() {
    if (this.props.isAuthenticated) return <Userpage />

    return <Auth />
  }

  renderHeader() {
    if (this.props.isAuthenticated) return 'Профиль'
    if (this.props.authPage) return 'Войти'

    return 'Регистрация'
  }

  drawRecoveryButton() {
    return (
      <div>
        <NavLink to={'/recover'}>
          <Button text="Забыли пароль?" />
        </NavLink>
      </div>
    )
  }

  render() {
    return (
      <div
        id="container"
        className={this.props.mobile ? classes.ContainerMobile : classes.Container}
      >
        <h3>{this.renderHeader()}</h3>
        {this.renderPage()}
        {this.props.isAuthenticated ? null : this.drawRecoveryButton()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token,
    authPage: state.auth.authPage,
    mobile: state.view.mobile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setHeight: (height) => dispatch(actionSetHeight(height))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
