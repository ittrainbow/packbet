import { useDispatch, useSelector } from 'react-redux'

import { useFade } from '../hooks'
import { i18n, Locale } from '../locale'
import { selectApp, selectUser } from '../redux/selectors'
import { appActions } from '../redux/slices'
import { FadeRef } from '../types'

type OtherUserPropsType = {
  containerRef: FadeRef
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

  const { otherUser1msg, otherUser2msg, otherUser3msg } = i18n(locale, 'otheruser') as Locale

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
