import React from 'react'

import './Input.scss'

export const Input = ({ type, value, onChange, placeholder, id, className }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
      className={className}
    />
  )
}
