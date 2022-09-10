import React, { Component } from 'react'
import Week from '../Components/Week/Week'
import classes from './Pages.module.scss'
import { connect } from 'react-redux'
import { actionSetRender, actionSetRenderButtons } from '../redux/actions/renderActions'
import { setState } from '../frame/setState'
import { getLastWeek } from '../frame/getLastWeek'

class CurrentWeek extends Component {
  componentDidMount() {
    const week = getLastWeek(this.props.weeks)
    const state = setState(week.id, this.props.buttons, this.props.answers)

    this.props.setRender(week)
    this.props.setRenderButtons(state)
  }

  render() {
    return (
      <div className={this.props.mobile ? classes.ContainerMobile : classes.Container}>
        <h3>{this.props.mobile ? null : 'Текущая игра'}</h3>
        <Week />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks,
    buttons: state.auth.buttonState,
    answers: state.auth.answerState,
    mobile: state.view.mobile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setRender: (week) => dispatch(actionSetRender(week)),
    setRenderButtons: (data) => dispatch(actionSetRenderButtons(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeek)
