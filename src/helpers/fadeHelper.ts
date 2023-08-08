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
