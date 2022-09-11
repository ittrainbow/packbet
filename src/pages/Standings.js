import React from 'react'
import Table from '../Components/Table/Table'
import classes from './Pages.module.scss'
import { connect } from 'react-redux'

const Standings = (props) => {
  return (
    <div className={props.mobile ? classes.ContainerMobile : classes.Container}>
      <h3>Таблица</h3>
      <Table />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

export default connect(mapStateToProps, null)(Standings)
