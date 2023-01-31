export const renderer = ({ days, hours, minutes, seconds, completed }) => {
  const daysText = days > 4 || days === 0 ? 'дней' : days > 1 ? 'дня' : 'день'
  const hoursText = hours % 20 === 1 ? 'час' : hours % 20 < 4 ? 'часа' : 'часов'

  return (
    <div className="countdown">
      {completed
        ? 'Игра началась'
        : `До начала игры ${days > 0 ? days + ' ' + daysText : ''} ${hours} ${hoursText} ${minutes}
      мин ${seconds} сек`}
    </div>
  )
}
