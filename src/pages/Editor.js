import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actionSetEditorStatus } from '../redux/actions/weekActions'
import WeekList from '../Components/WeekList/WeekList'
import { actionSetHeight } from '../redux/actions/viewActions'

class Editor extends Component {
  componentDidMount() {
    if (!this.props.mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      this.props.setHeight(height)
    }
    this.props.setEditorStatus('editor')
  }

  render() {
    return (
      <div id="container">
        <h3
          style={{
            fontSize: this.props.mobile ? '20px' : '17px',
            marginLeft: '20px',
            marginTop: '20px'
          }}
        >
          Редактор
        </h3>
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
    setEditorStatus: (status) => dispatch(actionSetEditorStatus(status)),
    setHeight: (height) => dispatch(actionSetHeight(height))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
