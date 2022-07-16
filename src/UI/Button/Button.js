import React from 'react'
import classes from './Button.module.scss'
import { connect } from 'react-redux'

const Button = (props) => {
  const cls = [classes[props.type]]
  props.mobile ? cls.push(classes.ButtonMobile) : cls.push(classes.Button)

  return (
    <div>
      <button
        style={{ 
          width: props.width ? props.width + 'px' : props.mobile ? '351px' : '136px',
          height: props.height ? props.height + 'px' : props.mobile ? '50px' : '30px'
        }}
        onClick={props.onClick}
        className={cls.join(' ')}
        disabled={props.disabled}
      >
        {props.text}
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

export default connect(mapStateToProps, null)(Button)
