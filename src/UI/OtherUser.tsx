import { useSelector, useDispatch } from 'react-redux'

import { i18n } from '../locale'
import { LocaleType } from '../types'
import { selectApp, selectUser } from '../redux/selectors'
import { appActions } from '../redux/slices'
import { fadeOut } from '../helpers'

type OtherUserPropsType = {
  containerRef: React.RefObject<HTMLDivElement>
}

export const OtherUser = ({ containerRef }: OtherUserPropsType) => {
  const dispatch = useDispatch()
  const { otherUserName, isItYou } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)

  const switchHandler = () => {
    fadeOut(containerRef, 'otheruser')
    setTimeout(() => {
      dispatch(appActions.setIsItYou(true))
      dispatch(appActions.setOtherUserName(''))
      dispatch(appActions.setOtherUserUID(''))
    }, 200)
  }

  const { otherUser1msg, otherUser2msg, otherUser3msg } = i18n(locale, 'otheruser') as LocaleType

  return isItYou ? null : (
    <div>
      <button className="otheruser" onClick={switchHandler}>
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
