import { useDispatch, useSelector } from 'react-redux'

import { useFade } from '../hooks'
import { i18n, Locale } from '../locale'
import { selectApp, selectUser } from '../redux/selectors'
import { appActions } from '../redux/slices'

type Props = {
  containerRef: React.RefObject<HTMLDivElement>
}

export const OtherUser = ({ containerRef }: Props) => {
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
    <button
      className="border leading-4 mb-1.5 border-gray-400 rounded-md bg-gray-200 p-1 flex flex-col gap-1 items-center"
      onClick={handleDiscard}
    >
      <span className="px-0.5 leading-4 text-sm">{otherUser1msg}</span>
      <span className="px-0.5 leading-4 text-sm">
        {otherUser2msg}
        <b>{otherUserName}</b>
        {otherUser3msg}
      </span>
    </button>
  )
}
