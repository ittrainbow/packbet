import React, { useState, useContext, useEffect, createContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { initialUserContext, initialAppContext } from './initialContexts'
import { auth } from '../db'
import { tableCreator } from '../helpers/index'
import * as types from '../types'

type ContextProps = {
  children: React.ReactNode
}

interface IContextType {
  weeksContext: types.IWeeksContext
  setWeeksContext: types.SetWeeksContextType
  appContext: types.IAppContext
  setAppContext: types.SetAppContextType
  userContext: types.IUserContext
  setUserContext: types.SetUserContextType
  clearUserContext: (locale: string) => void
  aboutContext: types.IAboutContext
  setAboutContext: types.SetAboutContextType
  answersContext: types.IAnswersContext
  setAnswersContext: types.SetAnswersContextType
  // setResultsContext: types.setAnswersContextType
  editorContext: types.WeekType
  setEditorContext: types.SetEditorContextType
  userListContext: types.IUserListContext
  setUserListContext: types.SetUserListContextType
  compareContext: types.IAnswersContext
  setCompareContext: types.SetAnswersContextType
  standingsContext: types.IUserStandings[]
  setStandingsContext: types.SetStandingsContextType
}

export const Context = createContext<IContextType>({} as IContextType)

export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }: ContextProps) => {
  const [aboutContext, setAboutContext] = useState({} as types.IAboutContext)
  const [weeksContext, setWeeksContext] = useState({} as types.IWeeksContext)
  const [appContext, setAppContext] = useState(initialAppContext as types.IAppContext)
  const [userContext, setUserContext] = useState(initialUserContext as types.IUserContext)
  const [editorContext, setEditorContext] = useState({} as types.WeekType)
  const [answersContext, setAnswersContext] = useState({} as types.IAnswersContext)
  const [userListContext, setUserListContext] = useState({} as types.IUserListContext)
  const [compareContext, setCompareContext] = useState({} as types.IAnswersContext)
  const [standingsContext, setStandingsContext] = useState([] as types.IUserStandings[])
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (answersContext && userListContext) {
      setStandingsContext(tableCreator(answersContext, userListContext))
    }
  }, [answersContext, userListContext])

  useEffect(() => {
    if (user && Object.keys(userListContext).length > 0) {
      const { uid } = user
      const { name, email, admin, locale } = userListContext[uid]
      const browserLocale = localStorage.getItem('locale')
      locale !== browserLocale && localStorage.setItem('locale', locale)

      setUserContext({ ...userContext, name, email, admin, locale })
    } // eslint-disable-next-line
  }, [user, userListContext])

  const clearUserContext = (locale: string) => {
    setUserContext({ ...initialUserContext, locale })
  }

  // const setResultsContext = (value: any) => {
  //   const { selectedWeek } = appContext
  //   const results = objectReplace(answersContext.results, selectedWeek, value)

  //   setAnswersContext({ ...answersContext, results })
  // }

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
        // setResultsContext,
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
