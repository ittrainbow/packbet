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
  const { duration, tabActive } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const editor = useSelector(selectEditor)
  const { pathname } = useSelector(selectLocation)
  const { name, questionInWork, questionCompare } = editor
  const { ru, ua, total, id } = questionInWork

  // animate

  const triggerFade = useFade(questionsRef)

  // helpers

  useEffect(() => {
    pathname.includes('/editor/') && tabActive === 5 && nameRef.current?.focus()
    // eslint-disable-next-line
  }, [pathname])

  const questionButtonDisabled = getObjectsEquality(questionInWork, questionCompare)
  const totalBtnDisabled = !(!!ru.length && !!ua.length) || !total || questionButtonDisabled

  // action handlers

  const handleChangeName = (e: ChangeInputType) => {
    const { value } = e.target
    dispatch(editorActions.updateEditorName(value))
  }

  const handleSetRu = (e: ChangeInputType) => {
    const { value } = e.target
    const ru = value.substring(0, 120)
    const data = { ...questionInWork, ru }

    dispatch(editorActions.setQuestionInWork(data))
  }

  const handleSetUa = (e: ChangeInputType) => {
    const { value } = e.target
    const ua = value.substring(0, 120)
    const data = { ...questionInWork, ua }

    dispatch(editorActions.setQuestionInWork(data))
  }

  const handleChangeTotal = (e: ChangeInputType) => {
    const { value } = e.target
    const data = { ...questionInWork, total: value }

    dispatch(editorActions.setQuestionInWork(data))
  }

  const handleAddQuestion = () => {
    const { ru, ua, total } = questionInWork
    const { questions } = editor
    if (ru && ua && total) {
      triggerFade()
      setTimeout(() => {
        const setId = !id ? getNewQuestionId(questions) : (id as number)
        const obj: QuestionsType = structuredClone(questions)
        obj[setId] = questionInWork
        dispatch(editorActions.clearQuestionInWork())
        dispatch(editorActions.updateEditorQuestions(obj))
      }, duration)
    }
  }

  // render styles and locales

  const { weekNameMsg, weekTotalMsg, weekQuestionRuMsg, weekQuestionUaMsg } = i18n(locale, 'editor') as LocaleType

  return (
    <div className="editor-input">
      <Input onChange={handleChangeName} inputRef={nameRef} placeholder={weekNameMsg} value={name} />
      <div className="editor-form">
        <div className="editor-form__inner flexrow5">
          <Input onChange={handleSetRu} placeholder={weekQuestionRuMsg} value={ru} />
          <Input onChange={handleChangeTotal} value={total} type="number" placeholder={weekTotalMsg} />
        </div>
        <div className="editor-form__inner flexrow5">
          <Input onChange={handleSetUa} placeholder={weekQuestionUaMsg} value={ua} />
          <Button className="editor-small" onClick={handleAddQuestion} disabled={totalBtnDisabled} minWidth={66}>
            {id !== null ? <FaCheck /> : <FaPlus />}
          </Button>
        </div>
      </div>
    </div>
  )
}
