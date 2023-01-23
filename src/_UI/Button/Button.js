import React from 'react'
import { useSelector } from 'react-redux'
import './Button.css'
import { connect } from 'react-redux'

export const Button = (props) => {
  const { mobile } = useSelector((state) => state.view)
  // console.log(props)
  // const cls = [classes[props.type]]
  // props.mobile ? cls.push("ButtonMobile") : cls.push("Button")

  return (
    <div>
      <button
        onClick={props.onClick}
        className={mobile ? 'ButtonMobile' : 'Button'}
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

connect(mapStateToProps, null)(Button)
