import { useState, useContext, createContext, ReactNode } from 'react'

import { IEditorContext, ICompareContext } from '../types'
import { SetCompareContextType, SetEditorContextType } from '../types'

type ContextProps = {
  children: ReactNode
}

interface IContextType {
  editorContext: IEditorContext
  setEditorContext: SetEditorContextType
  compareContext: ICompareContext
  setCompareContext: SetCompareContextType
}

export const Context = createContext<IContextType>({} as IContextType)

export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }: ContextProps) => {
  const [editorContext, setEditorContext] = useState({} as IEditorContext)
  const [compareContext, setCompareContext] = useState({} as ICompareContext)

  return (
    <Context.Provider
      value={{
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
