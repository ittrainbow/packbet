import React, { useState, useEffect, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { getDoc, doc } from 'firebase/firestore'

import { Init } from './components/Init'
import { auth, db } from './db/'
import AppRoutes from './router/Routes'
import { setMobile } from './redux/actions'
import './App.scss'

import * as initialContext from './templates/_initialContexts'

export const Context = React.createContext()

const App = () => {
  const [weeksContext, setWeeksContext] = useState(initialContext.weeks)
  const [appContext, setAppContext] = useState(initialContext.app)
  const [about, setAbout] = useState([])
  const [userContext, setUserContext] = useState(initialContext.user)
  const [gamedayContext, setGamedayContext] = useState(initialContext.gameday)

  const dispatch = useDispatch()
  const [user] = useAuthState(auth)

  useEffect(() => {
    const mobile = isMobile
    dispatch(setMobile(mobile))
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
        gamedayContext,
        setGamedayContext,
        about,
        setAbout
      }}
    >
      <Init />
      <AppRoutes />
    </Context.Provider>
  )
}

export default App
