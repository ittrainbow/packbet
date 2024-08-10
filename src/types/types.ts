export type Action<T> = {
  type: string
  payload: T
}

export type ChangeInput = React.ChangeEvent<HTMLInputElement>

export type InputRef = HTMLInputElement

export type FadeRef = React.RefObject<HTMLDivElement>
