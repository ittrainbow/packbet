import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrashAlt, FaCheck, FaPlus, FaBan } from 'react-icons/fa'
import moment from 'moment/moment'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { objectCompare, objectTrim, objectReplace, getWeeksIDs, getNewQuestionId, emptyQuestion } from '../helpers'
import { Button, Input } from '../UI'
import { i18n } from '../locale'
import { DELETE_WEEK, SUBMIT_WEEK } from '../redux/storetypes'
import { LocaleType, QuestionType, QuestionsType } from '../types'
import { selectApp, selectEditor, selectUser, selectWeeks } from '../redux/selectors'
import { appActions, editorActions, weeksActions } from '../redux/slices'

export const Editor = () => {
  const { selectedWeek, emptyEditor } = useSelector(selectApp)
  const weeks = useSelector(selectWeeks)
  const editor = useSelector(selectEditor)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>()
  const nameRef = useRef<HTMLInputElement>()
  const { locale } = useSelector(selectUser)
  const [questionInWork, setQuestionInWork] = useState(emptyQuestion as QuestionType)
  const [compareQuestion, setCompareQuestion] = useState({} as QuestionType)
  const [anyChanges, setAnyChanges] = useState<boolean>(false)
  const { questions, name, active, deadline } = editor
  const { question, total, id } = questionInWork
  const loadedWeek = weeks[selectedWeek]

  useEffect(() => {
    !questions && navigate('/calendar')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    nameRef.current?.focus()
    emptyEditor && dispatch(editorActions.clearEditor())
    // eslint-disable-next-line
  }, [selectedWeek])

  useEffect(() => {
    const changes = emptyEditor ? Object.keys(questions).some((el) => el) : !objectCompare(editor, loadedWeek)
    setAnyChanges(changes)
    // eslint-disable-next-line
  }, [questions, name, active, deadline])

  const { weekNameMsg, weekQuestionMsg, weekTotalMsg, weekActivityMsg, weekDeleteMsg } = i18n(
    locale,
    'editor'
  ) as LocaleType
  const { buttonSaveMsg, buttonCancelMsg, buttonDeleteWeekMsg, buttonDeleteYesMsg, buttonDeleteNoMsg } = i18n(
    locale,
    'buttons'
  ) as LocaleType

  const questionButtonDisabled = objectCompare(questionInWork, compareQuestion)

  const clearQuestion = () => setQuestionInWork(emptyQuestion)

  const addQuestionHandler = () => {
    const { question, total } = questionInWork
    const { questions } = editor
    const { id } = questionInWork
    if (question && total) {
      const setId = id === null ? getNewQuestionId(questions) : (id as number)
      const obj = objectReplace(questions, setId, questionInWork)
      setQuestionInWork(emptyQuestion)
      dispatch(editorActions.updateEditorQuestions(obj))
    }
  }

  const removeQuestionHandler = (id: number) => {
    const obj: QuestionsType = objectTrim(questions, id)
    dispatch(editorActions.updateEditorQuestions(obj))
  }

  const submitHandler = async () => {
    const id = selectedWeek
    dispatch({ type: SUBMIT_WEEK, payload: { id, week: editor } })
    dispatch(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
    dispatch(weeksActions.updateWeeks({ week: editor, id }))
    navigate('/calendar')
  }

  const deleteWeekHandler = () => {
    confirmAlert({
      message: weekDeleteMsg,
      buttons: [
        {
          label: buttonDeleteYesMsg,
          onClick: async () => deleteWeek()
        },
        {
          label: buttonDeleteNoMsg
        }
      ]
    })
  }

  const deleteWeek = async () => {
    const newWeeks = structuredClone(weeks)
    delete newWeeks[selectedWeek]
    dispatch({ type: DELETE_WEEK, payload: selectedWeek })
    dispatch(weeksActions.setWeeks(newWeeks))
    dispatch(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
    navigate('/calendar')
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

  const goBackHandler = () => {
    dispatch(appActions.setEmptyEditor(false))
    dispatch(appActions.setTabActive(5))
    navigate('/calendar')
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

  return (
    <div className="container animate-fade-in-up">
      <div className="editor-input">
        <Input inputRef={nameRef} onChange={changeNameHandler} placeholder={weekNameMsg} value={name} />
        <div className="editor-form">
          <Input inputRef={inputRef} onChange={questionHandler} placeholder={weekQuestionMsg} value={question} />
          <Input onChange={changeTotalHandler} value={total} type="number" placeholder={weekTotalMsg} />
          <Button className="editor-small" onClick={addQuestionHandler} disabled={totalBtnDisabled}>
            {id !== null ? <FaCheck /> : <FaPlus />}
          </Button>
        </div>
      </div>

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
        <div className="editor-checkbox__pad">{weekActivityMsg}</div>
        <Input type="checkbox" checked={active} className={'checkbox'} onChange={changeActivityHandler} />
      </div>
      <div className="editor-datetime__container">
        <Input type="datetime-local" value={getDeadline()} className={'timer'} onChange={changeDateHandler} />
      </div>
      <div className="editor-form">
        <Button disabled={!anyChanges} onClick={submitHandler}>
          {buttonSaveMsg}
        </Button>
        <Button onClick={goBackHandler}>{buttonCancelMsg}</Button>
        {!emptyEditor ? <Button onClick={deleteWeekHandler}>{buttonDeleteWeekMsg}</Button> : null}
      </div>
    </div>
  )
}
