import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AppRoutes from './Routes/Routes'
import InitState from './Components/InitState/InitState'
import { isMobile } from 'react-device-detect'
import { actionSetView } from './redux/actions/viewActions'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionSetView(isMobile))
    return
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <AppRoutes />
      <InitState />
    </>
  )
}

export default App
