import React, { useState, useEffect, useContext, useRef } from 'react'
import { setDoc, doc, updateDoc, deleteDoc, deleteField } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrashAlt, FaCheck, FaPlus, FaBan } from 'react-icons/fa'
import moment from 'moment/moment'

import './Editor.scss'

import { db } from '../../db'
import { Context } from '../../App'
import { objectCompare, objectTrim, objectReplace, objectNewId, getWeeksIDs } from '../../helpers'
import { setLoading } from '../../redux/actions'
import { questionInWorkInit, editor } from '../../templates/_initialContexts'
import { Button, Input } from '../../UI'
import { i18n } from '../../locale/locale'

export const Editor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRef = useRef()
  const {
    userContext,
    weeksContext,
    setWeeksContext,
    editorContext,
    setEditorContext,
    appContext,
    setAppContext
  } = useContext(Context)
  const { locale } = userContext
  const [questionInWork, setQuestionInWork] = useState(questionInWorkInit)
  const [compareQuestion, setCompareQuestion] = useState()
  const { selectedWeek, nextWeek, emptyEditor } = appContext
  const { questions, name, active, deadline } = editorContext
  const { question, total, id } = questionInWork
  const loadedWeek = weeksContext[selectedWeek]

  useEffect(() => {
    if (emptyEditor) setEditorContext(editor) // eslint-disable-next-line
  }, [])

  const changes = emptyEditor
    ? Object.keys(questions).length < 1
    : objectCompare(editorContext, loadedWeek)

  const questionButtonDisabled = objectCompare(questionInWork, compareQuestion)

  const changeNameHandler = (name) => {
    setEditorContext({ ...editorContext, name })
  }

  const addQuestionHandler = () => {
    const { question, total, id } = questionInWork
    const newId = id !== null ? id : objectNewId(editorContext)
    if (question && total) {
      const obj = objectReplace(questions, newId, questionInWork)
      setEditorContext({ ...editorContext, questions: obj })
      setQuestionInWork(questionInWorkInit)
    }
  }

  const removeQuestionHandler = (id) => {
    const q = objectTrim(questions, id)
    setEditorContext({ ...editorContext, questions: q })
  }

  const changeDateHandler = (value) => {
    const deadline = new Date(value).getTime()
    setEditorContext({ ...editorContext, deadline })
  }

  const submitHandler = async () => {
    try {
      dispatch(setLoading(true))
      const { questions } = editorContext
      Object.keys(questions).forEach((el) => delete questions[el].id)
      const link = (emptyEditor ? nextWeek : selectedWeek).toString()
      const weeks = objectReplace(weeksContext, selectedWeek, editorContext)
      setWeeksContext(weeks)
      await setDoc(doc(db, 'weeks', link), editorContext)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoading(false))
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
      dispatch(setLoading(true))

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
      dispatch(setLoading(false))
    }
  }

  const getDeadline = () => {
    return moment(deadline ?? new Date().getTime())
      .format()
      .substring(0, 16)
  }

  const editButtonHandler = (question, total, id) => {
    setQuestionInWork({ question, total, id })
    setCompareQuestion({ question, total, id })

    inputRef.current.focus()
  }

  function renderQuestions() {
    if (questions)
      return Object.keys(questions).map((el) => {
        const id = Number(el)
        const { question, total } = questions[id]
        const selected = id === questionInWork.id
        return (
          <div key={id} className="editor-question">
            <div className="editor-question__desc">
              {question}: {total}
            </div>
            <div className="editor-question__buttons">
              {selected ? (
                <FaBan
                  className="editor-question__edit editor-btn__green faBan"
                  onClick={() => setQuestionInWork(questionInWorkInit)}
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
          onChange={(e) => changeNameHandler(e.target.value)}
          placeholder={weekNameMsg}
          id={'weekname'}
          value={name}
        />
        <div className="editor-form">
          <Input
            sx={{ width: '100%' }}
            type={'text'}
            inputRef={inputRef}
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
        <Button className={'editor'} disabled={changes} onClick={submitHandler}>
          {buttonSaveMsg}
        </Button>
        <Button className={'editor'} onClick={() => navigate(-1)}>
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
