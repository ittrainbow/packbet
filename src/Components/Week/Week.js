import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Countdown from 'react-countdown'

import './Week.scss'
import Loader from '../../UI/Loader/Loader'
import YesNoButtons from '../../UI/YesNoButtons/YesNoButtons'
import Button from '../../UI/Button/Button'
import OtherUser from '../../UI/OtherUser/OtherUser'
import axios from '../../axios/axios'
import { actionSetTabActive } from '../../redux/actions/viewActions'
import { actionSetWeekId } from '../../redux/actions/weekActions'
import { actionInitButtonState, actionSetAnswerState, actionSetButtonState } from '../../redux/actions/authActions'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'
import {
  actionNullifyRender,
  actionSetRenderButtonState,
  actionSetRenderAnswerState,
  actionSetRenderLoadedState
} from '../../redux/actions/renderActions'
import { actionLogout } from '../../redux/actions/authActions'

const Week = (props) => {
  const navigate = useNavigate()
  const deadline = props.week.weeks[props.week.weekId].deadline

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
    props.setCalendarTabActive()
    navigate('/calendar')
  }

  function onClickHandler(index) {
    if (props.others.isItYou && (today() || props.isAdmin)) {
      const buttons = { ...props.auth.buttonState[props.week.weekId] }
      const i = Math.floor(index / 2)
      const yesno = index % 2

      let status = buttons[i]

      if (yesno === 0) status = status === 1 ? null : 1
      if (yesno === 1) status = status === 2 ? null : 2

      buttons[i] = status

      if (props.isAdmin || today()) {
        const buttonState = { ...props.auth.buttonState }
        buttonState[props.week.weekId] = buttons

        if (props.week.weekId === props.currentWeek) {
          props.setButtonState(buttonState)
          props.setRenderButtonState(buttons)
        }
      }
      if (props.isAdmin) props.setRenderAnswerState(buttons)
    }
  }

  async function submitHandler() {
    if (today() || props.isAdmin) {
      props.switchLoading(true)

      const checkWeek = await axios.get(`/pack/weeks.json`)
      const lastWeek = checkWeek.data[Object.keys(checkWeek.data)[Object.keys(checkWeek.data).length - 1]]
      const uploadAvailiable = lastWeek.activity && lastWeek.id === props.currentWeek

      if (!uploadAvailiable) {
        alert ('Текущая неделя была изменена, страница будет перезагружена')   
        props.switchLoading(false)
        window.location.reload()
      }
      if (uploadAvailiable) {
        const data = props.auth.buttonState[props.currentWeek]
        const url = props.isAdmin
          ? `pack/answers/weeks/${props.currentWeek}.json`
          : `pack/users/${props.auth.localId}/weeks/${props.currentWeek}.json`
  
        await axios.put(url, data)
  
        const buttonState = { ...props.auth.buttonState }
        const answerState = { ...props.auth.answerState }
  
        if (props.isAdmin && props.isItYou) answerState[props.currentWeek] = props.auth.answerState[props.currentWeek]
  
        const obj = {
          buttonState: buttonState,
          answerState: answerState
        }
  
        props.initButtonState(obj)
        props.setRenderLoadedState(props.auth.buttonState[props.currentWeek])
        props.switchLoading(false)
        navigate('/calendar')
      }
    }
  }

  function activityHelper(id, index) {
    if (props.others.isItYou && id) return props.auth.buttonState[props.render.id][index]
    if (!today() && !props.others.isItYou && id) return props.others.buttons[id][index]
    return null
  }

  function renderYesNo(question, index, activity, result) {
    return (
      <YesNoButtons
        index={index}
        activity={activity}
        total={question.total}
        result={result}
        arrow={Number(question.total) === 1}
        onClick={(index) => onClickHandler(index)}
    />
    )
  }

  function renderQuestions() {
    if (props.render.questions) {
      return props.render.questions.map((question, index) => {
        const activity = activityHelper(props.week.weekId, index)
        const result = props.auth.answerState[props.render.id][index]
        const correct = activity === result
        const styleSet = [props.mobile ? 'QuestionsDefaultMobile' : 'QuestionsDefault']
        const greyscale = props.isAdmin && props.others.isItYou

        if (activity && result && correct && !greyscale) styleSet.push('AnswerCorrect')
        if (activity && result && !correct && !greyscale) styleSet.push('AnswerWrong')

        if (question) {
          return (
            <div key={index} className={styleSet.join(' ')}>
              <table><tbody><tr>
                <td className={props.mobile ? 'QuestionInnerMobile' : 'QuestionInner'}>
                  {question.question}
                  {question.total && question.total !== 1 ? `: ${question.total}` : null}
                </td>
                <td style={{marginRight: '50px'}}>
                  {renderYesNo(question, index, activity, result)}
                </td>
              </tr></tbody></table>
            </div>
          )
        }

      })
    }
  }

  function renderSubmits() {
    return (
      <div>
        {today() || props.isAdmin ? (
          <Button
            text={isTouched() && props.others.isItYou ? 'Сохранить' : 'Изменений нет'}
            onClick={submitHandler}
            disabled={(!today() && !props.isAdmin) || !isTouched() || !props.others.isItYou}
          />
        ) : null}
        <Button
          text={today() ? 'Не сохранять' : 'Назад'}
          onClick={doNotSave}
        />
      </div>
    )
  }

  function isTouched() {
    return JSON.stringify(props.auth.buttonState) !== JSON.stringify(props.auth.loadedState)
  }

  function renderCountdown() {
    if (today())
      return (
        <div className={props.mobile ? 'CountdownMobile' : 'Countdown'}>
          {'До начала игры:\u00A0'}
          <Countdown date={deadline} renderer={renderer} />
        </div>
      )

    return (
      <div className={props.mobile ? 'CountdownMobile' : 'Countdown'}>
        Прием прогнозов окончен, игра началась
      </div>
    )
  }

  function notifyChangesHandler() {
    return (
      <div className={props.mobile ? 'SaveNotifyMobile' : 'SaveNotify'}>
        {props.others.isItYou ? 'У вас есть несохраненные изменения' : null}
      </div>
    )
  }

  return (
    <div className={props.mobile ? 'WeekMobile' : 'Week'}>
      <h3 className={props.mobile ? 'h3Mobile' : 'h3' }>
        #{props.render.number}: {props.render.name}
      </h3>
      {renderCountdown()}
      <div className={props.mobile ? null : 'OthersName'}>
        <OtherUser/>
      </div>
      <div className={props.mobile ? 'QuestionsBlockMobile' : 'QuestionsBlock'}>
        {renderQuestions()}
      </div>

      {isTouched() ? notifyChangesHandler() : null}
      {props.loading.loading ? <Loader /> : props.others.isItYou ? renderSubmits() : null}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    render: state.render,
    currentWeek: state.week.currentWeek,
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
    logout: () => dispatch(actionLogout()),
    switchLoading: (status) => dispatch(actionSwitchLoading(status)),
    setWeekId: (id) => dispatch(actionSetWeekId(id)),
    nullifyRender: () => dispatch(actionNullifyRender()),
    setButtonState: (buttons) => dispatch(actionSetButtonState(buttons)),
    setRenderButtonState: (buttons) => dispatch(actionSetRenderButtonState(buttons)),
    setRenderAnswerState: (buttons) => dispatch(actionSetRenderAnswerState(buttons)),
    setRenderLoadedState: (buttons) => dispatch(actionSetRenderLoadedState(buttons)),
    setAnswerState: (answerState) => dispatch(actionSetAnswerState(answerState)),
    initButtonState: (state) => dispatch(actionInitButtonState(state)),
    setCalendarTabActive: () => dispatch(actionSetTabActive(3))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Week)
