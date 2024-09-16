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

export const WeekQuestion = ({ id, result, ...props }: Props) => {
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
    const correct = activity === result

    if (!thisButton) return 'text-gray-400'
    if (adm) return 'text-black bg-gray-200'
    if (!outdated && isItYou) return 'text-black bg-gray-200'
    if (outdated && !adm && result && correct) return 'text-green-600 border-opacity-10 bg-gray-200'
    if (outdated && !adm && result && !correct) return 'text-red-600 border-opacity-10 bg-gray-200'
    if (adm || outdated) return 'text-black bg-gray-200'
  }

  const getQuestionClass = (id: number) => {
    const getUid = isItYou ? uid : otherUserUID
    const week = answers[getUid] && answers[getUid][selectedWeek]
    const styles = ['transition-all transform duration-150']
    const { ans, res } = getAnswersResults(answers, result, selectedWeek, getUid, id)

    const drawPlayerStyles = adminAsPlayer || !admin
    const allowedStyles = (!isItYou && outdated) || isItYou

    drawPlayerStyles && outdated && res && ans && styles.push(res === ans ? '!border-green-600' : '!border-red-600')
    if ((allowedStyles && !adm && week && week[id] > 0) || (adm && res)) styles.push('!border-l-[4.5px]')

    return styles.join(' ')
  }

  const questionText = locale === 'ru' ? ru : ua

  return (
    <div
      className={clsx(
        'items-center px-1.5 border border-gray-400 rounded-lg bg-white gap-0.5 sm:gap-1.5 bg-opacity-60 transition duration-500 h-11 flex flex-row',
        getQuestionClass(id)
      )}
    >
      <span className="flex grow items-center leading-4">
        {questionText.trim()}
        {total !== '1' ? `: ${total}` : null}
      </span>

      <div className="grid grid-cols-[1fr,1fr] gap-0.5">
        <Button
          className={clsx('h-8 font-lg w-10 p-0.5 transition bg-gray-150 border-none', getButtonClass(1))}
          onClick={() => handleClick({ value: 1, id, activity: getActivity() })}
          icon={total === '1' ? <FaCheck /> : <FaArrowUp />}
        />
        <Button
          className={clsx('h-8 font-lg w-10 p-0.5 transition bg-gray-150 border-none', getButtonClass(2))}
          onClick={() => handleClick({ value: 2, id, activity: getActivity() })}
          icon={total === '1' ? <FaBan /> : <FaArrowDown />}
        />
      </div>
    </div>
  )
}

export const MemoizedWeekQuestion = React.memo(WeekQuestion)
