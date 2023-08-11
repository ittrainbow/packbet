import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectApp, selectUser } from '../redux/selectors'
import { appActions } from '../redux/slices'
import { swipeHelper } from '../helpers'
import { useMenu } from './useMenu'

export const useSwipe = () => {
  const menu = useMenu()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tabActive, duration, editor } = useSelector(selectApp)
  const { admin } = useSelector(selectUser)

  useEffect(() => {
    let startX: number
    let startY: number

    const listenerStart = (e: TouchEvent) => {
      startX = Math.round(e.touches[0].clientX)
      startY = Math.round(e.touches[0].clientY)
    }

    const listenerEnd = (e: TouchEvent) => {
      const endX = Math.round(e.changedTouches[0].clientX)
      const endY = Math.round(e.changedTouches[0].clientY)
      const moveX = endX - startX
      const isSwipe = Math.abs(moveX) > 70 && Math.abs(endY - startY) < 45

      if (isSwipe) {
        const limit = admin ? 6 : 4
        const canSwipeLeft = tabActive > 0
        const canSwipeRight = tabActive < limit
        const newTabActive =
          moveX < 0 ? (canSwipeRight ? tabActive + 1 : tabActive) : canSwipeLeft ? tabActive - 1 : tabActive

        swipeHelper({ moveX, canSwipeLeft, canSwipeRight })

        newTabActive === 5 && !editor && dispatch(appActions.setEditor(true))
        newTabActive === 4 && editor && dispatch(appActions.setEditor(false))
        dispatch(appActions.setTabActive(newTabActive))
        setTimeout(() => navigate(menu[newTabActive].path), duration)
      }
    }

    document.addEventListener('touchstart', listenerStart)
    document.addEventListener('touchend', listenerEnd)

    return () => {
      document.removeEventListener('touchstart', listenerStart)
      document.removeEventListener('touchend', listenerEnd)
    } // eslint-disable-next-line
  }, [tabActive, admin])

  return
}
