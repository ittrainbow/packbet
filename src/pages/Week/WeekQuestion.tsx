import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector, useDispatch } from 'react-redux'

import { resultsActions, answersActions } from '../../redux/slices'
import { selectApp, selectUser } from '../../redux/selectors'
import { getAnswersResults } from '../../helpers'
import { IStore } from '../../types'
import { Button } from '../../UI'
import { auth } from '../../db'

type YesNoHandlePropsType = {
  value: number
  id: number
  activity: number
}

export const WeekQuestion = ({ id }: { id: number }) => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const weeks = useSelector((store: IStore) => store.weeks)
  const answers = useSelector((store: IStore) => store.answers)
  const results = useSelector((store: IStore) => store.results)
  const { locale } = useSelector(selectUser)
  const { selectedWeek, isItYou, otherUserUID } = useSelector(selectApp)
  const { admin, adminAsPlayer, uid } = useSelector(selectUser)
  const { questions, deadline } = weeks[selectedWeek]
  const { ru, ua, total } = questions[id]

  // helpers

  const adm = admin && !adminAsPlayer
  const outdated = new Date().getTime() > deadline
  const buttonData = adm ? results : answers[isItYou ? uid : otherUserUID]

  const getActivity = (id: number) => {
    return ((!isItYou && outdated) || isItYou) && buttonData && buttonData[selectedWeek]
      ? buttonData[selectedWeek][id]
      : 0
  }

  // action handlers

  const handleClick = (props: YesNoHandlePropsType) => {
    const userOnTimeOrAdmin = new Date().getTime() < deadline || adm

    if (isItYou && user && userOnTimeOrAdmin) {
      const { value, id, activity } = props
      const newValue = value === activity ? 0 : value

      if (!adm) {
        !!newValue
          ? dispatch(answersActions.updateSingleAnswer({ selectedWeek, uid, id, answer: newValue }))
          : dispatch(answersActions.deleteSingleAnswer({ selectedWeek, uid, id }))
      }

      if (adm) {
        !!newValue
          ? dispatch(resultsActions.updateSingleResult({ selectedWeek, uid, id, answer: newValue }))
          : dispatch(resultsActions.deleteSingleResult({ selectedWeek, uid, id }))
      }
    }
  }

  // render styles and locales

  const getButtonClass = (id: number, buttonNumber: number) => {
    const activity = getActivity(id)
    const result = results[selectedWeek] && results[selectedWeek][id]

    const thisButton = activity === buttonNumber
    const correct = result && activity === result
    const wrong = result && activity !== result

    if (thisButton) {
      if (adm) return 'yn yn-black'
      if (!outdated && isItYou) return 'yn yn-black'
      if (outdated && !adm && correct) return 'yn yn-correct'
      if (outdated && !adm && wrong) return 'yn yn-wrong'
      if (outdated) return 'yn yn-dark'
    }
    return 'yn yn-grey'
  }

  const getQuestionClass = (id: number) => {
    const getUid = isItYou ? uid : otherUserUID
    const week = answers[getUid] && answers[getUid][selectedWeek]
    const styles = ['question flexrow5']
    const { ans, res } = getAnswersResults(answers, results, selectedWeek, getUid, id)

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
            onClick={() => handleClick({ value: 1, id, activity: getActivity(id) })}
          >
            {total === '1' ? <FaCheck /> : <FaArrowUp />}
          </Button>
          <Button
            className={getButtonClass(id, 2)}
            onClick={() => handleClick({ value: 2, id, activity: getActivity(id) })}
          >
            {total === '1' ? <FaBan /> : <FaArrowDown />}
          </Button>
        </div>
      </div>
    </div>
  )
}
