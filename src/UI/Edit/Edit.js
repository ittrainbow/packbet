import React from 'react'
import './Edit.css'
import { FaEdit } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export const Edit = (props) => {
  const { mobile } = useSelector(state => state.view)
  return (
    <button className={mobile ? 'EditMobile' : 'Edit'} onClick={props.onClick}>
      <FaEdit />
    </button>
  )
}
