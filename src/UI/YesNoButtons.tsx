import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { Button } from './Button'

type YesNoButtonsProps = {
  total: string
  id: number
  activity: number
  onClick: (value: number, id: number, activity: number) => void
  admin: boolean
}

export const YesNoButtons = ({ total, id, activity, onClick, admin }: YesNoButtonsProps) => {
  return (
    <div className="yn__parent">
      <Button
        className={activity === 1 ? (admin ? 'yn__dark' : 'yn__green') : 'yn__grey'}
        onClick={() => onClick(1, id, activity)}
      >
        {total === '1' ? <FaCheck /> : <FaArrowUp />}
      </Button>
      <Button
        className={activity === 2 ? (admin ? 'yn__dark' : 'yn__red') : 'yn__grey'}
        onClick={() => onClick(2, id, activity)}
      >
        {total === '1' ? <FaBan /> : <FaArrowDown />}
      </Button>
    </div>
  )
}
