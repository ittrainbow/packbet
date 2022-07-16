import React, { useState, useEffect, useRef } from 'react'
import { setDoc, doc, updateDoc, deleteDoc, deleteField } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrashAlt, FaCheck, FaPlus, FaBan } from 'react-icons/fa'
import moment from 'moment/moment'

import './Editor.scss'

import { db } from '../../db'
import { objectCompare, objectTrim, objectReplace, objectNewId, getWeeksIDs } from '../../helpers'
import { useAppContext } from '../../context/Context'
import { initialQuestionInWork, initialEditorContext } from '../../context/initialContexts'
import { Button, Input } from '../../UI'
import { i18n } from '../../locale/locale'

export const Editor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRef = useRef()
  const nameRef = useRef()
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
  const [questionInWork, setQuestionInWork] = useState(initialQuestionInWork)
  const [compareQuestion, setCompareQuestion] = useState()
  const [noChanges, setNoChanges] = useState(true)
  const { selectedWeek, nextWeek, emptyEditor } = appContext
  const { questions, name, active, deadline } = editorContext
  const { question, total, id } = questionInWork
  const loadedWeek = weeksContext[selectedWeek]

  useEffect(() => {
    nameRef.current.focus()
    emptyEditor && setEditorContext(initialEditorContext) // eslint-disable-next-line
  }, [selectedWeek])

  const checkChanges = () => {
    const changes = emptyEditor
      ? Object.keys(questions).some((el) => el)
      : !objectCompare(editorContext, loadedWeek)
    setNoChanges(changes)
  }

  const questionButtonDisabled = objectCompare(questionInWork, compareQuestion)

  const changeNameHandler = (name) => setEditorContext({ ...editorContext, name })

  const addQuestionHandler = () => {
    const { question, total, id } = questionInWork
    const newId = id !== null ? id : objectNewId(editorContext)
    const obj = objectReplace(questions, newId, questionInWork)

    if (question && total) {
      setEditorContext({ ...editorContext, questions: obj })
      setQuestionInWork(initialQuestionInWork)
      checkChanges()
    }
  }

  const removeQuestionHandler = (id) => {
    const q = objectTrim(questions, id)

    setEditorContext({ ...editorContext, questions: q })
  }

  const changeDateHandler = (value) => {
    const deadline = new Date(value).getTime()
    setEditorContext({ ...editorContext, deadline })
    checkChanges()
  }

  const submitHandler = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const { questions } = editorContext
      const link = (emptyEditor ? nextWeek : selectedWeek).toString()
      const weeks = objectReplace(weeksContext, selectedWeek, editorContext)
      const { currentWeek } = getWeeksIDs(weeks)

      Object.keys(questions).forEach((el) => delete questions[el].id)

      setAppContext({ ...appContext, currentWeek })
      setWeeksContext(weeks)
      await setDoc(doc(db, 'weeks', link), editorContext)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const totalHandler = ({ value }) => {
    if (!isNaN(Number(value)) || value === '-') {
      setQuestionInWork({ ...questionInWork, total: value })
    }
  }

  const deleteWeek = async () => {
    const weeks = objectTrim(weeksContext, selectedWeek)
    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      const { currentWeek, nextWeek } = getWeeksIDs(weeks)
      const data = { [selectedWeek]: deleteField() }

      setWeeksContext(weeks)
      setAppContext({ ...appContext, currentWeek, nextWeek })
      await updateDoc(doc(db, 'answers', 'results'), data)
      await deleteDoc(doc(db, 'weeks', selectedWeek.toString()))
    } catch (error) {
      console.error(error)
    } finally {
      navigate('/calendar')
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const getDeadline = () => {
    return moment(deadline || new Date().getTime())
      .format()
      .substring(0, 16)
  }

  const editButtonHandler = (question, total, id) => {
    setQuestionInWork({ question, total, id })
    setCompareQuestion({ question, total, id })

    inputRef.current.focus()
  }

  const goBackHandler = () => {
    const context = { ...appContext, tabActive: 5, emptyEditor: false }
    setAppContext(context)
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
              {thisQuestionIsSelected ? (
                <FaBan
                  className="editor-question__edit editor-btn__green faBan"
                  onClick={() => setQuestionInWork(initialQuestionInWork)}
                />
              ) : (
                <FaEdit
                  className="editor-question__edit editor-btn__green"
                  onClick={() => editButtonHandler(question, total, id)}
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
  const { weekNameMsg, weekQuestionMsg, weekTotalMsg, weekActivityMsg } = i18n(locale, 'editor')
  const { buttonSaveMsg, buttonCancelMsg, buttonDeleteWeekMsg } = i18n(locale, 'buttons')

  return (
    <div className="container">
      <div className="editor-input">
        <Input
          sx={{ width: '100%' }}
          type={'text'}
          setRef={nameRef}
          onChange={(e) => changeNameHandler(e.target.value)}
          placeholder={weekNameMsg}
          id={'weekname'}
          value={name}
        />
        <div className="editor-form">
          <Input
            sx={{ width: '100%' }}
            type={'text'}
            setRef={inputRef}
            onChange={(e) => setQuestionInWork({ ...questionInWork, question: e.target.value })}
            placeholder={weekQuestionMsg}
            value={question}
          />
          <Input
            type={'text'}
            onChange={(e) => totalHandler(e.target)}
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
          onChange={() => setEditorContext({ ...editorContext, active: !active })}
        />
      </div>
      <div className="editor-datetime__container">
        <Input
          type={'datetime-local'}
          value={getDeadline()}
          className={'timer'}
          onChange={(e) => changeDateHandler(e.target.value)}
        />
      </div>
      <div className="editor-form">
        <Button className={'editor'} disabled={noChanges} onClick={submitHandler}>
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
