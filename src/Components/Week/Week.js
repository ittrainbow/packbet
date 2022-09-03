import React from 'react'
import structuredClone from '@ungap/structured-clone'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Week.scss'
import Loader from '../../UI/Loader/Loader'
import YesNoButtons from '../../UI/YesNoButtons/YesNoButtons'
import Button from '../../UI/Button/Button'
import axios from '../../axios/axios'
import { actionWeekId } from '../../redux/actions/weekActions'
import { actionButtonState } from '../../redux/actions/authActions'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'

const Week = (props) => {
  const navigate = useNavigate()  
  const id = props.week.weekId || props.week.weekId === 0
    ? props.week.weekId
    : props.week.currentWeek
  const deadline = props.week.weeks[props.week.weekId].deadline
  const thisweek = props.week.weeks[id] 

  function today() {
    const today = new Date().toISOString().split('T').join(' ').substring(0, 16)
    const deadline = props.week.weeks[props.week.weekId].deadline

    return today < deadline
  }

  function doNotSave() {
    navigate('/calendar')
  }

  function onClickHandler (index) {
    const state = structuredClone(props.auth.buttonState)    
    const i = Math.floor(index / 2)
    const yesno = index % 2

    let status = state[props.week.weekId][i]

    if (yesno === 0) {
      status = (status === 1)
        ? null
        : 1
    }

    if (yesno === 1) {
      status = (status === 2)
        ? null
        : 2
    }

    state[props.week.weekId][i] = status

    if (props.isAdmin || today()) {
      props.setButtonState(state)
    }
  }

  async function submitHandler() {
    props.switchLoading(true)

    const data = props.auth.buttonState[props.week.weekId]
    const url = props.isAdmin
      ? `pack/answers/weeks/${props.week.weekId}.json`
      : `pack/users/${props.auth.userId}/weeks/${props.week.weekId}.json`

    await axios.put(url, data)

    if (props.isAdmin) {

    }
    
    props.switchLoading(false)
  }

  function renderQuestions(questions) {
    if (props.week.weekId || props.week.weekId === 0) {
      return (
        questions.map((question, index) => {
          const weekId = props.week.weekId
          const buttons = props.others.isItYou
            ? props.auth.buttonState
            : props.others.buttonState
          const currentWeek = props.week.currentWeek
          const answers = props.auth.answerState
  
          const activity = buttons[weekId]
            ? buttons[weekId][index]
            : buttons[currentWeek][index]
  
          const result = answers[weekId]
            ? answers[weekId][index]
            : answers[currentWeek][index]
  
          const styleSet = ['Questions']
  
          if (activity && result && !props.isAdmin && activity === result) {
            styleSet.push('QuestionCorrect')
          } else if (activity && result && !props.isAdmin && activity !== result) {
            styleSet.push('QuestionWrong')
          } else if (!activity || !result || props.isAdmin) {
            styleSet.push('QuestionUntouched')
          }
          
          return (          
            <div key={index} className={styleSet.join(' ')}>
              { question.question }
              { question.total ? `: ${question.total}` : 0 }
              <YesNoButtons
                index={index}
                activity={activity}
                onClick={(index) => onClickHandler(index)}
              />
            </div>
          )
        })
      )
    }

  }

  function renderSubmits() {
    return (
      <div>
        <div>
          <Button
            className={'.WideButton'}
            text={
              !props.isAdmin
                ? 'Записать итоги'
                : isTouched()
                    ? 'Сохранить'
                    : 'Изменений нет' 
            }
            onClick={submitHandler}  
            disabled={(!today() && !props.isAdmin) || !isTouched()}
          />
        </div>
        <div>
          <Button
            text='Отменить и выйти'
            onClick={doNotSave}  
          />
        </div>
        <div>
          { props.others.isItYou
              ? ''
              : 'Для возвращения к своему профилю перейдите на вкладку Profile'
          }
        </div>
      </div>
    )
  }

  function isTouched() {
    return JSON.stringify(props.auth.buttonState) !== JSON.stringify(props.auth.loadedState)
  }

  function isWeekTouched() {
    const buttons = JSON.stringify(props.auth.buttonState[props.week.weekId])
    const loaded = JSON.stringify(props.auth.loadedState[props.week.weekId])

    return JSON.stringify(buttons) !== JSON.stringify(loaded)
  }

  return (
    <div className='Week'> 
      <h3>#{ thisweek.number }: { thisweek.name }</h3>

      <div className='QuestionsBlockMargin'>
        { renderQuestions(thisweek.questions) }
      </div>

      { props.loading.loading
          ? <Loader />
          : renderSubmits()
      }

      <div style={{marginTop: '10px'}}>
        { today()
            ? `Прогнозы принимаются до ${deadline}`
            : `Прогнозы принимались до ${deadline}`
        }
      </div>
      <div style={{marginTop: '10px', color: 'red'}}>
        { isWeekTouched()
            ? 'На этой неделе есть изменения'
            : null  }
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    week: state.week,
    auth: state.auth,
    others: state.others,
    isAdmin: state.auth.isAdmin,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchLoading: (status) => dispatch(actionSwitchLoading(status)),
    setWeekId: (id) => dispatch(actionWeekId(id)),
    setButtonState: (state) => dispatch(actionButtonState(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Week)