import { store } from '../redux/store'
import { FadeRefType } from '../types'

export const animateFadeOut = (ref: FadeRefType) => {
  const { duration } = store.getState().app
  const list = ref.current?.classList

  list?.remove('animate-fade-in-up')
  list?.add('animate-fade-out-down')

  setTimeout(() => {
    list?.remove('animate-fade-out-down')
    list?.remove('animate-fade-out-right')
    list?.remove('animate-fade-out-left')
    list?.add('animate-fade-in-up')
  }, duration + 10)
}