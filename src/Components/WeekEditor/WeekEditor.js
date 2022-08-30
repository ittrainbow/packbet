import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import structuredClone from '@ungap/structured-clone'

import classes from './WeekEditor.module.scss'
import Button from '../../UI/Button/Button'
import Loader from '../../UI/Loader/Loader'
import Input from '../../UI/Input/Input'
import axios from '../../axios/axios'
import Undo from '../../UI/Undo/Undo'
import Edit from '../../UI/Edit/Edit'
import { actionInit } from '../../redux/actions/weekActions'
import { switchLoading } from '../../redux/actions/loadingActions'
import { 
  setEditorCurrentQuestion,
  setEditorCurrentTotal,
  setEditorCurrentID,
  setEditorQuestions
} from '../../redux/actions/editorActions'

const WeekEditor = (props) => {
  const navigate = useNavigate()

  function addQuestionHandler() {
    const questions = structuredClone(props.editor.questions)
    const id = props.editor.currentID === null 
      ? props.editor.questions.length 
      : props.editor.currentID

    const obj = {}
    obj['id'] = id
    obj['question'] = props.editor.currentQuestion
    obj['total'] = props.editor.currentTotal
    questions[id] = obj

    props.setQuestions(questions)
    props.setCurrentQuestion('')
    props.setCurrentID('')
    props.setCurrentTotal('')
  }

  function editQuestionHandler(question) {
    props.setCurrentQuestion(question.question)
    props.setCurrentID(question.id)
    props.setCurrentTotal(question.total)
  }

  function deleteQuestionHandler(index) {
    const questions = structuredClone(props.editor.questions)
    questions.splice(index, 1)
    props.setQuestions(questions)
  }

  function changeHandler(event, tag) {
    if (tag === 'Question') props.setCurrentQuestion(event.target.value)
    if (tag === 'Total') props.setCurrentTotal(event.target.value)
  }

  async function submitHandler() {
    props.switchLoading(true)

    const qs = props.editor.questions.map((question, index) => {
      question['id'] = index
      return question
    })

    const week = {
      id: props.editor.currentWeek,
      name: props.editor.currentName,
      number: props.editor.currentWeek + 1,
      questions: qs
    }

    try {
      const response = await axios.get('pack/weeks.json')
      const currentHash = Object.keys(response.data)
        .filter((el) => response.data[el].id === props.editor.currentWeek)[0]      
      await axios.put(`pack/weeks/${currentHash}.json`, week)
  
      const weeks = structuredClone(props.weeks)
      weeks[props.editor.currentWeek] = week
      props.actionInit(weeks)  
    } catch (error) {
      console.log(error)
    }
      
    props.switchLoading(false)

    navigate('/calendar')
  }

  function renderQuestions() {
    return (
      props.editor.questions.map((question, index) => {
        return (
          <div key={index} className={
            index === props.editor.currentID
              ? classes.QuestionsActive
              : classes.Questions
          }>
            {question.question}: {question.total} 
            <Undo
              className={classes.Undo}
              onClick={() => deleteQuestionHandler(index)}
            />            
            <Edit
              className={classes.Undo}
              onClick={() => editQuestionHandler(question)}
            />
          </div>
        )
      })
    )
  }

  async function deleteWeekHandler() {
    props.switchLoading(true)

    try {
      const response = await axios.get('pack/weeks.json')
      const currentHash = Object.keys(response.data)
        .filter((el) => response.data[el].id === props.editor.currentWeek)[0]

      await axios.delete(`pack/weeks/${currentHash}.json`)

      const array = structuredClone(props.weeks)
      const newWeeks = array.filter((el) => el.id !== props.editor.currentWeek)

      props.actionInit(newWeeks)
    } catch (error) {
      console.log(error)
    }
    
    props.switchLoading(false)
    navigate('/calendar')
  }
  
  function renderInputs() {
    return (
      <div className={classes.Inputs}>
        <div className={classes.Row}>
          <h3>{props.editor.currentName || ''}</h3>
        </div>
        
        <div className={classes.Row}>
          <div className={classes.Line}>          
            <Input 
              label='Линия'
              value={props.editor.currentQuestion || ''}
              onChange={(event) => changeHandler(event, 'Question')}
            />
          </div>
          <div className={classes.Total}>
            <Input
              label='Тотал'
              type='number'
              step="0.5"
              value={props.editor.currentTotal || ''}
              onChange={(event) => changeHandler(event, 'Total')}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.WeekEditor}>
      <div>
        <h3>Редактирование</h3>
        { props.loading
            ? <Loader />
            : <div>
                {renderInputs()}
    
                <Button
                  text='Сохранить'
                  onClick={() => addQuestionHandler()}
                  disabled={
                    !props.editor.currentQuestion &&
                    !props.editor.currentTotal
                  }
                />

                <div className={classes.QuestionsList}>
                  { renderQuestions() }    
                </div>
    
                <Button
                  text='На сервер'
                  onClick={() => submitHandler()}
                  disabled={props.editor.questions.length === 0}
                />

                <Button
                  text='Удалить'
                  onClick={() => deleteWeekHandler()}
                />
            </div>
        }
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks,
    weekId: state.week.weekId,
    loading: state.loading.loading,
    editor: state.editor,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchLoading: (status) => dispatch(switchLoading(status)),

    actionInit: (weeks) => dispatch(actionInit(weeks)),

    setCurrentQuestion: (currentQuestion) => dispatch(setEditorCurrentQuestion(currentQuestion)),
    setCurrentTotal: (currentTotal) => dispatch(setEditorCurrentTotal(currentTotal)),
    setCurrentID: (currentID) => dispatch(setEditorCurrentID(currentID)),
    setQuestions: (questions) => dispatch(setEditorQuestions(questions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekEditor)