import React, { Component } from 'react'
import Week from '../Components/Week/Week'
import classes from './Pages.module.scss'
import { connect } from 'react-redux'
import { actionSetRender } from '../redux/actions/renderActions'
import { actionSetWeekId } from '../redux/actions/weekActions'
import { getLastWeek } from '../frame/getLastWeek'
import { actionSetHeight } from '../redux/actions/viewActions'
import Loader from '../UI/Loader/Loader'
import { getHeight } from '../frame/getHeight'

class CurrentWeek extends Component {
  heightUpdateHandler() {
    if (!this.props.mobile) setTimeout(() => this.props.setHeight(getHeight()), 10)
  }

  componentDidMount() {
    const week = getLastWeek(this.props.weeks)
    this.props.setWeekId(this.props.currentWeek)

    this.heightUpdateHandler()
    this.props.setRender(week)
  }

  componentDidUpdate() {
    this.heightUpdateHandler()
  }

  render() {
    return (
      <div
        id="container"
        className={this.props.mobile ? classes.ContainerMobile : classes.Container}
      >
        <h3>{this.props.mobile ? null : 'Текущая игра'}</h3>
        {this.props.weekId ? <Week /> : <Loader />}
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
    mobile: state.view.mobile,
    isTouched: state.view.isTouched
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
