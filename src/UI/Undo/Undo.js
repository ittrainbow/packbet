import React from 'react'
import classes from './Undo.module.scss'
import { FaTrash } from 'react-icons/fa'

const Undo = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={classes.Undo}
    >
      <FaTrash className={classes.Icon}/>
    </button>
  )
}

export default Undo
