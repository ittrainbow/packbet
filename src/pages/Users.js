import React from 'react'
import classes from './Pages.module.scss'
import UserList from '../Components/UserList/UserList'

const Users = () => {
  return (
    <div className={classes.Container}>
      <h3>Список пользователей</h3>
      <UserList />
    </div>
  )
}

export default Users
