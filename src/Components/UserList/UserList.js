import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios/axios'
import classes from './UserList.module.scss'
import Undo from '../../UI/Undo/Undo'
import Loader from '../../UI/Loader/Loader'

const key = process.env.REACT_APP_FIREBASE_API_KEY

class UserList extends Component {
  state = {
    loading: false,
    users: null
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });

    const users = await axios.get('/pack/users.json')

    this.setState({
      users: users.data,
      loading: false,
      hash: null
    })
  }

  drawUser(el) {
    this.setState({
      hash: el
    });
  }

  renderUsers() {
    if (this.state.users) {
      const users = { ...this.state.users }
      return Object.keys(users).map((el, index) => {
        return (
          <div key={index} className={classes.string}>
            <div className={classes.text}>
              {users[el].name}
            </div>
            <div className={classes.bin}>
              <Undo onClick={() => this.drawUser(el)}/>
            </div>
          </div>
        )
      })
    }
  }

  render() {
    if (this.state.loading) return <Loader />
    return (
      <div>
        <div className={classes.UserList}>{this.renderUsers()}</div>
        <div className={classes.Tier}>{ this.state.hash }</div>
      </div>
    )
  }
}

export default connect(null, null)(UserList)
