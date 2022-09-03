import React from 'react'
import './YesNoButtons.scss'
import { FaCheck, FaBan } from 'react-icons/fa'

const YesNoButtons = (props) => {  
  let styleSetFirst = ['button']
  let styleSetSecond = ['button']

  if (props.activity === 1) styleSetFirst.push('selected')
  if (props.activity === 2) styleSetSecond.push('selected')
  
  return (
    <div className='buttonsDiv'>
      <button 
        className={styleSetFirst.join(' ')}
        onClick={() => props.onClick(props.index * 2)}
      >
        <FaCheck />
      </button>

      <button 
        className={styleSetSecond.join(' ')}
        onClick={() => props.onClick(props.index * 2 + 1)}
      >
        <FaBan />
      </button>
    </div>
  )
}

export default YesNoButtons