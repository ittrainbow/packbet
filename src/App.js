import React, { Component } from 'react'
import AppRoutes from './Components/Routes/Routes'
import InitState from './Components/InitState/InitState'
import { isMobile } from 'react-device-detect'
import { connect } from 'react-redux'
import { actionSetView } from './redux/actions/viewActions'
import { actionAutoLogin } from './redux/actions/authActions'


class App extends Component {
  componentDidMount() {
    this.props.setView(isMobile)
    // this.props.autoLogin()
  }

  render() {
    return (
      <>
        <AppRoutes />
        <InitState />
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setView: (boolean) => dispatch(actionSetView(boolean)),
    autoLogin: () => dispatch(actionAutoLogin())
  }
}

export default connect(null, mapDispatchToProps)(App)
