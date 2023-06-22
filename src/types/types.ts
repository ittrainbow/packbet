import {
  IAboutContext,
  IAnswersContext,
  IAppContext,
  IUserContext,
  IUserListContext,
  IWeeksContext,
  IUserStandings
} from './interfaces'

export type LocaleType = { [key: string]: string }

export type QuestionType = {
  question: string
  total: string
  id?: number | null
}
export type QuestionsType = { [key: number]: QuestionType }

export type Week = {
  active: boolean
  deadline: number
  name: string
  questions: QuestionsType
}

export type Weeks = {
  [key: number]: Week
}

export type SetAboutContextType = React.Dispatch<React.SetStateAction<IAboutContext>>
export type SetAnswersContextType = React.Dispatch<React.SetStateAction<IAnswersContext>>
export type SetAppContextType = React.Dispatch<React.SetStateAction<IAppContext>>
export type SetUserListContextType = React.Dispatch<React.SetStateAction<IUserListContext>>
export type SetUserContextType = React.Dispatch<React.SetStateAction<IUserContext>>
export type SetWeeksContextType = React.Dispatch<React.SetStateAction<IWeeksContext>>
export type SetStandingsContextType = React.Dispatch<React.SetStateAction<IUserStandings[]>>

export type ReduxRouterType = {
  location: {
    pathname: string
    search: string
    hash: string
    state: string | null
    key: string
  }
  action: string
}

export type StoreType = {
  router: ReduxRouterType
  app: {
    mobile: boolean
    loading: boolean
    editor: boolean
    error: string | null
  }
}
