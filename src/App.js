import React, { Component } from 'react'
import AppRoutes from './Components/Routes/Routes'
import InitState from './Components/InitState/InitState'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'
import { connect } from 'react-redux'
import { actionSetView } from './redux/actions/viewActions'


class App extends Component {
  componentDidMount() {
    this.props.setView(isMobile)
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
    setView: (boolean) => dispatch(actionSetView(boolean))
  }
}

export default connect(null, mapDispatchToProps)(App)
