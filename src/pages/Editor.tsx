import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit, FaTrashAlt, FaCheck, FaPlus, FaBan } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import moment from 'moment/moment'

import 'react-confirm-alert/src/react-confirm-alert.css'

import { objectCompare, objectTrim, objectReplace, getWeeksIDs, getNewQuestionId, fadeOut } from '../helpers'
import { selectApp, selectEditor, selectLocation, selectUser, selectWeeks } from '../redux/selectors'
import { LocaleType, QuestionType, QuestionsType } from '../types'
import { appActions, editorActions, weeksActions } from '../redux/slices'
import { emptyQuestion } from '../helpers/initials'
import * as TYPES from '../redux/storetypes'
import { Button, Input } from '../UI'
import { i18n } from '../locale'

export const Editor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const weeks = useSelector(selectWeeks)
  const editor = useSelector(selectEditor)
  const { selectedWeek, emptyEditor } = useSelector(selectApp)
  const { pathname } = useSelector(selectLocation)
  const { locale } = useSelector(selectUser)
  const { tabActive } = useSelector(selectApp)
  const { questions, name, active, deadline } = editor

  const inputRef = useRef<HTMLInputElement>()
  const nameRef = useRef<HTMLInputElement>()
  const questionsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [questionInWork, setQuestionInWork] = useState(emptyQuestion)
  const [compareQuestion, setCompareQuestion] = useState({} as QuestionType)
  const [anyChanges, setAnyChanges] = useState<boolean>(false)
  const { question, total, id } = questionInWork

  useEffect(() => {
    tabActive === 6 && !questions && navigate('/calendar') // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (tabActive === 6) {
      setQuestionInWork(emptyQuestion)
      setTimeout(() => dispatch(dispatch(editorActions.clearEditor())), 200)
    } // eslint-disable-next-line
  }, [tabActive])

  useEffect(() => {
    if ((pathname.length > 7 && tabActive === 6) || (pathname.length < 8 && tabActive === 5)) {
      fadeOut(containerRef, 'editor')
    }
  }, [pathname, tabActive])

  const clearQuestion = () => setQuestionInWork(emptyQuestion)

  useEffect(() => {
    tabActive < 5 && fadeOut(containerRef, 'editor') // eslint-disable-next-line
  }, [tabActive])

  useEffect(() => {
    nameRef.current?.focus()
    emptyEditor && dispatch(editorActions.clearEditor()) // eslint-disable-next-line
  }, [selectedWeek])

  useEffect(() => {
    const changes = emptyEditor ? !!Object.keys(questions).length : !objectCompare(editor, weeks[selectedWeek])
    setAnyChanges(changes) // eslint-disable-next-line
  }, [questions, name, active, deadline])

  const msgEditor = i18n(locale, 'editor') as LocaleType
  const msgButtons = i18n(locale, 'buttons') as LocaleType

  const questionButtonDisabled = objectCompare(questionInWork, compareQuestion)

  const addQuestionHandler = () => {
    const { question, total } = questionInWork
    const { questions } = editor
    const { id } = questionInWork
    if (question && total) {
      fadeOut(questionsRef, 'editor')
      setTimeout(() => {
        const setId = id === null ? getNewQuestionId(questions) : (id as number)
        const obj = objectReplace(questions, setId, questionInWork)
        clearQuestion()
        dispatch(editorActions.updateEditorQuestions(obj))
      }, 200)
    }
  }

  const removeQuestionHandler = (id: number) => {
    fadeOut(questionsRef, 'editor')
    setTimeout(() => {
      const obj: QuestionsType = objectTrim(questions, id)
      dispatch(editorActions.updateEditorQuestions(obj))
    }, 200)
  }

  const submitHandler = async () => {
    const id = selectedWeek
    dispatch({ type: TYPES.SUBMIT_WEEK, payload: { id, week: editor } })
    dispatch(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
    dispatch(weeksActions.updateWeeks({ week: editor, id }))
    navigate('/calendar')
  }

  const deleteWeekHandler = () => {
    const deleter = async () => {
      const newWeeks = structuredClone(weeks)
      delete newWeeks[selectedWeek]
      dispatch({ type: TYPES.DELETE_WEEK, payload: selectedWeek })
      dispatch(weeksActions.setWeeks(newWeeks))
      dispatch(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
      navigate('/calendar')
    }

    confirmAlert({
      message: msgEditor.weekDeleteMsg,
      buttons: [
        { label: msgButtons.buttonDeleteYesMsg, onClick: async () => deleter() },
        { label: msgButtons.buttonDeleteNoMsg }
      ]
    })
  }

  const getDeadline = () => {
    return moment(deadline || new Date().getTime())
      .format()
      .substring(0, 16)
  }

  const editButtonHandler = (id: number) => {
    inputRef.current?.focus()
    const { question, total } = questions[id]
    setQuestionInWork({ question, total, id })
    setCompareQuestion({ question, total, id })
  }

  const cancelEditHandler = () => {
    dispatch(appActions.setEmptyEditor(false))
    dispatch(appActions.setTabActive(5))

    fadeOut(containerRef, 'editor')
    setTimeout(() => {
      dispatch(editorActions.clearEditor())
      navigate('/calendar')
    }, 200)
  }

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch(editorActions.updateEditorName(value))
  }

  const questionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionInWork({ ...questionInWork, question: e.target.value.substring(0, 120) })
  }

  const changeTotalHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setQuestionInWork({ ...questionInWork, total: value })
  }

  const changeDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const deadline = new Date(value).getTime()
    dispatch(editorActions.updateEditorDeadline(deadline))
  }

  const changeActivityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    dispatch(editorActions.updateEditorActive(checked))
  }

  const totalBtnDisabled = !question || !total || questionButtonDisabled
  const saveBtnDisabled = !anyChanges || !name || !Object.keys(questions).length

  return (
    <div className="container animate-fade-in-up" ref={containerRef}>
      <div className="editor-input">
        <Input inputRef={nameRef} onChange={changeNameHandler} placeholder={msgEditor.weekNameMsg} value={name} />
        <div className="editor-form">
          <Input
            inputRef={inputRef}
            onChange={questionHandler}
            placeholder={msgEditor.weekQuestionMsg}
            value={question}
          />
          <Input onChange={changeTotalHandler} value={total} type="number" placeholder={msgEditor.weekTotalMsg} />
          <Button className="editor-small" onClick={addQuestionHandler} disabled={totalBtnDisabled}>
            {id !== null ? <FaCheck /> : <FaPlus />}
          </Button>
        </div>
      </div>

      <div className="animate-fade-in-up" ref={questionsRef}>
        {Object.keys(questions).map((el) => {
          const id = Number(el)
          const { question, total } = questions[id]
          const thisQuestionIsSelected = id === questionInWork.id
          return (
            <div key={id} className="editor-question">
              <div className="editor-question__desc">
                {question}: {total}
              </div>
              <div className="editor-question__buttons">
                {thisQuestionIsSelected ? (
                  <FaBan className="editor-question__edit editor-btn__green faBan" onClick={clearQuestion} />
                ) : (
                  <FaEdit className="editor-question__edit editor-btn__green" onClick={() => editButtonHandler(id)} />
                )}
                <FaTrashAlt
                  className="editor-question__trash editor-btn__red"
                  onClick={() => removeQuestionHandler(id)}
                />
              </div>
            </div>
          )
        })}
        <div className="editor-checkbox">
          <div className="editor-checkbox__pad">{msgEditor.weekActivityMsg}</div>
          <Input type="checkbox" checked={active} className={'checkbox'} onChange={changeActivityHandler} />
        </div>
        <div className="editor-datetime__container">
          <Input type="datetime-local" value={getDeadline()} className={'timer'} onChange={changeDateHandler} />
        </div>
        <div className="editor-form">
          <Button disabled={saveBtnDisabled} onClick={submitHandler}>
            {msgButtons.buttonSaveMsg}
          </Button>
          <Button onClick={cancelEditHandler}>{msgButtons.buttonCancelMsg}</Button>
          {!emptyEditor ? <Button onClick={deleteWeekHandler}>{msgButtons.buttonDeleteWeekMsg}</Button> : null}
        </div>
      </div>
    </div>
  )
}
