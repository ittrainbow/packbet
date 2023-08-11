import { useSelector } from 'react-redux'
import { selectApp, selectLocation } from '../redux/selectors'

import { FadeRefType } from '../types'
import { useFade } from './useFade'

type UseWeekFadePropsType = {
  ref: FadeRefType
}

export const useWeekFade = ({ ref }: UseWeekFadePropsType) => {
  const { pathname } = useSelector(selectLocation)
  const { tabActive } = useSelector(selectApp)

  const weekWithId = pathname.includes('week') && pathname.length > 6
  const fromList = tabActive === 3 && !weekWithId
  const fromWeek = tabActive === 2 && weekWithId
  const otherTab = [0, 1, 4, 5, 6].indexOf(tabActive) > -1
  const condition = fromList || fromWeek || otherTab

  useFade({ ref, condition })
}
