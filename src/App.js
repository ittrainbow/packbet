import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { getDoc, doc } from 'firebase/firestore'

import { auth, db } from './db/'
import { setMobile } from './redux/actions'
import AppRoutes from './router/Routes'

import './App.css'

export const Context = React.createContext()

const App = () => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)

  useEffect(() => {
    dispatch(setMobile(isMobile))
  })

  return (
    <div className="App">
      <Context.Provider
        value={{}}
      >
        <AppRoutes />
      </Context.Provider>
    </div>
  )
}

export default App
