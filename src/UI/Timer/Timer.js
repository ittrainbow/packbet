import React from 'react'
import { connect } from 'react-redux'
import Countdown from 'react-countdown'

const Timer = (props) => {
  const deadline = props.deadline
  const date = new Date(deadline)
  const time = date.getTime()

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) return 
    const daysText = days > 4 || days === 0 ? 'дней' : days > 1 ? 'дня' : 'день'
    const hoursText = hours % 10 > 4 || hours % 10 === 0 ? 'часов' : hours % 10 > 1 ? 'часа' : 'час'

    if (days === 0) return <span> {hours} {hoursText} {minutes} мин {seconds} сек </span>
    return <span> {days} {daysText} {hours} {hoursText} {minutes} мин {seconds} сек </span>
  }
  
  return (
    <div>
      <Countdown daysInHours={true} date={time} renderer={renderer}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    deadline: state.render.deadline
  }
}

export default connect(mapStateToProps, null)(Timer)
