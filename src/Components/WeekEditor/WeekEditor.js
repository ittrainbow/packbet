import React from 'react'

import classes from './WeekEditor.module.scss'
import WeekCreator from '../WeekCreator/WeekCreator'


const WeekEditor = () => {
  return (
    <div className={classes.Margin}>
      <div >
        <h3>Редактирование недели</h3>
      </div>
      <div>
        <WeekCreator />
      </div>
    </div>
  )
}

export default WeekEditor