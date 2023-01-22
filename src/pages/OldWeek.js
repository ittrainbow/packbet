import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Week from '../Components/Week/Week'
import classes from './Pages.module.scss'
import { actionSetHeight } from '../redux/actions/viewActions'

const OldWeek = () => {
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
  }, [])

  return (
    <div id="container" className={this.props.mobile ? classes.ContainerMobile : classes.Container}>
      <h3>{this.props.mobile ? null : 'Выбранная неделя'}</h3>
      <Week />
    </div>
  )
}

export default OldWeek
