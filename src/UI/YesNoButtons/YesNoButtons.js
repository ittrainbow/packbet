import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'

import './YesNoButtons.scss'

export const YesNoButtons = ({ total, id, activity, onClick, disabled, admin, adminAsPlayer }) => {
  return (
    <div className="yn__parent">
      <button
        className={
          activity === 1
            ? admin && !adminAsPlayer
              ? 'yn__btn dark'
              : 'yn__btn green'
            : 'yn__btn grey'
        }
        onClick={() => onClick(1, id, activity)}
        disabled={disabled}
      >
        {total === 1 ? <FaCheck /> : <FaArrowUp />}
      </button>
      <button
        className={
          activity === 2
            ? admin && !adminAsPlayer
              ? 'yn__btn dark'
              : 'yn__btn red'
            : 'yn__btn grey'
        }
        onClick={() => onClick(2, id, activity)}
        disabled={disabled}
      >
        {total === 1 ? <FaBan /> : <FaArrowDown />}
      </button>
    </div>
  )
}
