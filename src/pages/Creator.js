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

class Creator extends Component {
  componentDidMount() {
    this.props.clearEditor()

    const getDate = new Date()
    const date = getDate.toISOString().split('T').join(' ').substring(0, 16)
    const id = getLastWeekNumber(this.props.weeks) + 1

    this.props.setCurrentDeadline(date)
    this.props.setCurrentWeekId(id)
  }

  render() {
    return (
      <div className={classes.Container}>
        <h3>Создание недели</h3>
        <WeekCreator />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearEditor: () => dispatch(actionClearEditor()),
    setCurrentWeek: (weeks) => dispatch(actionSetEditorCurrentWeek(weeks)),
    setCurrentWeekId: (id) => dispatch(actionSetCurrentWeekId(id)),
    setCurrentDeadline: (deadline) => dispatch(actionSetEditorCurrentDeadline(deadline))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator)
