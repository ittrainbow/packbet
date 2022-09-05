import React, { useState } from 'react'
import classes from './Button.module.scss'

const Button = (props) => {
  const [isHovering, setIsHovering] = useState(false)
  const handleMouseOver = () => setIsHovering(true)
  const handleMouseOut = () => setIsHovering(false)

  const cls = [classes.Button, classes[props.type]]

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <button onClick={props.onClick} className={cls.join(' ')} disabled={props.disabled}>
        {props.text}
      </button>

      {isHovering && <div style={{ fontSize: '14px', width: '400px' }}>{props.hoverText}</div>}
    </div>
  )
}

export default Button
