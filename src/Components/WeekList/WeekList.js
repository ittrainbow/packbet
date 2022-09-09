import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './WeekList.module.scss'
import Loader from '../../UI/Loader/Loader'

import { actionSetWeekId } from '../../redux/actions/weekActions'
import { actionSetEditorFromWeekList } from '../../redux/actions/editorActions'
import { actionSetRender, actionSetRenderButtons } from '../../redux/actions/renderActions'
import { setState } from '../../frame/setState'
import { actionCleanOtherUser } from '../../redux/actions/othersActions'

const WeekList = (props) => {
  function weekSelectorHandler(id) {
    const week = Object.keys(props.weeks)
      .filter((el) => props.weeks[el].id === id)
      .map((el) => props.weeks[el])
    const tmp = setState(id, props.auth.buttonState, props.auth.answerState)

    props.setWeekId(id)
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
              <NavLink onClick={() => weekSelectorHandler(week.id)} to={'/week/' + week.id}>
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

  function renderOthersName() {
    let notify = []
    if (!props.others.isItYou) {
      notify.push(`Вы просматриваете ответы ${props.others.name}`)
      notify.push(`Вернуться к своим ответам`)
    }

    return notify.map(function (el, index) {
      if (index === notify.length - 1)
        return <div key={index} className={classes.BackLink} onClick={() => props.cleanOtherUser()}>{el}</div>
      return <div key={index} className={classes.OtherUser}>{el}</div>
    })
  }

  return (
    <div className={classes.WeekList}>
      <div style={{marginBottom: '10px'}}>{renderOthersName()}</div>
      <div>{renderWeeks()}</div>
      <hr style={{ width: '440px', visibility: 'hidden'}} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks,
    editorStatus: state.week.editorStatus,
    auth: state.auth,
    others: state.others
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setWeekId: (id) => dispatch(actionSetWeekId(id)),
    setRender: (week) => dispatch(actionSetRender(week)),
    setRenderButtons: (data) => dispatch(actionSetRenderButtons(data)),
    cleanOtherUser: () => dispatch(actionCleanOtherUser()),
    setEditorFromWeekList: (week) => dispatch(actionSetEditorFromWeekList(week))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekList)
