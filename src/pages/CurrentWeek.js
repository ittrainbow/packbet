import React, { Component } from 'react'
import Week from '../Components/Week/Week'
import classes from './Pages.module.scss'
import { connect } from 'react-redux'
import { actionSetRender, actionSetRenderButtons } from '../redux/actions/renderActions'
import { actionSetWeekId } from '../redux/actions/weekActions'
import { setState } from '../frame/setState'
import { getLastWeek } from '../frame/getLastWeek'
import { actionSetHeight } from '../redux/actions/viewActions'

class CurrentWeek extends Component {
  componentDidMount() {
    const week = getLastWeek(this.props.weeks)
    const state = setState(this.props.currentWeek, this.props.buttons, this.props.answers)

    if (!this.props.mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      this.props.setHeight(height)
    }
    this.props.setWeekId(this.props.currentWeek)
    this.props.setRender(week)
    this.props.setRenderButtons(state)
  }

  render() {
    return (
      <div
        id="container"
        className={this.props.mobile ? classes.ContainerMobile : classes.Container}
      >
        <h3>{this.props.mobile ? null : 'Текущая игра'}</h3>
        <Week />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
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
    setRenderButtons: (data) => dispatch(actionSetRenderButtons(data)),
    setHeight: (height) => dispatch(actionSetHeight(height))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeek)
