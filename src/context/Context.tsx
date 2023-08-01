import { useState, useContext, createContext, ReactNode } from 'react'

import { IWeeksContext, IEditorContext, ICompareContext } from '../types'
import { SetWeeksContextType, SetCompareContextType, SetEditorContextType } from '../types'

type ContextProps = {
  children: ReactNode
}

interface IContextType {
  weeksContext: IWeeksContext
  setWeeksContext: SetWeeksContextType
  editorContext: IEditorContext
  setEditorContext: SetEditorContextType
  compareContext: ICompareContext
  setCompareContext: SetCompareContextType
}

export const Context = createContext<IContextType>({} as IContextType)

export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }: ContextProps) => {
  const [weeksContext, setWeeksContext] = useState({} as IWeeksContext)
  const [editorContext, setEditorContext] = useState({} as IEditorContext)
  const [compareContext, setCompareContext] = useState({} as ICompareContext)

  return (
    <Context.Provider
      value={{
        weeksContext,
        setWeeksContext,
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
