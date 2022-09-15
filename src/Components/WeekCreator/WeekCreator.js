import React from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import structuredClone from '@ungap/structured-clone'

import BasicDateTimePicker from '../../UI/Picker/Picker'

import './WeekCreator.scss'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import Undo from '../../UI/Undo/Undo'
import Edit from '../../UI/Edit/Edit'
import axios from '../../axios/axios'
import Loader from '../../UI/Loader/Loader'
import { actionInit } from '../../redux/actions/weekActions'
import {
  actionSetEditorCurrentWeek,
  actionSetEditorCurrentName,
  actionSetEditorCurrentQuestion,
  actionSetEditorCurrentTotal,
  actionSetEditorCurrentID,
  actionSetEditorCurrentDeadline,
  actionSetEditorQuestions,
  actionSetEditorCurrentError,
  actionClearEditor
} from '../../redux/actions/editorActions'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'
import { actionSetButtonState, actionInitButtonState } from '../../redux/actions/authActions'
import { actionSetTabActive } from '../../redux/actions/viewActions'
import { getWeeks } from '../../frame/getWeeks'

const WeekCreator = (props) => {
  const navigate = useNavigate()

  function drawDate() {
    const time = new Date(props.editor.currentDeadline).toString().substring(0, 24)
    return time
  }

  function addQuestionHandler(event) {
    event.preventDefault()
    props.switchLoading(true)

    const id = props.editor.currentID
      ? props.editor.currentID
      : props.editor.currentID === 0
      ? props.editor.currentID
      : props.editor.questions.length

    const obj = {}
    obj['id'] = id
    obj['question'] = props.editor.currentQuestion
    obj['total'] = props.editor.currentTotal

    const setQuestions = structuredClone(props.editor.questions)
    setQuestions[id] = obj

    props.setQuestions(setQuestions)
    props.setCurrentQuestion('')
    props.setCurrentTotal('')
    props.switchLoading(false)
    props.setCurrentID('')
  }

  function editQuestionHandler(id) {
    const question = props.editor.questions[id]
    if (props.editor.currentID !== id) {
      props.setCurrentQuestion(question.question)
      props.setCurrentID(question.id)
      props.setCurrentTotal(question.total)
    } else {
      props.setCurrentQuestion('')
      props.setCurrentID('')
      props.setCurrentTotal('')
    }
  }

  function deleteQuestionHandler(index) {
    const questions = structuredClone(props.editor.questions)
    questions.splice(index, 1)
    questions.forEach((el, index) => {
      el.id = index
    })
    props.setQuestions(questions)
    props.setCurrentQuestion('')
    props.setCurrentID('')
    props.setCurrentTotal('')
  }

  function onChangeHandler(event, tag) {
    if (tag === 'setCurrentWeek') {
      const number = Number(event.target.value)
      props.setCurrentWeek(number)
      if (number <= props.weeks.length && number % 1 === 0 && number !== 1 && number > 0) {
        props.setCurrentError('Вероятно, эта неделя уже создана')
      } else if (number > 0 && number % 1 === 0) {
        props.setCurrentError('')
      } else {
        props.setCurrentError('Введите валидный номер недели')
      }
    }
    if (tag === 'setCurrentName') {
      const text = event.target.value
      if (text.length < 61) {
        props.setCurrentName(text.substring(0, 1).toUpperCase() + text.substring(1))
        props.setCurrentError('')
      } else {
        props.setCurrentName(text.substring(0, 1).toUpperCase() + text.substring(1, 60))
        props.setCurrentError('Лимит длины вопроса = 60 символам')
      }
    }
    if (tag === 'setCurrentQuestion') {
      const text = event.target.value
      if (text.length < 61) {
        props.setCurrentQuestion(text.substring(0, 1).toUpperCase() + text.substring(1))
        props.setCurrentError('')
      } else {
        props.setCurrentQuestion(text.substring(0, 1).toUpperCase() + text.substring(1, 60))
        props.setCurrentError('Лимит длины вопроса = 60 символам')
      }
    }
    if (tag === 'setCurrentTotal') props.setCurrentTotal(Number(event.target.value))
    if (tag === 'setCurrentDeadline') props.setCurrentDeadline(event.target.value)
  }

  function readyToSubmit() {
    return (
      props.editor.currentWeek &&
      props.editor.currentName.length > 0 &&
      props.editor.currentDeadline &&
      props.editor.questions.length > 2
    )
  }

  async function submitHandler() {
    if (readyToSubmit()) {
      props.switchLoading(true)

      const qs = structuredClone(props.editor.questions)
      const id = props.editor.currentWeekId
      const questions = qs.map((question, index) => {
        question['id'] = index
        return question
      })

      const week = {
        deadline: props.editor.currentDeadline,
        id: id,
        name: props.editor.currentName,
        number: props.editor.currentWeek,
        questions: questions
      }

      const obj = { ...props.auth.buttonState }
      const add = {}
      for (let i = 0; i < questions.length; i++) add[i] = null
      obj[props.editor.currentWeekId] = add

      if (!props.editor.currentHash.length) await axios.post('pack/weeks.json', week)
      else await axios.put(`pack/weeks/${props.editor.currentHash}.json`, week)

      const response = await axios.get('/pack/weeks.json')
      const weeks = getWeeks(response.data)
      props.init(weeks)

      const state = {}
      for (let i = 0; i < questions.length; i++) state[i] = null

      const oldState = structuredClone(props.auth)
      oldState.buttonState[id] = state
      oldState.answerState[id] = state
      oldState.loadedState[id] = state

      props.initButtonState(oldState)
      props.switchLoading(false)
      props.setCalendarTabActive(5)
      navigate('/editor')
    }
  }

  async function deleteWeekHandler() {
    props.switchLoading(true)
    const id = props.editor.currentWeekId
    const weeks = { ...props.weeks }
    delete weeks[id]

    const buttonState = { ...props.auth.buttonState }
    const answerState = { ...props.auth.answerState }

    delete buttonState[props.editor.currentWeekId]
    delete answerState[props.editor.currentWeekId]

    const obj = { buttonState: buttonState, answerState: answerState }

    props.initButtonState(obj)
    props.init(weeks)
    props.clearEditor()

    const response = await axios.get('pack/users.json')

    const newState = structuredClone(response.data)

    Object.keys(response.data).forEach((el) => {
      const id = props.editor.currentWeekId
      const weeks = newState[el].weeks[id]
      const weeksAmount = Object.keys(newState[el].weeks).length

      if (weeksAmount === 1 && weeks.length > 0) {
        newState[el].weeks = ''
      } else if (newState[el].weeks[id]) {
        newState[el].weeks[id] = null
      }
    })

    await axios.put('pack/users.json', newState)
    await axios.delete(`pack/weeks/${props.editor.currentHash}.json`)
    await axios.delete(`pack/answers/weeks/${props.editor.currentWeekId}.json`)

    props.switchLoading(false)
    props.setCalendarTabActive(5)
    navigate('/editor')
  }

  function renderQuestions() {
    return props.loading ? (
      <Loader />
    ) : (
      props.editor.questions.map((question) => {
        const setClass =
          question.id === props.editor.currentID
            ? props.mobile
              ? 'QuestionsSelectedMobile'
              : 'QuestionsSelected'
            : props.mobile
            ? 'QuestionsMobile'
            : 'Questions'

        return (
          <div key={question.id} className={setClass}>
            <table style={{ marginTop: '-2px' }}>
              <thead>
                <tr>
                  <td className={props.mobile ? 'QuestionInnerEdMobile' : 'QuestionInnerEd'}>
                    {question.question}: {question.total}
                  </td>
                  <td>
                    {' '}
                    <Edit onClick={() => editQuestionHandler(question.id)} />{' '}
                  </td>
                  <td>
                    {' '}
                    <Undo onClick={() => deleteQuestionHandler(question.id)} />{' '}
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        )
      })
    )
  }

  function noSaveExitHandler() {
    props.clearEditor()
    props.setCalendarTabActive(3)
    navigate('/calendar')
  }

  function renderInputs() {
    return (
      <div style={{ marginLeft: '-0.1em', marginTop: props.mobile ? null : '10px' }}>
        <table>
          <thead>
            <tr>
              <td>
                <Input
                  label="Неделя"
                  type="number"
                  width={props.mobile ? '54px' : '70px'}
                  value={props.editor.currentWeek}
                  onChange={(event) => onChangeHandler(event, 'setCurrentWeek')}
                />
              </td>
              <td>
                <Input
                  label="Игра"
                  width={props.mobile ? '265px' : '351px'}
                  value={props.editor.currentName || ''}
                  onChange={(event) => onChangeHandler(event, 'setCurrentName')}
                />
              </td>
            </tr>
          </thead>
        </table>
        <table style={{ marginTop: '-10px' }}>
          <thead>
            <tr>
              <td>
                <Input
                  label="Линия"
                  width={props.mobile ? '255px' : '351px'}
                  value={props.editor.currentQuestion}
                  onChange={(event) => onChangeHandler(event, 'setCurrentQuestion')}
                />
              </td>
              <td>
                <Input
                  label="Тотал"
                  width={props.mobile ? '64px' : '70px'}
                  type="number"
                  value={props.editor.currentTotal}
                  onChange={(event) => onChangeHandler(event, 'setCurrentTotal')}
                />
              </td>
            </tr>
          </thead>
        </table>
      </div>
    )
  }

  function renderSubmits() {
    return (
      <div className={props.mobile ? 'ButtonsMobile' : 'Buttons'}>
        <Button
          width={props.mobile ? '352px' : '141px'}
          text="Отменить"
          onClick={noSaveExitHandler}
        />
        <Button
          width={props.mobile ? '352px' : '141px'}
          text="Сохранить"
          onClick={() => submitHandler()}
        />
        {props.editor.currentHash ? (
          <Button
            width={props.mobile ? '352px' : '141px'}
            text="Удалить"
            onClick={() => deleteWeekHandler()}
          />
        ) : null}
      </div>
    )
  }

  function renderWeek() {
    return (
      <div>
        {renderInputs()}

        <Button
          text={
            props.editor.currentID || props.editor.currentID === 0
              ? 'Сохранить вопрос'
              : 'Добавить вопрос'
          }
          width={props.mobile ? '352px' : '144px'}
          onClick={(event) => addQuestionHandler(event)}
          disabled={!props.editor.currentQuestion || !props.editor.currentTotal}
        />

        <div className={'QuestionsList'}>{renderQuestions()}</div>
        <div className={props.mobile ? 'CountDownMobile' : 'CountDown'}>
          Начало игры: {drawDate()}
          <div className={'Picker'}>
            <BasicDateTimePicker />
          </div>
        </div>

        {renderSubmits()}
      </div>
    )
  }

  return <div>{props.loading ? <Loader /> : renderWeek()}</div>
}

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks,
    auth: state.auth,
    editor: state.editor,
    loading: state.loading.loading,
    mobile: state.view.mobile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchLoading: (status) => dispatch(actionSwitchLoading(status)),

    init: (weeks) => dispatch(actionInit(weeks)),
    newWeekButtonState: (state) => dispatch(actionSetButtonState(state)),

    setCurrentWeek: (currentWeek) => dispatch(actionSetEditorCurrentWeek(currentWeek)),
    setCurrentName: (currentName) => dispatch(actionSetEditorCurrentName(currentName)),
    setCurrentQuestion: (question) => dispatch(actionSetEditorCurrentQuestion(question)),
    setCurrentTotal: (currentTotal) => dispatch(actionSetEditorCurrentTotal(currentTotal)),
    setCurrentID: (currentID) => dispatch(actionSetEditorCurrentID(currentID)),
    setCurrentDeadline: (deadline) => dispatch(actionSetEditorCurrentDeadline(deadline)),
    setQuestions: (questions) => dispatch(actionSetEditorQuestions(questions)),
    setCurrentError: (errorMessage) => dispatch(actionSetEditorCurrentError(errorMessage)),
    clearEditor: () => dispatch(actionClearEditor()),
    initButtonState: (state) => dispatch(actionInitButtonState(state)),
    setCalendarTabActive: (index) => dispatch(actionSetTabActive(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekCreator)
