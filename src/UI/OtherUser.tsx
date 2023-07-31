import { useSelector, useDispatch } from 'react-redux'

import { i18n } from '../locale/locale'
import { useAppContext } from '../context/Context'
import { LocaleType } from '../types'
import { selectApp } from '../redux/selectors'
import { appActions } from '../redux/slices'

export const OtherUser = () => {
  const dispatch = useDispatch()
  const { otherUserName, isItYou } = useSelector(selectApp)
  const { userContext } = useAppContext()
  // const { otherUserName, isItYou } = appContext
  const { locale } = userContext

  const setContextHandler = () => {
    dispatch(appActions.setIsItYou(true))
    dispatch(appActions.setOtherUserName(''))
    dispatch(appActions.setOtherUserUID(''))
  }

  const { otherUser1msg, otherUser2msg, otherUser3msg } = i18n(locale, 'otheruser') as LocaleType

  return isItYou ? null : (
    <div>
      <button className="otheruser" onClick={setContextHandler}>
        <div className="otheruser__text">{otherUser1msg}</div>
        <div className="otheruser__text">
          {otherUser2msg}
          <b>{otherUserName}</b>
          {otherUser3msg}
        </div>
      </button>
    </div>
  )
}
