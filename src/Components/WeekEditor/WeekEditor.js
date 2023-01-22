import React, { Component } from 'react'
import { connect } from 'react-redux'
import './WeekEditor.css'
import WeekCreator from '../WeekCreator/WeekCreator'
import { actionSetHeight } from '../../redux/actions/viewActions'

class WeekEditor extends Component {
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
        className={this.props.mobile ? "WeekEditorMobile" : "WeekEditor"}
      >
        <h3>Редактирование недели</h3>
        <WeekCreator />
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

export default connect(mapStateToProps, mapDispatchToProps)(WeekEditor)
