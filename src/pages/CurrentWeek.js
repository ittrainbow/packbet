import React, {Component} from 'react'
import Week from '../Components/Week/Week'
import classes from './Pages.module.scss'
import { actionWeekId } from '../redux/actions/weekActions'
import { connect } from 'react-redux'

class CurrentWeek extends Component {

  componentDidMount() {
    this.props.weekId(this.props.currentWeek)
  }

  render () {
    return (
      <div className={classes.Container}>
        <h3>Текущая неделя</h3>
        <Week weekToRender={this.props.currentweek}/>
      </div>
    )
  }
}

function mapStateToProps(state) {  
  return {
    currentWeek: state.week.currentWeek,
    weekId: state.week.weekId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    weekId: (id) => dispatch(actionWeekId(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeek)
