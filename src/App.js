import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'

import './App.scss'

import { Router } from './router/Router'
import { Header } from './pages'
import { setMobile } from './redux/actions'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMobile(isMobile)) // eslint-disable-next-line
  }, [])

  return (
    <Router>
      <Header />
    </Router>
  )
}

export default App
