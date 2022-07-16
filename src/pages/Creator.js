import React, { Component } from 'react'
import { connect } from 'react-redux'

import WeekCreator from '../Components/WeekCreator/WeekCreator'
import classes from './Pages.module.scss'
import {
  actionClearEditor,
  actionSetEditorCurrentWeek,
  actionSetCurrentWeekId,
  actionSetEditorCurrentDeadline
} from '../redux/actions/editorActions'
import { getLastWeekNumber } from '../frame/getLastWeek'
import { actionSetHeight } from '../redux/actions/viewActions'

class Creator extends Component {
  componentDidMount() {
    const getDate = new Date()
    const date = getDate.toISOString().split('T').join(' ').substring(0, 16)
    const id = getLastWeekNumber(this.props.weeks) + 1

    if (!this.props.mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      this.props.setHeight(height)
    }
    this.props.clearEditor()
    this.props.setCurrentDeadline(date)
    this.props.setCurrentWeekId(id)
  }

  render() {
    return (
      <div
        id="container"
        className={this.props.mobile ? classes.ContainerMobile : classes.Container}
      >
        <h3>Создание недели</h3>
        <WeekCreator />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks,
    mobile: state.view.mobile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearEditor: () => dispatch(actionClearEditor()),
    setCurrentWeek: (weeks) => dispatch(actionSetEditorCurrentWeek(weeks)),
    setCurrentWeekId: (id) => dispatch(actionSetCurrentWeekId(id)),
    setCurrentDeadline: (deadline) => dispatch(actionSetEditorCurrentDeadline(deadline)),
    setHeight: (height) => dispatch(actionSetHeight(height))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator)
