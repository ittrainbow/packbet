import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useDate } from '../../hooks'
import { i18n, Locale } from '../../locale'
import { selectApp, selectUser, selectWeeks } from '../../redux/selectors'

const getRemaining = (deadline: number) => {
  const totalSeconds = Math.max(0, Math.floor((deadline - Date.now()) / 1000))
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    completed: totalSeconds === 0
  }
}

export const WeekCountdown = () => {
  const { selectedWeek } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const weeks = useSelector(selectWeeks)
  const { deadline } = weeks[selectedWeek] || new Date().getTime()
  const getDate = useDate()
  const [remaining, setRemaining] = useState(() => getRemaining(deadline))

  useEffect(() => {
    setRemaining(getRemaining(deadline))
    if (deadline <= Date.now()) return

    const id = setInterval(() => {
      const next = getRemaining(deadline)
      setRemaining(next)
      if (next.completed) clearInterval(id)
    }, 1000)

    return () => clearInterval(id)
  }, [deadline])

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

  const { days, hours, minutes, seconds, completed } = remaining
  const daysText = days > 4 || days === 0 ? fiveDaysMsg : days > 1 ? twoDaysMsg : oneDayMsg
  const hoursText = hours % 20 > 4 || hours % 20 === 0 ? fiveHoursMsg : hours % 20 > 1 ? twoHoursMsg : oneHourMsg

  return (
    <span className="text-sm">
      {completed
        ? `${gameStartedMsg} ${getDate(deadline)}`
        : `${countdownMsg} ${days > 0 ? days + ' ' + daysText : ''} ${hours} ${hoursText} ${minutes}
        ${minutesMsg} ${seconds} ${secondsMsg}`}
    </span>
  )
}
