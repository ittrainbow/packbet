import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaCheck, FaPlus } from 'react-icons/fa'

import { selectApp, selectEditor, selectLocation, selectUser } from '../../redux/selectors'
import { ChangeInputType, FadeRefType, QuestionsType } from '../../types'
import { getNewQuestionId, getObjectsEquality } from '../../helpers'
import { editorActions } from '../../redux/slices'
import { i18n, LocaleType } from '../../locale'
import { Input, Button } from '../../UI'
import { useFade } from '../../hooks'

export const EditorInputs = ({ questionsRef }: { questionsRef: FadeRefType }) => {
  const dispatch = useDispatch()
  const nameRef = useRef<HTMLInputElement>()
  const questionRef = useRef<HTMLInputElement>()
  const { duration, tabActive } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const editor = useSelector(selectEditor)
  const { pathname } = useSelector(selectLocation)
  const { name, questionInWork, questionCompare } = editor
  const { question, total, id } = questionInWork

  // animate

  const { triggerFade } = useFade({ ref: questionsRef })

  // helpers

  useEffect(() => {
    pathname.includes('/editor/') && tabActive === 5 && nameRef.current?.focus()
    // eslint-disable-next-line
  }, [pathname])

  useEffect(() => {
    questionInWork.id !== null && questionRef.current?.focus()
  }, [questionInWork])

  const questionButtonDisabled = getObjectsEquality(questionInWork, questionCompare)
  const totalBtnDisabled = !question || !total || questionButtonDisabled

  // action handlers

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
    const { question, total, id } = questionInWork
    const { questions } = editor
    if (question && total) {
      triggerFade()
      setTimeout(() => {
        const questionToWrite = { ...questionInWork }
        delete questionToWrite.id
        const setId = id === null ? getNewQuestionId(questions) : (id as number)
        const obj: QuestionsType = structuredClone(questions)
        obj[setId] = questionToWrite
        dispatch(editorActions.clearQuestionInWork())
        dispatch(editorActions.updateEditorQuestions(obj))
      }, duration)
    }
  }

  // render styles and locales

  const { weekNameMsg, weekTotalMsg, weekQuestionMsg } = i18n(locale, 'editor') as LocaleType

  return (
    <div className="editor-input">
      <Input onChange={handleChangeName} inputRef={nameRef} placeholder={weekNameMsg} value={name} />
      <div className="editor-form">
        <Input inputRef={questionRef} onChange={handleSetQuestion} placeholder={weekQuestionMsg} value={question} />
        <Input onChange={handleChangeTotal} value={total} type="number" placeholder={weekTotalMsg} />
        <Button className="editor-small" onClick={handleAddQuestion} disabled={totalBtnDisabled}>
          {id !== null ? <FaCheck /> : <FaPlus />}
        </Button>
      </div>
    </div>
  )
}
