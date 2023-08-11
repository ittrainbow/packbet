import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import { INIT_APP, USER_LOGIN } from './redux/storetypes'
import { initialRedirects, swipeHelper } from './helpers'
import { selectApp, selectUser } from './redux/selectors'
import { appActions, userActions } from './redux/slices'
import { getMenu } from './helpers/links'
import { Header } from './pages'
import { auth } from './db'

export const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { emailReg, tabActive, duration, editor } = useSelector(selectApp)
  const { admin } = useSelector(selectUser)
  const [user] = useAuthState(auth)

  // swipe

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
      const isSwipe = Math.abs(moveX) > 90 && Math.abs(endY - startY) < 45

      if (isSwipe) {
        const limit = admin ? 6 : 4
        const canSwipeLeft = tabActive > 0
        const canSwipeRight = tabActive < limit
        const newTabActive =
          moveX < 0 ? (canSwipeRight ? tabActive + 1 : tabActive) : canSwipeLeft ? tabActive - 1 : tabActive

        swipeHelper({ moveX, canSwipeLeft, canSwipeRight })

        const menu = getMenu(admin)
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

  useEffect(() => {
    const lastTab = Number(localStorage.getItem('packContestLastTab') || 1)
    dispatch({ type: INIT_APP })
    dispatch(appActions.setMobile(isMobile))
    dispatch(appActions.setTabActive(lastTab))
    navigate('/login')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(userActions.setUid(user.uid))
      dispatch({
        type: USER_LOGIN,
        payload: { user, emailReg }
      })

      const lastTab = Number(localStorage.getItem('packContestLastTab'))
      navigate(initialRedirects[lastTab])
      dispatch(appActions.setTabActive(lastTab))
      lastTab === 5 && dispatch(appActions.setEditor(true))
    }
    // eslint-disable-next-line
  }, [user])

  return <Header />
}
