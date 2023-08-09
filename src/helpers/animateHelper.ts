import { store } from '../redux/store'

export const animateCancel = (
  draw: boolean,
  gotChanges: boolean | undefined,
  ref: React.RefObject<HTMLDivElement>,
  setDrawCancelButton: (value: boolean) => void
) => {
  if (draw && !gotChanges) {
    fadeOut(ref, 'cancel')
    setTimeout(() => setDrawCancelButton(false), 200)
  } else if (!draw && gotChanges) {
    setDrawCancelButton(true)
  }
}

export const fadeOutTools = (ref1: React.RefObject<HTMLDivElement>, ref2: React.RefObject<HTMLDivElement>) => {
  ref1.current?.classList.add('animate-fade-out-down')
  ref2.current?.classList.add('animate-fade-out-down')
}

export const fadeInTools = (ref: React.RefObject<HTMLDivElement>) => {
  ref.current?.classList.remove('animate-fade-out-down')
  ref.current?.classList.add('animate-fade-in-up')
}

export const fadeOut = (ref: React.RefObject<HTMLDivElement>, elem: string) => {
  // console.log(111, elem)
  const list = ref.current?.classList

  list?.remove('animate-fade-in-up')
  list?.add('animate-fade-out-down')

  setTimeout(() => {
    list?.add('animate-fade-in-up')
    list?.remove('animate-fade-out-down')
  }, 200)
}

export const fadeIn = (ref: React.RefObject<HTMLDivElement>) => {
  ref.current?.classList.add('animate-fade-in-up')
}

export const weekListSwitchAnimate = (ref: React.RefObject<HTMLDivElement>) => {
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
    fadeOut(ref, 'weeklist')
  }
}
