import React from 'react'
import classes from './WeekList.module.scss'
import { NavLink, Link } from 'react-router-dom'
import Loader from '../../UI/Loader/Loader'

import { connect } from 'react-redux'
import { 
  actionSetEditorCurrentWeek,
  actionSetEditorCurrentName,
  actionSetEditorCurrentDeadline,
  actionSetEditorCurrentHash,
  actionSetEditorQuestions,
  actionSetCurrentWeekId
} from '../../redux/actions/editorActions'
import { actionWeekId } from '../../redux/actions/weekActions'

const WeekList = (props) => {

  function setEditorState(id) {
    const week = props.weeks[id]
    props.setCurrentWeek(week.number)
    props.setCurrentName(week.name)
    props.setQuestions(week.questions)
    props.setCurrentDeadline(week.deadline)
    props.setCurrentHash(week.hash)
    props.setCurrentWeekId(week.id)
  }

  function setWeekId(id) {
    props.weekId(id)
  }

  function renderWeeks() {
    if (props.weeks) {
      return props.weeks.map((week) => {
        return (
          <div
            key={week.id}
          >
            { props.editorStatus === 'editor' 
              ? <NavLink 
                  onClick={() => setEditorState(week.id)} 
                  to={'/create/' + week.id}
                >
                  <li className={classes.Weeks}>
                    #{week.number}: {week.name}
                  </li>
                </NavLink>
              : <Link 
                  onClick={() => setWeekId(week.id)}
                  to={'/week/' + week.id}
                >
                  <li className={classes.Weeks}>
                    #{week.number}: {week.name}
                  </li>
                </Link>
            }
          </div>
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
    weekId: (id) => dispatch(actionWeekId(id)),

    setCurrentWeek: (currentWeek) => dispatch(actionSetEditorCurrentWeek(currentWeek)),
    setCurrentName: (currentName) => dispatch(actionSetEditorCurrentName(currentName)),
    setQuestions: (questions) => dispatch(actionSetEditorQuestions(questions)),
    setCurrentDeadline: (currentDeadline) => dispatch(actionSetEditorCurrentDeadline(currentDeadline)),
    setCurrentHash: (currentHash) => dispatch(actionSetEditorCurrentHash(currentHash)),
    setCurrentWeekId: (weekId) => dispatch(actionSetCurrentWeekId(weekId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekList)
