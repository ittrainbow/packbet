import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actionSetEditorStatus } from '../redux/actions/weekActions'
import WeekList from '../Components/WeekList/WeekList'

class Editor extends Component {
  componentDidMount() {
    this.props.setEditorStatus('editor')
  }

  render() {
    return (
      <div >
        <h3 style={{
          fontSize: this.props.mobile ? '20px' : '17px', 
          marginLeft: '20px',
          marginTop: '20px'}}>Редактор</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
