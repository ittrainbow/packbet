import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrashAlt, FaCheck, FaPlus, FaBan } from 'react-icons/fa'
import moment from 'moment/moment'

import {
  objectCompare,
  objectTrim,
  objectReplace,
  getWeeksIDs,
  getNewQuestionId,
  emptyWeek,
  emptyQuestion
} from '../helpers'
import { useAppContext } from '../context/Context'
import { Button, Input } from '../UI'
import { i18n } from '../locale/locale'
import { DELETE_WEEK, SUBMIT_WEEK } from '../redux/storetypes'
import { LocaleType, QuestionType, QuestionsType } from '../types'
import { selectApp, selectUser, selectWeeks } from '../redux/selectors'
import { appActions, weeksActions } from '../redux/slices'

export const Editor = () => {
  const { selectedWeek, emptyEditor, season } = useSelector(selectApp)
  const weeks = useSelector(selectWeeks)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>()
  const nameRef = useRef<HTMLInputElement>()
  const { editorContext, setEditorContext } = useAppContext()
  const { locale } = useSelector(selectUser)
  const [questionInWork, setQuestionInWork] = useState(
    emptyQuestion as QuestionType
  )
  const [compareQuestion, setCompareQuestion] = useState({} as QuestionType)
  const [anyChanges, setAnyChanges] = useState<boolean>(false)
  const { questions, name, active, deadline } = editorContext
  const { question, total, id } = questionInWork
  const loadedWeek = weeks[selectedWeek]

  useEffect(() => {
    !questions && navigate('/calendar') // eslint-disable-next-line
  }, [])

  useEffect(() => {
    nameRef.current?.focus()
    emptyEditor && setEditorContext(emptyWeek) // eslint-disable-next-line
  }, [selectedWeek])

  useEffect(() => {
    const changes = emptyEditor
      ? Object.keys(questions).some((el) => el)
      : !objectCompare(editorContext, loadedWeek)
    setAnyChanges(changes) // eslint-disable-next-line
  }, [questions, name, active, deadline])

  const editorLocale = i18n(locale, 'editor') as LocaleType
  const buttonsLocale = i18n(locale, 'buttons') as LocaleType
  const { weekNameMsg, weekQuestionMsg, weekTotalMsg, weekActivityMsg } =
    editorLocale
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
      setQuestionInWork(emptyQuestion)
    }
  }

  const removeQuestionHandler = (id: number) => {
    const q: QuestionsType = objectTrim(questions, id)
    setEditorContext({ ...editorContext, questions: q })
  }

  const submitHandler = async () => {
    const week = editorContext
    const id = selectedWeek

    dispatch({ type: SUBMIT_WEEK, payload: { season, id, week } })
    dispatch(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
    dispatch(weeksActions.updateWeeks({ week, id }))

    navigate('/calendar')
  }

  const deleteWeekHandler = async () => {
    const newWeeks = structuredClone(weeks)
    delete newWeeks[selectedWeek]

    dispatch({ type: DELETE_WEEK, payload: selectedWeek })
    dispatch(weeksActions.setWeeks(newWeeks))
    dispatch(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))

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
    dispatch(appActions.setEmptyEditor(false))
    dispatch(appActions.setTabActive(5))
    navigate('/calendar')
  }

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEditorContext({ ...editorContext, name: value })
  }

  const changeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setQuestionInWork({
      ...questionInWork,
      question: e.target.value.substring(0, 120)
    })

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
    return (
      questions &&
      Object.keys(questions).map((el) => {
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
                  onClick={() => setQuestionInWork(emptyQuestion)}
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
    )
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
        <Button
          className={'editor'}
          disabled={!anyChanges}
          onClick={submitHandler}
        >
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
    </div>
  )
}
