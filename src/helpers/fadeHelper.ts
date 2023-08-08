export const fadeInOut = (ref: React.RefObject<HTMLDivElement>) => {
  const list = ref.current?.classList

  list?.remove('animate-fade-in-up')
  list?.add('animate-fade-out-down')
}
