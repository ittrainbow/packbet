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

export const animateSwitchWeekList = (ref: FadeRefType) => {
  const { editor, tabActive } = store.getState().app
  const { pathname } = store.getState().router.location

  if (
    (editor && tabActive !== 5) ||
    (!editor && tabActive !== 3) ||
    (editor && tabActive === 3) ||
    (!editor && tabActive === 5) ||
    (tabActive === 3 && pathname.includes('calendar')) ||
    (tabActive === 5 && pathname.includes('season'))
  ) {
    animateFadeOut(ref)
  }
}

export const animateWeekFadeOut = (ref: FadeRefType) => {
  const { pathname } = store.getState().router.location
  const { tabActive } = store.getState().app

  const weekWithId = pathname.includes('week') && pathname.length > 6
  if ((tabActive === 3 && !weekWithId) || (tabActive === 2 && weekWithId)) {
    animateFadeOut(ref)
  } else if ([0, 1, 4, 5, 6].indexOf(tabActive) > -1) {
    animateFadeOut(ref)
  }
}
