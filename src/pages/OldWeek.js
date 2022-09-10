import React from 'react'
import Week from '../Components/Week/Week'
import classes from './Pages.module.scss'
import { connect } from 'react-redux'

const OldWeek = (props) => {
  return (
    <div className={props.mobile ? classes.ContainerMobile : classes.Container}>
      <h3>Выбранная неделя</h3>
      <Week />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

export default connect(mapStateToProps, null)(OldWeek)
