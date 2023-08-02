import { useState, useContext, createContext, ReactNode } from 'react'

import { IEditorContext } from '../types'
import { SetEditorContextType } from '../types'

type ContextProps = {
  children: ReactNode
}

interface IContextType {
  editorContext: IEditorContext
  setEditorContext: SetEditorContextType
}

export const Context = createContext<IContextType>({} as IContextType)

export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }: ContextProps) => {
  const [editorContext, setEditorContext] = useState({} as IEditorContext)

  return (
    <Context.Provider
      value={{
        editorContext,
        setEditorContext
      }}
    >
      {children}
    </Context.Provider>
  )
}
