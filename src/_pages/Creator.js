import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import WeekCreator from '../Components/WeekCreator/WeekCreator'
import './Pages.css'
import {
  actionClearEditor,
  actionSetCurrentWeekId,
  actionSetEditorCurrentDeadline
} from '../redux/actions/editorActions'
import { getLastWeekNumber } from '../frame/getLastWeek'
import { actionSetHeight } from '../redux/actions/viewActions'

export const Creator = () => {
  const dispatch = useDispatch()
  const { mobile } = useSelector((state) => state.view)
  const { weeks } = useSelector((state) => state.week)

  useEffect(() => {
    const getDate = new Date()
    const date = getDate.toISOString().split('T').join(' ').substring(0, 16)
    const id = getLastWeekNumber(weeks) + 1

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
    // eslint-disable-next-line
  }, [])

  return (
    <div id="container" className={mobile ? 'ContainerMobile' : 'ContainerMod'}>
      <h3>Создание недели</h3>
      <WeekCreator />
    </div>
  )
}
