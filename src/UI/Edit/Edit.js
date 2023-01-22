import React from 'react'
import classes from './Edit.module.scss'
import { FaEdit } from 'react-icons/fa'
import { connect } from 'react-redux'

export const Edit = (props) => {
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

connect(mapStateToProps, null)(Edit)
