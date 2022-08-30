import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setEditorStatus } from '../redux/actions/weekActions'
import WeekList from '../Components/WeekList/WeekList'
import classes from './Pages.module.scss'

class Editor extends Component {
  
  componentDidMount() {
    this.props.setEditorStatus('editor')
  }

  render() {
    return (
      <div className={classes.Container}>    
        <h3>Редактор</h3>  
        <WeekList />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setEditorStatus: (status) => dispatch(setEditorStatus(status))
  }
}

export default connect(null, mapDispatchToProps)(Editor)
