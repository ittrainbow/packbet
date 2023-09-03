import { useSelector, useDispatch } from 'react-redux'

import { selectApp, selectUser } from '../redux/selectors'
import { appActions } from '../redux/slices'
import { i18n, LocaleType } from '../locale'
import { FadeRefType } from '../types'
import { useFade } from '../hooks'

type OtherUserPropsType = {
  containerRef: FadeRefType
}

export const OtherUser = ({ containerRef }: OtherUserPropsType) => {
  const dispatch = useDispatch()
  const { otherUserName, isItYou, duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)

  const triggerFade = useFade(containerRef)

  const handleDiscard = () => {
    triggerFade()
    setTimeout(() => dispatch(appActions.clearOtherUser()), duration)
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
