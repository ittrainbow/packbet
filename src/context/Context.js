import React, { useState, useContext } from 'react'

import * as initialContext from './initialContexts'
import { objectReplace } from '../helpers'

export const Context = React.createContext()

export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
  const { about, weeks, app, user, editor } = initialContext
  const [aboutContext, setAboutContext] = useState(about)
  const [weeksContext, setWeeksContext] = useState(weeks)
  const [appContext, setAppContext] = useState(app)
  const [userContext, setUserContext] = useState(user)
  const [editorContext, setEditorContext] = useState(editor)
  const [answersContext, setAnswersContext] = useState()
  const [userListContext, setUserListContext] = useState()
  const [compareContext, setCompareContext] = useState()
  const [standingsContext, setStandingsContext] = useState()

  const clearUserContext = (locale) => {
    setUserContext({ ...user, locale })
  }

  const clearEditorContext = () => {
    setEditorContext(editor)
  }

  const setResultsContext = (value) => {
    const { selectedWeek } = appContext
    const newResults = objectReplace(answersContext.results, selectedWeek, value)
    setAnswersContext({ ...answersContext, results: newResults })
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
        clearUserContext,
        aboutContext,
        setAboutContext,
        answersContext,
        setAnswersContext,
        setResultsContext,
        editorContext,
        setEditorContext,
        clearEditorContext,
        userListContext,
        setUserListContext,
        compareContext,
        setCompareContext,
        standingsContext,
        setStandingsContext
      }}
    >
      {children}
    </Context.Provider>
  )
}
