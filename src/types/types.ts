import { FieldValue } from 'firebase/firestore'
import {
  Answers,
  IAboutContext,
  IAnswersContext,
  IAppContext,
  IUserContext,
  IUserListContext,
  IUserStandings
} from './interfaces'

export type LocaleType = { [key: string]: string }

export type QuestionType = {
  question: string
  total: string
  id?: number | null
}

export type QuestionsType = { [key: number]: QuestionType }

export type WeekType = {
  active: boolean
  deadline: number
  name: string
  questions: QuestionsType
}

export type WeeksType = {
  [key: number]: WeekType
}

export type SetAboutContextType = React.Dispatch<React.SetStateAction<IAboutContext>>
export type SetAnswersContextType = React.Dispatch<React.SetStateAction<IAnswersContext>>
export type SetAppContextType = React.Dispatch<React.SetStateAction<IAppContext>>
export type SetUserListContextType = React.Dispatch<React.SetStateAction<IUserListContext>>
export type SetUserContextType = React.Dispatch<React.SetStateAction<IUserContext>>
export type SetWeeksContextType = React.Dispatch<React.SetStateAction<WeeksType>>
export type SetEditorContextType = React.Dispatch<React.SetStateAction<WeekType>>
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

export type UserUpdateType = {
  locale: 'ua' | 'ru'
  name: string
  uid: string
}

export type WeekUpdateType = {
  season: number
  id: number
  editorContext: WeekType
}

export type WeekDeleteType = {
  season: number
  selectedWeek: number
}

export type WeekSubmitType = {
  data: Answers
  selectedWeek: number
  season: number
  ansOrRes: string
  toaster: (success: boolean) => void
}

export type ActionType<T> = {
  type: string
  payload: T
}
