import Countdown from 'react-countdown'
import { useSelector } from 'react-redux'

import { i18n, Locale } from '../../locale'
import { selectApp, selectUser, selectWeeks } from '../../redux/selectors'

export const WeekCountdown = () => {
  const { selectedWeek } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const weeks = useSelector(selectWeeks)
  const { deadline } = weeks[selectedWeek] || new Date().getTime()

  const {
    countdownMsg,
    gameStartedMsg,
    fiveDaysMsg,
    twoDaysMsg,
    oneDayMsg,
    fiveHoursMsg,
    twoHoursMsg,
    oneHourMsg,
    minutesMsg,
    secondsMsg
  } = i18n(locale, 'ticks') as Locale

  type Props = {
    days: number
    hours: number
    minutes: number
    seconds: number
    completed: boolean
  }

  const renderer = ({ days, hours, minutes, seconds, completed }: Props) => {
    const daysText = days > 4 || days === 0 ? fiveDaysMsg : days > 1 ? twoDaysMsg : oneDayMsg
    const hoursText = hours % 20 > 4 || hours % 20 === 0 ? fiveHoursMsg : hours % 20 > 1 ? twoHoursMsg : oneHourMsg

    return (
      <span className="text-sm">
        {completed
          ? gameStartedMsg
          : `${countdownMsg} ${days > 0 ? days + ' ' + daysText : ''} ${hours} ${hoursText} ${minutes}
        ${minutesMsg} ${seconds} ${secondsMsg}`}
      </span>
    )
  }

  return <Countdown date={deadline} renderer={renderer} />
}
