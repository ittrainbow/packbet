import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaEdit, FaTrashAlt, FaBan } from 'react-icons/fa'

import { selectEditor } from '../../redux/selectors'
import { editorActions } from '../../redux/slices'
import { animateFadeOut } from '../../helpers'
import { FadeRefType, QuestionsType } from '../../types'

type QuestionPropsType = { id: number; questionsRef: FadeRefType }

export const EditorQuestion = ({ id, questionsRef }: QuestionPropsType) => {
  const dispatch = useDispatch()
  const { questions, questionInWork } = useSelector(selectEditor)
  const { question, total } = questions[id]

  const handleEditQuestion = (id: number) => {
    // inputRef.current?.focus()
    const { question, total } = questions[id]
    dispatch(editorActions.setQuestionInWork({ question, total, id }))
    dispatch(editorActions.setQuestionCompare({ question, total, id }))
  }

  const handleRemoveQuestion = (id: number) => {
    animateFadeOut(questionsRef)
    setTimeout(() => {
      const obj: QuestionsType = structuredClone(questions)
      delete obj[id]
      dispatch(editorActions.updateEditorQuestions(obj))
    }, 200)
  }

  const handleClearQuestion = () => {
    dispatch(editorActions.clearQuestionInWork())
  }

  return (
    <div className="editor-question">
      <div className="editor-question__desc">
        {question}: {total}
      </div>
      <div className="editor-question__buttons">
        {id === questionInWork.id ? (
          <FaBan className="editor-question__edit editor-btn__green faBan" onClick={handleClearQuestion} />
        ) : (
          <FaEdit className="editor-question__edit editor-btn__green" onClick={() => handleEditQuestion(id)} />
        )}
        <FaTrashAlt className="editor-question__trash editor-btn__red" onClick={() => handleRemoveQuestion(id)} />
      </div>
    </div>
  )
}
