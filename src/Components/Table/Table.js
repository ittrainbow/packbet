import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import classes from './Table.module.scss'
import axios from '../../axios/axios'
import Button from '../../UI/Button/Button'
import Loader from '../../UI/Loader/Loader'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'
import { actionGetOtherUsers, actionSwitchYourself } from '../../redux/actions/othersActions'

class Table extends Component {

  state = {
    table: null,
  }

  componentDidMount() {
    console.log(5, this.props.standings)
    this.setState({
      table: this.props.standings
    })
  }

  async submitHandler() {
    this.props.switchLoading(true)

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
    
    this.setState({
      table: table
    });

    await axios.put('/pack/table.json', table)

    this.props.switchLoading(false)
  }

  otherUserHandler(id) {
    this.props.getOtherUser(id, this.props.weeks)
    this.props.switchYourself(false)
  }

  renderString(string) {
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
              onClick={() => this.otherUserHandler(string.id)}
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

  render() {
    const table = {...this.state.table}
    return (
      <div className={classes.Table}>   
        <table>        
          <tbody>
            { this.renderString() }
          </tbody>
        </table>
        <hr/>

        { this.props.loading
            ? <Loader />
            : <table>
                <tbody>
                  { Object.keys(table).map(el => this.renderString(table[el])) }           
                </tbody>        
              </table>  
        }
       
        { this.props.isAdmin
            ? <div style={{marginTop: '20px'}}>
                <Button 
                  onClick={() => this.submitHandler()}
                  text='Пiдрахуй'
                />
              </div>
            : null
        }
      </div>
    )
  }
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
    getOtherUser: (id, state) => dispatch(actionGetOtherUsers(id, state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
