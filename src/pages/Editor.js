import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actionSetEditorStatus } from '../redux/actions/weekActions'
import WeekList from '../Components/WeekList/WeekList'
import classes from '../pages/Pages.module.scss'
import { actionSetHeight } from '../redux/actions/viewActions'

class Editor extends Component {
  componentDidMount() {
    if (!this.props.mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      this.props.setHeight(height)
    }
    this.props.setEditorStatus('editor')
  }

  render() {
    return (
      <div
        id="container"
        className={this.props.mobile ? classes.ContainerMobileLeft : classes.ContainerLeft}
      >
        <h3 className={classes.ContainerMobileMod}>Редактор</h3>
        <WeekList />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setEditorStatus: (status) => dispatch(actionSetEditorStatus(status)),
    setHeight: (height) => dispatch(actionSetHeight(height))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
