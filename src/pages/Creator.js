import React from 'react'
import WeekCreator from '../Components/WeekCreator/WeekCreator'
import classes from './Pages.module.scss'
import { 
  actionSetEditorCurrentName, 
  actionSetEditorQuestions,
  actionSetEditorCurrentWeek,
  actionSetEditorCurrentDeadline
} from '../redux/actions/editorActions'
import { connect } from 'react-redux'

const Creator = (props) => {


  return (
    <div className={classes.Container}>
      <h3>Создание недели</h3>
      <WeekCreator />
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentName: () => dispatch(actionSetEditorCurrentName(null)),
    setQuestions: () => dispatch(actionSetEditorQuestions([])),
    setCurrentWeek: () => dispatch(actionSetEditorCurrentWeek(null)),
    setCurrentDeadline: () => dispatch(actionSetEditorCurrentDeadline(''))
  }
}

export default connect(null, mapDispatchToProps)(Creator)
