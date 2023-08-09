import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'

import { YesNoHandlePropsType } from '../types'
import { Button } from './Button'

type YesNoButtonsProps = {
  total: string
  id: number
  activity: number
  onClick: (props: YesNoHandlePropsType) => void
  admin: boolean
  gotResult: boolean
}

export const YesNoButtons = ({ total, id, activity, onClick, admin, gotResult }: YesNoButtonsProps) => {
  return (
    <div className="yn__parent">
      <Button
        className={activity === 1 ? (gotResult ? 'yn__red' : 'yn__green') : 'yn__grey'}
        onClick={() => onClick({ value: 1, id, activity })}
      >
        {total === '1' ? <FaCheck /> : <FaArrowUp />}
      </Button>
      <Button
        className={activity === 2 ? (gotResult ? 'yn__red' : 'yn__red') : 'yn__grey'}
        onClick={() => onClick({ value: 2, id, activity })}
      >
        {total === '1' ? <FaBan /> : <FaArrowDown />}
      </Button>
    </div>
  )
}
