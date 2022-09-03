import React, { Component } from 'react'
import { connect } from 'react-redux'

import WeekCreator from '../Components/WeekCreator/WeekCreator'
import classes from './Pages.module.scss'
import { 
  actionClearEditor,
  actionSetEditorCurrentWeek,
  actionSetEditorCurrentDeadline
} from '../redux/actions/editorActions'

class Creator extends Component {
  componentDidMount() {
    this.props.clearEditor()

    const getDate = new Date()
    const date = getDate.toISOString().split('T').join(' ').substring(0, 16)

    this.props.setCurrentDeadline(date)
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
    weeks: state.week.weeks.length
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearEditor: () => dispatch(actionClearEditor()),
    setCurrentWeek: (weeks) => dispatch(actionSetEditorCurrentWeek(weeks)),
    setCurrentDeadline: (deadline) => dispatch(actionSetEditorCurrentDeadline(deadline))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator)
