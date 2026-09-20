import { FaArrowDown, FaArrowUp, FaBan, FaCheck } from '@/icons'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from '@/db'
import { selectApp, selectUser } from '@/redux/selectors'
import { answersActions, resultsActions } from '@/redux/slices'
import { Store } from '@/types'
import { Button } from '@/ui'
import { getQuestionText } from '@/utils'
import clsx from 'clsx'
import React from 'react'

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
  const question = questions[id]
  const { total } = question

  const adm = admin && !adminAsPlayer
  const outdated = new Date().getTime() > deadline
  const buttonData = adm ? result : answers[isItYou ? uid : otherUserUID]?.[selectedWeek]?.[id]

  const getActivity = () => ((!isItYou && outdated) || isItYou ? buttonData : 0)

  const userOnTimeOrAdmin = new Date().getTime() < deadline || adm

  const handleClick = (props: YesNoHandleProps) => {
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
    const thisIsCorrect = result === buttonNumber
    const showVerdict = outdated && !adm && result

    if (showVerdict && thisButton) {
      return correct ? 'text-white !bg-accent !border-accent' : 'text-white !bg-red-600 !border-red-600'
    }
    if (showVerdict && thisIsCorrect && !activity) {
      return 'text-white !bg-ink-muted !border-ink-muted'
    }
    if (thisButton) {
      return 'text-ink !bg-ink/25 !border-ink/20'
    }
    return 'text-ink/70 !border-ink/40'
  }

  const questionText = getQuestionText(question, locale)

  return (
    <div className="items-center px-1.5 py-2 border border-ink/30 rounded-xl bg-white gap-1.5 min-h-11 flex flex-row">
      <span className="flex grow min-w-0 items-center text-sm leading-4">
        {questionText.trim()}
        {total !== '1' ? `: ${total}` : null}
      </span>

      <div className="grid grid-cols-2 gap-1 shrink-0">
        <Button
          size="sm"
          className={clsx('shrink-0 text-lg', getButtonClass(1))}
          onClick={() => handleClick({ value: 1, id, activity: getActivity() })}
          icon={total === '1' ? <FaCheck /> : <FaArrowUp />}
        />
        <Button
          size="sm"
          className={clsx('shrink-0 text-lg', getButtonClass(2))}
          onClick={() => handleClick({ value: 2, id, activity: getActivity() })}
          icon={total === '1' ? <FaBan /> : <FaArrowDown />}
        />
      </div>
    </div>
  )
}

export const MemoizedWeekQuestion = React.memo(WeekQuestion)
