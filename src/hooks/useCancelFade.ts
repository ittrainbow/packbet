import { useSelector } from 'react-redux'
import { FadeRefType } from '../types'
import { selectApp } from '../redux/selectors'
import { animateFadeOut } from '../helpers'
import { useChanges } from './useChanges'

export const useCancelFade = (
  drawCancel: boolean,
  ref: FadeRefType,
  setDrawCancelButton: (value: boolean) => void
) => {
  const { duration } = useSelector(selectApp)
  const gotChanges = useChanges()

  if (drawCancel && !gotChanges) {
    animateFadeOut(ref)
    setTimeout(() => setDrawCancelButton(false), duration)
  } else if (!drawCancel && gotChanges) {
    setDrawCancelButton(true)
  }
}
