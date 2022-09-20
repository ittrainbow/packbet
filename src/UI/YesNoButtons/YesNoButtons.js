import React from 'react'
import './YesNoButtons.scss'
import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { connect } from 'react-redux'

const YesNoButtons = (props) => {
  let styleSetFirst = [props.mobile ? 'buttonMobile' : 'button']
  let styleSetSecond = [props.mobile ? 'buttonMobile' : 'button']

  if (props.mobile) {
    styleSetFirst.push('marginLeft')
  }
  if (props.activity === 1 && !props.result) styleSetFirst.push('selected', 'green')
  if (props.activity === 2 && !props.result) styleSetSecond.push('selected', 'red')
  if (props.activity === 1 && props.result) {
    styleSetFirst.push('black')
    styleSetSecond.push('white')
  }
  if (props.activity === 2 && props.result) {
    styleSetFirst.push('white')
    styleSetSecond.push('black')
  }

  return (
    <div className={props.mobile ? 'buttonsDivMobile' : 'buttonsDiv'}>
      <button
        className={styleSetFirst.join(' ')}
        onClick={() => props.onClick(props.index * 2)}
      >
        {!props.arrow ? <FaArrowUp /> : <FaCheck />}
      </button>
      <button
        className={styleSetSecond.join(' ')}
        onClick={() => props.onClick(props.index * 2 + 1)}
      >
        {!props.arrow ? <FaArrowDown /> : <FaBan />}
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

export default connect(mapStateToProps, null)(YesNoButtons)
