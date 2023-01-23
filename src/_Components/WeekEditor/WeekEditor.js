import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './WeekEditor.css'
import WeekCreator from '../WeekCreator/WeekCreator'
import { actionSetHeight } from '../../redux/actions/viewActions'

const WeekEditor = () => {
  const dispatch = useDispatch()
  const { mobile } = useSelector((state) => state.view)

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
    <div id="container" className={this.props.mobile ? 'WeekEditorMobile' : 'WeekEditor'}>
      <h3>Редактирование недели</h3>
      <WeekCreator />
    </div>
  )
}

export default WeekEditor
