import React from 'react'

import './Input.scss'

export const Input = ({ type, value, onChange, placeholder, id, className, setRef, checked }) => {
  return (
    <input
      ref={setRef}
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
      className={className}
    />
  )
}
