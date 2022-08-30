import React from 'react'
import classes from './Button.module.scss'

const Button = (props) => {
  const cls = [
    classes.Button,
    classes[props.type]
  ]

  if (props.heightStyle === 'ButtonHeight') {
    cls.push(classes.ButtonBig)
  } else {
    cls.push(classes.ButtonSmall)
  }

  return (
    <button
      onClick={props.onClick}
      className={cls.join(' ')}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}

export default Button