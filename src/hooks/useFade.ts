import { useSelector } from 'react-redux'

import { selectApp } from '../redux/selectors'
import { FadeRefType } from '../types'

export const useFade = ({ ref }: { ref: FadeRefType }) => {
  const { duration } = useSelector(selectApp)

  const triggerFade = () => {
    const list = ref.current?.classList

    list?.remove('animate-fade-in-up')
    list?.add('animate-fade-out-down')

    setTimeout(() => {
      list?.remove('animate-fade-out-down')
      list?.remove('animate-fade-out-right')
      list?.remove('animate-fade-out-left')
      list?.add('animate-fade-in-up')
    }, duration)
  }

  return { triggerFade }
}
