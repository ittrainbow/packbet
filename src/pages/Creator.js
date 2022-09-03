import React, { Component } from 'react'
import WeekCreator from '../Components/WeekCreator/WeekCreator'
import classes from './Pages.module.scss'
import { 
  actionClearEditor,
  actionSetEditorCurrentWeek 
} from '../redux/actions/editorActions'
import { connect } from 'react-redux'

class Creator extends Component {
  componentDidMount() {
    this.props.clearEditor()
    this.props.setCurrentWeek(this.props.weeks)
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
    setCurrentWeek: (weeks) => dispatch(actionSetEditorCurrentWeek(weeks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator)
