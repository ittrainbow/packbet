import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Week from '../Components/Week/Week'
import classes from './Pages.module.scss'
import { actionSetRender } from '../redux/actions/renderActions'
import { actionSetWeekId } from '../redux/actions/weekActions'
import { getLastWeek } from '../frame/getLastWeek'
import { actionSetHeight } from '../redux/actions/viewActions'
import { Loader } from '../UI'

export const CurrentWeek = () => {
  const dispatch = useDispatch()
  const { week } = useSelector((state) => state)
  const { weeks, currentWeek } = useSelector((state) => state.week)
  const { mobile } = useSelector((state) => state.view)

  useEffect(() => {
    const week = getLastWeek(weeks)

    dispatch(actionSetWeekId(currentWeek))

    if (!mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      dispatch(actionSetHeight(height))
    }

    dispatch(actionSetRender(week))
    return
    // eslint-disable-next-line
  }, [])

  return (
    <div id="container" className={mobile ? classes.ContainerMobile : classes.Container}>
      <h3>{mobile ? null : 'Текущая игра'}</h3>
      {week.weekId ? <Week /> : <Loader />}
    </div>
  )
}
