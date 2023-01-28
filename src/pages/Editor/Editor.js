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

const questionInWorkInit = { question: '', total: '', id: null }

export const Editor = () => {
  const { weeksContext, setWeeksContext, appContext } = useContext(Context)
  const { selectedWeek } = appContext
  const [origin, setOrigin] = useState(weeksContext[selectedWeek])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [weekInWork, setWeekInWork] = useState(origin)
  const [questionInWork, setQuestionInWork] = useState({})

  const { questions, name, active, deadline } = weekInWork
  const { question, total, id } = questionInWork

  const changes = objectCompare(weekInWork, origin)

  const changeNameHandler = (name) => {
    setWeekInWork({ ...weekInWork, name })
  }

  const newQuestionNum = () => {
    return Object.keys(questions).sort((a, b) => b - a)[0]
  }

  const addQuestionHandler = () => {
    const { id, question, total } = questionInWork
    if (question && total) {
      const obj = objectReplace(questions, id, newQuestionNum(), questionInWork)
      setWeekInWork({ ...weekInWork, questions: obj })
      setQuestionInWork(questionInWorkInit)
    }
  }

  const removeQuestionHandler = (id) => {
    const q = objectTrim(questions, id)
    setWeekInWork({ ...weekInWork, questions: q })
  }

  const changeDateHandler = (deadline) => {
    setWeekInWork({ ...weekInWork, deadline })
  }

  const submitHandler = async () => {
    dispatch(setLoading(true))
    try {
      await setDoc(doc(db, 'weeks', selectedWeek.toString()), weekInWork)
      const weeks = objectReplace(weeksContext, selectedWeek, null, weekInWork)
      setWeeksContext(weeks)
      setOrigin(weekInWork)
    } catch (error) {
      console.error(error)
    }
    dispatch(setLoading(false))
  }

  return (
    <div className="container">
      <div className="editor-week">
        <div className="editor-week__week">{name}</div>
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
          {id !== null ? (
            <FaCheck className="editor-form__check" />
          ) : (
            <FaPlus className="editor-form__check" />
          )}
        </button>
      </div>
      {Object.keys(questions).map((el) => {
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
      })}
      <div className="editor-checkbox">
        <input
          type="checkbox"
          className="editor-checkbox__box"
          checked={active}
          onChange={() => setWeekInWork({ ...weekInWork, active: !active })}
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
      <button
        onClick={() => {
          console.log('weeksContext', weeksContext)
          console.log('appContext', appContext)
        }}
      >
        SHOWCTXT
      </button>
    </div>
  )
}
