import React from 'react'
import classes from './Button.module.scss'
import { connect } from 'react-redux'

const Button = (props) => {
  const cls = [classes[props.type]]
  props.mobile ? cls.push(classes.ButtonMobile) : cls.push(classes.Button)
  props.wide ? cls.push(classes.Wide) : props.mobile ? cls.push(classes.Normal) : cls.push(classes.Narrow)

  return (
    <div>
      <button onClick={props.onClick} className={cls.join(' ')} disabled={props.disabled}>
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
