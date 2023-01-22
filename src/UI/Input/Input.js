import React from 'react'
import classes from './Input.module.scss'
import { connect } from 'react-redux'

export const Input = (props) => {
  const inputType = props.type || 'text'
  const cls = [props.mobile ? classes.InputMobile : classes.Input]
  const htmlFor = `${inputType}-${Math.random()}`

  return (
    <div className={cls.join(' ')}>
      <label>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        style={{ width: props.width ? props.width + 'px' : '335px'}}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

connect(mapStateToProps, null)(Input)
