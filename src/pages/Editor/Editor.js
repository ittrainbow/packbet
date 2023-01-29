import React, { useState, useContext } from 'react'
import { setDoc, doc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrashAlt, FaCheck, FaPlus } from 'react-icons/fa'

import './Editor.scss'

import { db } from '../../db'
import { Context } from '../../App'
import { objectCompare, objectTrim, objectReplace } from '../../helpers'
import { setLoading } from '../../redux/actions'
import { questionInWorkInit } from '../../templates/_initialContexts'

export const Editor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { weeksContext, setWeeksContext, appContext, editorContext, setEditorContext } =
    useContext(Context)
  const [questionInWork, setQuestionInWork] = useState(questionInWorkInit)
  const { selectedWeek } = appContext
  const { questions, name, active, deadline } = editorContext
  const { question, total, id } = questionInWork
  const loadedWeek = weeksContext[selectedWeek]

  const changes = objectCompare(editorContext, loadedWeek)

  const changeNameHandler = (name) => {
    setEditorContext({ ...editorContext, name })
  }

  const newQuestionNum = () => {
    return Object.keys(questions).sort((a, b) => b - a)[0]
  }

  const addQuestionHandler = () => {
    const { id, question, total } = questionInWork
    if (question && total) {
      const obj = objectReplace(questions, id, newQuestionNum(), questionInWork)
      setEditorContext({ ...editorContext, questions: obj })
      setQuestionInWork(questionInWorkInit)
    }
  }

  const removeQuestionHandler = (id) => {
    const q = objectTrim(questions, id)
    setEditorContext({ ...editorContext, questions: q })
  }

  const changeDateHandler = (deadline) => {
    setEditorContext({ ...editorContext, deadline })
  }

  const submitHandler = async () => {
    try {
      dispatch(setLoading(true))
      const weeks = objectReplace(weeksContext, selectedWeek, null, editorContext)
      setWeeksContext(weeks)
      await setDoc(doc(db, 'weeks', selectedWeek.toString()), editorContext)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  function renderQuestions() {
    if (questions)
      return Object.keys(questions).map((el) => {
        const id = Number(el)
        const { question, total } = questions[id]
        return (
          <div key={id} className="editor-q">
            <div className="editor-q__desc">
              {question} {total !== 1 ? `: ${total}` : null}
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
        <div className="editor-week__week">{loadedWeek.name}</div>
        {!changes ? (
          <button className="editor-week__btn" onClick={() => submitHandler()}>
            Save?
          </button>
        ) : null}
      </div>
      <div className="editor-form">
        <input
          className="editor-form__desc"
          onChange={(e) => changeNameHandler(e.target.value)}
          value={name}
        ></input>
      </div>
      <div className="editor-form">
        <input
          className="editor-form__desc"
          onChange={(e) => setQuestionInWork({ ...questionInWork, question: e.target.value })}
          value={question}
        ></input>
        <input
          className="editor-form__total"
          onChange={(e) => setQuestionInWork({ ...questionInWork, total: Number(e.target.value) })}
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
        Activity
      </div>
      <div className="editor-datetime">
        <input
          type="datetime-local"
          className="editor-datetime__timer"
          value={deadline}
          onChange={(e) => changeDateHandler(e.target.value)}
        />
      </div>
      {!changes ? (
        <button className="editor-week__btn" onClick={() => navigate(-1)}>
          Discard
        </button>
      ) : null}
    </div>
  )
}
