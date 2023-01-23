import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Week from '../Components/Week/Week'
import './Pages.css'
import { actionSetHeight } from '../redux/actions/viewActions'

export const OldWeek = () => {
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
    return
    // eslint-disable-next-line
  }, [])

  return (
    <div id="container" className={mobile ? "ContainerMobile" : "Container"}>
      <h3>{mobile ? null : 'Выбранная неделя'}</h3>
      <Week />
    </div>
  )
}
