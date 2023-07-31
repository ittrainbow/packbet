import { Dispatch, SetStateAction } from 'react'
import {
  Answers,
  IAnswersContext,
  IUserListContext,
} from './interfaces'

export type LocaleType = { [key: string]: string }

export type AboutLocaleType = { [key: string]: string }

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

export type SetAnswersContextType = Dispatch<SetStateAction<IAnswersContext>>
export type SetUserListContextType = Dispatch<SetStateAction<IUserListContext>>
export type SetWeeksContextType = Dispatch<SetStateAction<WeeksType>>
export type SetEditorContextType = Dispatch<SetStateAction<WeekType>>

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

export type YesNoHandlerPropsType = {
  value: number
  id: number
  activity: number
}

export type SetStandingsType = {
  otherUserUID: string
  otherUserName: string
  isItYou: boolean
  tabActive: number
}