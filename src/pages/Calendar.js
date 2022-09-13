import React, { Component } from 'react'
import { connect } from 'react-redux'

import WeekList from '../Components/WeekList/WeekList'
import classes from './Pages.module.scss'
import { actionSetEditorStatus } from '../redux/actions/weekActions'

class Calendar extends Component {
  componentDidMount() {
    this.props.setEditorStatus('results')
  }

  renderHeader() {
    if (this.props.mobile) return <h3 style={{marginLeft: '20px', marginTop: '20px'}}>Календарь</h3>
    return <h3>Календарь</h3>
  }

  render() {
    return (
      <div className={this.props.mobile ? classes.ContaiterMobile : classes.Container}>
        { this.renderHeader() }
        <WeekList />
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
    setEditorStatus: (status) => dispatch(actionSetEditorStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
