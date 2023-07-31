import { useState, useContext, useEffect, createContext, ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'

import { initialUser } from './initialContexts'
import { auth } from '../db'

import { IWeeksContext, IEditorContext, IAnswersContext, IUserListContext, IUser } from '../types'

import {
  SetWeeksContextType,
  SetAnswersContextType,
  SetEditorContextType,
  SetUserListContextType
} from '../types'
import { userActions } from '../redux/slices/userSlice'

type ContextProps = {
  children: ReactNode
}

interface IContextType {
  weeksContext: IWeeksContext
  setWeeksContext: SetWeeksContextType
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
  const dispatch = useDispatch()
  const [weeksContext, setWeeksContext] = useState({} as IWeeksContext)
  const [editorContext, setEditorContext] = useState({} as IEditorContext)
  const [answersContext, setAnswersContext] = useState({} as IAnswersContext)
  const [userListContext, setUserListContext] = useState({} as IUserListContext)
  const [compareContext, setCompareContext] = useState({} as IAnswersContext)
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (Object.keys(answersContext).length > 0 && Object.keys(userListContext).length > 0 && user) {
      if (userListContext[user.uid]) {
        const { uid } = user
        const userFromContext = userListContext[uid] as IUser
        dispatch(userActions.setUser({ ...userFromContext, adminAsPlayer: false }))
      }
    } // eslint-disable-next-line
  }, [answersContext, userListContext])

  return (
    <Context.Provider
      value={{
        weeksContext,
        setWeeksContext,
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
