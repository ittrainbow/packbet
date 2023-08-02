import { Dispatch, SetStateAction } from 'react'

export type LocaleType = { [key: string]: string }

export type QuestionType = {
  question: string
  total: string
  id?: number | null
}
export type QuestionsType = { [key: number]: QuestionType }
export type AnswersType = { [key: number]: { [key: number]: number } }
export type AnswersUpdateType = { answers: AnswersType, uid: string }

export type WeekType = {
  active: boolean
  deadline: number
  name: string
  questions: QuestionsType
}

export type WeeksType = {
  [key: number]: WeekType
}

export type WeekUpdateType = {
  season: number
  id: number
  week: WeekType
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