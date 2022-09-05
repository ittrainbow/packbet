import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Week.scss'
import Loader from '../../UI/Loader/Loader'
import YesNoButtons from '../../UI/YesNoButtons/YesNoButtons'
import Button from '../../UI/Button/Button'
import axios from '../../axios/axios'
import { actionSetWeekId } from '../../redux/actions/weekActions'
import { actionInitButtonState, actionSetAnswerState } from '../../redux/actions/authActions'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'
import { 
  actionNullifyRender,
  actionSetRenderButtonState,
  actionSetRenderAnswerState,  
  actionSetRenderLoadedState
} from '../../redux/actions/renderActions'

const Week = (props) => {
  const navigate = useNavigate()
  const deadline = props.render.deadline
  
  function today() {
    const today = new Date().toISOString().split('T').join(' ').substring(0, 16)

    return today < deadline
  }

  function doNotSave() {
    props.nullifyRender()
    navigate('/calendar')
  }

  function onClickHandler (index) {
    const buttons = {...props.render.buttons}
    const i = Math.floor(index / 2)
    const yesno = index % 2

    let status = buttons[i]

    if (yesno === 0) status = (status === 1) ? null : 1
    if (yesno === 1) status = status === 2 ? null : 2

    buttons[i] = status

    if (props.isAdmin || today()) props.setRenderButtonState(buttons)
    if (props.isAdmin) props.setRenderAnswerState(buttons)
  }

  async function submitHandler() {
    props.switchLoading(true)

    const data = props.render.buttons
    const url = props.isAdmin
      ? `pack/answers/weeks/${props.render.id}.json`
      : `pack/users/${props.auth.userId}/weeks/${props.week.weekId}.json`

    await axios.put(url, data)

    const buttonState = {...props.auth.buttonState}
    const answerState = {...props.auth.answerState}

    buttonState[props.render.id] = props.render.buttons

    if (props.isAdmin) answerState[props.render.id] = props.render.answers

    const obj = {
      'buttonState': buttonState,
      'answerState': answerState
    }

    props.initButtonState(obj)
    props.setRenderLoadedState(props.render.buttons)
    
    navigate('/calendar')
    props.switchLoading(false)
  }

  function renderQuestions() {
    if (props.render.questions) {
      return (
        props.render.questions.map((question, index) => {  
          const activity = props.render.buttons[index]
          const result = props.render.answers[index]
          const correct = activity === result
          const styleSet = ['QuestionsDefault']
  
          if (activity && result && !props.isAdmin && correct) styleSet.push('AnswerCorrect')
          if (activity && result && !props.isAdmin && !correct) styleSet.push('AnswerWrong')
          
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
        <Button
          text={ !props.isAdmin ? 'Записать итоги' : isTouched() ? 'Сохранить' : 'Изменений нет' }
          onClick={submitHandler}  
          disabled={(!today() && !props.isAdmin) || !isTouched()}
        />
        <Button 
          text='Отменить и выйти' 
          onClick={doNotSave} 
        />
        <div>
          { props.others.isItYou ? '' : 'Для возвращения к своему профилю перейдите на вкладку Profile' }
        </div>
      </div>
    )
  }

  function isTouched() {
    return JSON.stringify(props.render.loaded) !== JSON.stringify(props.render.buttons)
  }

  return (
    <div className='Week'> 
      <h3>#{ props.render.number }: { props.render.name }</h3>

      <div className='QuestionsBlockMargin'>
        { renderQuestions() }
      </div>

      { props.loading.loading ? <Loader /> : renderSubmits() }

      <div style={{marginTop: '10px'}}>
        { today()
            ? `Прогнозы принимаются до ${deadline}`
            : `Прогнозы принимались до ${deadline}`
        }
      </div>
      <div style={{marginTop: '10px', color: 'red'}}>
        { isTouched() ? 'На этой неделе есть изменения' : null  }
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    render: state.render,
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
    setWeekId: (id) => dispatch(actionSetWeekId(id)),
    nullifyRender: () => dispatch(actionNullifyRender()),
    setRenderButtonState: (buttons) => dispatch(actionSetRenderButtonState(buttons)),
    setRenderAnswerState: (buttons) => dispatch(actionSetRenderAnswerState(buttons)),
    setRenderLoadedState: (buttons) => dispatch(actionSetRenderLoadedState(buttons)),
    setAnswerState: (answerState) => dispatch(actionSetAnswerState(answerState)),
    initButtonState: (state) => dispatch(actionInitButtonState(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Week)