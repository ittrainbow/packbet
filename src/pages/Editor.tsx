import { useState, useEffect, useRef } from 'react'
import { setDoc, doc, updateDoc, deleteDoc, deleteField } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrashAlt, FaCheck, FaPlus, FaBan } from 'react-icons/fa'
import moment from 'moment/moment'

import { db } from '../db'
import { objectCompare, objectTrim, objectReplace, getWeeksIDs, getNewQuestionId } from '../helpers'
import { useAppContext } from '../context/Context'
import { initialQuestionInWork, initialEditorContext } from '../context/initialContexts'
import { Button, Input } from '../UI'
import { i18n } from '../locale/locale'
import { setTabActive } from '../helpers/tabActive'
import { SET_LOADING } from '../redux/types'
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
  const [anyChanges, setAnyChanges] = useState(false)
  const { selectedWeek, nextWeek, emptyEditor, season } = appContext
  const { questions, name, active, deadline } = editorContext
  const { question, total, id } = questionInWork
  const loadedWeek = weeksContext[selectedWeek]

  useEffect(() => {
    nameRef.current?.focus()
    emptyEditor && setEditorContext(initialEditorContext) // eslint-disable-next-line
  }, [selectedWeek])

  useEffect(() => {
    const changes = emptyEditor
      ? Object.keys(questions).some((el) => el)
      : !objectCompare(editorContext, loadedWeek)
    setAnyChanges(changes) // eslint-disable-next-line
  }, [questions, name, active, deadline])

  const questionButtonDisabled = objectCompare(questionInWork, compareQuestion)

  const addQuestionHandler = () => {
    const { question, total } = questionInWork
    const { questions } = editorContext
    const { id } = questionInWork
    const isNewQuestion = id === null || id !== 0
    if (question && total) {
      const setId = isNewQuestion ? getNewQuestionId(questions) : id
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
    try {
      dispatch({ type: SET_LOADING, payload: true })
      const id: number = emptyEditor ? nextWeek : selectedWeek
      const { questions } = editorContext
      Object.keys(questions).forEach((el) => {
        delete questions[Number(el)]['id']
      })
      const weeks = structuredClone(weeksContext)
      weeks[id] = editorContext
      setWeeksContext(weeks)
      await setDoc(doc(db, `weeks${season}`, id.toString()), editorContext)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch({ type: SET_LOADING, payload: false })
    }
  }

  const deleteWeek = async () => {
    const weeks = structuredClone(weeksContext)
    delete weeks[selectedWeek]
    try {
      dispatch({ type: SET_LOADING, payload: true })

      const { currentWeek, nextWeek } = getWeeksIDs(weeks)
      const data = { [selectedWeek]: deleteField() }
      setWeeksContext(weeks)
      setAppContext({ ...appContext, currentWeek, nextWeek })
      await updateDoc(doc(db, `answers${season}`, 'results'), data)
      await deleteDoc(doc(db, `weeks${season}`, selectedWeek.toString()))
    } catch (error) {
      console.error(error)
    } finally {
      navigate('/calendar')
      dispatch({ type: SET_LOADING, payload: false })
    }
  }

  const getDeadline = () => {
    return moment(deadline || new Date().getTime())
      .format()
      .substring(0, 16)
  }

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
              {thisQuestionIsSelected ? ( //TODO
                <FaBan
                  className="editor-question__edit editor-btn__green faBan"
                  onClick={() => setQuestionInWork(initialQuestionInWork)}
                />
              ) : (
                <FaEdit
                  className="editor-question__edit editor-btn__green"
                  onClick={() => {
                    editButtonHandler(id)
                  }}
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

  // locale
  const { weekNameMsg, weekQuestionMsg, weekTotalMsg, weekActivityMsg } = i18n(
    locale,
    'editor'
  ) as LocaleType
  const { buttonSaveMsg, buttonCancelMsg, buttonDeleteWeekMsg } = i18n(
    locale,
    'buttons'
  ) as LocaleType

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEditorContext({ ...editorContext, name: value })
  }

  const changeQuestionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionInWork({ ...questionInWork, question: e.target.value })
  }

  const changeTotalHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!isNaN(Number(value)) || value === '-') {
      setQuestionInWork({ ...questionInWork, total: value })
    }
  }

  const changeDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const deadline = new Date(value).getTime()
    setEditorContext({ ...editorContext, deadline })
  }

  const changeActivityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setEditorContext({ ...editorContext, active: checked })
  }

  return (
    <div className="container">
      <div className="editor-input">
        <Input
          sx={{ width: '100%' }}
          type={'text'}
          ref={nameRef}
          onChange={changeNameHandler}
          placeholder={weekNameMsg}
          id={'weekname'}
          value={name}
        />
        <div className="editor-form">
          <Input
            sx={{ width: '100%' }}
            type={'text'}
            ref={inputRef}
            onChange={changeQuestionHandler}
            placeholder={weekQuestionMsg}
            value={question}
          />
          <Input
            type={'text'}
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
          type={'checkbox'}
          checked={active}
          className={'checkbox'}
          onChange={changeActivityHandler}
        />
      </div>
      <div className="editor-datetime__container">
        <Input
          type={'datetime-local'}
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
        <Button className={'editor'} onClick={deleteWeek}>
          {buttonDeleteWeekMsg}
        </Button>
      ) : null}
    </div>
  )
}
