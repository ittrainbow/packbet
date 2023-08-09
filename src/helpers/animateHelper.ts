import { store } from '../redux/store'
import { FadeRefType } from '../types'

export const animateCancel = (
  draw: boolean,
  gotChanges: boolean | undefined,
  ref: FadeRefType,
  setDrawCancelButton: (value: boolean) => void
) => {
  if (draw && !gotChanges) {
    fadeOut(ref)
    setTimeout(() => setDrawCancelButton(false), 200)
  } else if (!draw && gotChanges) {
    setDrawCancelButton(true)
  }
}

export const fadeOut = (ref: FadeRefType) => {
  const list = ref.current?.classList

  list?.remove('animate-fade-in-up')
  list?.add('animate-fade-out-down')

  setTimeout(() => {
    list?.remove('animate-fade-out-down')
    list?.add('animate-fade-in-up')
  }, 200)
}

export const weekListSwitchAnimate = (ref: FadeRefType) => {
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
    fadeOut(ref)
  }
}

export const weekAnimate = (ref: FadeRefType) => {
  const { pathname } = store.getState().router.location
  const { tabActive} = store.getState().app

  const weekWithId = pathname.includes('week') && pathname.length > 6
  if ((tabActive === 3 && !weekWithId) || (tabActive === 2 && weekWithId)) {
    fadeOut(ref)
  } else if ([0, 1, 4, 5, 6].indexOf(tabActive) > -1) {
    fadeOut(ref)
  }
}