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
    const colOne = props.mobile ? classes.colOneMobile : classes.colOne
    const colTwo = props.mobile ? classes.colTwoMobile : classes.colTwo
    const colThree = props.mobile ? classes.colThreeMobile : classes.colThree
    const link = !string ? null : (
      <NavLink to={'/calendar'} onClick={() => otherUserHandler(string.id, string.name)}>
        {string.name}
      </NavLink>
    )

    return (
      <tr key={index} className={lightgrey ? classes.RowLightGrey : classes.RowGrey }>
        <th className={colOne}>{!string ? '#' : string.place}</th>
        <th className={colTwo}>{!string ? 'Игрок' : link}</th>
        <th className={colThree}>{!string ? 'Верно' : string.correctAnswers}</th>
        <th className={colThree}>{!string ? 'Всего' : string.totalAnswers}</th>
        <th className={colThree}>{!string ? '%' : string.percentage}</th>
      </tr>
    )
  }

  return (
    <div>
      {props.localId ? (
        <div className={classes.ClickNotify}>
          Выберите игрока, чтобы увидеть его прогнозы
        </div>
      ) : null}
      <table className={props.mobile ? classes.TableMobile : classes.Table}>
        <tbody>{renderString()}</tbody>
      </table>   
      <hr className={props.mobile ? classes.LineMobile : classes.Line} />

      {props.loading ? (
        <Loader />
      ) : (
        <table className={props.mobile ? classes.MarginBottomMobile : classes.MarginBottom}>
          <tbody>
            {props.standings
              ? Object.keys(props.standings).map((el, index) =>
                  renderString(props.standings[el], index)
                )
              : null}
          </tbody>
        </table>
      )}

      {props.isAdmin ? (
        <Button width={props.mobile ? '351px' : '144px'} onClick={() => submitHandler()} text="Пересчитать" />
      ) : null}
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
