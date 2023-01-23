import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Table from '../Components/Table/Table'
import './Pages.css'
import { actionSetHeight } from '../redux/actions/viewActions'

export const Standings = () => {
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
    <div id="container" className={mobile ? "ContainerMobile" : "ContainerMod"}>
      <h3>Таблица</h3>
      <Table />
    </div>
  )
}
