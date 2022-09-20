import React, { Component } from 'react'
import Week from '../Components/Week/Week'
import classes from './Pages.module.scss'
import { connect } from 'react-redux'
import { 
  actionSetRender, 
} from '../redux/actions/renderActions'
import { actionSetWeekId } from '../redux/actions/weekActions'
import { getLastWeek } from '../frame/getLastWeek'
import { actionSetHeight } from '../redux/actions/viewActions'
import Loader from '../UI/Loader/Loader'

class CurrentWeek extends Component {
  componentDidMount() {
    const week = getLastWeek(this.props.weeks)
    this.props.setWeekId(this.props.currentWeek)
    
    if (!this.props.mobile) {
      setTimeout(() => {
        const height = Math.max(
          document.getElementById('container').offsetHeight + 40,
          window.innerHeight
        )
        this.props.setHeight(height)
      }, 10)
    }
    this.props.setRender(week)
  }

  render() {
    return (
      <div
        id="container"
        className={this.props.mobile ? classes.ContainerMobile : classes.Container}
      >
        <h3>{this.props.mobile ? null : 'Текущая игра'}</h3>
        { this.props.weekId
          ? <Week />
          : <Loader />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    weekId: state.week.weekId,
    weeks: state.week.weeks,
    currentWeek: state.week.currentWeek,
    buttons: state.auth.buttonState,
    answers: state.auth.answerState,
    others: state.others,
    mobile: state.view.mobile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setWeekId: (id) => dispatch(actionSetWeekId(id)),
    setRender: (week) => dispatch(actionSetRender(week)),
    setHeight: (height) => dispatch(actionSetHeight(height))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeek)
