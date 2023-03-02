import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'

import './App.scss'

import { AppRoutes } from './router/Routes'
import { setMobile } from './redux/actions'
import { ContextProvider } from './context/Context'

export const Context = React.createContext()

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMobile(isMobile))
  }, [dispatch])

  return (
    <ContextProvider>
      <AppRoutes />
    </ContextProvider>
  )
}

export default App
