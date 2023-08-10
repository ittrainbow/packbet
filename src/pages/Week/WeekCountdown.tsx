import { useSelector } from 'react-redux'
import Countdown from 'react-countdown'

import { selectApp, selectUser, selectWeeks } from '../../redux/selectors'
import { LocaleType } from '../../types'
import { i18n } from '../../locale'

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
  } = i18n(locale, 'ticks') as LocaleType

  type ClockPropsType = {
    days: number
    hours: number
    minutes: number
    seconds: number
  }

  type RendererPropsType = ClockPropsType & { completed: boolean }

  const renderer = ({ days, hours, minutes, seconds, completed }: RendererPropsType) => {
    const daysText = days > 4 || days === 0 ? fiveDaysMsg : days > 1 ? twoDaysMsg : oneDayMsg
    const hoursText = hours % 20 > 4 || hours % 20 === 0 ? fiveHoursMsg : hours % 20 > 1 ? twoHoursMsg : oneHourMsg

    return (
      <div className="countdown">
        {completed
          ? gameStartedMsg
          : `${countdownMsg} ${days > 0 ? days + ' ' + daysText : ''} ${hours} ${hoursText} ${minutes}
        ${minutesMsg} ${seconds} ${secondsMsg}`}
      </div>
    )
  }

  return <Countdown date={deadline} renderer={renderer} />
}
