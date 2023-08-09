import { useSelector, useDispatch } from 'react-redux'
import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'

import { IStore, YesNoHandlePropsType, AnswersType } from '../types'
import { selectApp, selectUser } from '../redux/selectors'
import { YesNoButtons } from './YesNoButtons'
import { ansHelper } from '../helpers'
import { resultsActions, answersActions } from '../redux/slices'
import { Button } from './Button'

type WeekRowProps = {
  id: number
}

export const Question = ({ id }: WeekRowProps) => {
  const dispatch = useDispatch()
  const weeks = useSelector((store: IStore) => store.weeks)
  const answers = useSelector((store: IStore) => store.answers)
  const results = useSelector((store: IStore) => store.results)
  const { selectedWeek, isItYou } = useSelector(selectApp)
  const { admin, adminAsPlayer, uid } = useSelector(selectUser)
  const { questions, deadline } = weeks[selectedWeek]

  const adm = admin && !adminAsPlayer
  const outdated = new Date().getTime() > deadline
  const buttonData = adm ? results : answers[uid]
  const writeAllowed = adm || (!adm && !outdated)

  const getQuestionStyle = (id: number) => {
    const week = answers[uid][selectedWeek]
    const styles = ['question']
    const { ans, res } = ansHelper(answers, results, selectedWeek, uid, id)
    const drawResult = res && (adminAsPlayer || !admin) && outdated
    drawResult && ans && styles.push(res === ans ? 'question__green' : 'question__red')
    !outdated && !adm && week && week[id] > 0 && styles.push('question__grey')

    return styles.join(' ')
  }

  const getActivity = (id: number) => {
    return ((!isItYou && outdated) || isItYou) && buttonData && buttonData[selectedWeek]
      ? buttonData[selectedWeek][id]
      : 0
  }

  const { question, total } = questions[id]

  const handleClickAdmin = (data: AnswersType) => {
    dispatch(resultsActions.updateResults({ results: data, selectedWeek }))
  }

  const handleClickUser = (data: AnswersType) => {
    dispatch(answersActions.updateAnswers({ answers: data, uid }))
  }

  const handleClick = (props: YesNoHandlePropsType) => {
    if (writeAllowed && isItYou) {
      const { value, id, activity } = props
      const data = structuredClone(adm ? results : answers[uid]) || {}
      if (!data[selectedWeek]) data[selectedWeek] = {}
      if (value === activity) {
        if (Object.keys(data[selectedWeek]).length === 1) {
          delete data[selectedWeek]
        } else {
          delete data[selectedWeek][id]
        }
      } else {
        data[selectedWeek][id] = value
      }

      adm ? handleClickAdmin(data) : handleClickUser(data)
    }
  }

  const getButtonClass = (id: number, buttonNumber: number) => {
    const activity = getActivity(id)
    const result = results[selectedWeek] && results[selectedWeek][id]

    const thisButton = activity === buttonNumber
    const correct = result && activity === result

    if (thisButton) {
      if (outdated && !adm && correct) return 'yn yn-correct'
      if (outdated && !adm && !correct) return 'yn yn-wrong'
      if (!outdated && !adm) return 'yn yn-black'
      if (adm) return 'yn yn-admin'
    }
    return 'yn yn-grey'
  }

  return (
    <div className={getQuestionStyle(id)}>
      <div className="question__desc">
        {question} {total !== '1' ? `: ${total}` : null}
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
