import { useState, useContext, useEffect, createContext, ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { initialUserContext, initialAppContext } from './initialContexts'
import { auth } from '../db'

import {
  IWeeksContext,
  IAppContext,
  IUserContext,
  IEditorContext,
  IAnswersContext,
  IUserListContext,
  IUser
} from '../types'

import {
  SetWeeksContextType,
  SetAppContextType,
  SetUserContextType,
  SetAnswersContextType,
  SetEditorContextType,
  SetUserListContextType
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
  answersContext: IAnswersContext
  setAnswersContext: SetAnswersContextType
  editorContext: IEditorContext
  setEditorContext: SetEditorContextType
  userListContext: IUserListContext
  setUserListContext: SetUserListContextType
  compareContext: IAnswersContext
  setCompareContext: SetAnswersContextType
}

export const Context = createContext<IContextType>({} as IContextType)

export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }: ContextProps) => {
  const [weeksContext, setWeeksContext] = useState({} as IWeeksContext)
  const [appContext, setAppContext] = useState(initialAppContext as IAppContext)
  const [userContext, setUserContext] = useState(initialUserContext as IUserContext)
  const [editorContext, setEditorContext] = useState({} as IEditorContext)
  const [answersContext, setAnswersContext] = useState({} as IAnswersContext)
  const [userListContext, setUserListContext] = useState({} as IUserListContext)
  const [compareContext, setCompareContext] = useState({} as IAnswersContext)
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (Object.keys(answersContext).length > 0 && Object.keys(userListContext).length > 0 && user) {
      if (userListContext[user.uid]) {
        const { uid } = user
        const { name, email, admin } = userListContext[uid] as IUser
        setUserContext({ ...userContext, name, email, admin })
      }
    } // eslint-disable-next-line
  }, [answersContext, userListContext])

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
        answersContext,
        setAnswersContext,
        editorContext,
        setEditorContext,
        userListContext,
        setUserListContext,
        compareContext,
        setCompareContext
      }}
    >
      {children}
    </Context.Provider>
  )
}
