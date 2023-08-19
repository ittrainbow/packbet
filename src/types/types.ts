export type QuestionType = {
  ru: string
  ua: string
  total: string
  id?: number | null
}

export type AnswersType = {
  [key: number]: {
    [key: number]: number
  }
}

export type WeekType = {
  active: boolean
  deadline: number
  name: string
  questions: QuestionsType
}

export type WeeksType = {
  [key: number]: WeekType
}

export type ActionType<T> = {
  type: string
  payload: T
}

export type ChangeInputType = React.ChangeEvent<HTMLInputElement>

export type InputRefType = HTMLInputElement

export type QuestionsType = { [key: number]: QuestionType }

export type FadeRefType = React.RefObject<HTMLDivElement>
