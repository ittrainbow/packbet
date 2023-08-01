import { useState, useContext, createContext, ReactNode } from 'react'

import { IWeeksContext, IEditorContext, IAnswersContext } from '../types'
import { SetWeeksContextType, SetAnswersContextType, SetEditorContextType } from '../types'

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
  compareContext: IAnswersContext
  setCompareContext: SetAnswersContextType
}

export const Context = createContext<IContextType>({} as IContextType)

export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }: ContextProps) => {
  const [weeksContext, setWeeksContext] = useState({} as IWeeksContext)
  const [editorContext, setEditorContext] = useState({} as IEditorContext)
  const [answersContext, setAnswersContext] = useState({} as IAnswersContext)
  const [compareContext, setCompareContext] = useState({} as IAnswersContext)

  return (
    <Context.Provider
      value={{
        weeksContext,
        setWeeksContext,
        answersContext,
        setAnswersContext,
        editorContext,
        setEditorContext,
        compareContext,
        setCompareContext
      }}
    >
      {children}
    </Context.Provider>
  )
}
