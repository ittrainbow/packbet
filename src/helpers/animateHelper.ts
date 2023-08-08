export const animateCancel = (
  draw: boolean,
  gotChanges: boolean | undefined,
  ref: React.RefObject<HTMLDivElement>,
  setDrawCancelButton: (value: boolean) => void
) => {
  if (draw && !gotChanges) {
    fadeInOut(ref)
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

export const fadeInOut = (ref: React.RefObject<HTMLDivElement>) => {
  const list = ref.current?.classList

  list?.remove('animate-fade-in-up')
  list?.add('animate-fade-out-down')

  setTimeout(() => {
    list?.add('animate-fade-in-up')
    list?.remove('animate-fade-out-down')
  }, 200)
}

export const fadeOutIn = (ref: React.RefObject<HTMLDivElement>) => {
  const list = ref.current?.classList

  list?.remove('animate-fade-out-down')
  list?.add('animate-fade-in-up')

  setTimeout(() => {
    list?.add('animate-fade-out-down')
    list?.remove('animate-fade-in-up')
  }, 200)
}
