import React, { useState, useContext, useEffect, createContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import * as initialContext from './initialContexts'
import { auth } from '../db'
import { tableCreator, objectReplace } from '../helpers'

export const Context = createContext()

export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
  const {
    initialAboutContext,
    initialWeeksContext,
    initialUserContext,
    initialAppContext,
    initialEditorContext
  } = initialContext
  const [aboutContext, setAboutContext] = useState(initialAboutContext)
  const [weeksContext, setWeeksContext] = useState(initialWeeksContext)
  const [appContext, setAppContext] = useState(initialAppContext)
  const [userContext, setUserContext] = useState(initialUserContext)
  const [editorContext, setEditorContext] = useState(initialEditorContext)
  const [answersContext, setAnswersContext] = useState()
  const [userListContext, setUserListContext] = useState()
  const [compareContext, setCompareContext] = useState()
  const [standingsContext, setStandingsContext] = useState()
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (answersContext && userListContext) {
      setStandingsContext(tableCreator(answersContext, userListContext))
    }
  }, [answersContext, userListContext])

  useEffect(() => {
    if (user && userListContext) {
      const { uid } = user
      const { name, email, admin, locale } = userListContext[uid]
      const browserLocale = localStorage.getItem('locale')
      locale !== browserLocale && localStorage.setItem('locale', locale)

      setUserContext({ ...userContext, name, email, admin, locale })
    } // eslint-disable-next-line
  }, [user, userListContext])

  const clearUserContext = (locale) => {
    setUserContext({ ...user, locale })
  }

  const setResultsContext = (value) => {
    const { selectedWeek } = appContext
    const results = objectReplace(answersContext.results, selectedWeek, value)

    setAnswersContext({ ...answersContext, results })
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
