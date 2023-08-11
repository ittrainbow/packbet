import { useSelector, useDispatch } from 'react-redux'

import { selectApp, selectUser } from '../redux/selectors'
import { FadeRefType, LocaleType } from '../types'
import { appActions } from '../redux/slices'
import { animateFadeOut } from '../helpers'
import { i18n } from '../locale'

type OtherUserPropsType = {
  containerRef: FadeRefType
}

export const OtherUser = ({ containerRef }: OtherUserPropsType) => {
  const dispatch = useDispatch()
  const { otherUserName, isItYou, duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)

  const handleDiscard = () => {
    animateFadeOut(containerRef)
    setTimeout(() => {
      dispatch(appActions.setIsItYou(true))
      dispatch(appActions.setOtherUserName(''))
      dispatch(appActions.setOtherUserUID(''))
    }, duration)
  }

  const { otherUser1msg, otherUser2msg, otherUser3msg } = i18n(locale, 'otheruser') as LocaleType

  return isItYou ? null : (
    <div>
      <button className="otheruser" onClick={handleDiscard}>
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
