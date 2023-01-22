import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Table from '../Components/Table/Table'
import classes from './Pages.module.scss'
import { actionSetHeight } from '../redux/actions/viewActions'

const Standings = () => {
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
    <div id="container" className={mobile ? classes.ContainerMobile : classes.Container}>
      <h3>Таблица</h3>
      <Table />
    </div>
  )
}

export default Standings
