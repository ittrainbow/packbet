import { useAuthState } from 'react-firebase-hooks/auth'
import { FaArrowDown, FaArrowUp, FaBan, FaCheck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import clsx from 'clsx'
import React from 'react'
import { auth } from '../../db'
import { selectApp, selectUser } from '../../redux/selectors'
import { answersActions, resultsActions } from '../../redux/slices'
import { Store } from '../../types'
import { Button } from '../../ui'
import { getAnswersResults } from '../../utils'

type Props = {
  id: number
  result: number
}

type YesNoHandleProps = {
  value: number
  id: number
  activity: number
}

export const WeekQuestion = ({ id, result }: Props) => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const weeks = useSelector((store: Store) => store.weeks)
  const answers = useSelector((store: Store) => store.answers)
  const { locale } = useSelector(selectUser)
  const { selectedWeek, isItYou, otherUserUID } = useSelector(selectApp)
  const { admin, adminAsPlayer, uid } = useSelector(selectUser)
  const { questions, deadline } = weeks[selectedWeek]
  const { ru, ua, total } = questions[id]

  const adm = admin && !adminAsPlayer
  const outdated = new Date().getTime() > deadline
  const buttonData = adm ? result : answers[isItYou ? uid : otherUserUID]?.[selectedWeek]?.[id]

  const getActivity = () => ((!isItYou && outdated) || isItYou ? buttonData : 0)

  const handleClick = (props: YesNoHandleProps) => {
    const userOnTimeOrAdmin = new Date().getTime() < deadline || adm

    if (isItYou && user && userOnTimeOrAdmin) {
      const { value, id, activity } = props
      const answer = value === activity ? 0 : value
      const deleteValue = { selectedWeek, uid, id }
      const updateValue = { ...deleteValue, answer }

      if (!adm) {
        return Boolean(answer)
          ? dispatch(answersActions.updateSingleAnswer(updateValue))
          : dispatch(answersActions.deleteSingleAnswer(deleteValue))
      }

      Boolean(answer)
        ? dispatch(resultsActions.updateSingleResult(updateValue))
        : dispatch(resultsActions.deleteSingleResult(deleteValue))
    }
  }

  const getButtonClass = (buttonNumber: number) => {
    const activity = getActivity()

    const thisButton = activity === buttonNumber
    const correct = result && activity === result

    if (thisButton) {
      if (adm) return 'text-black'
      if (!outdated && isItYou) return 'text-black'
      if (outdated && !adm && correct) return 'text-green-600'
      if (outdated && !adm && !correct) return 'text-red-600'
      if (outdated) return 'text-black'
    }
    return 'text-gray-400'
  }

  const getQuestionClass = (id: number) => {
    const getUid = isItYou ? uid : otherUserUID
    const week = answers[getUid] && answers[getUid][selectedWeek]
    const styles = []
    const { ans, res } = getAnswersResults(answers, result, selectedWeek, getUid, id)

    const drawPlayerStyles = adminAsPlayer || !admin
    const allowedStyles = (!isItYou && outdated) || isItYou

    drawPlayerStyles &&
      outdated &&
      res &&
      ans &&
      styles.push(
        res === ans
          ? '!border-green-600 !border-l-4 transition-transform duration-1000'
          : '!border-red-600 !border-l-4 transition-transform duration-1000'
      )
    allowedStyles && !adm && week && week[id] > 0 && styles.push('!border-l-4 transition-transform duration-1000')

    return styles.join(' ')
  }

  const questionText = locale === 'ru' ? ru : ua

  return (
    <div
      className={clsx(
        'items-center ps-2 pe-1.5 border border-gray-400 rounded-md bg-gray-200 mb-1 transition duration-500 h-11 flex flex-row gap-1',
        getQuestionClass(id)
      )}
    >
      <div className="flex grow items-center leading-4">
        {questionText.trim()}
        {total !== '1' ? `: ${total}` : null}
      </div>
      <div className="flex">
        <div className="grid grid-cols-[1fr,1fr] gap-1">
          <Button
            className={clsx('h-8 font-lg w-10 p-0.5 transition bg-gray-200 border-none', getButtonClass(1))}
            onClick={() => handleClick({ value: 1, id, activity: getActivity() })}
            icon={total === '1' ? <FaCheck /> : <FaArrowUp />}
          />
          <Button
            className={clsx('h-8 font-lg w-10 p-0.5 transition bg-gray-200 border-none', getButtonClass(2))}
            onClick={() => handleClick({ value: 2, id, activity: getActivity() })}
            icon={total === '1' ? <FaBan /> : <FaArrowDown />}
          />
        </div>
      </div>
    </div>
  )
}

export const MemoizedWeekQuestion = React.memo(WeekQuestion)
