import React from 'react'
import './YesNoButtons.css'
import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export const YesNoButtons = (props) => {
  const { activity, result, onClick, index } = props
  const { mobile } = useSelector((state) => state.view)
  let styleSetFirst = [mobile ? 'buttonMobile' : 'button']
  let styleSetSecond = [mobile ? 'buttonMobile' : 'button']

  if (mobile) {
    styleSetFirst.push('marginLeft')
  }
  if (activity === 1 && !result) styleSetFirst.push('selected', 'green')
  if (activity === 2 && !result) styleSetSecond.push('selected', 'red')
  if (activity === 1 && result) {
    styleSetFirst.push('black')
    styleSetSecond.push('white')
  }
  if (activity === 2 && result) {
    styleSetFirst.push('white')
    styleSetSecond.push('black')
  }

  return (
    <div className={mobile ? 'buttonsDivMobile' : 'buttonsDiv'}>
      <button className={styleSetFirst.join(' ')} onClick={() => onClick(index * 2)}>
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

