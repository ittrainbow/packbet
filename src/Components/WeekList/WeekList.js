import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './WeekList.module.scss'
import Loader from '../../UI/Loader/Loader'
import OtherUser from '../../UI/OtherUser/OtherUser'

import { actionSetWeekId } from '../../redux/actions/weekActions'
import { actionSetEditorFromWeekList } from '../../redux/actions/editorActions'
import { actionSetRender } from '../../redux/actions/renderActions'
import { actionCleanOtherUser } from '../../redux/actions/othersActions'

const WeekList = (props) => {
  function weekSelectorHandler(id) {
    const week = Object.keys(props.weeks)
      .filter((el) => props.weeks[el].id === id)
      .map((el) => props.weeks[el])
      
    props.setWeekId(id)
    props.setRender(week[0])
  }

  function renderWeeks() {
    if (props.weeks) {
      let weeks = Object.keys(props.weeks)
        .map((el) => props.weeks[el])

      if (props.editorStatus !== 'editor') weeks = weeks.filter((el) => el.activity)

      return weeks.map((week) => {
        return (
          <div key={week.id}>
            {props.editorStatus === 'editor' ? (
              <NavLink
                onClick={() => props.setEditorFromWeekList(props.weeks[week.id])}
                to={'/create/' + week.id}
              >
                <li className={props.mobile ? classes.WeeksMobile : classes.Weeks}>
                  {' '}
                  #{week.number}: {week.name}{' '}
                </li>
              </NavLink>
            ) : (
              <NavLink onClick={() => weekSelectorHandler(week.id)} to={'/week/' + week.id}>
                <li className={props.mobile ? classes.WeeksMobile : classes.Weeks}>
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

  return (
    <div className={props.mobile 
      ? classes.WeekListMobile 
      : props.editorStatus !== 'results' 
        ? classes.WeekListMargin 
        : classes.WeekList
    }>
      <div className={props.mobile ? classes.MarginLeft : null}><OtherUser/></div>
      <div className={classes.MarginBottom}>{renderWeeks()}</div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks,
    editorStatus: state.week.editorStatus,
    auth: state.auth,
    others: state.others,
    mobile: state.view.mobile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setWeekId: (id) => dispatch(actionSetWeekId(id)),
    setRender: (week) => dispatch(actionSetRender(week)),
    cleanOtherUser: () => dispatch(actionCleanOtherUser()),
    setEditorFromWeekList: (week) => dispatch(actionSetEditorFromWeekList(week))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekList)
