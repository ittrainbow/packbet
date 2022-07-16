import React from 'react'
import Countdown from 'react-countdown'

import { i18n } from '../../locale/locale'
import { useAppContext } from '../../context/Context'

export const KickoffCountdown = () => {
  const { userContext, weeksContext, appContext } = useAppContext()
  const { selectedWeek } = appContext
  const { deadline } = weeksContext[selectedWeek]
  const { locale } = userContext

  // locale
  const { countdownMsg, gameStartedMsg, fiveDaysMsg, twoDaysMsg, oneDayMsg } = i18n(locale, 'ticks')
  const { fiveHoursMsg, twoHoursMsg, oneHourMsg, minutesMsg, secondsMsg } = i18n(locale, 'ticks')

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    const daysText = days > 4 || days === 0 ? fiveDaysMsg : days > 1 ? twoDaysMsg : oneDayMsg
    const hoursText =
      hours % 20 > 4 || hours % 20 === 0 ? fiveHoursMsg : hours % 20 > 1 ? twoHoursMsg : oneHourMsg

    return (
      <div className="countdown">
        {completed
          ? gameStartedMsg
          : `${countdownMsg} ${
              days > 0 ? days + ' ' + daysText : ''
            } ${hours} ${hoursText} ${minutes}
        ${minutesMsg} ${seconds} ${secondsMsg}`}
      </div>
    )
  }

  return <Countdown date={deadline} renderer={renderer} locale={locale} />
}
