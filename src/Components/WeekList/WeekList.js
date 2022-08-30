import React from 'react'
import classes from './WeekList.module.scss'
import { NavLink } from 'react-router-dom'
import Loader from '../../UI/Loader/Loader'

import { connect } from 'react-redux'
import { actionWeekId } from '../../redux/actions/weekActions'
import { 
  setEditorCurrentWeek,
  setEditorCurrentName,
  setEditorQuestions
} from '../../redux/actions/editorActions'

const WeekList = (props) => {

  function setState(id) {
    const week = props.weeks[id]
    props.setWeekId(id)
    props.setCurrentWeek(id)
    props.setCurrentName(week.name)
    props.setQuestions(week.questions)
  }

  function renderWeeks() {
    if (props.weeks) {
      return props.weeks.map((week) => {
        return (
          <li
            key={week.id}
            className={classes.Weeks}
          >
            { props.editorStatus === 'editor' 
              ? <NavLink 
                  onClick={() => setState(week.id)} 
                  to={'/weekeditor/' + week.id}
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
    setWeekId: (id) => dispatch(actionWeekId(id)),
    setCurrentWeek: (currentWeek) => dispatch(setEditorCurrentWeek(currentWeek)),
    setCurrentName: (currentName) => dispatch(setEditorCurrentName(currentName)),
    setQuestions: (questions) => dispatch(setEditorQuestions(questions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekList)
