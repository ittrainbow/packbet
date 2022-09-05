import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './WeekList.module.scss'
import Loader from '../../UI/Loader/Loader'
import { actionSetEditorFromWeekList } from '../../redux/actions/editorActions'
import { actionSetRender, actionSetRenderButtons } from '../../redux/actions/renderActions'
import { setState } from '../../frame/setState'

const WeekList = (props) => {
  function setWeekId(id) {
    const week = Object.keys(props.weeks)
      .filter((el) => props.weeks[el].id === id)
      .map((el) => props.weeks[el])
    const tmp = setState(id, props.auth.buttonState, props.auth.answerState)

    props.setRender(week[0])
    props.setRenderButtons(tmp)
  }

  function renderWeeks() {
    if (props.weeks) {
      const weeks = Object.keys(props.weeks).map((el) => props.weeks[el])
      return weeks.map((week) => {
        return (
          <div key={week.id}>
            {props.editorStatus === 'editor' ? (
              <NavLink
                onClick={() => props.setEditorFromWeekList(props.weeks[week.id])}
                to={'/create/' + week.id}
              >
                <li className={classes.Weeks}>
                  {' '}
                  #{week.number}: {week.name}{' '}
                </li>
              </NavLink>
            ) : (
              <NavLink onClick={() => setWeekId(week.id)} to={'/week/' + week.id}>
                <li className={classes.Weeks}>
                  {' '}
                  #{week.number}: {week.name}{' '}
                </li>
              </NavLink>
            )}
          </div>
        )
      })
    } else return <Loader />
  }

  return <div className={classes.WeekList}>{renderWeeks()}</div>
}

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks,
    editorStatus: state.week.editorStatus,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setRender: (week) => dispatch(actionSetRender(week)),
    setRenderButtons: (data) => dispatch(actionSetRenderButtons(data)),
    setEditorFromWeekList: (week) => dispatch(actionSetEditorFromWeekList(week))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekList)
