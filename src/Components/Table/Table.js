import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import classes from './Table.module.scss'
import axios from '../../axios/axios'
import Button from '../../UI/Button/Button'
import Loader from '../../UI/Loader/Loader'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'
import { actionGetOtherUsers, actionSwitchYourself } from '../../redux/actions/othersActions'
import { actionCreateStandings } from '../../redux/actions/weekActions'
import tableCreator from '../../frame/tableCreator'

const Table = (props) => {
  async function submitHandler() {
    props.switchLoading(true)

    const users = await axios.get('/pack/users.json')
    const answers = await axios.get('/pack/answers.json')
    const table = tableCreator(users, answers)

    await axios.put('/pack/table.json', table)

    props.createStandings(table)
    props.switchLoading(false)
  }

  function otherUserHandler(id) {
    props.getOtherUser(id, props.weeks)
    props.switchYourself(false)
  }

  function renderString(string) {
    if (!string) {
      return (
        <tr>
          <th className={classes.colOne}>Игрок</th>
          <th className={classes.colTwo}>Всего</th>
          <th className={classes.colTwo}>Верно</th>
          <th className={classes.colTwo}>%</th>
        </tr>
      )
    } else {
      return (
        <tr key={string.name}>
          <th className={classes.colOne}>
            <NavLink to={'/calendar'} onClick={() => otherUserHandler(string.id)}>
              {string.name}
            </NavLink>
          </th>
          <th className={classes.colTwo}>{string.totalAnswers}</th>
          <th className={classes.colTwo}>{string.correctAnswers}</th>
          <th className={classes.colTwo}>{string.percentage}</th>
        </tr>
      )
    }
  }

  return (
    <div className={classes.Table}>
      <table>
        <tbody>{renderString()}</tbody>
      </table>
      <hr />

      {props.loading ? (
        <Loader />
      ) : (
        <table>
          <tbody>
            {props.standings
              ? Object.keys(props.standings).map((el) => renderString(props.standings[el]))
              : null}
          </tbody>
        </table>
      )}

      {props.isAdmin ? (
        <div style={{ marginTop: '10px' }}>
          <Button onClick={() => submitHandler()} text="Пересчитать" />
        </div>
      ) : null}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks,
    isAdmin: state.auth.isAdmin,
    loading: state.loading.loading,
    standings: state.week.standings
  }
}
// prettier
function mapDispatchToProps(dispatch) {
  return {
    switchLoading: (status) => dispatch(actionSwitchLoading(status)),
    switchYourself: (status) => dispatch(actionSwitchYourself(status)),
    getOtherUser: (id, state) => dispatch(actionGetOtherUsers(id, state)),
    createStandings: (standings) => dispatch(actionCreateStandings(standings))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
