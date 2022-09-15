import React, { Component } from 'react'
import Week from '../Components/Week/Week'
import classes from './Pages.module.scss'
import { connect } from 'react-redux'
import { actionSetHeight } from '../redux/actions/viewActions'

class OldWeek extends Component {
  componentDidMount() {
    if (!this.props.mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      this.props.setHeight(height)
    }
  }

  render() {
    return (
      <div
        id="container"
        className={this.props.mobile ? classes.ContainerMobile : classes.Container}
      >
        <h3>{this.props.mobile ? null : 'Выбранная неделя'}</h3>
        <Week />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setHeight: (height) => dispatch(actionSetHeight(height))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OldWeek)
