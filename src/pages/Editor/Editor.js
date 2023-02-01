import React, { useState, useEffect, useContext } from 'react'
import { setDoc, doc, deleteDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrashAlt, FaCheck, FaPlus } from 'react-icons/fa'
import moment from 'moment/moment'

import './Editor.scss'

import { db } from '../../db'
import { Context } from '../../App'
import { objectCompare, objectTrim, objectReplace, objectNewId } from '../../helpers'
import { setLoading } from '../../redux/actions'
import { questionInWorkInit, editor } from '../../templates/_initialContexts'

export const Editor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { weeksContext, setWeeksContext, appContext, editorContext, setEditorContext } =
    useContext(Context)
  const [questionInWork, setQuestionInWork] = useState(questionInWorkInit)
  const { selectedWeek, nextWeek, emptyEditor } = appContext
  const { questions, name, active, deadline } = editorContext
  const { question, total, id } = questionInWork
  const loadedWeek = weeksContext[selectedWeek]

  useEffect(() => {
    if (emptyEditor) setEditorContext(editor) // eslint-disable-next-line
  }, [emptyEditor])

  const changes = emptyEditor
    ? Object.keys(questions).length < 1
    : objectCompare(editorContext, loadedWeek)

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
      const weeks = objectReplace(weeksContext, selectedWeek, editorContext)
      const link = (emptyEditor ? nextWeek : selectedWeek).toString()
      setWeeksContext(weeks)
      await setDoc(doc(db, 'weeks', link), editorContext)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const totalHandler = (value) => {
    if (!isNaN(value)) {
      setQuestionInWork({ ...questionInWork, total: value })
    }
  }

  const deleteWeek = async () => {
    const weeks = objectTrim(weeksContext, selectedWeek)
    try {
      dispatch(setLoading(true))
      setWeeksContext(weeks)
      await deleteDoc(doc(db, 'weeks', selectedWeek.toString()))
    } catch (error) {
      console.error(error)
    } finally {
      navigate('/calendar')
      dispatch(setLoading(false))
    }
  }

  const getDeadline = () => {
    return moment(deadline || 0)
      .format()
      .substring(0, 19)
  }

  function renderQuestions() {
    if (questions)
      return Object.keys(questions).map((el) => {
        const id = Number(el)
        const { question, total } = questions[id]
        return (
          <div key={id} className="editor-q">
            <div className="editor-q__desc">
              {question}: {total}
            </div>
            <div className="editor-q__buttons">
              <FaEdit
                className="editor-btn editor-btn__green"
                onClick={() => setQuestionInWork({ question, total, id })}
              />
              <FaTrashAlt
                className="editor-btn editor-btn__red"
                onClick={() => removeQuestionHandler(id)}
              />
            </div>
          </div>
        )
      })
  }

  return (
    <div className="container">
      <div className="editor-week">
        <div className="editor-week__week">{loadedWeek ? loadedWeek.name : ''}</div>
        {!changes ? (
          <button className="editor-week__btn" onClick={() => submitHandler()}>
            Сохранить
          </button>
        ) : null}
      </div>
      <div className="editor-form">
        <input
          className="editor-form__desc"
          onChange={(e) => changeNameHandler(e.target.value)}
          placeholder='Введите название недели'
          value={name}
        ></input>
      </div>
      <div className="editor-form">
        <input
          className="editor-form__desc"
          onChange={(e) => setQuestionInWork({ ...questionInWork, question: e.target.value })}
          placeholder='Создайте или выберите вопрос'
          value={question}
        ></input>
        <input
          className="editor-form__total"
          onChange={(e) => totalHandler(e.target.value)}
          value={total}
        ></input>
        <button className="editor-form__btn" onClick={() => addQuestionHandler()}>
          {id !== null ? <FaCheck /> : <FaPlus />}
        </button>
      </div>
      {renderQuestions()}
      <div className="editor-checkbox">
        <input
          type="checkbox"
          className="editor-checkbox__box"
          checked={active}
          onChange={() => setEditorContext({ ...editorContext, active: !active })}
        />
        Активность
      </div>
      <div className="editor-datetime">
        <input
          type="datetime-local"
          className="editor-datetime__timer"
          value={getDeadline()}
          onChange={(e) => changeDateHandler(e.target.value)}
        />
      </div>
      <div className="editor-week">
        {!changes ? (
          <button className="editor-week__btn" onClick={() => navigate(-1)}>
            Отменить
          </button>
        ) : null}
        {!emptyEditor ? (
          <div>
            <button className="editor-week__btn-long" onClick={() => deleteWeek()}>
              Удалить неделю
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
