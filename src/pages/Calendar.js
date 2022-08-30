import React, { Component } from 'react'
import { connect } from 'react-redux'

import WeekList from '../Components/WeekList/WeekList'
import classes from './Pages.module.scss'
import { setEditorStatus } from '../redux/actions/weekActions'

class Calendar extends Component {

  componentDidMount() {
    this.props.setEditorStatus('results')
  }

  render() {
    return (
      <div className={classes.Container}>
        <h3>Календарь</h3>
        <WeekList />
      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return {
    setEditorStatus: (status) => dispatch(setEditorStatus(status))
  }
}

export default connect(null, mapDispatchToProps)(Calendar)