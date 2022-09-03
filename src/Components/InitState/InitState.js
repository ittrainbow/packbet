import React, { Component } from 'react'
import axios from '../../axios/axios'
import { connect } from 'react-redux'
import { 
  actionInit, 
  actionCurrentWeek,
  actionCreateStandings
} from '../../redux/actions/weekActions'
import { getWeeks } from '../../frame/getWeeks'

class InitState extends Component {

  async componentDidMount() {
    try {
      const response = await axios.get('pack/weeks.json')
      const weeks = getWeeks(response.data)
        
      const standings = await axios.get('pack/table.json')

      this.props.init(weeks)
      this.props.currentWeek(weeks.length - 1)
      this.props.createStandings(standings.data)
    } catch (error) {
      console.log(error)
    }
  }
   
  render() {
    return (
      <div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userButtons: state.auth.buttons
  }
}

function mapDispatchToProps(dispatch) {
  return {
    init: (weeks) => dispatch(actionInit(weeks)),
    currentWeek: (currentWeek) => dispatch(actionCurrentWeek(currentWeek)),
    createStandings: (standings) => dispatch(actionCreateStandings(standings))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitState)
