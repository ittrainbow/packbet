import React, { useState, useEffect } from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'

import { Init } from './components/Init'
// import { auth } from './db/'
import AppRoutes from './router/Routes'
import { setMobile } from './redux/actions'
import './App.scss'

import * as initialContext from './templates/_initialContexts'

export const Context = React.createContext()

const App = () => {
  const [aboutContext, setAboutContext] = useState(initialContext.about)
  const [weeksContext, setWeeksContext] = useState(initialContext.weeks)
  const [appContext, setAppContext] = useState(initialContext.app)
  const [userContext, setUserContext] = useState(initialContext.user)
  const [answersContext, setAnswersContext] = useState({0: {0: 1}})

  const dispatch = useDispatch()
  // const [user] = useAuthState(auth)

  useEffect(() => {
    const mobile = isMobile
    dispatch(setMobile(mobile))
    // eslint-disable-next-line
  }, [])

  return (
    <Context.Provider
      value={{
        weeksContext,
        setWeeksContext,
        appContext,
        setAppContext,
        userContext,
        setUserContext,
        aboutContext,
        setAboutContext,
        answersContext,
        setAnswersContext
      }}
    >
      <Init />
      <AppRoutes />
    </Context.Provider>
  )
}

export default App
