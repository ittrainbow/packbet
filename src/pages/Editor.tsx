import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrashAlt, FaCheck, FaPlus, FaBan } from 'react-icons/fa'
import moment from 'moment/moment'

import { objectCompare, objectTrim, objectReplace, getWeeksIDs, getNewQuestionId } from '../helpers'
import { useAppContext } from '../context/Context'
import { initialQuestionInWork, initialEditorContext } from '../context/initialContexts'
import { Button, Input } from '../UI'
import { i18n } from '../locale/locale'
import { setTabActive } from '../helpers/tabActive'
import { DELETE_WEEK, SET_WEEK } from '../redux/types'
import { LocaleType, QuestionType, QuestionsType } from '../types'

export const Editor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>()
  const nameRef = useRef<HTMLInputElement>()
  const {
    userContext,
    weeksContext,
    setWeeksContext,
    editorContext,
    setEditorContext,
    appContext,
    setAppContext
  } = useAppContext()
  const { locale } = userContext
  const [questionInWork, setQuestionInWork] = useState(initialQuestionInWork as QuestionType)
  const [compareQuestion, setCompareQuestion] = useState({} as QuestionType)
  const [anyChanges, setAnyChanges] = useState<boolean>(false)
  const { selectedWeek, nextWeek, emptyEditor, season } = appContext
  const { questions, name, active, deadline } = editorContext
  const { question, total, id } = questionInWork
  const loadedWeek = weeksContext[selectedWeek]

  useEffect(() => {
    nameRef.current?.focus()
    emptyEditor && setEditorContext(initialEditorContext)
    // eslint-disable-next-line
  }, [selectedWeek])

  useEffect(() => {
    const changes = emptyEditor
      ? Object.keys(questions).some((el) => el)
      : !objectCompare(editorContext, loadedWeek)
    setAnyChanges(changes)
    // eslint-disable-next-line
  }, [questions, name, active, deadline])

  const editorLocale = i18n(locale, 'editor') as LocaleType
  const buttonsLocale = i18n(locale, 'buttons') as LocaleType
  const { weekNameMsg, weekQuestionMsg, weekTotalMsg, weekActivityMsg } = editorLocale
  const { buttonSaveMsg, buttonCancelMsg, buttonDeleteWeekMsg } = buttonsLocale

  const questionButtonDisabled = objectCompare(questionInWork, compareQuestion)

  const addQuestionHandler = () => {
    const { question, total } = questionInWork
    const { questions } = editorContext
    const { id } = questionInWork
    if (question && total) {
      const setId = id === null ? getNewQuestionId(questions) : (id as number)
      const obj = objectReplace(questions, setId, questionInWork)
      setEditorContext({ ...editorContext, questions: obj })
      setQuestionInWork(initialQuestionInWork)
    }
  }

  const removeQuestionHandler = (id: number) => {
    const q: QuestionsType = objectTrim(questions, id)
    setEditorContext({ ...editorContext, questions: q })
  }

  const submitHandler = async () => {
    const id: number = emptyEditor ? nextWeek : selectedWeek
    Object.keys(editorContext.questions).forEach((el) => delete questions[Number(el)]['id'])
    const weeks = structuredClone(weeksContext)
    weeks[id] = editorContext
    const weekIDs = getWeeksIDs(weeks)

    dispatch({ type: SET_WEEK, payload: { season, id, editorContext } })
    setAppContext({ ...appContext, ...weekIDs })
    setWeeksContext(weeks)
    navigate('/calendar')
  }

  const deleteWeekHandler = async () => {
    const weeks = structuredClone(weeksContext)
    delete weeks[selectedWeek]
    const weekIDs = getWeeksIDs(weeks)

    dispatch({ type: DELETE_WEEK, payload: { season, selectedWeek } })
    setAppContext({ ...appContext, ...weekIDs })
    setWeeksContext(weeks)
    navigate('/calendar')
  }

  const getDeadline = () =>
    moment(deadline || new Date().getTime())
      .format()
      .substring(0, 16)

  const editButtonHandler = (id: number) => {
    const { question, total } = questions[id]
    setQuestionInWork({ question, total, id })
    setCompareQuestion({ question, total, id })

    inputRef.current?.focus()
  }

  const goBackHandler = () => {
    const context = { ...appContext, tabActive: 5, emptyEditor: false }
    setAppContext(context)
    setTabActive(5)
    navigate('/calendar')
  }

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEditorContext({ ...editorContext, name: value })
  }

  const changeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setQuestionInWork({ ...questionInWork, question: e.target.value.substring(0, 120) })

  const changeTotalHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!isNaN(Number(value)) || value === '-') {
      setQuestionInWork({ ...questionInWork, total: value })
    }
  }

  const changeDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const deadline = new Date(value).getTime()
    setEditorContext({ ...editorContext, deadline })
  }

  const changeActivityHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setEditorContext({ ...editorContext, active: e.target.checked })

  function renderQuestions() {
    return Object.keys(questions).map((el) => {
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
              <FaBan
                className="editor-question__edit editor-btn__green faBan"
                onClick={() => setQuestionInWork(initialQuestionInWork)}
              />
            ) : (
              <FaEdit
                className="editor-question__edit editor-btn__green"
                onClick={() => editButtonHandler(id)}
              />
            )}
            <FaTrashAlt
              className="editor-question__trash editor-btn__red"
              onClick={() => removeQuestionHandler(id)}
            />
          </div>
        </div>
      )
    })
  }

  return (
    <div className="container">
      <div className="editor-input">
        <Input
          sx={{ width: '100%' }}
          type="text"
          inputRef={nameRef}
          onChange={changeNameHandler}
          placeholder={weekNameMsg}
          id={'weekname'}
          value={name}
        />
        <div className="editor-form">
          <Input
            sx={{ width: '100%' }}
            type="text"
            inputRef={inputRef}
            onChange={changeQuestionHandler}
            placeholder={weekQuestionMsg}
            value={question}
          />
          <Input
            type="text"
            onChange={changeTotalHandler}
            value={total}
            className={'short'}
            placeholder={weekTotalMsg}
          />
          <Button
            className="editor-small"
            onClick={addQuestionHandler}
            disabled={!question || !total || questionButtonDisabled}
          >
            {id !== null ? <FaCheck /> : <FaPlus />}
          </Button>
        </div>
      </div>
      {renderQuestions()}
      <div className="editor-checkbox">
        <div className="editor-checkbox__pad">{weekActivityMsg}</div>
        <Input
          type="checkbox"
          checked={active}
          className={'checkbox'}
          onChange={changeActivityHandler}
        />
      </div>
      <div className="editor-datetime__container">
        <Input
          type="datetime-local"
          value={getDeadline()}
          className={'timer'}
          onChange={changeDateHandler}
        />
      </div>
      <div className="editor-form">
        <Button className={'editor'} disabled={!anyChanges} onClick={submitHandler}>
          {buttonSaveMsg}
        </Button>
        <Button className={'editor'} onClick={goBackHandler}>
          {buttonCancelMsg}
        </Button>
      </div>
      {!emptyEditor ? (
        <Button className={'editor'} onClick={deleteWeekHandler}>
          {buttonDeleteWeekMsg}
        </Button>
      ) : null}
      {/* <Button onClick={logContextHandler}>Context</Button> */}
    </div>
  )
}
