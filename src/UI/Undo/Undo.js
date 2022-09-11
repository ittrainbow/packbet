import React from 'react'
import classes from './Undo.module.scss'
import { FaTrash } from 'react-icons/fa'
import { connect } from 'react-redux'

const Undo = (props) => {
  return (
    <button onClick={props.onClick} className={props.mobile ? classes.UndoMobile : classes.Undo}>
      <FaTrash className={classes.Icon} />
    </button>
  )
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

export default connect(mapStateToProps, null)(Undo)
