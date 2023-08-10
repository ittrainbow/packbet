import { useSelector, useDispatch } from 'react-redux'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

import { getNewQuestionId, getObjectsEquality, animateFadeOut } from '../../helpers'
import { selectEditor, selectUser } from '../../redux/selectors'
import { ChangeInputType, FadeRefType, LocaleType, QuestionsType } from '../../types'
import { editorActions } from '../../redux/slices'
import { Input, Button } from '../../UI'
import { i18n } from '../../locale'

export const EditorInputs = ({ questionsRef }: { questionsRef: FadeRefType }) => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>()
  const { locale } = useSelector(selectUser)
  const editor = useSelector(selectEditor)
  const { name, questionInWork, questionCompare } = editor
  const { question, total, id } = questionInWork

  const { weekNameMsg, weekTotalMsg, weekQuestionMsg } = i18n(locale, 'editor') as LocaleType

  const handleChangeName = (e: ChangeInputType) => {
    const { value } = e.target
    dispatch(editorActions.updateEditorName(value))
  }

  const handleSetQuestion = (e: ChangeInputType) => {
    const { value } = e.target
    const question = value.substring(0, 120)
    const data = { ...questionInWork, question }

    dispatch(editorActions.setQuestionInWork(data))
  }

  const handleChangeTotal = (e: ChangeInputType) => {
    const { value } = e.target
    const data = { ...questionInWork, total: value }

    dispatch(editorActions.setQuestionInWork(data))
  }

  const handleAddQuestion = () => {
    const { question, total } = questionInWork
    const { questions } = editor
    const { id } = questionInWork
    if (question && total) {
      questionsRef && animateFadeOut(questionsRef)
      setTimeout(() => {
        const setId = id === null ? getNewQuestionId(questions) : (id as number)
        const obj: QuestionsType = structuredClone(questions)
        obj[setId] = questionInWork
        dispatch(editorActions.clearQuestionInWork())
        dispatch(editorActions.updateEditorQuestions(obj))
      }, 200)
    }
  }

  const questionButtonDisabled = getObjectsEquality(questionInWork, questionCompare)
  const totalBtnDisabled = !question || !total || questionButtonDisabled

  return (
    <div className="editor-input">
      <Input onChange={handleChangeName} placeholder={weekNameMsg} value={name} />
      <div className="editor-form">
        <Input inputRef={inputRef} onChange={handleSetQuestion} placeholder={weekQuestionMsg} value={question} />
        <Input onChange={handleChangeTotal} value={total} type="number" placeholder={weekTotalMsg} />
        <Button className="editor-small" onClick={handleAddQuestion} disabled={totalBtnDisabled}>
          {id !== null ? <FaCheck /> : <FaPlus />}
        </Button>
      </div>
    </div>
  )
}
