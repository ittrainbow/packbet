import React from 'react'
import { connect } from 'react-redux'
import classes from './WeekEditor.module.scss'
import WeekCreator from '../WeekCreator/WeekCreator'

const WeekEditor = (props) => {
  return (
    <div className={props.mobile ? classes.WeekEditorMobile : classes.WeekEditor}>
      <h3>Редактирование недели</h3>
      <div>
        <WeekCreator />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

export default connect(mapStateToProps, null)(WeekEditor)
