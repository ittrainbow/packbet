import React from 'react'
import './YesNoButtons.scss'
import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { connect } from 'react-redux'

const YesNoButtons = (props) => {
  let styleSetFirst = [props.mobile ? 'buttonMobile' : 'button']
  let styleSetSecond = [props.mobile ? 'buttonMobile' : 'button']

  if (props.activity === 1) styleSetFirst.push('selected')
  if (props.activity === 2) styleSetSecond.push('selected')

  if (!props.result) styleSetFirst.push('green')
  if (!props.result) styleSetSecond.push('red')
  if (props.result === 1) styleSetFirst.push('black')
  if (props.result === 2) styleSetSecond.push('black')

  return (
    <div className={props.mobile ? 'buttonsDivMobile' : 'buttonsDiv'}>
      <button
        style={{ marginLeft: props.mobile ? '-25px' : null}}
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
