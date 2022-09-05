import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionLogout } from '../../redux/actions/authActions'

class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(actionLogout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
