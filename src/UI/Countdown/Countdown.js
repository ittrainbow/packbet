import React, { useContext } from 'react'
import Countdown from 'react-countdown'

import { Context } from '../../App'
import { i18n } from '../../locale/locale'

export const KickoffCountdown = () => {
  const { userContext, weeksContext, appContext } = useContext(Context)
  const { selectedWeek } = appContext
  const { deadline } = weeksContext[selectedWeek]
  const { locale } = userContext
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
  } = i18n(locale, 'countdown')

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
