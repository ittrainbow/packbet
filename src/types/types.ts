import { Dispatch, SetStateAction } from 'react'
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

export type SetAboutContextType = Dispatch<SetStateAction<IAboutContext>>
export type SetAnswersContextType = Dispatch<SetStateAction<IAnswersContext>>
export type SetAppContextType = Dispatch<SetStateAction<IAppContext>>
export type SetUserListContextType = Dispatch<SetStateAction<IUserListContext>>
export type SetUserContextType = Dispatch<SetStateAction<IUserContext>>
export type SetWeeksContextType = Dispatch<SetStateAction<WeeksType>>
export type SetEditorContextType = Dispatch<SetStateAction<WeekType>>
export type SetStandingsContextType = Dispatch<SetStateAction<IUserStandings[]>>

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