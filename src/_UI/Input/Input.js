import React from 'react'
import { useSelector } from 'react-redux'
import './Input.css'
import { connect } from 'react-redux'

export const Input = (props) => {
  const { mobile } = useSelector(state => state.view)
  const inputType = props.type || 'text'
  const htmlFor = `${inputType}-${Math.random()}`

  return (
    <div className={mobile ? "InputMobile" : "Input"}>
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
