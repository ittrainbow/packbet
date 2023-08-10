import { store } from '../redux/store'
import { FadeRefType } from '../types'

export const animateWeekCancel = (
  draw: boolean,
  gotChanges: boolean | undefined,
  ref: FadeRefType,
  setDrawCancelButton: (value: boolean) => void
) => {
  const { duration } = store.getState().app
  if (draw && !gotChanges) {
    animateFadeOut(ref)
    setTimeout(() => setDrawCancelButton(false), duration)
  } else if (!draw && gotChanges) {
    setDrawCancelButton(true)
  }
}

export const animateFadeOut = (ref: FadeRefType) => {
  const { duration } = store.getState().app
  const list = ref.current?.classList

  list?.remove('animate-fade-in-up')
  list?.add('animate-fade-out-down')

  setTimeout(() => {
    list?.remove('animate-fade-out-down')
    list?.add('animate-fade-in-up')
  }, duration)
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