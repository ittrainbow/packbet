import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'

import { Init } from './components/Init'
import AppRoutes from './router/Routes'
import { setMobile } from './redux/actions'
import './App.scss'

import * as initialContext from './templates/_initialContexts'
import { objectReplace, } from './helpers'

export const Context = React.createContext()

const App = () => {
  const dispatch = useDispatch()
  const { about, weeks, app, user, editor } = initialContext
  const [aboutContext, setAboutContext] = useState(about)
  const [weeksContext, setWeeksContext] = useState(weeks)
  const [appContext, setAppContext] = useState(app)
  const [userContext, setUserContext] = useState(user)
  const [answersContext, setAnswersContext] = useState()
  const [editorContext, setEditorContext] = useState(editor)
  const [userListContext, setUserListContext] = useState()
  const [compareContext, setCompareContext] = useState()
  const [standingsContext, setStandingsContext] = useState()

  useEffect(() => {
    const mobile = isMobile
    dispatch(setMobile(mobile)) // eslint-disable-next-line
  }, [])

  const setResultsContext = (value) => {
    const { selectedWeek } = appContext
    const newResults = objectReplace(answersContext.results, selectedWeek, value)
    setAnswersContext({
      ...answersContext,
      results: newResults
    })
  }

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
        setAnswersContext,
        setResultsContext,
        editorContext,
        setEditorContext,
        userListContext,
        setUserListContext,
        compareContext,
        setCompareContext,
        standingsContext,
        setStandingsContext
      }}
    >
      <Init />
      <AppRoutes />
    </Context.Provider>
  )
}

export default App
