import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'

import { Router } from './router/Router'
import { useAppContext } from './context/Context'
import { INIT_APP, SET_MOBILE } from './redux/types'

export const App = () => {
  const dispatch = useDispatch()
  const contextMethods = useAppContext()

  useEffect(() => {
    dispatch({ type: INIT_APP, payload: contextMethods })
    dispatch({ type: SET_MOBILE, payload: isMobile })
    // eslint-disable-next-line
  }, [])

  return <Router />
}
