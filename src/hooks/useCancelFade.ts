import { useSelector } from 'react-redux'
import { FadeRefType } from '../types'
import { selectApp } from '../redux/selectors'

type UseFadeTypeProps = {
  ref: FadeRefType
  condition?: boolean
}

export const useCancelFade = ({ ref, condition = true }: UseFadeTypeProps) => {
  const { duration } = useSelector(selectApp)

  if (condition) {
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
}
