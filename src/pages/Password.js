import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './Pages.module.scss'
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword'
import { actionSetHeight } from '../redux/actions/viewActions'

class Password extends Component {
  componentDidMount() {
    if (!this.props.mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      this.props.setHeight(height)
    }
  }

  render() {
    return (
      <div
        id="container"
        className={this.props.mobile ? classes.ContainerMobile : classes.Container}
      >
        <h3>Восстановление пароля</h3>
        <ForgotPassword />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setHeight: (height) => dispatch(actionSetHeight(height))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
