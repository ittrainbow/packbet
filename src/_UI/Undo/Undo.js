import React from 'react'
import './Undo.css'
import { FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export const Undo = (props) => {
  const { mobile } = useSelector((state) => state.view)

  return (
    <button onClick={props.onClick} className={mobile ? 'UndoMobile' : 'Undo'}>
      <FaTrash />
    </button>
  )
}
