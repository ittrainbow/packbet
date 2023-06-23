import { useState, useContext, useEffect, createContext, ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { initialUserContext, initialAppContext } from './initialContexts'
import { auth } from '../db'
import { tableCreator } from '../helpers/index'

import {
  IWeeksContext,
  IAppContext,
  IUserContext,
  IAboutContext,
  IEditorContext,
  IAnswersContext,
  IUserListContext,
  IUserStandings
} from '../types'

import {
  SetWeeksContextType,
  SetAppContextType,
  SetUserContextType,
  SetAboutContextType,
  SetAnswersContextType,
  SetEditorContextType,
  SetUserListContextType,
  SetStandingsContextType
} from '../types'

type ContextProps = {
  children: ReactNode
}

interface IContextType {
  weeksContext: IWeeksContext
  setWeeksContext: SetWeeksContextType
  appContext: IAppContext
  setAppContext: SetAppContextType
  userContext: IUserContext
  setUserContext: SetUserContextType
  clearUserContext: (locale: string) => void
  aboutContext: IAboutContext
  setAboutContext: SetAboutContextType
  answersContext: IAnswersContext
  setAnswersContext: SetAnswersContextType
  editorContext: IEditorContext
  setEditorContext: SetEditorContextType
  userListContext: IUserListContext
  setUserListContext: SetUserListContextType
  compareContext: IAnswersContext
  setCompareContext: SetAnswersContextType
  standingsContext: IUserStandings[]
  setStandingsContext: SetStandingsContextType
}

export const Context = createContext<IContextType>({} as IContextType)

export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }: ContextProps) => {
  const [aboutContext, setAboutContext] = useState({} as IAboutContext)
  const [weeksContext, setWeeksContext] = useState({} as IWeeksContext)
  const [appContext, setAppContext] = useState(initialAppContext as IAppContext)
  const [userContext, setUserContext] = useState(initialUserContext as IUserContext)
  const [editorContext, setEditorContext] = useState({} as IEditorContext)
  const [answersContext, setAnswersContext] = useState({} as IAnswersContext)
  const [userListContext, setUserListContext] = useState({} as IUserListContext)
  const [compareContext, setCompareContext] = useState({} as IAnswersContext)
  const [standingsContext, setStandingsContext] = useState([] as IUserStandings[])
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
