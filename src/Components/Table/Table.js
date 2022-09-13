import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import classes from './Table.module.scss'
import axios from '../../axios/axios'
import Button from '../../UI/Button/Button'
import Loader from '../../UI/Loader/Loader'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'
import {
  actionGetOtherName,
  actionGetOtherUsers,
  actionSwitchYourself,
  actionCleanOtherUser
} from '../../redux/actions/othersActions'
import { actionCreateStandings } from '../../redux/actions/weekActions'
import tableCreator from '../../frame/tableCreator'
import { actionSetTabActive } from '../../redux/actions/viewActions'

const Table = (props) => {
  async function submitHandler() {
    props.switchLoading(true)

    const users = await axios.get('/pack/users.json')
    const answers = await axios.get('/pack/answers.json')
    const table = tableCreator(users.data, answers)
    await axios.put('/pack/table.json', table)

    props.createStandings(table)
    props.switchLoading(false)
  }

  function otherUserHandler(id, name) {
    if (id !== props.localId) {
      props.switchYourself(false)
      props.getOtherUser(id, props.weeks)
      props.getOtherName(name)
      props.setTabActive(3)
    } else {
      props.cleanOtherUser()
    }
  }

  function renderString(string, index) {
    const lightgrey = index % 2 === 0
    const colPlc = props.mobile ? classes.colPlcMobile : classes.colPlc
    const colOne = props.mobile ? classes.colOneMobile : classes.colOne
    const colTwo = props.mobile ? classes.colTwoMobile : classes.colTwo
    const link = !string ? null : (
      <NavLink to={'/calendar'} onClick={() => otherUserHandler(string.id, string.name)}>
        {string.name}
      </NavLink>
    )

    return (
      <tr key={index} style={{ backgroundColor: lightgrey ? '#e3e3e3' : '' }}>
        <th className={colPlc}>{!string ? '#' : string.place}</th>
        <th className={colOne}>{!string ? 'Игрок' : link}</th>
        <th className={colTwo}>{!string ? 'Верно' : string.correctAnswers}</th>
        <th className={colTwo}>{!string ? 'Всего' : string.totalAnswers}</th>
        <th className={colTwo}>{!string ? '%' : string.percentage}</th>
      </tr>
    )
  }

  return (
    <div>
      {props.localId ? (
        <div className={props.mobile ? classes.ClickNotifyMobile : classes.ClickNotify}>
          Выберите игрока, чтобы увидеть его прогнозы
        </div>
      ) : null}
      <table className={props.mobile ? classes.TableMobile : classes.Table}>
        <tbody>{renderString()}</tbody>
      </table>
      <hr style={{ width: props.mobile ? '350px' : '420px' }} />

      {props.loading 
        ? <Loader />
        : <table>
            <tbody>
              {props.standings
                ? Object.keys(props.standings)
                  .map((el, index) =>
                    renderString(props.standings[el], index)
                  )
                : null}
            </tbody>
          </table>
      }

      {props.isAdmin 
        ? <Button width={'350px'} onClick={() => submitHandler()} text="Пересчитать" />
        : null}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    localId: state.auth.localId,
    weeks: state.week.weeks,
    isAdmin: state.auth.isAdmin,
    loading: state.loading.loading,
    standings: state.week.standings,
    mobile: state.view.mobile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getOtherName: (name) => dispatch(actionGetOtherName(name)),
    switchLoading: (status) => dispatch(actionSwitchLoading(status)),
    switchYourself: (status) => dispatch(actionSwitchYourself(status)),
    getOtherUser: (id, state) => dispatch(actionGetOtherUsers(id, state)),
    cleanOtherUser: () => dispatch(actionCleanOtherUser()),
    createStandings: (standings) => dispatch(actionCreateStandings(standings)),
    setTabActive: (index) => dispatch(actionSetTabActive(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
