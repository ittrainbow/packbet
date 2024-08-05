export type Question = {
  ru: string
  ua: string
  total: string
  id?: number | null
}

export type Questions = { [key: number]: Question }

export type Answers = {
  [key: number]: {
    [key: number]: number
  }
}

export type Week = {
  active: boolean
  deadline: number
  name: string
  questions: Questions
}

export type Weeks = {
  [key: number]: Week
}

export type Action<T> = {
  type: string
  payload: T
}

export type ChangeInput = React.ChangeEvent<HTMLInputElement>

export type InputRef = HTMLInputElement

export type FadeRef = React.RefObject<HTMLDivElement>
