import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import classes from './Table.module.scss'
import axios from '../../axios/axios'
import Button from '../../UI/Button/Button'
import Loader from '../../UI/Loader/Loader'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'
import { 
  actionGetOtherUsers, 
  actionSwitchYourself 
} from '../../redux/actions/othersActions'
import { actionCreateStandings } from '../../redux/actions/weekActions'

const Table = (props) => {

  async function submitHandler() {
    props.switchLoading(true)

    const table = []

    const response = await axios.get('/pack/users.json')
    const answers = await axios.get('/pack/answers.json')
    const results = answers.data.weeks
    const data = response.data

    const users = Object.keys(data)
      .map(el => {
        data[el]['id'] = el
        return data[el]
      })
      .filter(el => el.email !== 'admin@admin.com')

    Object.keys(users).forEach(el => {
      const name = users[el].name
      const week = users[el].weeks
      const id = users[el].id

      let totalAnswers = 0
      let correctAnswers = 0

      for (let i=0; i<results.length; i++) {
        if (results[i] && week[i]) {
          for (let j=0; j<week[i].length; j++) {
            if (week[i][j] !== null) totalAnswers++
            if (results[i][j] === week[i][j]) correctAnswers++
          }
        }
      }

      const percentage = (correctAnswers / totalAnswers).toFixed(3)

      table.push({
        'name': name,
        'totalAnswers': totalAnswers,
        'correctAnswers': correctAnswers,
        'percentage': percentage,
        'id': id
      })

      function compare(a, b) {
        if (a.correctAnswers < b.correctAnswers) return 1
        if (a.correctAnswers > b.correctAnswers) return -1
        else return 0
      }
      
      table.sort(compare)
    })
    
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
          <th className={classes.colOne}>User</th>
          <th className={classes.colTwo}>Всего</th>
          <th className={classes.colTwo}>Точно</th>
          <th className={classes.colTwo}>Счет</th>
        </tr>
      )
    } else {
      return (
        <tr key={string.name}>
          <th className={classes.colOne}>
            <NavLink
              to={'/calendar'}
              onClick={() => otherUserHandler(string.id)}
            >
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
        <tbody>
          { renderString() }
        </tbody>
      </table>
      <hr/>

      { props.loading
          ? <Loader />
          : <table>
              <tbody>
                { 
                  props.standings
                    ? Object.keys(props.standings).map(el => renderString(props.standings[el]))
                    : null
                }           
              </tbody>        
            </table>  
      }
      
      { props.isAdmin
          ? <div style={{marginTop: '20px'}}>
              <Button 
                onClick={() => submitHandler()}
                text='Пiдрахуй'
              />
            </div>
          : null
      }
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

function mapDispatchToProps(dispatch) {
  return {
    switchLoading: (status) => dispatch(actionSwitchLoading(status)),
    switchYourself: (status) => dispatch(actionSwitchYourself(status)),
    getOtherUser: (id, state) => dispatch(actionGetOtherUsers(id, state)),
    createStandings: (standings) => dispatch(actionCreateStandings(standings))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
