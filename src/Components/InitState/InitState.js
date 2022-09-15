import React, { Component } from 'react'
import axios from '../../axios/axios'
import { connect } from 'react-redux'
import {
  actionInit,
  actionCurrentWeek,
  actionCreateStandings
} from '../../redux/actions/weekActions'
import { getWeeks } from '../../frame/getWeeks'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'
import { actionSetHeight } from '../../redux/actions/viewActions'

class InitState extends Component {
  async componentDidMount() {
    this.props.switchLoading(true)

    try {
      const response = await axios.get('pack/weeks.json')
      const weeks = getWeeks(response.data)

      const standings = await axios.get('pack/table.json')

      this.props.init(weeks)
      this.props.currentWeek(Object.keys(weeks).length - 1)
      this.props.createStandings(standings.data)
    } catch (error) {
      console.log(error)
    }

    await this.props.switchLoading(false)
    const height = Math.max(
      document.getElementById('container').offsetHeight + 40,
      window.innerHeight
    )
    if (!this.props.mobile) this.props.setHeight(height)
  }

  render() {
    return <div></div>
  }
}

function mapStateToProps(state) {
  return {
    userButtons: state.auth.buttons
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchLoading: (status) => dispatch(actionSwitchLoading(status)),
    init: (weeks) => dispatch(actionInit(weeks)),
    currentWeek: (currentWeek) => dispatch(actionCurrentWeek(currentWeek)),
    createStandings: (standings) => dispatch(actionCreateStandings(standings)),
    setHeight: (height) => dispatch(actionSetHeight(height))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitState)
