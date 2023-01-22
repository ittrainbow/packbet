import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import WeekCreator from '../Components/WeekCreator/WeekCreator'
import classes from './Pages.module.scss'
import {
  actionClearEditor,
  actionSetCurrentWeekId,
  actionSetEditorCurrentDeadline
} from '../redux/actions/editorActions'
import { getLastWeekNumber } from '../frame/getLastWeek'
import { actionSetHeight } from '../redux/actions/viewActions'

const Creator = () => {
  const dispatch = useDispatch()
  const { weeks } = useSelector(state => state.week)
  const { mobile } = useSelector(state => state.view)

  useEffect(() => {
    const getDate = new Date()
    const date = getDate.toISOString().split('T').join(' ').substring(0, 16)
    const id = getLastWeekNumber(this.props.weeks) + 1

    if (!mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      dispatch(actionSetHeight(height))
    }

    dispatch(actionClearEditor())
    dispatch(actionSetEditorCurrentDeadline(date))
    dispatch(actionSetCurrentWeekId(id))
    return
  }, [])

  return (
    <div id="container" className={mobile ? classes.ContainerMobile : classes.Container}>
      <h3>Создание недели</h3>
      <WeekCreator />
    </div>
  )
}
export default Creator
