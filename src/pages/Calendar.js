import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import WeekList from '../Components/WeekList/WeekList'
import classes from './Pages.module.scss'
import { actionSetEditorStatus } from '../redux/actions/weekActions'
import { actionSetHeight } from '../redux/actions/viewActions'

export const Calendar = () => {
  const { mobile } = useSelector((state) => state.view)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      dispatch(actionSetHeight(height))
    }
    dispatch(actionSetEditorStatus('results'))
    return
    // eslint-disable-next-line
  }, [])

  const renderHeader = () => {
    if (mobile) return <h3 className={mobile ? classes.ContainerMobileMod : null}>Календарь</h3>
    return <h3>Календарь</h3>
  }

  return (
    <div id="container" className={mobile ? classes.ContaiterMobile : classes.Container}>
      {renderHeader()}
      <WeekList />
    </div>
  )
}
