import React from 'react'
import WeekCreator from '../Components/WeekCreator/WeekCreator'
import classes from './Pages.module.scss'
import { actionClearEditor } from '../redux/actions/editorActions'
import { connect } from 'react-redux'

const Creator = (props) => {
  props.clearEditor()

  return (
    <div className={classes.Container}>
      <h3>Создание недели</h3>
      <WeekCreator />
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    clearEditor: () => dispatch(actionClearEditor())
  }
}

export default connect(null, mapDispatchToProps)(Creator)
