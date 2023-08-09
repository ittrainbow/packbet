import { useSelector, useDispatch } from 'react-redux'

import { IStore, YesNoHandlePropsType, AnswersType } from '../types'
import { selectApp, selectUser } from '../redux/selectors'
import { YesNoButtons } from './YesNoButtons'
import { ansHelper } from '../helpers'
import { resultsActions, answersActions } from '../redux/slices'

type WeekRowProps = {
  id: number
}

export const WeekRow = ({ id }: WeekRowProps) => {
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
    const styles = ['question']
    const { ans, res } = ansHelper(answers, results, selectedWeek, uid, id)
    const drawResult = res && (adminAsPlayer || !admin) && outdated
    drawResult && ans && styles.push(res === ans ? 'question__green' : 'question__red')

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

  return (
    <div className={getQuestionStyle(id)}>
      <div className="question__desc">
        {question} {total !== '1' ? `: ${total}` : null}
      </div>
      <div className="question__actions">
        <YesNoButtons
          total={total}
          id={id}
          activity={getActivity(id)}
          admin={admin && !adminAsPlayer}
          onClick={handleClick}
          gotResult={outdated && !!results[selectedWeek]}
        />
      </div>
    </div>
  )
}
