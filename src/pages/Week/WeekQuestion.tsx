import { useAuthState } from 'react-firebase-hooks/auth'
import { FaArrowDown, FaArrowUp, FaBan, FaCheck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import React from 'react'
import { Button } from '../../UI'
import { auth } from '../../db'
import { getAnswersResults } from '../../helpers'
import { selectApp, selectUser } from '../../redux/selectors'
import { answersActions, resultsActions } from '../../redux/slices'
import { IStore } from '../../types'

type PropsType = {
  id: number
  result: number
}

type YesNoHandlePropsType = {
  value: number
  id: number
  activity: number
}

export const WeekQuestion = ({ id, result }: PropsType) => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const weeks = useSelector((store: IStore) => store.weeks)
  const answers = useSelector((store: IStore) => store.answers)
  const { locale } = useSelector(selectUser)
  const { selectedWeek, isItYou, otherUserUID } = useSelector(selectApp)
  const { admin, adminAsPlayer, uid } = useSelector(selectUser)
  const { questions, deadline } = weeks[selectedWeek]
  const { ru, ua, total } = questions[id]

  console.log(2)

  // helpers

  const adm = admin && !adminAsPlayer
  const outdated = new Date().getTime() > deadline
  const buttonData = adm ? result : answers[isItYou ? uid : otherUserUID][selectedWeek][id]
  const getActivity = () => ((!isItYou && outdated) || isItYou ? buttonData : 0)

  // action handlers

  const handleClick = (props: YesNoHandlePropsType) => {
    const userOnTimeOrAdmin = new Date().getTime() < deadline || adm

    if (isItYou && user && userOnTimeOrAdmin) {
      const { value, id, activity } = props
      const answer = value === activity ? 0 : value
      const deleteValue = { selectedWeek, uid, id }
      const updateValue = { ...deleteValue, answer }

      if (!adm) {
        !!answer
          ? dispatch(answersActions.updateSingleAnswer(updateValue))
          : dispatch(answersActions.deleteSingleAnswer(deleteValue))
      } else {
        !!answer
          ? dispatch(resultsActions.updateSingleResult(updateValue))
          : dispatch(resultsActions.deleteSingleResult(deleteValue))
      }
    }
  }

  // render styles and locales

  const getButtonClass = (id: number, buttonNumber: number) => {
    const activity = getActivity()

    const thisButton = result === buttonNumber
    const correct = result && activity === result

    if (thisButton) {
      if (adm) return 'yn yn-black'
      if (!outdated && isItYou) return 'yn yn-black'
      if (outdated && !adm && correct) return 'yn yn-correct'
      if (outdated && !adm && !correct) return 'yn yn-wrong'
      if (outdated) return 'yn yn-dark'
    }
    return 'yn yn-grey'
  }

  const getQuestionClass = (id: number) => {
    const getUid = isItYou ? uid : otherUserUID
    const week = answers[getUid] && answers[getUid][selectedWeek]
    const styles = ['question flexrow5']
    const { ans, res } = getAnswersResults(answers, result, selectedWeek, getUid, id)

    const drawPlayerStyles = adminAsPlayer || !admin
    const allowedStyles = (!isItYou && outdated) || isItYou

    drawPlayerStyles && outdated && res && ans && styles.push(res === ans ? 'question__green' : 'question__red')
    allowedStyles && !adm && week && week[id] > 0 && styles.push('question__grey')

    return styles.join(' ')
  }

  const questionText = locale === 'ru' ? ru : ua

  return (
    <div className={getQuestionClass(id)}>
      <div className="question__desc">
        {questionText.trim()}
        {total !== '1' ? `: ${total}` : null}
      </div>
      <div className="question__actions">
        <div className="yn__container">
          <Button
            className={getButtonClass(id, 1)}
            onClick={() => handleClick({ value: 1, id, activity: getActivity() })}
          >
            {total === '1' ? <FaCheck /> : <FaArrowUp />}
          </Button>
          <Button
            className={getButtonClass(id, 2)}
            onClick={() => handleClick({ value: 2, id, activity: getActivity() })}
          >
            {total === '1' ? <FaBan /> : <FaArrowDown />}
          </Button>
        </div>
      </div>
    </div>
  )
}

export const MemoizedWeekQuestion = React.memo(WeekQuestion)
