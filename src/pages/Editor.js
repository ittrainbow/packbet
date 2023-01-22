import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { actionSetEditorStatus } from '../redux/actions/weekActions'
import { actionSetHeight } from '../redux/actions/viewActions'
import WeekList from '../Components/WeekList/WeekList'
import './Pages.css'

export const Editor = () => {
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
    dispatch(actionSetEditorStatus('editor'))
    return
    // eslint-disable-next-line
  }, [])

  return (
    <div id="container" className={mobile ? "ContainerMobileLeft" : "ContainerLeft"}>
      <h3 className="ContainerMobileMod">Редактор</h3>
      <WeekList />
    </div>
  )
}
