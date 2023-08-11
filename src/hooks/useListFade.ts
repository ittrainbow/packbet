import { useSelector } from 'react-redux'
import { selectApp, selectLocation } from '../redux/selectors'
import { FadeRefType } from '../types'
import { useFade } from './useFade'

type UseListFadePropsType = {
  ref: FadeRefType
  drawAnimation: boolean
}

export const useListFade = ({ ref, drawAnimation }: UseListFadePropsType) => {
  const { editor, tabActive } = useSelector(selectApp)
  const { pathname } = useSelector(selectLocation)
  const fadeOutCondition =
    (editor && tabActive !== 5) ||
    (!editor && tabActive !== 3) ||
    (editor && tabActive === 3) ||
    (!editor && tabActive === 5) ||
    (tabActive === 3 && pathname.includes('calendar')) ||
    (tabActive === 5 && pathname.includes('season'))

  useFade({ ref, condition: fadeOutCondition && drawAnimation })
}
