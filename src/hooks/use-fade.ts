import { useDispatch, useSelector } from 'react-redux'

import { selectApp } from '@/redux/selectors'
import { appActions } from '@/redux/slices'

export type FadeOut = 'down' | 'left' | 'right'

export function pageFadeClass(fading: false | FadeOut, appNaviEvent: boolean) {
  if (fading === 'left') return 'animate-fade-out-left'
  if (fading === 'right') return 'animate-fade-out-right'
  if (fading === 'down') return 'animate-fade-out-down'
  return appNaviEvent ? 'animate-fade-in-up' : ''
}

export function usePageFadeClass() {
  const { fading, appNaviEvent } = useSelector(selectApp)
  return pageFadeClass(fading, appNaviEvent)
}

export function useFade(_ref?: React.RefObject<HTMLDivElement>) {
  const dispatch = useDispatch()
  const { duration } = useSelector(selectApp)

  const triggerFade = (direction: FadeOut = 'down') => {
    dispatch(appActions.setFading(direction))

    setTimeout(() => {
      dispatch(appActions.setFading(false))
    }, duration)
  }

  return { triggerFade }
}
