import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'

import './YesNoButtons.scss'

export const YesNoButtons = ({ total, id, activity, onClick, disabled }) => {
  return (
    <div className="yn__parent">
      <button
        className={activity === 1 ? 'yn__child green' : 'yn__child grey'}
        onClick={() => onClick(1, id, activity)}
        disabled={disabled}
      >
        {total === 1 ? <FaCheck /> : <FaArrowUp />}
      </button>
      <button
        className={activity === 2 ? 'yn__child red' : 'yn__child grey'}
        onClick={() => onClick(2, id, activity)}
        disabled={disabled}
      >
        {total === 1 ? <FaBan /> : <FaArrowDown />}
      </button>
    </div>
  )
}
