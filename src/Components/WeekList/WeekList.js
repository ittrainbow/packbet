import React from 'react'
import classes from './WeekList.module.scss'
import { NavLink } from 'react-router-dom'
import Loader from '../../UI/Loader/Loader'

import { connect } from 'react-redux'
import { actionWeekId } from '../../redux/actions/weekActions'
import { 
  actionSetEditorCurrentWeek,
  actionSetEditorCurrentName,
  actionSetEditorCurrentDeadline,
  actionSetEditorQuestions
} from '../../redux/actions/editorActions'

const WeekList = (props) => {

  function setState(id) {
    // if (id === 'new') {
    //   console.log('noID')
    // } else {
    //   console.log(id)
      const week = props.weeks[id]
      console.log(week)
      // props.weekId(id)
      props.setCurrentWeek(week.number)
      props.setCurrentName(week.name)
      props.setQuestions(week.questions)
      props.setCurrentDeadline(week.deadline)
    // }
  }

  function renderWeeks() {
    if (props.weeks) {
      console.log(props.editorStatus)
      return props.weeks.map((week) => {
        return (
          <li
            key={week.id}
            className={classes.Weeks}
          >
            { props.editorStatus === 'editor' 
              ? <NavLink 
                  onClick={() => setState(week.id)} 
                  to={'/create/' + week.id}
                >
                  #{week.number}: {week.name}
                </NavLink>
              : <NavLink 
                  onClick={() => setState(week.id)}
                  to={'/week/' + week.id}
                >
                  #{week.number}: {week.name}
                </NavLink>
            }
          </li>
        )
      })
    } else {
      return (
        <Loader/>
      )
    }
  }

  return (
    <div className={classes.WeekList}>
      { renderWeeks() }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks,
    editorStatus: state.week.editorStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // weekId: (id) => dispatch(actionWeekId(id)),
    setCurrentWeek: (currentWeek) => dispatch(actionSetEditorCurrentWeek(currentWeek)),
    setCurrentName: (currentName) => dispatch(actionSetEditorCurrentName(currentName)),
    setQuestions: (questions) => dispatch(actionSetEditorQuestions(questions)),
    setCurrentDeadline: (currentDeadline) => dispatch(actionSetEditorCurrentDeadline(currentDeadline))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekList)
