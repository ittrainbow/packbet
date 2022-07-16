import React from 'react'
import classes from './Edit.module.scss'
import { FaEdit } from 'react-icons/fa'
import { connect } from 'react-redux'

const Edit = (props) => {
  return (
    <button className={props.mobile ? classes.EditMobile : classes.Edit} onClick={props.onClick}>
      <FaEdit />
    </button>
  )
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

export default connect(mapStateToProps, null)(Edit)
