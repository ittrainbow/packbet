import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import './Table.css'
import axios from '../../axios/axios'
import { Button, Loader } from '../../UI'
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
    const colOne = props.mobile ? "colOneMobile" : "colOne"
    const colTwo = props.mobile ? "colTwoMobile" : "colTwo"
    const colThree = props.mobile ? 'colThreeMobile' : "colThree"
    const colFour = props.mobile ? "colFourMobile" : "colFour"
    const colFive = props.mobile ? "colFiveMobile" : "colFive"
    const link = !string ? null : (
      <NavLink to={'/calendar'} onClick={() => otherUserHandler(string.id, string.name)}>
        {string.name}
      </NavLink>
    )

    return (
      <tr key={index} className={lightgrey ? "RowLightGrey" : "RowGrey"}>
        <th className={colOne}>{!string ? '#' : string.place}</th>

        <th className={colTwo}>{!string ? 'Игрок' : link}</th>

        <th className={colThree}>
          {string ? (
            string.correctAnswers + ' / ' + string.totalAnswers
          ) : (
            <div className={!props.mobile ? "headerMargins" : "headerMarginsMobile"}>
              Всего
            </div>
          )}
        </th>

        <th className={colFour}>
          {string ? (
            string.percentage
          ) : (
            <div className={!props.mobile ? "headerMargins" : "headerMarginsMobile"}>
              Точно
            </div>
          )}
        </th>

        <th className={colFive}>
          {string ? (
            (string.ninety * 100).toFixed(0) + '%'
          ) : (
            <div className={!props.mobile ? "ninetyMargin" : "headerMarginsMobile"}>
              90%
            </div>
          )}
        </th>
      </tr>
    )
  }

  return (
    <div>
      {props.localId ? (
        <div className="ClickNotify">Выберите игрока, чтобы увидеть его прогнозы</div>
      ) : null}
      <table className={props.mobile ? "TableMobile" : "Table"}>
        <tbody>{renderString()}</tbody>
      </table>
      <hr className={props.mobile ? "LineMobile" : "Line"} />

      {props.loading ? (
        <Loader />
      ) : (
        <table className={props.mobile ? "MarginBottomMobile" : "MarginBottom"}>
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
        <Button
          width={props.mobile ? '351px' : '144px'}
          onClick={() => submitHandler()}
          text="Пересчитать"
        />
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
