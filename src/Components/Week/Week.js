import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Countdown from 'react-countdown'

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
import { actionCleanOtherUser } from '../../redux/actions/othersActions'

const Week = (props) => {
  const navigate = useNavigate()
  const deadline = props.render.deadline

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) return 'Игра началась'
    const daysText = days > 4 || days === 0 ? 'дней' : days > 1 ? 'дня' : 'день'
    const hoursText = hours > 4 || hours === 0 ? 'часов' : hours > 1 ? 'часа' : 'час'

    if (days === 0)
      return (
        <span>
          {' '}
          {hours} {hoursText} {minutes} мин {seconds} сек{' '}
        </span>
      )
    return (
      <span>
        {' '}
        {days} {daysText} {hours} {hoursText} {minutes} мин {seconds} сек{' '}
      </span>
    )
  }

  function today() {
    const currentTime = new Date().getTime()
    return currentTime < deadline
  }

  function doNotSave() {
    props.nullifyRender()
    navigate('/calendar')
  }

  function onClickHandler(index) {
    if (props.others.isItYou && (today() || props.isAdmin)) {
      const buttons = { ...props.render.buttons }
      const i = Math.floor(index / 2)
      const yesno = index % 2

      let status = buttons[i]

      if (yesno === 0) status = status === 1 ? null : 1
      if (yesno === 1) status = status === 2 ? null : 2

      buttons[i] = status

      if (props.isAdmin || today()) props.setRenderButtonState(buttons)
      if (props.isAdmin) props.setRenderAnswerState(buttons)
    }
  }

  async function submitHandler() {
    if (today() || props.isAdmin) {
      props.switchLoading(true)

      const data = props.render.buttons
      const url = props.isAdmin
        ? `pack/answers/weeks/${props.render.id}.json`
        : `pack/users/${props.auth.localId}/weeks/${props.render.id}.json`

      await axios.put(url, data)

      const buttonState = { ...props.auth.buttonState }
      const answerState = { ...props.auth.answerState }

      buttonState[props.render.id] = props.render.buttons

      if (props.isAdmin && props.isItYou) answerState[props.render.id] = props.render.answers

      const obj = {
        buttonState: buttonState,
        answerState: answerState
      }

      props.initButtonState(obj)
      props.setRenderLoadedState(props.render.buttons)
      props.switchLoading(false)
      navigate('/calendar')
    }
  }

  function activityHelper(id, index) {
    if (props.others.isItYou) return props.render.buttons[index]
    if (!today() && !props.others.isItYou) return props.others.buttons[id][index]
    return null
  }

  function renderDesktop(question, index, activity, result, styleSet) {
    return (
      <div key={index} className={styleSet.join(' ')}>
        {question.question}
        {question.total && question.total !== 1 ? `: ${question.total}` : null}
        <YesNoButtons
          index={index}
          activity={activity}
          total={question.total}
          result={result}
          arrow={Number(question.total) === 1}
          onClick={(index) => onClickHandler(index)}
        />
      </div>
    )
  }

  function renderMobile(question, index, activity, result, styleSet) {
    return (
      <tr key={index} className={styleSet.join(' ')}>
        <td className={'QuestionInnerMobile'}>
          {question.question}
          {question.total && question.total !== 1 ? `: ${question.total}` : null}
        </td>
        <td className={'QuestionButtonsMobile'}>
          <YesNoButtons
            index={index}
            activity={activity}
            result={result}
            arrow={Number(question.total) === 1}
            onClick={(index) => onClickHandler(index)}
          />
        </td>
      </tr>
    )
  }

  function renderUpperLevel() {
    return (
      <table>
        <thead>{renderQuestions()}</thead>
      </table>
    )
  }

  function renderQuestions() {
    if (props.render.questions) {
      return props.render.questions.map((question, index) => {
        const activity = activityHelper(props.week.weekId, index)
        const result = props.render.answers[index]
        const correct = activity === result
        const styleSet = [props.mobile ? 'QuestionsDefaultMobile' : 'QuestionsDefault']
        const greyscale = props.isAdmin && props.others.isItYou

        if (activity && result && correct && !greyscale) styleSet.push('AnswerCorrect')
        if (activity && result && !correct && !greyscale) styleSet.push('AnswerWrong')
        return props.mobile
          ? renderMobile(question, index, activity, result, styleSet)
          : renderDesktop(question, index, activity, result, styleSet)
      })
    }
  }

  function renderSubmits() {
    return (
      <div>
        { today() 
          ? <Button
              text={isTouched() && props.others.isItYou ? 'Сохранить' : 'Изменений нет'}
              onClick={submitHandler}
              disabled={(!today() && !props.isAdmin) || !isTouched() || !props.others.isItYou}
            /> 
          : null}
        <Button text={today() ? 'Не сохранять' : 'Назад'} onClick={doNotSave} />
      </div>
    )
  }

  function isTouched() {
    return JSON.stringify(props.render.loaded) !== JSON.stringify(props.render.buttons)
  }

  function renderOthersName() {
    if (props.mobile && !props.others.isItYou)
      return (
        <Button
          text={`Вы просматриваете ответы ${props.others.name}
            Нажмите для возврата к своим ответам`}
          wide={true}
          onClick={() => props.cleanOtherUser()}
        />
      )

    let notify = []
    if (!props.others.isItYou) {
      notify.push(`Вы просматриваете ответы ${props.others.name}`)
      if (today()) notify.push(`Чужие прогнозы для активных игр скрыты`)
      notify.push(`Вернуться к своим ответам`)
    }

    return notify.map(function (el, index) {
      if (index === notify.length - 1)
        return <div key={index} className={'BackBlue'} onClick={() => props.cleanOtherUser()}>{el}</div>
      return <div key={index} className={'Back'}>{el}</div>
    })
  }

  function renderCountdown() {
    const text = 'До начала игры:\u00A0'
    if (today())
      return (
        <div className={props.mobile ? 'CountdownMobile' : 'Countdown'}>
          {text}
          <Countdown date={deadline} renderer={renderer} />
        </div>
      )

    return (
      <div className={props.mobile ? 'CountdownMobile' : 'Countdown'}>
        Прием прогнозов окончен, игра началась
      </div>
    )
  }

  function unfinishedWeek() {
    if (props.mobile && !props.others.isItYou && today()) return (
      <div style={{ marginBottom: '5px', fontSize: '15px' }}>
        Чужие прогнозы для активных игр скрыты
      </div>
    )
  }

  return (
    <div className={props.mobile ? 'WeekMobile' : 'Week'}>
      <h3 style={{ fontSize: props.mobile ? '20px' : '16px', width: '300px' }}>
        #{props.render.number}: {props.render.name}
      </h3>
      {renderCountdown()}
      <div className={props.mobile ? null : 'OthersName'}>
        {renderOthersName()}
        {unfinishedWeek()}
      </div>
      <div className={props.mobile ? 'QuestionsBlockMobile' : 'QuestionsBlock'}>
        {props.mobile ? renderUpperLevel() : renderQuestions()}
      </div>      
      
      <div className={props.mobile ? 'SaveNotifyMobile' : 'SaveNotify'}>
        {isTouched() && props.others.isItYou ? 'У вас есть несохраненные изменения' : null}
      </div>

      {props.loading.loading ? <Loader /> : props.others.isItYou ? renderSubmits() : null}
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
    loading: state.loading,
    mobile: state.view.mobile
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
    cleanOtherUser: () => dispatch(actionCleanOtherUser()),
    initButtonState: (state) => dispatch(actionInitButtonState(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Week)
