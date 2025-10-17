import { useSelector } from 'react-redux'

import { selectApp } from '../redux/selectors'

export function useFade(ref: React.RefObject<HTMLDivElement>) {
  const { duration } = useSelector(selectApp)

  const triggerFade = () => {
    const list = ref.current?.classList

    list?.add('animate-fade-out-down')

    setTimeout(() => {
      list?.remove('animate-fade-out-down')
      list?.add('animate-fade-in-up')
    }, duration)

    setTimeout(() => {
      list?.remove('animate-fade-in-up')
    }, duration * 2)
  }

  return triggerFade
}
