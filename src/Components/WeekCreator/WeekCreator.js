import React  from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import structuredClone from '@ungap/structured-clone'

import BasicDateTimePicker from '../../UI/Picker/Picker'

import classes from './WeekCreator.module.scss'
import './WeekCreator.css'
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
import { getWeeks } from '../../frame/getWeeks'
import { actionButtonState } from '../../redux/actions/authActions'

const WeekCreator = (props) => {
  const navigate = useNavigate()

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

  function changeHandler (event, tag) {
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
    if (tag === 'setCurrentTotal') props.setCurrentTotal(event.target.value)
    if (tag === 'setCurrentDeadline') props.setCurrentDeadline(event.target.value)
  }

  function readyToSubmit() {
    return (
      props.editor.currentWeek &&
      props.editor.currentName.length > 0 &&
      props.editor.currentDeadline.length > 0 &&
      props.editor.questions.length > 2
    )
  }

  async function submitHandler () {
    if (readyToSubmit()) {
      props.switchLoading(true)

      const qs = structuredClone(props.editor.questions)
  
      const questions = qs.map((question, index) => {
        question['id'] = index
        return question
      })
  
      const week = {
        id: props.editor.currentWeekId,
        number: props.editor.currentWeek,
        name: props.editor.currentName,
        questions: questions,
        deadline: props.editor.currentDeadline
      }
  
      const weeks = structuredClone(props.weeks)
      weeks.push(week)
      
      props.setCurrentWeek(weeks.length - 1)

      const obj = {...props.auth.buttonState}
      const add = {}
      for (let i=0; i<questions.length; i++) add[i] = null
      obj[props.editor.currentWeekId] = add

      if (!props.editor.currentHash.length) {  
        await axios.post('pack/weeks.json', week)
      } else {
        await axios.put(`pack/weeks/${props.editor.currentHash}.json`, week)
      }

      const response = await axios.get('pack/weeks.json')
      
      props.init(getWeeks(response.data))
      props.switchLoading(false)
      navigate('/editor')
    }
  }

  async function deleteWeekHandler() {
    props.switchLoading(true)
    const id = props.editor.currentWeekId;
    const weeks = {...props.weeks}
    delete(weeks[id])

    props.init(weeks)

    await axios.delete(`pack/weeks/${props.editor.currentHash}.json`)
    
    props.switchLoading(false)
    navigate('/editor')
  }

  function renderQuestions() {
    return (
      props.loading
        ? <Loader />
        : props.editor.questions.map((question) => {
            const setClass = question.id === props.editor.currentID
              ? 'QuestionsSelected'
              : 'Questions'

            return (
              <div key={question.id} className={setClass}>
                {question.question}: {question.total}
                <div className='UndoEdit'>
                  <Undo onClick={() => deleteQuestionHandler(question.id)} />                  
                  <Edit onClick={() => editQuestionHandler(question.id)} />
                </div>
              </div>
            )
          })
    )
  }

  function doNotSave() {
    props.clearEditor()
    navigate('/calendar')
  }

  function renderInputs() {
    return (
      <div className={classes.Inputs}>
        <div className={classes.Row}>
          <div className={classes.Week}>
            <Input
              label='Неделя'
              type='number'
              value={props.editor.currentWeek}
              onChange={(event) => changeHandler(event, 'setCurrentWeek')}
            />
          </div>
          <div className={classes.Name}>
            <Input
              label='Игра'
              value={props.editor.currentName || ''}
              onChange={(event) => changeHandler(event, 'setCurrentName')}
            />
          </div>
        </div>
        <div className={classes.Row}>
          <div className={classes.Line}>          
            <Input 
              label='Линия'
              value={props.editor.currentQuestion}
              onChange={(event) => changeHandler(event, 'setCurrentQuestion')}
            />
          </div>
          <div className={classes.Total}>
            <Input
              label='Тотал'
              type='number'
              value={props.editor.currentTotal}
              onChange={(event) => changeHandler(event, 'setCurrentTotal')}
            />
          </div>
        </div>

        <div style={{color: 'red', fontWeight: 'bold', marginBottom: '10px'}}>
          {props.editor.currentError}
        </div>
      </div>
    )
  }

  function renderWeek() {
    return (
      <div>
        <div>{renderInputs()}</div>
      
        <div>
          <Button
            text={ 
              props.editor.currentID || props.editor.currentID === 0
                ? 'Сохранить вопрос'
                : 'Добавить вопрос'
            }
            onClick={(event) => addQuestionHandler(event)}
            disabled={
              !props.editor.currentQuestion ||
              !props.editor.currentTotal
            }
          />
        </div>

        <div className={classes.QuestionsList}>
          {renderQuestions()}
          <div style={{fontSize: '13px', fontWeight: 'bold', marginTop: '15px'}}>
            <div >
              Начало игры: {props.editor.currentDeadline
                              ? props.editor.currentDeadline
                              : 'не установлено'}
            </div>
            <div style={{marginTop: '5px'}}> 
              <BasicDateTimePicker style={{marginTop: '10px'}}/>
            </div>  
          </div>
        </div>

        <Button
          text='Отменить и выйти'
          onClick={doNotSave}  
        />

        <Button
          text='Сохранить неделю'
          onClick={() => submitHandler()}
          hoverText="Убедитесь, что введены корректный номер недели, название игры, добавлены как минимум три вопроса и установлено время начала игры"
        />

        { props.editor.currentHash
          ? <Button
              text="Удалить неделю"
              onClick={() => deleteWeekHandler()}
            />
          : null
        }
    </div>
    )
  }

  return (
    <div className={classes.WeekCreator}>
      { props.loading 
          ? <Loader />
          : renderWeek()
      }    
    </div>
  )
}

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks,
    auth: state.auth,
    editor: state.editor,
    loading: state.loading.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchLoading: (status) => dispatch(actionSwitchLoading(status)),

    init: (weeks) => dispatch(actionInit(weeks)),
    newWeekButtonState: (state) => dispatch(actionButtonState(state)),

    setCurrentWeek: (currentWeek) => dispatch(actionSetEditorCurrentWeek(currentWeek)),
    setCurrentName: (currentName) => dispatch(actionSetEditorCurrentName(currentName)),
    setCurrentQuestion: (currentQuestion) => dispatch(actionSetEditorCurrentQuestion(currentQuestion)),
    setCurrentTotal: (currentTotal) => dispatch(actionSetEditorCurrentTotal(currentTotal)),
    setCurrentID: (currentID) => dispatch(actionSetEditorCurrentID(currentID)),
    setCurrentDeadline: (currentDeadline) => dispatch(actionSetEditorCurrentDeadline(currentDeadline)),
    setQuestions: (questions) => dispatch(actionSetEditorQuestions(questions)),
    setCurrentError: (errorMessage) => dispatch(actionSetEditorCurrentError(errorMessage)),
    clearEditor: () => dispatch(actionClearEditor())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(WeekCreator)